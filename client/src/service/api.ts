import { API_URL } from "@/lib/ApiEndPoints";

interface ApiOptions extends RequestInit {
    responseType?: 'json' | 'blob';  // Tipo da resposta
    headers?: Record<string, string>; // Headers personalizados
}

/**
 * Função auxiliar para realizar a requisição com fetch.
 * @param {string} url - O endpoint completo da API.
 * @param {ApiOptions} [options={}] - As opções para o fetch (método, headers, body, etc).
 * @returns {Promise<any>} - Retorna a resposta da API ou erro.
 */
async function api<T>(url: string, options: ApiOptions = {}): Promise<T> {
    const response = await fetch(`${API_URL}${url}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(options.headers || {}),
        },
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Erro na requisição');
    }

    if (options.responseType === 'blob') {
        return (await response.blob()) as unknown as T;
    }

    return await response.json();
}

export default api;
