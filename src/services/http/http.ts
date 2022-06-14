import axios from 'axios';
import HttpException from '../../exceptions/httpException';
import Network from '../../interfaces/network';

export class Http implements Network {
  private url: string;
  private requestData: string | object;
  private responseData: unknown;

  // URL setter
  setUrl(url: string) {
    this.url = url;
  }

  // URL getter
  getUrl(): string {
    return this.url;
  }

  // RequestData setter
  setRequestData(requestData: string | object) {
    this.requestData = requestData;
    return this;
  }

  // RequestData Getter
  getRequestData() {
    return this.requestData;
  }

  getResponseData(): any {
    return this.responseData;
  }

  /**
   * HTTP get
   * @todo  error and response handling improvement
   */
  async get() {
    try {
      const response = await axios({
        method: 'get',
        url: this.url,
        data: this.requestData,
      });
      this.responseData = response.data;
      return this.responseData;
    } catch (error) {
      throw new HttpException(error.response.status, error.message);
    }
  }

  /**
   * @todo Need to implement other http methods
   */
}

