import { existsSync } from 'fs';
import { Http } from '../http/http';
import { CountryService } from './country-service';

describe('Country Service', () => {
  it('Should fetch country data', async () => {
    const countryService = new CountryService(new Http());
    const getCountrySpy = jest.spyOn(countryService, 'getDataByCode');
    const country = await countryService.getDataByCode('BD');
    expect(getCountrySpy).toBeCalled();
    expect(await countryService.getFullName('BD')).toBe('Bangladesh');
    expect(await countryService.getTimeZones('BD')).toEqual(['UTC+06:00']);
    expect(await countryService.getRegion('BD')).toBe('Asia');
    expect(await countryService.getCurrency('BD')).toBe('BDT');
    expect(await countryService.getLanguages('BD')).toEqual(['Bengali']);
  });

  it('Should return country data from API call (force clear cache)', async () => {
    const http = new Http();
    const countryService = new CountryService(http);
    const httpGetSpy = jest.spyOn(http, 'get');
    await countryService.getDataByCode('BD', { fromCache: false });
    await countryService.getDataByCode('CA', { fromCache: false });
    expect(httpGetSpy).toBeCalledTimes(2);
  });
});

