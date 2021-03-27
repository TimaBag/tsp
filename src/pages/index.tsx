import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const HomePage = lazy(() => import('pages/HomePage'));
const NewsPage = lazy(() => import('pages/NewsPage'));
const PartnersPage = lazy(() => import('pages/PartnersPage'));
const TransportationPage = lazy(() => import('pages/TransportationPage'));
const StoragePage = lazy(() => import('pages/StoragePage'));
const TradingPage = lazy(() => import('pages/TradingPage'));

const LoginPage = lazy(() => import('pages/LoginPage'));
const RegisterPage = lazy(() => import('pages/RegisterPage'));

export default function RouterContainer(): JSX.Element {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
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
        </Switch>
      </Suspense>
    </Router>
  );
}
