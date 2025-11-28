const url = import.meta.env.VITE_BACKEND_URL;

export interface ApiOptions {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    params?: any;
    headers?: Record<string, string>;
}

export async function apiRequest<T>(
    endpoint: string,
    options: ApiOptions = {}
): Promise<T> {
    const { method = "GET", params, headers = {} } = options;
    const query = params ? `?${new URLSearchParams(params).toString()}` : "";
    try {
        const response = await fetch(`${url}${endpoint}${query}`, {
            method,
            headers: {
                ...headers
            }
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(`API Error ${response.status}: ${error}`);
        }

        const text = (await response.text());
        return text as unknown as T;
    } catch (error) {
        console.error("API request failed:", error);
        throw error;
    }   
}