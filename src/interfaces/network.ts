/**
 * Network interface is a common interface for network requests.
 * It can be implemented in http or RPC adapters based on need.
 */

interface Network {
  setUrl(url: string);
  getUrl(): string;
  setRequestData(requestData: string | object);
  getResponseData(): unknown;
}

export default Network;

