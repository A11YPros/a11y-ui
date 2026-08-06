# Deployment Guide for ui.a11ypros.com

This guide covers deploying the component library and Storybook to Netlify at `ui.a11ypros.com`.

## What's Configured

✅ **Netlify Configuration** (`netlify.toml`)

- Builds Storybook and Next.js app
- Serves Storybook at `/storybook`

✅ **Next.js Static Export**

- Configured for static site generation
- Outputs to `apps/web/out`

✅ **Storybook Build**

- Builds to `apps/web/public/storybook-static`
- Accessible at `ui.a11ypros.com/storybook`

## Deployment Steps

### 1. Connect Repository to Netlify

1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect your Git provider and select this repository

### 2. Configure Build Settings

Netlify should auto-detect `netlify.toml`, but verify:

- **Base directory:** `.` (root)
- **Build command:** `npm install && npm run build-storybook && npm run build --workspace=apps/web`
- **Publish directory:** `apps/web/out`

### 3. Configure Custom Domain

1. Go to **Site settings → Domain management**
2. Click "Add custom domain"
3. Enter `ui.a11ypros.com`
4. Follow Netlify's DNS instructions:
   - Add a **CNAME** record at your domain provider:
     ```
     Type: CNAME
     Name: ui
     Value: [your-netlify-site-name].netlify.app
     ```
5. Wait for DNS propagation (5-60 minutes)

### 4. Deploy

- Netlify will automatically deploy on every push to your main branch
- Or click "Deploy site" to deploy manually

## URLs After Deployment

- **Main App:** `https://ui.a11ypros.com`
- **Storybook:** `https://ui.a11ypros.com/storybook`

## How It Works

1. **Build Process:**
   - Installs dependencies
   - Builds Storybook → `apps/web/public/storybook-static`
   - Builds Next.js app → `apps/web/out` (includes Storybook from public/)

2. **Routing:**
   - `/storybook/*` → Served from `/storybook-static/*`
   - `/*` → Next.js SPA routes

## Troubleshooting

### Build Fails

- Check Node.js version (should be 18+)
- Verify all dependencies are in `package.json`
- Check build logs in Netlify dashboard

### Storybook Not Loading

- Verify Storybook build completed successfully
- Check that `apps/web/public/storybook-static` exists
- Verify redirect rules in `netlify.toml`

### DNS Issues

- Wait for DNS propagation (can take up to 48 hours, usually 5-60 minutes)
- Verify CNAME record is correct
- Check DNS propagation with `dig ui.a11ypros.com`

## Local Testing

Test the build locally before deploying:

```bash
# Install dependencies
npm install

# Build Storybook
npm run build-storybook

# Build Next.js app
npm run build --workspace=apps/web

# Test locally (optional)
npx serve apps/web/out
```

Visit `http://localhost:3000` for the app and `http://localhost:3000/storybook` for Storybook.

## File Structure

```
├── netlify.toml              # Netlify configuration
├── apps/
│   └── web/
│       ├── public/
│       │   └── storybook-static/  # Storybook build output
│       └── out/                  # Next.js build output
└── package.json              # Root dependencies
```

## Notes

- The Next.js app uses static export, so no server-side features
- There are no API routes or serverless functions; the site is fully static
- Storybook is served as static files alongside the app
- All routes are client-side (SPA mode)
