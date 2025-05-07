// API base URL depends on environment
export const getApiBaseUrl = () => {
  // In production, you might use a different URL
  if (process.env.NODE_ENV === 'production') {
    return process.env.NEXT_PUBLIC_API_URL || 'https://your-production-api.com/api';
  }
  
  // In development, use the local Flask server
  return 'http://localhost:5000/api';
};
