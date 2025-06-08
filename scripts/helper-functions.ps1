function Test-EnvVars {
    param (
        [string[]]$Vars
    )
    
    $envFile = ".\.env"
    if (-not (Test-Path $envFile)) {
        Write-Host "Error: .env file not found." -ForegroundColor Red
        return $false
    }
    
    $envContent = Get-Content $envFile
    $missingVars = @()
    
    foreach ($var in $Vars) {
        $found = $false
        foreach ($line in $envContent) {
            if ($line -match "^$var=.+$") {
                $found = $true
                break
            }
        }
        
        if (-not $found) {
            $missingVars += $var
        }
    }
    
    if ($missingVars.Count -gt 0) {
        Write-Host "Missing environment variables:" -ForegroundColor Yellow
        foreach ($var in $missingVars) {
            Write-Host "- $var" -ForegroundColor Yellow
        }
        return $false
    }
    
    return $true
}

function Setup-Biconomy {
    Write-Host "Setting up Biconomy for gasless transactions..."
    
    # Check if we have contract addresses in the environment
    $envFile = ".\.env"
    if (-not (Test-Path $envFile)) {
        Write-Host "Error: .env file not found." -ForegroundColor Red
        return
    }
    
    $envContent = Get-Content $envFile
    $contractAddresses = @{
        "mumbai" = $null
        "polygon" = $null
    }
    
    foreach ($line in $envContent) {
        if ($line -match "^VITE_CONTRACT_ADDRESS_MUMBAI=(.+)$") {
            $contractAddresses["mumbai"] = $matches[1]
        } elseif ($line -match "^VITE_CONTRACT_ADDRESS_POLYGON=(.+)$") {
            $contractAddresses["polygon"] = $matches[1]
        }
    }
    
    Write-Host "Please follow these steps to set up Biconomy:"
    Write-Host ""
    Write-Host "1. Go to https://dashboard.biconomy.io/ and sign in" -ForegroundColor Cyan
    Write-Host "2. Create a new app for your wedding website" -ForegroundColor Cyan
    
    if ($contractAddresses["mumbai"] -ne $null -and $contractAddresses["mumbai"] -ne "0x0000000000000000000000000000000000000000") {
        Write-Host "3. Add your Mumbai contract address: $($contractAddresses["mumbai"])" -ForegroundColor Cyan
    }
    
    if ($contractAddresses["polygon"] -ne $null -and $contractAddresses["polygon"] -ne "0x0000000000000000000000000000000000000000") {
        Write-Host "3. Add your Polygon contract address: $($contractAddresses["polygon"])" -ForegroundColor Cyan
    }
    
    Write-Host "4. Register the 'addWish' function as a gasless method" -ForegroundColor Cyan
    Write-Host "5. Get your API key and add it to your .env file as VITE_BICONOMY_API_KEY" -ForegroundColor Cyan
    
    Write-Host ""
    Write-Host "Would you like to open the Biconomy dashboard now? (y/n)" -ForegroundColor Yellow
    $openDashboard = Read-Host
    
    if ($openDashboard -eq "y") {
        Start-Process "https://dashboard.biconomy.io/"
    }
}

function Test-Contracts {
    param (
        [string]$Network = "mumbai"
    )
    
    $envFile = ".\.env"
    if (-not (Test-Path $envFile)) {
        Write-Host "Error: .env file not found." -ForegroundColor Red
        return
    }
    
    $envContent = Get-Content $envFile
    $contractAddress = $null
    
    foreach ($line in $envContent) {
        if ($line -match "^VITE_CONTRACT_ADDRESS_$($Network.ToUpper())=(.+)$") {
            $contractAddress = $matches[1]
            break
        }
    }
    
    if ($contractAddress -eq $null -or $contractAddress -eq "0x0000000000000000000000000000000000000000") {
        Write-Host "Error: Contract address for $Network not found in .env file." -ForegroundColor Red
        return
    }
    
    Write-Host "Testing the WeddingWishes contract on $Network..."
    Write-Host "Contract address: $contractAddress"
    
    # Run a simple test script to check if the contract is deployed and functional
    $script = @"
const { ethers } = require('hardhat');

async function main() {
  try {
    // Connect to the contract
    const weddingWishes = await ethers.getContractAt("WeddingWishes", "$contractAddress");
    
    // Get wish count
    const wishCount = await weddingWishes.getWishCount();
    console.log("Current wish count:", wishCount.toString());
    
    // Get all wishes
    const wishes = await weddingWishes.getAllWishes();
    console.log("Found", wishes.length, "wishes");
    
    if (wishes.length > 0) {
      console.log("Latest wish:");
      console.log("- Sender:", wishes[wishes.length - 1].sender);
      console.log("- Message:", wishes[wishes.length - 1].message);
      console.log("- Sender name:", wishes[wishes.length - 1].senderName);
    }
    
    console.log("Contract is working correctly!");
  } catch (error) {
    console.error("Error testing contract:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
"@
    
    $testScriptPath = ".\scripts\test-contract.js"
    $script | Out-File -FilePath $testScriptPath -Encoding utf8
    
    Write-Host "Running test script..."
    Write-Host ""
    
    npx hardhat run $testScriptPath --network $Network
    
    # Clean up
    Remove-Item $testScriptPath
}
