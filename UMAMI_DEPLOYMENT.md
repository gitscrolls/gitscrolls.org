# Umami Analytics Deployment Guide

Since GitScrolls is deployed on GitHub Pages, you'll need to deploy Umami separately. Here are your options:

## Option 1: Railway (Recommended - Easy & Free Tier)
1. Go to [Railway](https://railway.app/)
2. Click "Deploy a Template"
3. Search for "Umami"
4. Click Deploy
5. Railway will automatically:
   - Set up PostgreSQL database
   - Deploy Umami
   - Provide you with a URL
6. Access your Umami instance at the provided URL
7. Default login: `admin` / `umami`
8. Create a new website entry for gitscrolls.org
9. Copy the website ID

## Option 2: Vercel + Supabase (Free)
1. Fork [umami repo](https://github.com/umami-software/umami)
2. Create free [Supabase](https://supabase.com/) database
3. Deploy to Vercel:
   ```bash
   npx vercel --env DATABASE_URL="your-supabase-url"
   ```
4. Set up your website in Umami dashboard

## Option 3: Self-Hosted VPS
```bash
# On a VPS (DigitalOcean, Linode, etc.)
git clone https://github.com/umami-software/umami.git
cd umami
docker-compose up -d
```

## Option 4: Render.com (Free with limitations)
1. Create account at [Render](https://render.com/)
2. New > Web Service
3. Connect GitHub and select umami repo
4. Environment: Docker
5. Add PostgreSQL database
6. Deploy

## Configuring GitScrolls

Once Umami is deployed:

1. Log into Umami dashboard
2. Add website: `gitscrolls.org`
3. Copy the website ID (looks like: `a6d4f3c2-8b9e-4f1a-b3c7-d9e2f5a7c3e1`)
4. Update `index.html` line 19:
   ```html
   <script async defer 
           data-website-id="YOUR-WEBSITE-ID-HERE" 
           src="https://your-umami-instance.com/script.js"></script>
   ```
5. Update `scroll.html` similarly

## Privacy-Friendly Features
- No cookies required
- GDPR compliant by default
- Respects Do Not Track
- Anonymous visitor tracking
- Open source & self-hosted

## Monitoring
The following events are already tracked in the code:
- Page views (automatic)
- Theme changes
- Scroll navigation
- Share button clicks
- Reading progress
- Search usage
- Error states
- Mobile menu usage