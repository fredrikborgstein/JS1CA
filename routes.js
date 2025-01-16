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
import ProductPage from "./pages/productPage.js";

let routes;
export default routes = {
  '/': {meta: { title: 'Home' }, view: () => AppLayout({view: HomePage()}) },
  '/about': {meta: { title: 'About Us' }, view: () => AppLayout({view: AboutPage()}) },
  '/contact': {meta: { title: 'Contact Us' }, view: () => AppLayout({view: ContactPage()}) },
  '/allProducts': {meta: { title: 'All Products' }, view: () => AppLayout({view: AllProductsPage()}) },
  '/cart': {meta: { title: 'Cart' }, view: () => AppLayout({view: Cart()}) },
  '/checkout': {meta: { title: 'Checkout' }, view: () => AppLayout({view: Checkout()}) },
  '/cookiePolicy': {meta: { title: 'Cookie Policy' }, view: () => AppLayout({view: CookiePolicy()}) },
  '/legalNotice': {meta: { title: 'Legal Notice' }, view: () => AppLayout({view: LegalNotice()}) },
  '/termsOfService': {meta: { title: 'Terms Of Service' }, view: () => AppLayout({view: TermsOfService()}) },
  '/productpage/:id': {
    meta: { title: 'Product Page', description: 'View product details' },
    view: async (params) => {
      const productPage = ProductPage();
      if (productPage.onMount) {
        productPage.onMount(params);
      }
      return AppLayout({ view: productPage });
    },
  },
  '/404': {
    meta: { title: '404 - Not Found' },
    view: () => `
            <div style="text-align: center; padding: 20px;">
                <h1>404 - Page Not Found</h1>
                <p>The page you are looking for does not exist.</p>
                <a href="/" class="btn">Go Home</a>
            </div>
        `,
  },
};