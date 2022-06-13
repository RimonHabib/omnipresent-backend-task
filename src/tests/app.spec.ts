import supertest from 'supertest';
import { app, server } from '../server';

describe('Root endpoint', () => {
  it('Should respond with teapot', async () => {
    const request = supertest(app.getServer());
    const response = await request.get('/');
    expect(response.status).toBe(418);
  });

  afterAll((done) => {
    server.close();
    done();
  });
});

