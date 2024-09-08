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
   git clone https://github.com/your-username/digital-marketplace.git
