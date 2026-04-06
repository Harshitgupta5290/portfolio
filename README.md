# Harshit Gupta — Developer Portfolio

<p align="center">
  <strong>A modern, responsive portfolio built with Next.js, React, and Tailwind CSS</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" alt="Next.js 14">
  <img src="https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react" alt="React 18">
  <img src="https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS 3">
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="MIT License">
</p>

<p align="center">
  <img src="https://img.shields.io/github/stars/Harshitgupta5290/my-portfolio?style=social" alt="GitHub Stars">
  <img src="https://img.shields.io/github/forks/Harshitgupta5290/my-portfolio?style=social" alt="GitHub Forks">
  <img src="https://img.shields.io/github/issues/Harshitgupta5290/my-portfolio" alt="GitHub Issues">
</p>

---

## Demo

<p align="center">
  <a href="https://harshitgupta5290.github.io/portfolio" target="_blank">
    <strong>View Live Site</strong>
  </a>
</p>

---

## Sections

| Section | Description |
|---|---|
| Hero | Animated introduction with call-to-action |
| About | Personal bio and summary |
| Experience | Work history and accomplishments |
| Skills | Tech skills with animated marquee |
| Projects | Showcase of projects with links |
| Education | Academic background and certifications |
| Blog | Latest articles auto-fetched from dev.to |
| Contact | Contact form with email notifications |

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | 14 | React framework with App Router |
| **React** | 18 | UI library |
| **Tailwind CSS** | 3 | Utility-first CSS |
| **SASS** | Latest | CSS preprocessor |
| **Lottie React** | Latest | Lightweight animations |
| **Nodemailer** | Latest | Email notifications |
| **Axios** | Latest | HTTP client |
| **EmailJS** | Latest | Client-side email service |
| **React Icons** | Latest | Icon library |
| **React Toastify** | Latest | Toast notifications |

---

## Getting Started

### Prerequisites

- **Node.js** v18.17+ — [Download](https://nodejs.org/en/download/)
- **Git** — [Download](https://git-scm.com/downloads)

### 1. Clone the Repository

```bash
git clone https://github.com/Harshitgupta5290/my-portfolio.git
cd my-portfolio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```env
# Google Tag Manager (optional)
NEXT_PUBLIC_GTM=GTM-XXXXXXX

# Your deployed app URL
NEXT_PUBLIC_APP_URL=https://harshitgupta5290.github.io/portfolio/

# Gmail (for contact form)
GMAIL_PASSKEY=your_gmail_app_password
EMAIL_ADDRESS=your_email@gmail.com

# Telegram (for contact form notifications)
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
```

### 4. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Customization

All portfolio content lives in the `utils/data/` folder. Edit these files to make it your own:

| File | What it controls |
|---|---|
| `personal-data.js` | Name, bio, links, contact info |
| `experience.js` | Work history |
| `projects-data.js` | Projects showcase |
| `skills.js` | Technical skills |
| `educations.js` | Education & certifications |
| `contactsData.js` | Contact form config |

### Personal Info (`utils/data/personal-data.js`)

```javascript
export const personalData = {
  name: "YOUR NAME",
  profile: "/profile.png",
  designation: "Software Developer",
  description: "Your bio...",
  email: "your.email@example.com",
  phone: "+1234567890",
  address: "City, Country",
  github: "https://github.com/yourusername",
  linkedIn: "https://www.linkedin.com/in/yourprofile",
  twitter: "https://twitter.com/yourusername",
  devUsername: "yourusername", // for dev.to blog integration
  resume: "https://link-to-your-resume.pdf",
};
```

### Profile Image

Place your profile picture in the `public/` directory and update the `profile` field:

```javascript
profile: "/your-image.png"
```

---

## Deployment

### GitHub Pages (current setup)

This repo is configured for GitHub Pages via GitHub Actions. Every push to `main` automatically builds and deploys the site.

**To enable on your fork:**
1. Go to your repo → **Settings → Pages**
2. Set Source to **`gh-pages` branch**
3. Push to `main` — the workflow handles the rest

### Vercel (alternative)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Harshitgupta5290/my-portfolio)

---

## Tutorials

### Gmail App Password Setup

1. Go to [myaccount.google.com](https://myaccount.google.com/)
2. **Security → 2-Step Verification** (enable if not already)
3. **Security → App Passwords**
4. Select app: **Mail**, device: **Other**
5. Copy the 16-character password and add to `.env`:

```env
GMAIL_PASSKEY=abcd efgh ijkl mnop
EMAIL_ADDRESS=your.email@gmail.com
```

### Telegram Bot Setup

1. Open Telegram → search `@BotFather`
2. Send `/newbot` and follow prompts
3. Copy the bot token
4. Send your bot a message, then get your chat ID from:
   `https://api.telegram.org/bot<BOT_TOKEN>/getUpdates`
5. Add to `.env`:

```env
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHI...
TELEGRAM_CHAT_ID=123456789
```

### Blog Integration (dev.to)

Set your dev.to username in `utils/data/personal-data.js`:

```javascript
devUsername: "yourusername",
```

Your latest public articles are fetched automatically — no API key needed.

---

## Troubleshooting

**Dependencies error:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Environment variables not working:**
- Make sure `.env` is in the root directory
- Restart the dev server after changes
- Client-side vars must start with `NEXT_PUBLIC_`

**Images not loading:**
- Place images in the `public/` folder
- Reference them with a leading `/` (e.g., `/profile.png`)

**Contact form not sending:**
- Double-check Gmail App Password (16 chars, no spaces)
- Confirm 2-Step Verification is enabled on your Google account

---

## Contributing

1. Fork the repository
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit: `git commit -m 'Add your feature'`
4. Push: `git push origin feature/your-feature`
5. Open a Pull Request

---

## License

Licensed under the [MIT License](LICENSE).
