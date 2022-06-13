export default class EmployeeService {
  async findAll(options?: { max: 100; page: 1; perPage: 10 }) {
    // Dummy response
    const employees = require('../../../../data/employee.json');
    return employees;
  }
}
