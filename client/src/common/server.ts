export const requestEndpointBase = '//localhost:9000';

export function getApiURI(endpoint: string) {
    return requestEndpointBase + endpoint;
}

export async function fetchServer(endpoint: string, method: string = 'GET', body: any = undefined) {
    const response = await fetch(getApiURI(endpoint), {
        method,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Cache-Control': 'no-cache',
            'Authorization': 'Bearer ' + sessionStorage.getItem('jwt'),
        },
        body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    return response;
}