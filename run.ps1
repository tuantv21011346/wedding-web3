# Run script to help with development and deployment tasks

param (
    [Parameter(Position = 0)]
    [string]$Command
)

# Import helper functions
. "$PSScriptRoot\scripts\helper-functions.ps1"

function Show-Help {
    Write-Host "Wedding Web3 Run Script"
    Write-Host "======================="
    Write-Host ""
    Write-Host "Available commands:"    Write-Host "  help                   - Show this help message"
    Write-Host "  dev                    - Start development server"
    Write-Host "  build                  - Build the project for production"
    Write-Host "  deploy:mumbai          - Deploy contracts to Mumbai testnet"
    Write-Host "  deploy:polygon         - Deploy contracts to Polygon mainnet"
    Write-Host "  verify:mumbai <addr>   - Verify contract on Mumbai testnet"
    Write-Host "  verify:polygon <addr>  - Verify contract on Polygon mainnet"
    Write-Host "  test:mumbai            - Test contract functionality on Mumbai"
    Write-Host "  test:polygon           - Test contract functionality on Polygon"
    Write-Host "  biconomy:setup         - Setup Biconomy for gasless transactions"
    Write-Host "  env:check              - Check if all environment variables are set"
    Write-Host "  env:setup              - Create .env file from .env.example"
}

function Start-Development {
    Write-Host "Starting development server..."
    npm run dev
}

function Build-Project {
    Write-Host "Building project for production..."
    npm run build
}

function Deploy-Contract {
    param (
        [string]$Network
    )
    
    # Check for required environment variables
    if (-not (Test-EnvVars -Vars @("PRIVATE_KEY", "${Network.ToUpper()}_RPC_URL"))) {
        Write-Host "Error: Missing required environment variables for deployment." -ForegroundColor Red
        return
    }
    
    Write-Host "Deploying contracts to $Network..."
    npm run deploy:$Network
}

function Verify-Contract {
    param (
        [string]$Network,
        [string]$ContractAddress,
        [string]$ContractName = "WeddingWishes",
        [string]$Args = ""
    )
    
    # Check for required environment variables
    if (-not (Test-EnvVars -Vars @("POLYGONSCAN_API_KEY"))) {
        Write-Host "Error: Missing POLYGONSCAN_API_KEY environment variable for contract verification." -ForegroundColor Red
        return
    }
    
    Write-Host "Verifying contract $ContractAddress ($ContractName) on $Network..."
    
    if ($Args -ne "") {
        npm run verify:$Network -- --address $ContractAddress --contract "$ContractName.sol:$ContractName" --args $Args
    } else {
        npm run verify:$Network -- --address $ContractAddress --contract "$ContractName.sol:$ContractName"
    }
}

function Check-Environment {
    Write-Host "Checking environment variables..."
    
    $envFile = ".\.env"
    if (-not (Test-Path $envFile)) {
        Write-Host "Error: .env file not found. Run 'env:setup' to create one." -ForegroundColor Red
        return
    }
    
    $envContent = Get-Content $envFile
    $requiredVars = @(
        "VITE_ALCHEMY_ID",
        "VITE_WALLET_CONNECT_ID",
        "VITE_INFURA_IPFS_PROJECT_ID",
        "VITE_INFURA_IPFS_PROJECT_SECRET",
        "VITE_BICONOMY_API_KEY"
    )
    
    $missingVars = @()
    foreach ($var in $requiredVars) {
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
    } else {
        Write-Host "All required environment variables are set." -ForegroundColor Green
    }
}

function Setup-Environment {
    Write-Host "Setting up environment..."
    
    $envExample = ".\.env.example"
    $envFile = ".\.env"
    
    if (-not (Test-Path $envExample)) {
        Write-Host "Error: .env.example file not found." -ForegroundColor Red
        return
    }
    
    if (Test-Path $envFile) {
        $confirmation = Read-Host "The .env file already exists. Do you want to overwrite it? (y/n)"
        if ($confirmation -ne "y") {
            Write-Host "Operation cancelled." -ForegroundColor Yellow
            return
        }
    }
    
    Copy-Item $envExample $envFile
    Write-Host ".env file created from .env.example. Please edit it with your actual values." -ForegroundColor Green
}

# Main script
switch ($Command) {
    "help" { Show-Help }
    "dev" { Start-Development }
    "build" { Build-Project }
    "deploy:mumbai" { Deploy-Contract -Network "mumbai" }
    "deploy:polygon" { Deploy-Contract -Network "polygon" }
    "verify:mumbai" { 
        if ($args.Count -gt 0) {
            Verify-Contract -Network "mumbai" -ContractAddress $args[0]
        } else {
            Write-Host "Error: Contract address is required." -ForegroundColor Red
        }
    }
    "test:mumbai" { Test-Contracts -Network "mumbai" }
    "test:polygon" { Test-Contracts -Network "polygon" }
    "biconomy:setup" { Setup-Biconomy }
    "verify:polygon" { 
        if ($args.Count -gt 0) {
            Verify-Contract -Network "polygon" -ContractAddress $args[0]
        } else {
            Write-Host "Error: Contract address is required." -ForegroundColor Red
        }
    }
    "env:check" { Check-Environment }
    "env:setup" { Setup-Environment }
    default { 
        Write-Host "Unknown command: $Command" -ForegroundColor Red
        Show-Help 
    }
}
