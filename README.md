# Wedding Web3 - Đám Cưới Trên Blockchain

Modern wedding website with Web3 integration on Polygon network, allowing guests to send wishes that are stored permanently on blockchain through gasless transactions.

## Features

- **Modern, responsive design** built with React, Tailwind CSS, and Framer Motion
- **Web3 integration** with RainbowKit for easy wallet connection
- **Gasless transactions** using Biconomy for sending wishes (wedding couple pays the gas fees)
- **Permanent storage** of wishes on the Polygon blockchain
- **IPFS integration** for decentralized image storage
- **Multi-language support** (Vietnamese and English)
- **Progressive Web App** capabilities

## Pages

- **Home** - Landing page with countdown timer and key information
- **Couple** - Introduction to the bride and groom
- **Gallery** - Wedding photo album with lightbox viewer
- **Schedule** - Timeline of wedding events
- **Location** - Map directions to the venue
- **Wishes** - Guest book for sending and viewing wishes on blockchain
- **Guestbook** - Traditional guestbook for those who prefer not to use blockchain

## Technology Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS, Framer Motion
- **Web3**: Wagmi, RainbowKit, Ethers.js, Biconomy SDK
- **Storage**: IPFS via Infura
- **Blockchain**: Polygon (Mumbai testnet and Mainnet)
- **Deployment**: Netlify/Vercel with GitHub Actions

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn
- A wallet with MATIC tokens for deployment

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/wedding-web3.git
cd wedding-web3
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file based on `.env.example`
```bash
cp .env.example .env
```

4. Fill in your environment variables in `.env`

5. Start the development server
```bash
npm run dev
```
```
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
