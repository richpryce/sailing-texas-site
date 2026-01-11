# Sailing Texas - 11ty Website

A modern rebuild of the Sailing Texas website using [Eleventy (11ty)](https://www.11ty.dev/).

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

The development server will start at `http://localhost:8080`

## 📁 Project Structure

```
sailing-texas-11ty/
├── .eleventy.js           # 11ty configuration
├── package.json
├── src/
│   ├── _data/             # Global data files
│   │   ├── site.json      # Site metadata
│   │   └── navigation.json # Navigation links
│   ├── _includes/         # Layouts & partials
│   │   ├── layouts/
│   │   │   ├── base.njk   # Base HTML template
│   │   │   ├── home.njk   # Homepage layout
│   │   │   └── boat.njk   # Boat listing layout
│   │   └── partials/
│   │       ├── header.njk
│   │       ├── footer.njk
│   │       └── boat-card.njk
│   ├── assets/
│   │   ├── css/
│   │   │   └── main.css
│   │   ├── js/
│   │   │   └── main.js
│   │   └── images/
│   ├── boats/             # Boat listing pages (Markdown)
│   ├── articles/          # Article pages
│   ├── lakes/             # Texas lakes info
│   └── index.njk          # Homepage
└── _site/                 # Output (generated)
```

## 📝 Adding New Boat Listings

### Quick Start

1. **Copy the template:**
   ```bash
   cp src/boats/_template.md src/boats/your-boat-name.md
   ```

2. **Edit the new file:**
   - Fill in all the frontmatter fields (title, price, location, etc.)
   - Add your boat description in Markdown
   - Remove the comment lines (#) from fields you're using

3. **Add images:**
   - Copy photos to `src/assets/images/boats/`
   - Update the `images:` list in your file

4. **Preview & publish:**
   ```bash
   npm start    # Preview at http://localhost:3000
   npm run build  # Build for production
   ```

### Template Reference

See `src/boats/_template.md` for a fully documented template with all available fields.

### Frontmatter Fields

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | Boat title, e.g., "Catalina 25, 2020" |
| `date` | Yes | Listing date (YYYY-MM-DD) |
| `year` | Yes | Year built |
| `make` | Yes | Manufacturer |
| `model` | Yes | Model name |
| `price` | No | Price in USD (omit for "Contact for price") |
| `status` | Yes | `active`, `sold`, or `pending` |
| `location` | Yes | Where the boat is located |
| `images` | Yes | Array of image paths |
| `features` | No | Array of features/equipment |
| `contactEmail` | No | Seller email |
| `contactPhone` | No | Seller phone |
| `tags` | No | Array of tags for filtering |

## 🎨 Customization

### Colors
Edit CSS custom properties in `src/assets/css/main.css`:

```css
:root {
  --color-ocean-deep: #0a2540;
  --color-sunset-gold: #f4a926;
  /* ... */
}
```

### Navigation
Edit `src/_data/navigation.json` to update menu items.

### Site Info
Edit `src/_data/site.json` to update site metadata.

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start dev server with hot reload |
| `npm run build` | Build for production |
| `npm run clean` | Remove `_site` directory |
| `npm run debug` | Build with debug output |

## 🚀 Deployment

### Cloudflare Pages (Recommended)

**Important:** For static sites like 11ty, use **Cloudflare Pages**, not Workers.

#### Option 1: Via Cloudflare Dashboard (Easiest)

1. **Push your code to GitHub:**
   ```bash
   git push origin main
   ```

2. **Connect to Cloudflare Pages:**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
   - Navigate to **Pages** → **Create a project**
   - Connect your GitHub repository
   - Configure build settings:
     - **Build command:** `npm run build`
     - **Build output directory:** `_site`
     - **Root directory:** `/` (or leave empty)
   - Click **Save and Deploy**

3. **Your site will be live** at `your-project.pages.dev`

#### Option 2: Via Wrangler CLI

```bash
# Install Wrangler (if not already installed)
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Build your site first
npm run build

# Deploy to Pages
wrangler pages deploy _site --project-name=sailing-texas-site
```

**Note:** Use `wrangler pages deploy`, NOT `wrangler deploy` (which is for Workers).

### Other Hosting Options

- **Netlify:** Connect GitHub repo, set build command: `npm run build`, publish: `_site`
- **Vercel:** Connect GitHub repo, framework preset: Other, build command: `npm run build`, output: `_site`
- **GitHub Pages:** Use GitHub Actions to build and deploy

## 📦 Migrating Legacy Content

To migrate boat listings from the legacy site:

1. Extract boat data from HTML files
2. Create Markdown files with appropriate frontmatter
3. Copy images to `src/assets/images/boats/`
4. Update image paths in frontmatter

## 🔧 Tech Stack

- **Static Site Generator**: [Eleventy (11ty)](https://www.11ty.dev/)
- **Template Engine**: [Nunjucks](https://mozilla.github.io/nunjucks/)
- **Styling**: Custom CSS with CSS Variables
- **Fonts**: Playfair Display, Outfit (Google Fonts)

## 📄 License

Copyright © 2003-present Sailing Texas. All rights reserved..
