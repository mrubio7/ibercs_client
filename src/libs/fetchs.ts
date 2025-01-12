import ApiLocalStorage from "../api/api_localstorage";
import { Payload } from "./payload";

export const LOG_ERRORS = true

export interface ApiResponse {
    data: any;
    message: string;
    ok: boolean;
}

export const GET = (url: string, auth:boolean) => {
    return request("GET", url, auth, null)
};

export const POST = (url: string, auth:boolean, params: Payload|null) => {
    return request("POST", url, auth, params)
};

export const PUT = (url: string, auth:boolean, params: Payload|null) => {
    return request("PUT", url, auth, params)
};

export const PATCH = (url: string, auth:boolean, params: Payload|null) => {
    return request("PATCH", url, auth, params)
};

export const DELETE = (url: string, auth:boolean, params: Payload|null) => {
    return request("DELETE", url, auth, params)
};


function handleError(response: Response): ApiResponse {
    return { message: `Error: ${response.status} ${response.statusText}`, data: null, ok:false };
}

async function request(method: string, url: string, auth:boolean, payload:Payload|null): Promise<ApiResponse> {
    var req: RequestInit = { method: method }
    if (payload != null) {
        req.headers = {"Content-Type": payload.type}
        req.body = payload.params
    }
    if (auth) {
        req.headers = {"Authorization": `Bearer ${ApiLocalStorage.Token.Get()?.AccessToken}`}
    }

    try {
        const response = await fetch(url, req);
    
        if (!response.ok) {
            return handleError(response);
        }
    
        const data:ApiResponse = await response.json();
        data.ok = true;
        return data;
    } catch (error) {
        if (LOG_ERRORS) {
            console.error("Error in fetch:", error);
            throw error; 
        }
        throw error; 
    }
}