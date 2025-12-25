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
# 🚀 StacksBase Deployment Guide

Complete step-by-step guide to deploy your StacksBase dApp to production.

## 📋 Prerequisites

- [ ] Stacks wallet (Hiro, Xverse, or Leather)
- [ ] STX tokens for contract deployment (minimum ~5 STX for mainnet fees)
- [ ] GitHub account
- [ ] Vercel account (free tier works)

## 🔧 Step 1: Smart Contract Deployment

### Option A: Using Hiro Platform (Recommended)

1. **Visit Hiro Platform**
   - Go to [https://platform.hiro.so](https://platform.hiro.so)
   - Click "Sign in" and connect your Stacks wallet

2. **Deploy Contract**
   - Click "Deploy a contract"
   - Select "Mainnet" network
   - Upload `contracts/stacksbase-token.clar`
   - Contract name: `stacksbase-token`
   - Click "Deploy"
   - Confirm transaction in your wallet (~0.5 STX fee)

3. **Save Contract Details**
   - Wait for confirmation (2-3 blocks, ~20-30 minutes)
   - Copy your contract address (format: `SP...`)
   - Save the full contract identifier: `YOUR_ADDRESS.stacksbase-token`

### Option B: Using Clarinet CLI

```bash
# Install Clarinet
curl -L https://www.hiro.so/install-clarinet.sh | bash

# Initialize project
clarinet new stacksbase
cd stacksbase

# Add contract
cp ../contracts/stacksbase-token.clar contracts/

# Configure Clarinet.toml
# Add your wallet address and network settings

# Deploy to mainnet
clarinet deploy --mainnet
```

## ⚙️ Step 2: Update Configuration

1. **Update Contract Address**
   
   Edit `src/lib/stacks-config.ts`:
   ```typescript
   export const CONTRACT_ADDRESS = 'SP...' // Your deployed contract address
   export const CONTRACT_NAME = 'stacksbase-token'
   ```

2. **Update Metadata** (Optional)
   
   Edit `src/lib/appkit-config.ts`:
   ```typescript
   const metadata = {
     name: 'Your Project Name',
     description: 'Your description',
     url: 'https://your-domain.vercel.app',
     icons: ['https://your-logo-url.com/logo.png']
   }
   ```

3. **Commit Changes**
   ```bash
   git add .
   git commit -m "Update contract address for production"
   git push origin main
   ```

## 🌐 Step 3: Deploy Frontend to Vercel

### Method 1: Vercel Dashboard (Easiest)

1. **Connect GitHub**
   - Visit [https://vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Select your `stacksbase` repo

2. **Configure Build**
   - Framework Preset: `Next.js` (auto-detected)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
   - Install Command: `npm install` (default)

3. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (~2-3 minutes)
   - Get your production URL: `https://your-project.vercel.app`

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? stacksbase
# - Directory? ./
# - Override settings? No

# Production deployment
vercel --prod
```

## 🎯 Step 4: Test Your Deployment

1. **Connect Wallet**
   - Visit your production URL
   - Click "Connect Stacks Wallet"
   - Test social login
   - Test wallet connection

2. **Claim Tokens**
   - Click "Claim Tokens"
   - Confirm transaction
   - Wait for confirmation
   - Check balance updates

3. **Test Features**
   - [ ] Token claiming works
   - [ ] Balance displays correctly
   - [ ] Transfer function works
   - [ ] Leaderboard loads
   - [ ] Social sharing works
   - [ ] Mobile responsive

## 📊 Step 5: Analytics & Monitoring

### Set up Vercel Analytics

1. Go to your project on Vercel
2. Click "Analytics" tab
3. Enable "Web Analytics"

### Monitor Transactions

- Use Stacks Explorer: `https://explorer.stacks.co/address/YOUR_CONTRACT_ADDRESS`
- Track daily active users
- Monitor transaction volume

## 🎉 Step 6: Marketing & Growth

### 1. Twitter Launch Thread

```
🚀 Launching StacksBase on Stacks! 

Claim 1,000 free $SBASE tokens daily 🪙

✅ Social login (no wallet needed)
✅ Built on Bitcoin L2
✅ Zero fees to claim
✅ Instant transfers

Try it now: [YOUR_URL]

🧵 Why we built this...
```

### 2. Submit to Directories

- [ ] Stacks Ecosystem Directory
- [ ] Product Hunt
- [ ] Twitter crypto communities
- [ ] Reddit r/stacks
- [ ] Discord Stacks channels

### 3. Builder Challenge Submission

1. Go to Talent Protocol platform
2. Submit your project:
   - GitHub repo URL
   - Live demo URL
   - Project description
   - Screenshots/video
   - Explain AppKit integration
   - Show transaction activity

## 📈 Optimization Tips

### Performance

```bash
# Optimize images
npm install sharp

# Enable Vercel Speed Insights
# Dashboard → Your Project → Speed Insights → Enable
```

### SEO

- [x] Update meta tags in `layout.tsx`
- [ ] Add Open Graph images
- [ ] Submit sitemap to Google
- [ ] Add structured data

### User Retention

- [ ] Add daily claim streaks
- [ ] Implement referral system
- [ ] Create leaderboard rewards
- [ ] Add social challenges

## 🐛 Troubleshooting

### Contract not found

```
Error: Contract not found
```
**Solution**: Double check contract address in `stacks-config.ts`

### Transaction failing

```
Error: Insufficient funds
```
**Solution**: User needs STX for transaction fees (~0.002 STX)

### Cooldown error

```
Error: Cooldown not passed
```
**Solution**: Users can only claim once per 24 hours (144 blocks)

### Build errors

```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

## 📞 Support

If you encounter issues:

1. Check [Stacks Discord](https://discord.gg/stacks)
2. Review [Stacks Docs](https://docs.stacks.co)
3. Ask in Talent Protocol community
4. Open GitHub issue

## ✅ Post-Deployment Checklist

- [ ] Contract deployed to mainnet
- [ ] Contract address updated in code
- [ ] Frontend deployed to Vercel
- [ ] All features tested
- [ ] Twitter announcement posted
- [ ] Submitted to Builder Challenge
- [ ] Analytics enabled
- [ ] Monitoring set up
- [ ] Community engagement started

## 🏆 Maximize Your Score

**For Stacks Builder Challenges:**

1. **Code Quality** (30 points)
   - Clean architecture ✅
   - Proper error handling ✅
   - TypeScript types ✅

2. **User Experience** (25 points)
   - Easy onboarding ✅
   - Mobile responsive ✅
   - Social sharing ✅

3. **AppKit Integration** (25 points)
   - Social login ✅
   - Email login ✅
   - Multi-wallet support ✅

4. **Onchain Impact** (20 points)
   - Get users to claim! 🎯
   - Encourage social sharing 📱
   - Create viral loops 🔄

**Tips to increase transaction volume:**
- Tweet daily about new features
- Run Twitter giveaways
- Create claim challenges
- Partner with other Stacks projects
- Engage in Stacks Discord

---

**Need help?** Open an issue on GitHub or reach out on Twitter!

Good luck with your deployment! 🚀

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

- Twitter: [@angrypepp3r](https://twitter.com/angrypepp3r)
- GitHub: [@sinirlibiber](https://github.com/sinirlibiber)

---

**Built with ❤️ on Stacks - Secured by Bitcoin**
