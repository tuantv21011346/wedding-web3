### Deployment

#### Smart Contracts

To deploy the smart contracts:

```bash
# Deploy to Mumbai Testnet
npm run deploy:mumbai

# Deploy to Polygon Mainnet
npm run deploy:polygon
```

#### Frontend

The frontend is automatically deployed via GitHub Actions when pushing to the main branch. 
You can also deploy manually:

```bash
npm run build
```

Then deploy the `dist` folder to your preferred hosting service.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [RainbowKit](https://www.rainbowkit.com/) for wallet connection UI
- [Biconomy](https://www.biconomy.io/) for gasless transactions
- [Polygon](https://polygon.technology/) for the scalable blockchain platform
- [IPFS](https://ipfs.tech/) via [Infura](https://infura.io/) for decentralized storage
