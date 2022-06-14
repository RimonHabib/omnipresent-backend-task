import { Http } from '../../..//servies/network/http';
import { region, CountryService } from '../../../servies/country/country-service';

export type Employee = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  jobTitle: string;
  company: string;
  country: {
    name: string;
    currencies: string[];
    languages: string[];
    timezones: string[];
  };
  identifier?: string;
};

export default class EmployeeService {
  async findAll(option?: { uniqueIdRegion: region[] }) {
    // default option, uniqueIdRegion = ['Asia', 'Europe']
    option = {
      ...{
        uniqueIdRegion: ['Asia', 'Europe'],
      },
      ...option,
    };

    try {
      // fetching employees from json file
      const employeesData = require('../../../../data/employee.json');

      // fetcing country data
      const countryService = new CountryService(new Http());
      const employees = [];
      for await (const employee of employeesData) {
        const { country } = employee;
        const employeeData = { ...employee };
        const countryData = {
          name: await countryService.getFullName(country),
          currencies: await countryService.getCurrencies(country),
          languages: await countryService.getLanguages(country),
          timezones: await countryService.getTimeZones(country),
        };

        // Replace country code with country data;
        employeeData.country = countryData;

        // Generate identifier
        const region = await countryService.getRegion(country);
        if (option.uniqueIdRegion.includes(region)) {
          employeeData.identifier = this.generateIdentifier(employeeData);
        }
        employees.push(employeeData);
      }
      return employees;
    } catch (error) {
      console.log(error);
    }
  }

  generateIdentifier(employee: Employee) {
    return `${employee.firstName}${employee.lastName}${employee.dateOfBirth}`;
  }
}

