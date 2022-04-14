import fastify from 'fastify';
import fastifyHelmet from 'fastify-helmet';
import fastifyCors from 'fastify-cors';
import fastifyMultipart from 'fastify-multipart';

import authController from '../components/auth/index';
import administratorController from '../components/admin/index';
import addressController from '../components/address/index';
import userController from '../components/user/index';
import customerController from '../components/customer/index';
import categoryController from '../components/category/index';
import iconController from '../components/icon/index';
import contactController from '../components/contact/index';

const FAILURE_PROCESS_EXIT_CODE = 1;

const fast = fastify();

fast.register(fastifyHelmet);
fast.register(fastifyCors);
fast.register(fastifyMultipart);

fast.register(authController);
fast.register(administratorController);
fast.register(addressController);
fast.register(userController);
fast.register(customerController);
fast.register(categoryController);
fast.register(iconController);
fast.register(contactController);

async function listen(port: number, host: string): Promise<void> {
  try {
    const mode = process.env.NODE_ENV || 'development';
    const address = await fast.listen(port, host);
    console.log(`[${mode.toUpperCase()}] Poliweb API running on: ${address}`);
  } catch (error) {
    console.error(error);
    process.exit(FAILURE_PROCESS_EXIT_CODE);
  }
}

export { listen, fast };
