interface Network {
  setUrl(url: string);
  getUrl(): string;
  setRequestData(requestData: string | object);
  getResponseData(): unknown;
}

export default Network;

