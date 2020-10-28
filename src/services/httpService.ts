import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  ResponseType,
} from 'axios';

// import routes from '../utils/routes';
const httpSettings: AxiosRequestConfig = {
  baseURL: 'https://gamesdirectory20200606030649.azurewebsites.net/',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
};

class HttpService {
  httpInstance: AxiosInstance;

  constructor() {
    this.httpInstance = axios.create(httpSettings);
  }

  interceptorsConfig = (history: any) => {
    this.httpInstance.interceptors.response.use(
      (response: AxiosResponse<any>) => {
        return response;
      },
      ({ response }: { response: AxiosResponse }) => {
        if (response.status === 401) history.push('/login');
        return response;
      }
    );
  };

  get = async <T = any>(
    endpoint: string,
    params?: any
  ): Promise<AxiosResponse<T>> => {
    return this.httpInstance.get(endpoint, {
      params,
    });
  };

  post = async <T = any>(
    endpoint: string,
    body?: any
  ): Promise<AxiosResponse<T>> => {
    return await this.httpInstance.post(endpoint, body);
  };

  put = async <T = any>(
    endpoint: string,
    body: any
  ): Promise<AxiosResponse<T>> => {
    return this.httpInstance.put(endpoint, body);
  };

  delete = async (endpoint: string, params?: any, body?: any) => {
    return this.httpInstance.delete(endpoint, {
      params: {
        ...params,
      },
      data: {
        ...body,
      },
    });
  };

  setAuthToken = (token: string) => {
    this.httpInstance.defaults.headers['Authorization'] = `Bearer ${token}`;
  };

  changeHeader = (name: string, value: string) => {
    this.httpInstance.defaults.headers = {
      name: value,
    };
  };

  setDefaultHeaders = () => {
    this.httpInstance.defaults.headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    };
  };

  setResponseType = (responseType: ResponseType) => {
    this.httpInstance.defaults.responseType = responseType;
  };
}

export default new HttpService();
