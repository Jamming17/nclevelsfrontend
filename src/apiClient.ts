export interface ApiOptions {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    params?: any;
    headers?: Record<string, string>;
}

const API_BASE_URL = "http://localhost:4000/jack/gd/";

export async function apiRequest<T>(
    endpoint: string,
    options: ApiOptions = {}
): Promise<T> {
    const { method = "GET", params, headers = {} } = options;
    const query = `?${new URLSearchParams(params).toString()}`;
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}${query}`, {
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