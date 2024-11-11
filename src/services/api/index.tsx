import { enqueueSnackbar, OptionsObject } from 'notistack';
import Auth from './auth';
import { useCallback, useState } from 'react';
//import Auth from "./auth"
//import { useCallback } from 'react';

//const apiURL = import.meta.env.VITE_API_URL || 'http://localhost:8001/api/v1'
const apiURL = import.meta.env.SERVER_API_URL || 'https://dragon-farm.online/api/v1'

export async function apiFetch<T>(
    url: string, 
    method: string, 
    body: Record<string, unknown> | null = null, 
    enqueueSnackbar: (msg: string, options?: OptionsObject) => void
  ): Promise<T | undefined> {
  
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(Auth.accessToken ? { 'Authorization': `Bearer ${Auth.accessToken}` } : {})
      },
      body: body ? JSON.stringify(body) : null,
      //keepalive: false // Убедитесь, что вам это действительно нужно
    };
  
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // Таймаут 10 секунд
  
      const response = await fetch(`${apiURL}${url}`, {
        ...options,
        signal: controller.signal
      });
  
      clearTimeout(timeoutId);
  
      if (!response.ok) {
        // Проверка статуса ответа. Например, 401, 403, 500 и т.д.
        const errorMessage = `Error ${response.status}: ${response.statusText}`;
        enqueueSnackbar(errorMessage, { variant: 'error' });
        return; // Прекращаем выполнение при неудачном статусе
      }
  
      const data: T = await response.json();
      return data;
    } catch (error: unknown) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        enqueueSnackbar('Request timed out', { variant: 'error' });
      } else if (error instanceof Error) {
        enqueueSnackbar(error.message, { variant: 'error' });
      } else {
        enqueueSnackbar('An unknown error occurred', { variant: 'error' });
      }
    }
  }

  export function useApiFetch<T>(url: string, method: string) {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
  
    const fetchData = useCallback(async (body: Record<string, unknown> | null = null) => {
      setIsLoading(true);
      setError(null);
  
      try {
        const result = await apiFetch<T>(url, method, body, enqueueSnackbar);
        setData(result || null); // Устанавливаем данные, если запрос успешен
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message); // Обработка ошибки
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setIsLoading(false);
      }
    }, [url, method]);
  
    return { data, isLoading, error, fetchData };
  }