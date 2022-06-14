import { CountryService } from '../../services/country/country-service';
import { Http } from '../../services/http/http';

import EmployeeService from './employee-service';

describe('Employee Service', () => {
  let employeeService: EmployeeService;
  let countryService: CountryService;
  beforeEach(() => {
    employeeService = new EmployeeService();
    countryService = new CountryService(new Http());
  });

  it('Should return employee list identifier for Asia & Europe region', async () => {
    const generateIdentifierSpy = jest.spyOn(employeeService, 'generateIdentifier');
    const employeeList = await employeeService.findAll();
    expect(employeeList.length).toBeGreaterThan(1);
    expect(generateIdentifierSpy).toBeCalled();

    // Europe and Asia region employee should have identifier
    for await (const employee of employeeList) {
      const region = await countryService.getRegion(employee.country);
      if (['Asia', 'Europe'].includes(region)) {
        expect(employee.identifier).not.toBe(null);
        expect(employee.identifier.length).toBeGreaterThan(0);
      } else {
        expect(employee.identifier).toBe(undefined);
      }
    }
  });

  it('Should return employee list with identifier for US region', async () => {
    const employeeList = await employeeService.findAll({
      uniqueIdRegion: ['Americas'],
    });
    expect(employeeList.length).toBeGreaterThan(1);
    // `Americas` region employee should have identifier only
    for await (const employee of employeeList) {
      const region = await countryService.getRegion(employee.country);
      if (['Americas'].includes(region)) {
        expect(employee.identifier).not.toBe(null);
        expect(employee.identifier.length).toBeGreaterThan(0);
      } else {
        expect(employee.identifier).toBe(undefined);
      }
    }
  });
});

