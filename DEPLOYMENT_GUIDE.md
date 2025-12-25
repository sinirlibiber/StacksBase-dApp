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
