import axiosInstance from "../../../api/axiosInstance/axiosInstance";

describe("Axios Instance", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.spyOn(Storage.prototype, "getItem");
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should have the correct base URL", () => {
    expect(axiosInstance.defaults.baseURL).toBe("http://localhost:4000/api");
  });

  it("should attach Authorization header if token exists", async () => {
    localStorage.setItem("token", "mock-token");

    const requestInterceptor = axiosInstance.interceptors.request as any;
    const requestConfig = await requestInterceptor.handlers[0].fulfilled({ headers: {} })

    expect(requestConfig.headers.Authorization).toBe("Bearer mock-token");
  });

  it("should not attach Authorization header if token does not exist", async () => {
    localStorage.removeItem("token");

    const requestInterceptor = axiosInstance.interceptors.request as any;
    const requestConfig = await requestInterceptor.handlers[0].fulfilled({ headers: {} })

    expect(requestConfig.headers.Authorization).toBeUndefined();
  });

  it("should log token value when making a request", async () => {
    console.log = jest.fn();
    localStorage.setItem("token", "it-token");

    const requestInterceptor = axiosInstance.interceptors.request as any;
    await requestInterceptor.handlers[0].fulfilled({ headers: {} })

    expect(console.log).toHaveBeenCalledWith("it-token");
  });

  it("should handle request interceptor errors", async () => {
    console.log = jest.fn(); // Mock console.log
    const error = new Error("Request Interceptor Error");
    const requestInterceptor = axiosInstance.interceptors.request as any;
    expect(requestInterceptor.handlers.length).toBeGreaterThan(0);   // Ensure an interceptor is registered before accessing handlers[0]
    const rejectedPromise = requestInterceptor.handlers[0].rejected(error); // Do not await here
    await expect(rejectedPromise).rejects.toThrow(error);  // Test if the function rejects correctly
    expect(console.log).toHaveBeenCalledWith(error);  // Ensure console.log was called with the correct error
  });
});