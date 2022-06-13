import supertest from 'supertest';
import { app, server } from '../server';

describe('App health check', () => {
  it('Should check app health', async () => {
    const request = supertest(app.getServer());
    const response = await request.get('/healthz');
    expect(response.status).toBe(200);
  });

  afterAll((done) => {
    server.close();
    done();
  });
});

