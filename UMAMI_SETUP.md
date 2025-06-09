# Umami Analytics Setup Guide

## Quick Deploy Options

### 1. Deploy to Vercel (Easiest)
1. Go to https://github.com/umami-software/umami
2. Click "Deploy to Vercel" button
3. Create a PostgreSQL database on [Supabase](https://supabase.com) (free tier)
4. Add your database URL to Vercel environment variables
5. Deploy!

### 2. Deploy to Railway
1. Go to https://railway.app/new
2. Deploy from the Umami GitHub template
3. Railway will automatically provision a PostgreSQL database
4. Click "Deploy"

### 3. Self-Host on VPS
```bash
# Clone Umami
git clone https://github.com/umami-software/umami.git
cd umami

# Install dependencies
npm install

# Set up PostgreSQL database
createdb umami

# Run database migrations
npm run build-db

# Build the application
npm run build

# Start Umami
npm start
```

## Configuration

### 1. Update Analytics Scripts
Replace the placeholder values in both `index.html` and `scroll.html`:

```html
<!-- Replace YOUR-WEBSITE-ID and your-umami-instance.com -->
<script async defer data-website-id="YOUR-WEBSITE-ID" src="https://your-umami-instance.com/umami.js"></script>
```

### 2. Get Your Website ID
1. Log into your Umami dashboard
2. Click "Settings" → "Websites"
3. Add GitScrolls website
4. Copy the website ID

### 3. Default Login
- Username: `admin`
- Password: `umami`
- **Change this immediately!**

## What's Being Tracked

### Scroll Pages
- Page views with scroll number and title
- Scroll depth milestones (25%, 50%, 75%, 90%, 100%)
- Time to reach each milestone
- Total time on page
- Completion rate (90%+ = completed)
- Social share clicks
- Navigation between scrolls
- Performance metrics

### Homepage
- Scroll card clicks
- CTA button clicks

## Privacy Features
- No cookies used
- No personal data collected
- GDPR compliant
- Visitors can opt-out
- Data stays on your server

## Viewing Analytics

Once set up, you can view:
- Real-time visitors
- Page views by scroll
- Scroll completion rates
- Average time per scroll
- Social sharing stats
- Performance metrics
- User flow between scrolls

## Troubleshooting

### Analytics not showing?
1. Check browser console for errors
2. Verify website ID is correct
3. Check if umami.js loads successfully
4. Ensure your Umami instance is running

### Database issues?
1. Check database connection string
2. Run migrations: `npm run build-db`
3. Check PostgreSQL logs

## Alternative: Development Mode

If you want to test without setting up Umami:
- All analytics events are logged to browser console
- Open DevTools to see tracked events
- Format: `Analytics Event: [event_name] {data}`