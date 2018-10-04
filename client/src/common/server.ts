export const requestEndpointBase = 'http://localhost:8080';

export function getApiURI(endpoint: string) {
    return requestEndpointBase + endpoint;
}

export async function fetchServer(endpoint: string, method: string = 'GET', body: any = {}) {
    const response = await fetch(getApiURI(endpoint), {
        method,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Cache-Control': 'no-cache',
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        throw Error(response.statusText);
    }

    return response;
}