# Nepali Fashion E-commerce Platform

A modern, fully responsive e-commerce platform for Nepali fashion products. Built with React, TypeScript, Redux Toolkit, and Tailwind CSS.

## Features

- 🛍️ Browse and search products by category
- 🔍 Advanced filtering and sorting options
- 🛒 Shopping cart with size and color selection
- 💝 Wishlist functionality
- 🌙 Dark mode support
- 📱 Fully responsive design
- 🔐 Role-based access control
- 🔒 Secure authentication with Google OAuth
- 💳 Payment integration with eSewa
- 📦 Order tracking
- 📊 Store dashboard for sellers
- 👤 User profile management

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Authentication**: Google OAuth
- **Payment Gateway**: eSewa
- **Form Handling**: React Hook Form
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **Build Tool**: Vite

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/nepali-fashion-ecommerce.git
   cd nepali-fashion-ecommerce
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:3000/api
   VITE_GOOGLE_CLIENT_ID=your_google_client_id
   VITE_ESEWA_MERCHANT_ID=your_esewa_merchant_id
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── components/         # Reusable UI components
├── hooks/             # Custom React hooks
├── layouts/           # Page layout components
├── pages/            # Route components
├── services/         # API services
├── store/            # Redux store and slices
├── types/            # TypeScript type definitions
└── utils/            # Helper functions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm test` - Run tests

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Tailwind CSS](https://tailwindcss.com)
- [Headless UI](https://headlessui.dev)
- [Hero Icons](https://heroicons.com)
- [Google Fonts](https://fonts.google.com)
