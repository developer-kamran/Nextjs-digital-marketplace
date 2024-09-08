# Digital Marketplace

Welcome to the Digital Marketplace! This application allows users to purchase digital products seamlessly. It features a Stripe checkout process, order tracking via email, and a comprehensive admin dashboard for managing products, sales, and customer analytics.

## Features

- **Purchase Digital Products**: Users can browse and purchase digital products.
- **Stripe Checkout Integration**: Redirects to Stripe's checkout page for secure payments.
- **Custom Success Page**: After a successful payment, users are directed to a custom success page with product details and download links.
- **Order Confirmation Email**: Users receive an email with order information and download links.
- **My Orders Page**: Users can enter their email to receive a summary of their orders with download links.
- **Admin Dashboard**: Includes pages for products analytics, sales analytics, and customer data.
  - **Products Page**: Admins can add, edit, (activate or deactivate), and products.
  - **Sales Page**: View sales data and analytics.
  - **Customer Page**: View customer data and analytics.

## Tech Stack

- **Frontend**: Next.js (v14), TailwindCSS
- **Backend**: Prisma, MongoDB
- **Payment Gateway**: Stripe
- **Email Service**: Resend

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/developer-kamran/Nextjs-digital-marketplace.git
   
2. Navigate to the project directory:

   ```bash
   cd digital-marketplace

3. Install the dependencies:

   ```bash
   npm install

4. Create a .env file in the root directory and add the following environment variables:

   ```bash
   DATABASE_URL=your_mongodb_uri
   ADMIN_USERNAME=admin
   HASHED_ADMIN_PASSWORD=f89Lo5HEh4Tt3lmYidbj8eR6J9s27MBQzJLyWb+sOK+tLGihroBNdwdej7ciUD8+yissEAbub2x7dijLRf/9HQ==
   STRIPE_SECRET_KEY=your_stripe_secret_key
   RESEND_API_KEY=your_resend_api_key
   SENDER_EMAIL=onboarding@resend.dev
   NEXT_PUBLIC_SERVER_URL=http://localhost:3000
   NEXT_PUBLIC_STRIPE_PUBLIC_KEY=your_stripe_publishable_key

5. Run database migrations to set up your database schema:

   ```bash
   npx prisma migrate dev

6. Run the development server:

   ```bash
   npm run dev
