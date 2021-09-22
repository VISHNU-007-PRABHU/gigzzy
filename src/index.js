import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Switch, Redirect, Route, BrowserRouter, useHistory } from 'react-router-dom';
import './index.css';
import './scss/template.scss';
import './scss/user.scss';
import './scss/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';
import { client } from "./apollo";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloProviderHooks } from "@apollo/react-hooks";


const Category = React.lazy(() => import('./component/Admin/Category/Category'));
const Add_Category = React.lazy(() => import('./component/Admin/Category/Add_Category'));
const Subcategory = React.lazy(() => import('./component/Admin/subcategory/Subcategory'));
const Add_Subcategory = React.lazy(() => import('./component/Admin/subcategory/Add_Subcategory'));
const Booking = React.lazy(() => import('./component/Admin/Booking/Booking'));
const Provider = React.lazy(() => import('./component/Admin/Provider/Provider'));
const Add_Provider = React.lazy(() => import('./component/Admin/Provider/Add_Provider'));
const Provider_Verified = React.lazy(() => import('./component/Admin/Provider/Provider_Verified'));
const Certificate = React.lazy(() => import('./component/Admin/Certificate/Certificate'));
const User = React.lazy(() => import('./component/Admin/User/User'));
const Add_User = React.lazy(() => import('./component/Admin/User/Add_User'));
const Static = React.lazy(() => import('./component/Admin/Static/Static'));
const Add_Static = React.lazy(() => import('./component/Admin/Static/Add_static'));

const User_Login = React.lazy(() => import('./component/User/Login/User_Login'));
const Home_Page = React.lazy(() => import('./component/User/HomePage/Home_Page'));
const Profile_Page = React.lazy(() => import('./component/User/Profile/Profile'));
const Bookings_Page = React.lazy(() => import('./component/User/Book/Bookings'));
const NotFound = React.lazy(() => import('./component/Comman/NotFound'));
const Description_Page = React.lazy(() => import('./component/User/Book/Description'));
const Payouts = React.lazy(() => import('./component/Admin/Payouts/Payouts'));
const Review = React.lazy(() => import('./component/Admin/Review/Review'));
const Settings = React.lazy(() => import('./component/Admin/Setting/Setting'));
const Email_Login = React.lazy(() => import("./component/User/Login/Email_Login"));
const Request = React.lazy(() => import("./component/Admin/Request/Request"));
const Booking_Details = React.lazy(() => import("./component/Admin/Booking/Booking_Details"));
const Invoice = React.lazy(() => import('./component/Admin/Booking/invoice'));
const provider_detail = React.lazy(() => import('./component/User/Provider/Provider_Details'));
const provider_earnings = React.lazy(() => import('./component/User/Provider/Provider_Earns'));
const Booking_Detail = React.lazy(() => import('./component/User/Provider/Booking_Detail'));
const Provider_Email_Login = React.lazy(() => import('./component/User/Login/Provider_Email_Login'));
const Provider_Login = React.lazy(() => import('./component/User/Login/Provider_Login'));
const { ConfrimPassword } = React.lazy(() => import('./component/User/Login/ConfrimPassword'));
const { CHECK_DEMO } = React.lazy(() => import('./graphql/User/login'));
const { Alert_msg } = React.lazy(() => import('./component/Comman/alert_msg'));
const StaticPage = React.lazy(() => import('./component/Comman/static_page'));
const FAQ = React.lazy(() => import('./component/User/About/Faq'));
const HowLearnMore = React.lazy(() => import('./component/User/About/HowLearnMore'));

const Currency = React.lazy(() => import('./component/Admin/Currency/Currency'));
const AddCurrency = React.lazy(() => import('./component/Admin/Currency/AddCurrency'));
const LoginPage = React.lazy(() => import('./component/Admin/Layout/LoginPage'));
const Dashboard = React.lazy(() => import('./component/Admin/Dashboard/Dashboard'));

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem('adminLogin') === "success" ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/admin",
            }}
          />
        )
      }
    />
  );
}

