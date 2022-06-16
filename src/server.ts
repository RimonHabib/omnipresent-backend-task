import dotenv from 'dotenv';
import App from './app';
import HealthController from './healthz';
import EmployeeController from './module/employee/controller';

dotenv.config();
const port = parseInt(process.env.PORT) || 3000;

//prettier-ignore
const app = new App([
  new HealthController(),
  new EmployeeController()
]);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port).on('listening', () => {
    console.log(`App is running on http://localhost:${port}`);
  });
}

export { app };

