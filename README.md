# StacksBase - Free Token Faucet on Stacks

![StacksBase](https://img.shields.io/badge/Built%20on-Stacks-5546FF?style=for-the-badge)
![Bitcoin L2](https://img.shields.io/badge/Secured%20by-Bitcoin-F7931A?style=for-the-badge)

A community token distribution platform built for **Talent Protocol's Stacks Builder Challenges Week 3**. Users can claim free SBASE tokens daily using social login or Stacks wallets.

## 🚀 Features

- **🔐 Reown AppKit Integration**
  - Social login (Google, Twitter, GitHub, Discord)
  - Email login with embedded wallet
  - Multi-wallet support (Hiro, Xverse, Leather)
  - On-ramp and swap features

- **🪙 Token System**
  - Claim 1,000 SBASE tokens per day
  - SIP-010 compliant fungible token
  - Transfer tokens to any Stacks address
  - Real-time balance updates

- **📊 Leaderboard**
  - Track top claimers
  - Community statistics
  - Real-time rankings

- **🎯 Social Features**
  - One-click Twitter sharing
  - Viral growth mechanics
  - Referral tracking (coming soon)

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Blockchain**: Stacks blockchain (Bitcoin L2)
- **Smart Contract**: Clarity
- **Wallet**: Reown AppKit (WalletConnect)
- **State Management**: Wagmi, React Query

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/stacksbase.git
cd stacksbase

# Install dependencies
npm install
# or
pnpm install

# Run development server
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 🔧 Configuration

### 1. Update Contract Address

After deploying your Clarity contract to Stacks mainnet, update the contract address in `src/lib/stacks-config.ts`:

```typescript
export const CONTRACT_ADDRESS = 'YOUR_DEPLOYED_CONTRACT_ADDRESS'
export const CONTRACT_NAME = 'stacksbase-token'
```

### 2. WalletConnect Project ID

The project already includes the WalletConnect project ID. If you want to use your own:

1. Get a free project ID from [Reown Cloud](https://cloud.reown.com)
2. Update `src/lib/appkit-config.ts`:

```typescript
export const projectId = 'YOUR_PROJECT_ID'
```

## 📝 Smart Contract Deployment

### Deploy to Stacks Mainnet

1. **Using Hiro Platform** (Recommended)
   - Go to [Hiro Platform](https://platform.hiro.so)
   - Connect your wallet
   - Deploy `contracts/stacksbase-token.clar`
   - Copy the contract address

2. **Using Clarinet CLI**
   ```bash
   clarinet deploy --mainnet
   ```

3. Update the contract address in your config file

## 🌐 Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or use the Vercel dashboard:
1. Import your GitHub repository
2. Configure build settings (automatically detected)
3. Deploy

## 📚 Project Structure

```
stacksbase/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Home page
│   │   ├── leaderboard/page.tsx  # Leaderboard
│   │   └── api/                  # API routes
│   ├── components/
│   │   ├── ConnectButton.tsx     # Wallet connection
│   │   ├── MintTokens.tsx        # Token claiming
│   │   ├── TokenBalance.tsx      # Balance display
│   │   ├── TransferTokens.tsx    # Transfer interface
│   │   ├── SocialShare.tsx       # Sharing buttons
│   │   └── LeaderboardTable.tsx  # Rankings
│   ├── hooks/
│   │   ├── useStacksAccount.ts   # Wallet hook
│   │   └── useTokenContract.ts   # Contract hook
│   └── lib/
│       ├── appkit-config.ts      # AppKit setup
│       └── stacks-config.ts      # Stacks config
└── contracts/
    └── stacksbase-token.clar     # Smart contract
```

## 🎯 Stacks Builder Challenges Requirements

This project fulfills all Week 3 requirements:

- ✅ **Reown AppKit Integration**
  - Social/email login
  - Multi-chain support
  - On-ramp & swaps

- ✅ **Smart Contract**
  - Clarity contract deployed on mainnet
  - Real user interactions
  - Transaction fees generated

- ✅ **GitHub**
  - Public repository
  - Regular commits
  - Detailed README

- ✅ **User Experience**
  - Mobile responsive
  - Clean UI/UX
  - Social sharing

## 🏆 Scoring Strategy

**Target: Top 50 on leaderboard**

1. **Technical Quality** (40%)
   - Clean code architecture
   - Proper error handling
   - TypeScript types
   - Best practices

2. **User Engagement** (30%)
   - Social login ease
   - Claim mechanics
   - Sharing features
   - Mobile UX

3. **Onchain Impact** (30%)
   - Transaction volume
   - Unique users
   - Fee generation
   - Contract interactions

## 🚦 Getting Started Guide

### For Users

1. Visit [stacksbase.vercel.app](https://stacksbase.vercel.app)
2. Click "Connect Stacks Wallet"
3. Choose social login or wallet connection
4. Click "Claim Tokens"
5. Confirm transaction in wallet
6. Share on Twitter to help grow the community!

### For Developers

1. Fork this repository
2. Deploy your own contract
3. Update configuration
4. Deploy to Vercel
5. Share with the community

## 📖 Resources

- [Stacks Documentation](https://docs.stacks.co)
- [Clarity Language](https://docs.stacks.co/clarity/overview)
- [Reown AppKit Docs](https://docs.reown.com/appkit/overview)
- [Talent Protocol Challenges](https://talentprotocol.com)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project as a template for your own Stacks dApps!

## 🎉 Acknowledgments

- Built for Talent Protocol's Stacks Builder Challenges
- Powered by Stacks blockchain and Bitcoin
- UI components from shadcn/ui
- Wallet integration by Reown AppKit

## 📬 Contact

- Twitter: [@yourusername](https://twitter.com/angrypepp3r)
- GitHub: [@yourusername](https://github.com/sinirlibiber)

---

**Built with ❤️ on Stacks - Secured by Bitcoin**
