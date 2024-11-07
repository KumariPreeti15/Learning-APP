export interface Options {
  headers?: any;
  body?: any;
  method?: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';
}

export default class httpService {
  ready: Promise<void>;
  defaultHeader = { 'Content-Type': 'application/json' };
  async get(url: string, option?: Options): Promise<Response> {
    const options: Options = {
      method: option?.method ? option.method : 'GET',
      headers: { ...this.defaultHeader, ...option?.headers }
    };
    await this.ready;
    return fetch(url, options);
  }

  async post<T>(url: string, body: T, option?: Options): Promise<Response> {
    const options: Options = {
      headers: { ...this.defaultHeader, ...option?.headers },
      body: JSON.stringify(body),
      method: option?.method ? option.method : 'POST'
    };
    await this.ready;
    return fetch(url, options);
  }

  async put<T>(url: string, body: T, option?: Options) {
    const options: Options = {
      headers: { ...this.defaultHeader, ...option?.headers },
      body: JSON.stringify(body),
      method: option?.method ? option.method : 'PUT'
    };
    await this.ready;
    return fetch(url, options);
  }

  async delete(url: string, option?: Options): Promise<Response> {
    const options: Options = {
      headers: { ...this.defaultHeader, ...option?.headers },
      method: option?.method ? option.method : 'DELETE'
    };
    await this.ready;
    return fetch(url, options);
  }   
}

export const $http = new httpService();
