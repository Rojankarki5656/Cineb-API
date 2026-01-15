import createApp from './lib/create-app.js';
import router from './routes/routes.js';

const app = createApp();

app.route('/api/v1', router);

export default app;
