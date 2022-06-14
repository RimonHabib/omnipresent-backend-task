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
  // inject dependencies
  constructor(private readonly countryService: CountryService) {}

  async findAll(option?: { uniqueIdRegion: region[] }): Promise<Employee[]> {
    // default option, uniqueIdRegion = ['Asia', 'Europe']
    option = {
      ...{
        uniqueIdRegion: ['Asia', 'Europe'],
      },
      ...option,
    };

    // fetching employees from json file
    const employeesData = require('../../../data/Employee.json');

    // fetcing country data
    const employees = [];

    for (const employee of employeesData) {
      const { country } = employee;
      // Clone employee object
      const employeeData = { ...employee };
      // fetch country data from country service
      const countryData = {
        name: await this.countryService.getFullName(country),
        currency: await this.countryService.getCurrency(country),
        languages: await this.countryService.getLanguages(country),
        timezones: await this.countryService.getTimeZones(country),
      };

      // Append country data;
      employeeData.countryData = countryData;

      // Generate identifier
      const region = await this.countryService.getRegion(country);
      if (option.uniqueIdRegion.includes(region)) {
        employeeData.identifier = this.generateIdentifier(employeeData);
      }

      employees.push(employeeData);
    }
    return employees;
  }

  generateIdentifier(employee: Employee) {
    return `${employee.firstName}${employee.lastName}${employee.dateOfBirth}`
      .replace(/\//g, '')
      .toLocaleLowerCase();
  }
}

