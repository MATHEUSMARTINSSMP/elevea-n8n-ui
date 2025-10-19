// Development mocks for local testing
export function interceptNetlifyFunctions() {
  // Mock implementation for development
  console.log('[DevMocks] Intercepting Netlify functions for local development');
  
  // In development, we can mock the functions or redirect to actual endpoints
  if (import.meta.env.DEV) {
    // Mock successful responses for development
    return {
      mock: true,
      intercept: true
    };
  }
  
  return {
    mock: false,
    intercept: false
  };
}

// Additional mock utilities
export function mockApiResponse(data: any, delay: number = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data,
        mock: true
      });
    }, delay);
  });
}

export function mockErrorResponse(error: string, delay: number = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: false,
        error,
        mock: true
      });
    }, delay);
  });
}
