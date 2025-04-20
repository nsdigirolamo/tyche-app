import { AxiosResponse, AxiosInstance } from "axios";

class HttpRepository {
  axiosInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  async post<Output>(
    url: string,
    input?: unknown
  ): Promise<AxiosResponse<Output>> {
    return this.axiosInstance.post<Output>(url, input);
  }

  async get<Output>(url: string): Promise<AxiosResponse<Output>> {
    return this.axiosInstance.get<Output>(url);
  }

  async put<Output>(
    url: string,
    input?: unknown
  ): Promise<AxiosResponse<Output>> {
    return this.axiosInstance.put<Output>(url, input);
  }

  async delete(url: string): Promise<void> {
    await this.axiosInstance.delete(url);
  }
}

export default HttpRepository;
