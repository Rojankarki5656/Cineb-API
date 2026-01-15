import { createRouter } from '../lib/create-app';
import home from '../modules/home/index';
import withTryCatch from '../utils/withTryCatch';

const router = createRouter();

const routes = [
  home,
];

routes.forEach((route) => {
  router.openapi(route.schema, withTryCatch(route.handler));
});

export default router;
