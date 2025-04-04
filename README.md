# Saber API

A collection of useful React hooks with TypeScript support.

## Installation

```bash
npm install saber-api
# or
yarn add saber-api
```

## Available Hooks

### useCounter

A simple counter hook with increment, decrement, and reset functionality.

```typescript
import { useCounter } from 'saber-api';

function MyComponent() {
  const { count, increment, decrement, reset } = useCounter({
    initialValue: 0, // optional, defaults to 0
    step: 1, // optional, defaults to 1
  });

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

## Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run tests:
   ```bash
   npm test
   ```
4. Build the package:
   ```bash
   npm run build
   ```
5. For development with watch mode:
   ```bash
   npm run dev
   ```

The package is built using [tsup](https://github.com/egoist/tsup), which provides:
- CommonJS and ESM output formats
- TypeScript declarations
- Source maps
- Tree shaking
- Fast builds

## License

MIT 