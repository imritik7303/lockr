## ✨ Features

- ⚡ **Better Auth** integration (secure, modern auth flows)  
- 🔑 **Email + Password authentication**  
- 🌍 **OAuth support** (Google, GitHub, etc.)  
- 🍪 Secure **session management** with cookies  
- 🛡️ Middleware-based route protection  
- 🔐 Configurable session expiration  
- 🧑‍💻 Developer-friendly APIs for signup, login, logout  
- 🛠️ Built with **Next.js (App Router)** + **TypeScript**  
- 📦 Bun support for faster installs & builds

  
## Getting Started

1. Clone the repo

```bash
git clone https://github.com/imritik7303/lockr.git
cd lockr
```

2. Install dependencies
   
```bash
bun install
# or
npm install
```

3. Set up environment variables
   
Copy the sample file:
 ```bash
cp .env.sample .env
```
Fill in the required values:
```bash
# Core config
DATABASE_URL="postgresql://..."
AUTH_SECRET="your-secret-key"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# OAuth (example for Google & GitHub)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
```

4. Run the dev server
```bash
bun dev
# or
npm run dev
```

Visit 👉 http://localhost:3000.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
