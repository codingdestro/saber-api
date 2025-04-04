//define test for useSaber hook
import { renderHook, act } from "@testing-library/react-hooks";
import { useSaber } from "../useSaber";

describe("useSaber hook", () => {
  it("should initialize with default values", () => {
    const { result } = renderHook(() => useSaber(() => Promise.resolve(1)));
    
    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.status).toBe("idle");
  });

  it("should handle successful data fetching", async () => {
    const mockData = { id: 1, name: "Test" };
    const { result, waitForNextUpdate } = renderHook(() => 
      useSaber(() => Promise.resolve(mockData))
    );
    
    // Call the async function
    act(() => {
      result.current.call();
    });
    
    // Check loading state
    expect(result.current.loading).toBe(true);
    expect(result.current.status).toBe("loading");
    
    // Wait for the promise to resolve
    await waitForNextUpdate();
    
    // Check final state
    expect(result.current.data).toEqual(mockData);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.status).toBe("idle");
  });

  it("should handle errors", async () => {
    const mockError = new Error("Test error");
    const { result, waitForNextUpdate } = renderHook(() => 
      useSaber(() => Promise.reject(mockError))
    );
    
    // Call the async function
    act(() => {
      result.current.call();
    });
    
    // Check loading state
    expect(result.current.loading).toBe(true);
    expect(result.current.status).toBe("loading");
    
    // Wait for the promise to reject
    await waitForNextUpdate();
    
    // Check final state
    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(mockError);
    expect(result.current.status).toBe("idle");
  });
});