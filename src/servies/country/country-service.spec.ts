import { Http } from '../network/http';
import { CountryService } from './country-service';

describe('Country Service', () => {
  it('Should pass', async () => {
    const countryService = new CountryService(new Http());
    const getCountrySpy = jest.spyOn(countryService, 'getDataByCode');
    const country = await countryService.getDataByCode('BD');
    expect(getCountrySpy).toBeCalled();
    await expect(countryService.getFullName('BD')).toBe('Bangladesh');
    await expect(countryService.getTimeZones('BD')).toEqual(['UTC+06:00']);
    await expect(countryService.getRegion('BD')).toBe('Asia');
    await expect(countryService.getCurrencies('BD')).toEqual(['BDT']);
    await expect(countryService.getLanguages('BD')).toEqual(['Bengali']);
  });
});

