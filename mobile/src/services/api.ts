import axios, { AxiosError, AxiosInstance } from "axios";

import { AppError } from "@utils/AppError";
import { storageAuthTokenBuscar, storageAuthTokenSalvar } from "@storage/auth/storageAuthToken";

type SignOut = () => void;

type PromiseType = {
  onSuccess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
}

type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut: SignOut) => () => void;
}

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;
axios.defaults.headers.common["Content-Type"] = 'application/json';

const api = axios.create({
  baseURL: 'http://127.0.0.1:80',
}) as APIInstanceProps;

let failedQueued: Array<PromiseType> = [];
let isRefreshing = false;

api.registerInterceptTokenManager = singOut => {
  const interceptTokenManager = api.interceptors.response.use((response) => response, async (requestError) => {
    if(requestError.response?.status === 401) {
      if(requestError.response.data?.message === 'token.expired' || requestError.response.data?.message === 'token.invalid') {
        const { refresh_token } = await storageAuthTokenBuscar();

        if(!refresh_token) {
          singOut();
          return Promise.reject(requestError)
        }
        
        const originalRequestConfig = requestError.config;

        if(isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueued.push({
              onSuccess: (token: string) => { 
                originalRequestConfig.headers = { 'Authorization': `Bearer ${token}` };
                resolve(api(originalRequestConfig));
              },
              onFailure: (error: AxiosError) => {
                reject(error)
              },
            })
          })
        }

        isRefreshing = true

        return new Promise(async (resolve, reject) => {
          try {
            const { data } = await api.post('/auth/refresh-token', { refresh_token });
            await storageAuthTokenSalvar({ token: data.token, refresh_token: data.refresh_token });

            if(originalRequestConfig.data) {
              originalRequestConfig.data = JSON.parse(originalRequestConfig.data);
            }

            originalRequestConfig.headers = { 'Authorization': `Bearer ${data.token}` };
            api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

            failedQueued.forEach(request => {
              request.onSuccess(data.token);
            });

            console.log("Token Atualizado");

            resolve(api(originalRequestConfig));
          } catch (error: any) {
            console.log(error)
            failedQueued.forEach(request => {
              request.onFailure(error);
            })

            singOut();
            reject(error);
          } finally {
            isRefreshing = false;
            failedQueued = []
          }
        })
      }
      
      singOut();
    }

    if(requestError.response && requestError.response.data) {
      return Promise.reject(new AppError(requestError.response.data.message))
    } else {
      return Promise.reject(requestError)
    }
  });

  return () => {
    api.interceptors.response.eject(interceptTokenManager);
  }
}

export { api };