import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

interface ResponseData<T = unknown> {
  code: number;
  data: T;
  message: string;
}

class HttpRequest {
  private instance: AxiosInstance;

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.instance.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(this.handleError(error as AxiosError<ResponseData>));
      },
    );

    this.instance.interceptors.response.use(
      (response) => {
        const data = response.data as ResponseData;
        if (data.code === 200 || data.code === 0) {
          return data;
        }
        return Promise.reject(new Error(data.message || 'Request failed'));
      },
      (error) => {
        return Promise.reject(this.handleError(error as AxiosError<ResponseData>));
      },
    );
  }

  private handleError(error: AxiosError<ResponseData>): Error {
    if (error.response) {
      const { status, data } = error.response;
      switch (status) {
        case 400:
          return new Error(data?.message || 'Bad Request');
        case 401:
          return new Error(data?.message || 'Unauthorized');
        case 403:
          return new Error(data?.message || 'Forbidden');
        case 404:
          return new Error(data?.message || 'Not Found');
        case 500:
          return new Error(data?.message || 'Internal Server Error');
        default:
          return new Error(data?.message || 'Request failed');
      }
    } else if (error.request) {
      return new Error('Network error, please check your connection');
    } else {
      return new Error(error.message || 'Request failed');
    }
  }

  public get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<ResponseData<T>> {
    return this.instance.get(url, config);
  }

  public post<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<ResponseData<T>> {
    return this.instance.post(url, data, config);
  }
}

const http = new HttpRequest(import.meta.env.VITE_API_BASE_URL || '/api');

export const get = <T = unknown>(url: string, config?: AxiosRequestConfig) => http.get<T>(url, config);

export const post = <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
  http.post<T>(url, data, config);

export default http;
