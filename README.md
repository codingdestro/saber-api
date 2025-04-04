# Saber API

A lightweight React hook for handling API requests with TypeScript support.

## Installation

```bash
npm install saber-api
# or
yarn add saber-api
```

## Available Hooks

### useSaber

A powerful hook for handling API requests with built-in loading, error, and status management.

```typescript
import { useSaber, fetchSaber } from 'saber-api';

function MyComponent() {
  const { data, loading, error, status, call } = useSaber(async () => {
    // Your API call here
    return await fetchSaber<UserData>('https://api.example.com/users');
  });

  // Trigger the API call
  useEffect(() => {
    call();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (data) return <div>Data: {JSON.stringify(data)}</div>;

  return null;
}
```

The `useSaber` hook provides:
- `data`: The response data (null initially)
- `loading`: Boolean indicating if the request is in progress
- `error`: Any error that occurred during the request
- `status`: Current status ('idle' | 'loading' | 'success' | 'error')
- `call`: Function to trigger the API request

The `fetchSaber` utility function provides a typed wrapper around the fetch API with proper error handling.

## Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run tests:
   ```bash
   npm test
   # or with watch mode
   npm run test:watch
   ```
4. Build the package:
   ```bash
   npm run build
   ```
5. For development with watch mode:
   ```bash
   npm run dev
   ```

Additional development commands:
- `npm run lint`: Run ESLint
- `npm run format`: Format code with Prettier

## Requirements

- React >= 18.0.0
- React DOM >= 18.0.0

## License

MIT 