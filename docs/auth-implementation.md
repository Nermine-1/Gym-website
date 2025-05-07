# React Query Auth Implementation

This document describes the implementation of authentication using TanStack React Query in our Gym website project.

## Structure

- **API Client** (`src/lib/api.ts`): Contains the functions for API communication
- **Auth Context** (`src/contexts/auth-context.tsx`): Manages user state across the app
- **Auth Hooks** (`src/hooks/use-auth.ts`): React Query hooks for authentication actions
- **Auth Modal** (`src/components/auth/auth-modal.tsx`): UI for sign in/sign up
- **Auth Initializer** (`src/components/auth/auth-initializer.tsx`): Loads user on app start

## Features

- User sign up and sign in with React Query mutations
- Persistent auth state with localStorage
- Logout functionality
- Profile page with auth protection
- React Query DevTools for debugging

## API Endpoints

The auth system interacts with the following Flask backend endpoints:

- `/api/signup`: Register a new user
- `/api/login`: Authenticate a user
- `/api/logout`: End a user session
- `/api/current-user`: Get the currently authenticated user

## Usage

### Sign Up

```tsx
const signUpMutation = useSignUp();
signUpMutation.mutate({ fullName, email, password });
```

### Sign In

```tsx
const signInMutation = useSignIn();
signInMutation.mutate({ email, password });
```

### Get Current User

```tsx
const { data: currentUser } = useCurrentUser();
```

### Logout

```tsx
const logoutMutation = useLogout();
logoutMutation.mutate();
```

### Check Auth State

```tsx
const { user, isLoading } = useAuth();

// Protect routes
if (!user && !isLoading) {
  router.push('/login');
}
```

## Development

For local development, the API client points to the Flask backend at `http://localhost:5000/api`.
In production, this URL can be configured via environment variable `NEXT_PUBLIC_API_URL`.
