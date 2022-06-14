import { Http } from '../../services/http/http';
import { region, CountryService } from '../../services/country/country-service';

export type Employee = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  jobTitle: string;
  company: string;
  country: string;
  countryData: {
    name: string;
    currency: string;
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
      const employeesData = require('../../../data/Employee.json');

      // fetcing country data
      const countryService = new CountryService(new Http());
      const employees = [];
      for await (const employee of employeesData) {
        const { country } = employee;
        // Clone employee object
        const employeeData = { ...employee };

        const countryData = {
          name: await countryService.getFullName(country),
          currency: await countryService.getCurrency(country),
          languages: await countryService.getLanguages(country),
          timezones: await countryService.getTimeZones(country),
        };

        // Append country data;
        employeeData.countryData = countryData;

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
    return `${employee.firstName}${employee.lastName}${employee.dateOfBirth}`
      .replace(/\//g, '')
      .toLocaleLowerCase();
  }
}

