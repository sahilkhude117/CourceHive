# 🚀 Course Selling Platform

## 📋 Overview

A modern, full-stack course selling web application built with:
- Next.js
- Prisma ORM
- NextAuth.js
- Razorpay Payment Integration
- Tailwind CSS

## 🛠 Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- PostgreSQL or MySQL database

## 📦 Local Setup

### 1. Clone the Repository
```bash
git clone https://github.com/sahilkhude117/CourceHive.git
cd CourceHive
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Environment Configuration
Copy the example environment file:
```bash
cp .env.example .env
```

#### Required Environment Variables
- `DATABASE_URL`: Your database connection string
- `NEXTAUTH_SECRET`: Random secret for NextAuth
- `NEXTAUTH_URL`: Your production/local url
- `RAZORPAY_KEY_ID`: Razorpay API Key
- `RAZORPAY_SECRET_KEY`: Razorpay Secret Key
- `NEXT_PUBLIC_RAZORPAY_KEY`: Razorpay API Key

### 4. Database Setup with Prisma
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev


### 5. Run Development Server
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔐 Authentication

- Uses NextAuth.js with credentials provider
- Implements secure JWT-based authentication
- Custom sign-in page with error handling

## 💳 Payment Integration

- Razorpay payment gateway
- Secure payment verification
- Automatic Telegram group access post-payment

## 🚀 Deployment

### Vercel Deployment
1. Fork the repository
2. Connect to Vercel
3. Set environment variables in Vercel dashboard

### Database
- Use managed PostgreSQL services like Supabase or Neon
- Ensure `DATABASE_URL` is updated in deployment environment

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
