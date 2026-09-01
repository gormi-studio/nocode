import Layout from './Layout.jsx';
import Home from './pages/Home.jsx';
import BrandStory from './pages/BrandStory.jsx';
import TrayBuilder from './pages/TrayBuilder.jsx';
import Products from './pages/Products.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Curation from './pages/Curation.jsx';
import Insights from './pages/Insights.jsx';
import InsightDetail from './pages/InsightDetail.jsx';
import Reviews from './pages/Reviews.jsx';
import Support from './pages/Support.jsx';
import AdminLayout from './pages/admin/AdminLayout.jsx';
import Dashboard from './pages/admin/Dashboard.jsx';
import Inquiries from './pages/admin/Inquiries.jsx';
import AIFlowSettings from './pages/admin/AIFlowSettings.jsx';
export const PAGES = {
  Home,
  'brand-story': BrandStory,
  'tray-builder': TrayBuilder,
  products: Products,
  'products/:slug': ProductDetail,
  curation: Curation,
  insights: Insights,
  'insights/:slug': InsightDetail,
  reviews: Reviews,
  support: Support,
};
export const ADMINS = {
  Dashboard,
  inquiries: Inquiries,
  'ai-settings': AIFlowSettings,
};
export const PRIVATE_PAGES = {};
export const pagesConfig = {
  privatePages: PRIVATE_PAGES,
  mainPage: 'Home',
  Pages: PAGES,
  Layout: Layout,
  Admins: ADMINS,
  adminMainPage: 'Dashboard',
  AdminLayout: AdminLayout,
};