const isDemo = async () => {
  if (localStorage.getItem('userLogin') === 'success' && JSON.parse(localStorage.getItem('user')).demo === true) {
    await client.query({
      query: CHECK_DEMO,
      variables: { _id: JSON.parse(localStorage.getItem('user'))._id, },
      fetchPolicy: 'no-cache',
    }).then(result => {
      if (result.data.check_demo_app.status === 'success') {
        localStorage.setItem('userLogin', '');
        localStorage.removeItem('user');
        Alert_msg({ msg: "Your demo account is ended", status: "failed" });
      }
    });
  }
  if (localStorage.getItem('providerLogin') === 'success' && JSON.parse(localStorage.getItem('provider')).demo === true) {
    await client.query({
      query: CHECK_DEMO,
      variables: { _id: JSON.parse(localStorage.getItem('provider'))._id, },
      fetchPolicy: 'no-cache',
    }).then(result => {
      if (result.data.check_demo_app.status === 'success') {
        localStorage.setItem('providerLogin', '');
        localStorage.removeItem('provider');
        Alert_msg({ msg: "Your demo account is ended", status: "failed" });
      }
    });
  }
}

function UserRoute({ component: Component, ...rest }) {
  isDemo();
  return (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem('userLogin') === 'success' ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
            }}
          />
        )
      }
    />
  );
}
function ProviderRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem('providerLogin') === 'success' ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/provider_login",
            }}
          />
        )
      }
    />
  );
}
ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <ApolloProviderHooks client={client}>
        <Switch>
          <Suspense fallback={""}>
            <PrivateRoute path="/admin-dashboard" component={Dashboard} />
            <PrivateRoute path="/admin-category/add" component={Add_Category} exact />
            <PrivateRoute path="/admin-category/add/:id" component={Add_Category} exact />
            <PrivateRoute path="/admin-category" component={Category} />
            <PrivateRoute path="/admin-subcategory" component={Subcategory} />
            <PrivateRoute path="/admin-add-subcategory/:id" component={Add_Subcategory} />
            <PrivateRoute path="/admin-add-subcategory" component={Add_Subcategory} />
            <PrivateRoute path="/admin-booking" component={Booking} />
            <PrivateRoute path="/admin-booking-detail" component={Booking_Details} />
            <PrivateRoute path="/admin-request" component={Request} />
            <PrivateRoute path="/admin-payouts" component={Payouts} />
            <PrivateRoute path="/admin-provider/add" component={Add_Provider} exact />
            <PrivateRoute path="/admin-provider/add/:id" component={Add_Provider} exact />
            <PrivateRoute path="/admin-provider/view/:id" component={Provider_Verified} exact />
            <PrivateRoute path="/admin-provider" component={Provider} exact />
            <PrivateRoute path="/admin-review" component={Review} exact />
            <PrivateRoute path="/admin-certificate" component={Certificate} exact />
            <PrivateRoute path="/admin-user/add" component={Add_User} exact />
            <PrivateRoute path="/admin-user/add/:id" component={Add_User} exact />
            <PrivateRoute path="/admin-user" component={User} exact />
            <PrivateRoute path="/admin-static/add" component={Add_Static} exact />
            <PrivateRoute path="/admin-static/add/:id" component={Add_Static} exact />
            <PrivateRoute path="/admin-static" component={Static} exact />
            <PrivateRoute path="/admin-settings" component={Settings} exact />
            <PrivateRoute path="/admin-currency/add/:id" component={AddCurrency} />
            <PrivateRoute path="/admin-currency/add" component={AddCurrency} />
            <PrivateRoute permission="view_currency" path="/admin-currency" component={Currency} />
            <Route path="/admin-booking-invoice/:id" component={Invoice} exact />
            <Route exact path="/admin" component={LoginPage} />
            <Route exact path="/" component={Home_Page} />
            <Route exact path="/login" component={User_Login} />
            <Route exact path="/Confrim_password/:id" component={ConfrimPassword} />
            <Route exact path="/signup" component={Email_Login} />
            <Route exact path="/static_page/:id" component={StaticPage} />
            <Route exact path="/howlearnmore" component={HowLearnMore} />
            <Route exact path="/faq" component={FAQ} />
            <Route exact path="/provider_login" component={Provider_Login} />
            <Route exact path="/provider_signup" component={Provider_Email_Login} />

            <UserRoute exact path="/profile" component={Profile_Page} />
            <UserRoute exact path="/description/:id" component={Description_Page} />
            <UserRoute exact path="/bookings" component={Bookings_Page} />

            <ProviderRoute exact path="/provider_detail" component={provider_detail} />
            <ProviderRoute exact path="/provider_earnings" component={provider_earnings} />
            <ProviderRoute exact path="/provider-booking-detail" component={Booking_Detail} />
          </Suspense>
          <Route component={NotFound} />
        </Switch>
      </ApolloProviderHooks>
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root'));

serviceWorker.unregister();