import { lazy } from 'react';
import Layout from './Layout.jsx';
import Home from './pages/Home.jsx';
const BrandStory = lazy(() => import('./pages/BrandStory.jsx'));
const TrayBuilder = lazy(() => import('./pages/TrayBuilder.jsx'));
const Products = lazy(() => import('./pages/Products.jsx'));
const ProductDetail = lazy(() => import('./pages/ProductDetail.jsx'));
const Curation = lazy(() => import('./pages/Curation.jsx'));
const Insights = lazy(() => import('./pages/Insights.jsx'));
const InsightDetail = lazy(() => import('./pages/InsightDetail.jsx'));
const Reviews = lazy(() => import('./pages/Reviews.jsx'));
const Support = lazy(() => import('./pages/Support.jsx'));
import AdminLayout from './pages/admin/AdminLayout.jsx';
const Dashboard = lazy(() => import('./pages/admin/Dashboard.jsx'));
const Inquiries = lazy(() => import('./pages/admin/Inquiries.jsx'));
const AIFlowSettings = lazy(() => import('./pages/admin/AIFlowSettings.jsx'));
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