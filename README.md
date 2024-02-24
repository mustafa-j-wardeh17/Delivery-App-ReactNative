# React Native Delivery Application

Welcome to our React Native delivery application! This app allows users to order food, track deliveries, and manage their accounts seamlessly.

## Features

- **User Authentication**: Users can sign up, log in, and manage their profiles securely.
- **Order Placement**: Seamless ordering process with customizable options.
- **Delivery Tracking**: Real-time tracking of orders for both users and delivery personnel.
- **Payment Processing**: Integration with payment gateways for secure transactions.
- **Menu Management**: Easy management of menus and offerings for restaurants.
- **Push Notifications**: Instant updates on order status and delivery progress.
- **Location Services**: Utilizes device GPS for accurate delivery tracking.

## Libraries Used

- `@react-native-async-storage/async-storage`: For persistent storage of app data.
- `@react-navigation/native`: For navigation between screens.
- `@react-navigation/native-stack`: For stack-based navigation.
- `@reduxjs/toolkit`: Redux toolkit for state management.
- `@sanity/client`: Sanity client for interacting with Sanity.io API backend.
- `@sanity/image-url`: For handling image URLs from Sanity.io.
- `expo`: Development framework for building cross-platform apps.
- `expo-status-bar`: Status bar component for Expo projects.
- `nativewind`: Utility-first styling for React Native apps.
- `react`: Core library for building UI components.
- `react-native`: Framework for building native apps using React.
- `react-native-feather`: Feather icons for React Native apps.
- `react-native-heroicons`: Heroicons for React Native apps.
- `react-native-maps`: For integrating maps and location services.
- `react-native-responsive-screen`: For responsive design in React Native apps.
- `react-native-safe-area-context`: For handling safe area insets in React Native.
- `react-native-screens`: For managing native screens in React Native.
- `react-native-svg`: For SVG support in React Native.
- `react-redux`: Redux library for React apps.
- `tailwindcss`: Utility-first CSS framework.

## Backend

The backend of this application is powered by Sanity.io, a headless CMS platform. It provides an intuitive interface for managing content, including menus, orders, users, etc. The API endpoints are consumed by the React Native frontend to retrieve and update data.

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
```

2. Install dependencies:
```
cd <project-folder>
npm install
```

3. Set up Sanity.io:
-Create a Sanity.io project.
-Define schemas for menus, orders, users, etc.
-Deploy Sanity.io project to production.

4. Configure API:
  -Obtain Sanity.io API tokens.
  -Set up environment variables for API authentication.
   
5- Start the development server:
```
npm start
```
