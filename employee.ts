import axios from 'axios';
import { IndexKind } from 'typescript';

export default class EmployeeService {
  async findAll(options?: { max: 100; page: 1; perPage: 10 }) {
    // Dummy response
    const employees = require('../../../../data/employee.json');
    const countryDataNeedstoFetch = new Set();
    employees.forEach((employee) => {
      countryDataNeedstoFetch.add(employee.country);
    });

    try {
      const countryData = await this.getCountryData([...countryDataNeedstoFetch]);
      return countryData;
    } catch (error) {
      console.log(error);
    }

    // return employees;
  }

  async getCountryData(countryCode) {
    const url = 'https://restcountries.com/v3.1/alpha?codes=' + countryCode.join(',');
    const countryData = await axios.get(url);

    const countryDataObject = {};
    countryCode.map((country, index) => {
      countryDataObject[country] = countryData.data[index];
    });
    return countryDataObject;
  }
}

