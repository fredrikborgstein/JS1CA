import { Framework, Store, Router } from './modules/index.js';
import { AppLayout } from "./components/appLayout.js";
import HomePage from './pages/HomePage.js';
import AboutPage from "./pages/aboutPage.js";
import ContactPage from "./pages/contactPage.js";
import AllProductsPage from "./pages/allProductsPage.js";
import Cart from "./pages/cart.js";
import Checkout from "./pages/checkout.js";
import CookiePolicy from "./pages/cookiePolicy.js";
import LegalNotice from "./pages/legalNotice.js";
import TermsOfService from "./pages/termsOfService.js";

const store = new Store({ user: null, theme: 'light' });
store.subscribe((state) => console.log('[Store] State updated:', state));

const app = new Framework('app', { store }, true);

const routes = {
    '/': {meta: { title: 'Home' }, view: () => AppLayout({view: HomePage()}) },
    '/about': {meta: { title: 'About Us' }, view: () => AppLayout({view: AboutPage()}) },
    '/contact': {meta: { title: 'Contact Us' }, view: () => AppLayout({view: ContactPage()}) },
    '/allProducts': {meta: { title: 'All Products' }, view: () => AppLayout({view: AllProductsPage()}) },
    '/cart': {meta: { title: 'Cart' }, view: () => AppLayout({view: Cart()}) },
    '/checkout': {meta: { title: 'Checkout' }, view: () => AppLayout({view: Checkout()}) },
    '/cookiePolicy': {meta: { title: 'Cookie Policy' }, view: () => AppLayout({view: CookiePolicy()}) },
    '/legalNotice': {meta: { title: 'Legal Notice' }, view: () => AppLayout({view: LegalNotice()}) },
    '/termsOfService': {meta: { title: 'Terms Of Service' }, view: () => AppLayout({view: TermsOfService()}) },
}

const router = new Router(routes, app, true);
router.updateView();
