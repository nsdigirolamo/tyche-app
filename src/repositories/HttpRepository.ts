import { AxiosResponse, AxiosInstance } from "axios";

export class HttpRepository<Input, Output> {
  axiosInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  async post(url: string, input?: Input): Promise<AxiosResponse<Output>> {
    return this.axiosInstance.post<Output>(url, input);
  }

  async get(url: string): Promise<AxiosResponse<Output>> {
    return this.axiosInstance.get<Output>(url);
  }

  async put(url: string, input?: Input): Promise<AxiosResponse<Output>> {
    return this.axiosInstance.put<Output>(url, input);
  }

  async delete(url: string): Promise<void> {
    await this.axiosInstance.delete<Output>(url);
  }
}
