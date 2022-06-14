import supertest from 'supertest';
import { app, server } from '../server';

describe('Employee Endpoint', () => {
  it('Should respond with employee list', async () => {
    const request = supertest(app.getServer());
    const response = await request.get('/employee');
    expect(response.status).toBe(200);
    const employees = response.body;
    employees.forEach((employee) => {
      expect(employee.country.name).not.toBe(null);
      expect(employee.country.currency).not.toBe(null);
      expect(employee.country.currency).not.toBe(null);
      expect(employee.country.languages).not.toBe(null);
    });
  });

  afterAll((done) => {
    server.close();
    done();
  });
});

