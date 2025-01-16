import { Framework, Store, Router } from './modules/index.js';
import routes from './routes.js'

const store = new Store({ user: null, theme: 'light' });
store.subscribe((state) => console.log('[Store] State updated:', state));

const app = new Framework('app', { store }, true);



const router = new Router(routes, app, true);
void router.updateView();

export default router;
