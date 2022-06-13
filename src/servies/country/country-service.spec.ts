import { Http } from '../network/http';
import { CountryService } from './country-service';

describe('Country Service', () => {
  it('Should pass', () => {
    const countryService = new CountryService(new Http());
    const getCountrySpy = jest.spyOn(countryService, 'getDataByCode');
    const country = countryService.getDataByCode('BD');
    expect(getCountrySpy).toBeCalled();
  });
});

