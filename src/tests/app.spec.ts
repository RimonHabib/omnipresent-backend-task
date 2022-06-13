import supertest from 'supertest';
import { app, server } from '../server';

describe('App health check', () => {
  it('Should check app health', async () => {
    const request = supertest(app.getServer());
    const response = await request.get('/');
    expect(response.status).toBe(418);
  });

  afterAll((done) => {
    server.close();
    done();
  });
});

