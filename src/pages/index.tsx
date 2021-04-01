import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Loader from 'components/atoms/Loader';
import { Layout } from 'antd';
import Sidebar from 'oldPage/components/Sidebar';
import HeaderWrapper from 'oldPage/components/Header';
import FooterWrapper from 'oldPage/components/Footer';
const { Content } = Layout;

const HomePage = lazy(() => import('pages/HomePage'));
const NewsPage = lazy(() => import('pages/NewsPage'));
const PartnersPage = lazy(() => import('pages/PartnersPage'));
const TransportationPage = lazy(() => import('pages/TransportationPage'));
const StoragePage = lazy(() => import('pages/StoragePage'));
const TradingPage = lazy(() => import('pages/TradingPage'));

const LoginPage = lazy(() => import('pages/LoginPage'));
const RegisterPage = lazy(() => import('pages/RegisterPage'));

// old pages

const Dashboard = lazy(() => import('oldPage/pages/Dashboard'));
const OldNewsPage = lazy(() => import('oldPage/pages/News'));
const StocksPage = lazy(() => import('oldPage/pages/Stocks'));
const ServicesPage = lazy(() => import('oldPage/pages/Services'));
const CompaniesPage = lazy(() => import('oldPage/pages/Companies'));
const Faq = lazy(() => import('oldPage/pages/Faq'));
const About = lazy(() => import('oldPage/pages/About'));
const Profile = lazy(() => import('oldPage/pages/Profile'));
const Trade = lazy(() => import('oldPage/pages/Trade'));
const Transport = lazy(() => import('oldPage/pages/Transport'));
const AccountInsurance = lazy(() => import('oldPage/pages/Account_insurance'));
const AccountForwarder = lazy(() => import('oldPage/pages/Account_forwarder'));
const AccountSecurity = lazy(() => import('oldPage/pages/Account_security'));
const AccountCompany = lazy(() => import('oldPage/pages/Account_company'));
const AccountBank = lazy(() => import('oldPage/pages/Account_bank'));
const AccountStore = lazy(() => import('oldPage/pages/AccountStore'));
const TradeHistory = lazy(() => import('oldPage/pages/TradeHistory'));
const ChatsPage = lazy(() => import('oldPage/pages/Chats'));
const Settings = lazy(() => import('oldPage/pages/Settings'));
const ForgetPage = lazy(() => import('oldPage/pages/Forget'));
const PaymentSuccessPage = lazy(() => import('oldPage/pages/PaymentSuccess'));

export default function RouterContainer(): JSX.Element {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route path="/" exact={true}>
            <HomePage />
          </Route>
          <Route path="/news">
            <NewsPage />
          </Route>
          <Route path="/partners">
            <PartnersPage />
          </Route>
          <Route path="/transportation">
            <TransportationPage />
          </Route>
          <Route path="/trading">
            <TradingPage />
          </Route>
          <Route path="/storage">
            <StoragePage />
          </Route>

          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/register">
            <RegisterPage />
          </Route>
          <Layout className="main-layout">
            {window.innerWidth > 992 && <Sidebar />}
            <Layout className="content-layout">
              <HeaderWrapper />
              <Content className="content-block">
                <Route path="/dashboard" component={Dashboard}/>
                <Route path="/news/:item_id?" component={OldNewsPage}/>
                <Route path="/stocks" component={StocksPage}/>
                <Route path="/services" component={ServicesPage}/>
                <Route path="/companies" component={CompaniesPage}/>

                <Route path="/faq" component={Faq}/>
                <Route path="/about" component={About}/>
                <Route path="/profile/:company_id" component={Profile}/>
                <Route path="/trade/:contract_id" component={Trade}/>
                <Route path="/transport" component={Transport}/>
                <Route path="/account/insurance" component={AccountInsurance}/>
                <Route path="/account/forwarder" component={AccountForwarder}/>
                <Route path="/account/security" component={AccountSecurity}/>
                <Route path="/account/company" component={AccountCompany}/>
                <Route path="/account/bank" component={AccountBank}/>
                <Route path="/account/store" component={AccountStore}/>
                <Route path="/trades" component={TradeHistory}/>
                <Route path="/messages/:user_id?" component={ChatsPage}/>
                <Route path="/settings/" component={Settings}/>
                <Route path="/forget_password/:token" component={ForgetPage}/>
                <Route path="/paybox-success" component={PaymentSuccessPage}/>
              </Content>
              {window.innerWidth < 992 && <Sidebar />}
              <FooterWrapper />
            </Layout>
          </Layout>
        </Switch>
      </Suspense>
    </Router>
  );
}
