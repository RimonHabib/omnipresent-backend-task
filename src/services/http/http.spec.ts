import { Http } from './http';

describe('Http adapter', () => {
  let url: string, http: Http;

  beforeEach(() => {
    url = 'https://restcountries.com/v2/alpha?codes=BD';
    http = new Http();
  });

  it('should make a get request', async () => {
    http.setUrl(url);
    expect(http.getUrl()).toBe(url);
    const getSpy = jest.spyOn(http, 'get');
    await http.get();
    expect(getSpy).toBeCalled();
    const responseData = http.getResponseData();
    expect(responseData.length).toBe(1);
  });

  it('Should fail with bad get request', async () => {
    http.setUrl(url);
    http.setRequestData({ codes: ['BD', 'DE'] });
    const requestData = http.getRequestData();
    expect(requestData).toEqual({ codes: ['BD', 'DE'] });
    await expect(http.get).rejects.toThrow();
  });
});

