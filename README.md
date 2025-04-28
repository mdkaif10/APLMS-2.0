# APLMS (Automated Parking Lot Management System)

## Project Overview
APLMS is a modern web application designed to help users find and reserve parking spots easily. It's a full-stack application that provides a seamless parking management solution with features like spot searching, booking, and payment processing.

## Tech Stack

### Frontend:
- **Framework**: Next.js 14 (React-based framework)
- **Language**: TypeScript
- **Styling**: 
  - Tailwind CSS
  - Radix UI components
  - Custom UI components
- **State Management**: Zustand
- **Form Handling**: React Hook Form with Zod validation

### Backend:
- **Runtime**: Node.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Clerk
- **Payment Processing**: Stripe
- **Email Service**: Resend
- **Maps Integration**: Google Maps API

## Key Features

1. **User Authentication**
   - Sign up/Sign in functionality
   - Profile management
   - Guest access for basic features

2. **Parking Spot Search**
   - Location-based search
   - Date and time selection
   - Real-time availability checking
   - Interactive map integration

3. **Booking System**
   - Advance booking capability
   - Flexible time slot selection
   - Booking management
   - Booking history

4. **Payment Integration**
   - Secure payment processing via Stripe
   - Multiple payment methods
   - Transaction history

5. **Admin Dashboard**
   - Parking spot management
   - User management
   - Booking oversight
   - Analytics and reporting

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── dashboard/         # Admin dashboard
│   ├── guest/            # Guest user features
│   ├── profile/          # User profile
│   ├── settings/         # User settings
│   └── sign-in/          # Authentication
├── components/            # Reusable UI components
├── lib/                   # Utility functions
├── prisma/               # Database schema
├── public/               # Static assets
└── types/                # TypeScript type definitions
```

## Configuration Requirements

To run the project, you need to set up the following environment variables:

1. **Google Maps API**
   - `NEXT_PUBLIC_MAPS_API_KEY`

2. **MongoDB**
   - `MONGODB_URI`

3. **Stripe**
   - `NEXT_PUBLIC_STRIPE_APPLICATION_ID`
   - `STRIPE_SECRET_KEY`

4. **Email Service**
   - `RESEND_API_KEY`

5. **Authentication**
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - `NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in`
   - `NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up`

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Access the application at `http://localhost:3000`

## Deployment
The project is configured for deployment on Vercel with:
- Automatic builds
- Environment variable management
- Serverless functions
- Edge functions support

## Security Features
- Secure authentication with Clerk
- Protected API routes
- Secure payment processing
- Environment variable protection
- Input validation with Zod

## Development Guidelines
1. Use TypeScript for type safety
2. Follow the established component structure
3. Implement proper error handling
4. Use the provided UI components
5. Follow the established routing patterns

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [MongoDB Documentation](https://www.mongodb.com/docs)
- [Google Maps Platform](https://developers.google.com/maps)

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is licensed under the MIT License - see the LICENSE file for details.
