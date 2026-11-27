# 💰 ExpenseTracker AI

A modern, AI-powered expense tracking web application built with Next.js 15, featuring intelligent categorization, real-time analytics, and personalized financial insights.

![ExpenseTracker AI](https://img.shields.io/badge/Next.js-15.3.5-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🤖 AI-Powered Intelligence

- **Smart Categorization**: AI automatically suggests expense categories based on descriptions
- **Financial Insights**: Personalized recommendations and spending pattern analysis
- **Interactive AI Chat**: Get detailed explanations and advice for any insight

### 💼 Core Functionality

- **Expense Tracking**: Add, edit, and delete expenses with ease
- **Real-time Charts**: Beautiful visualizations using Chart.js
- **Statistics Dashboard**: Comprehensive spending analytics
- **Expense History**: Complete transaction history with search and filter

### 🎨 Modern UI/UX

- **Light & Dark Mode**: Seamless theme switching with smooth transitions
- **Fully Responsive**: Optimized for all screen sizes
- **Beautiful Animations**: Smooth interactions and hover effects
- **Gradient Designs**: Modern card layouts with backdrop blur effects

### 🖥️ Local Mode

- **No sign-in required**: Opens directly to a single local expense dashboard
- **Local data**: Expenses are stored in your local MongoDB database
- **Local-only use**: There is no authentication or per-user data isolation

## 🛠️ Tech Stack

### Frontend

- **[Next.js 15](https://nextjs.org)** - React framework with App Router
- **[React 19](https://react.dev)** - Latest React with concurrent features
- **[TypeScript](https://typescriptlang.org)** - Type-safe development
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS framework
- **[Chart.js](https://chartjs.org)** - Beautiful charts and visualizations

### Backend & Database

- **MongoDB** - Local database for expense records
- **MongoDB Node.js Driver** - Direct local database access
- **Server Actions** - Direct server functions in Next.js

### Optional AI

- **[Gemini API](https://aistudio.google.com/apikey)** - Optional API key for AI categorization and insights
- **OpenAI Compatible API** - Used for intelligent expense categorization

### Deployment

- **[Vercel](https://vercel.com)** - Serverless deployment platform

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm
- MongoDB Community Server running locally on port 27017

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/sahandghavidel/next-expense-tracker-ai.git
   cd next-expense-tracker-ai
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:

   ```env
   # Local MongoDB
   DATABASE_URL="mongodb://127.0.0.1:27017/expense_tracker"

   # Optional: add later to enable AI features
   GEMINI_API_KEY=""

   # App URL
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 Database Schema

The application stores expenses in a local MongoDB collection:

- **Record**: Stores expense transactions with categories and amounts. All local records share one local user.

View the complete database diagram: [Eraser Diagram](https://app.eraser.io/workspace/XhlJP6Rdmx6nrGR0SpKz?origin=share)

## 🎯 Key Features Walkthrough

### 1. Smart Expense Adding

- Enter description, date, and amount
- Click the ✨ button for AI category suggestions
- Manual category selection from predefined options

### 2. AI Insights Dashboard

- Real-time spending pattern analysis
- Categorized insights: warnings, tips, success, info
- Interactive expandable AI explanations
- Confidence scores for each insight

### 3. Visual Analytics

- Interactive Chart.js charts
- Daily, weekly, and monthly views
- Color-coded spending categories
- Responsive design for all devices

### 4. Expense Management

- Complete transaction history
- Search and filter capabilities
- One-click expense deletion
- Real-time updates across all components

## 🌐 Deployment

### Deploy on Vercel (Recommended)

The default setup has no authentication and uses local MongoDB, so it is for local development only. Do not expose it publicly or deploy it as-is; configure authentication and a secured hosted database first.

1. **Connect your GitHub repository to Vercel**
2. **Add environment variables in Vercel dashboard**
3. **Deploy automatically on every push to main branch**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/sahandghavidel/next-expense-tracker-ai)

## 📎 Useful Links

- **[MongoDB Community Server](https://www.mongodb.com/try/download/community)** - Local database
- **[Gemini API key](https://aistudio.google.com/apikey)** - Optional AI features
- **[GitHub Repository](https://github.com/sahandghavidel/next-expense-tracker-ai)** - Source code
- **[Database Diagram](https://app.eraser.io/workspace/XhlJP6Rdmx6nrGR0SpKz?origin=share)** - Visual schema
- **[Next.js Documentation](https://nextjs.org)** - Framework docs
- **[Tailwind CSS](https://tailwindcss.com)** - Styling framework
- **[Vercel Platform](https://vercel.com)** - Deployment platform

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 💖 Support

If you find this project helpful, please give it a ⭐ on GitHub!

---

**Built with ❤️ by [Sahand Ghavidel](https://github.com/sahandghavidel)**

_Demonstrating modern full-stack development with AI integration, completely free to build and deploy._
