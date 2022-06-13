import dotenv from 'dotenv';
import { emit } from 'process';
import App from './app';
import HealthController from './healthz';

dotenv.config();
const port = parseInt(process.env.PORT) || 3000;

//prettier-ignore
const app = new App([
  new HealthController()
]);

const server = app.listen(port).on('listening', () => {
  console.log(`App is running on http://localhost:${port}`);
});

export { app, server };

