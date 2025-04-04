import { fetchSaber } from '../useSaber';

// Mock the global fetch function
global.fetch = jest.fn();

describe('fetchSaber', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('should successfully fetch data and return the expected response', async () => {
    // Mock data from JSONPlaceholder API
    const mockData = { 
      userId: 1, 
      id: 1, 
      title: "delectus aut autem", 
      completed: false 
    };
    const mockResponse = {
      ok: true,
      status: 200,
      statusText: 'OK',
      json: jest.fn().mockResolvedValue(mockData),
    };

    // Setup the mock implementation
    (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

    // Call the function with JSONPlaceholder API endpoint
    const result = await fetchSaber<typeof mockData>('https://jsonplaceholder.typicode.com/todos/1');

    // Verify fetch was called with the correct arguments
    expect(global.fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/todos/1', {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Verify the result
    expect(result).toEqual({
      data: mockData,
      status: 200,
      statusText: 'OK',
    });
  });

  it('should handle fetch errors correctly', async () => {
    // Setup the mock implementation to throw an error
    (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

    // Call the function and expect it to throw
    await expect(fetchSaber('https://jsonplaceholder.typicode.com/todos/1')).rejects.toThrow('Network error');
  });

  it('should handle non-OK responses correctly', async () => {
    // Mock a non-OK response
    const mockResponse = {
      ok: false,
      status: 404,
      statusText: 'Not Found',
      json: jest.fn().mockResolvedValue({ error: 'Resource not found' }),
    };

    // Setup the mock implementation
    (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

    // Call the function and expect it to throw
    await expect(fetchSaber('https://jsonplaceholder.typicode.com/todos/1')).rejects.toThrow('Failed to fetch data');
  });

  it('should pass custom options to fetch', async () => {
    // Mock data from JSONPlaceholder API
    const mockData = { 
      userId: 1, 
      id: 1, 
      title: "delectus aut autem", 
      completed: false 
    };
    const mockResponse = {
      ok: true,
      status: 200,
      statusText: 'OK',
      json: jest.fn().mockResolvedValue(mockData),
    };

    // Setup the mock implementation
    (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

    // Custom options
    const customOptions = {
      method: 'POST',
      body: JSON.stringify({ title: 'New Todo', completed: false, userId: 1 }),
    };

    // Call the function with custom options
    await fetchSaber<typeof mockData>('https://jsonplaceholder.typicode.com/todos', customOptions);

    // Verify fetch was called with the correct arguments
    expect(global.fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      body: JSON.stringify({ title: 'New Todo', completed: false, userId: 1 }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });
});
