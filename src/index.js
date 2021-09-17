import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Redirect, Route, BrowserRouter } from 'react-router-dom';
import './index.css';
import './scss/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';
import { client } from "./apollo";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloProviderHooks } from "@apollo/react-hooks";
import { LoginPage } from './component/Admin/Layout/LoginPage';
import Dashboard from './component/Admin/Dashboard/Dashboard';
import Category from './component/Admin/Category/Category';
import Add_Category from './component/Admin/Category/Add_Category';
import Company from './component/Admin/Company/Company';
import CompanyWorkerAdmin from './component/Admin/Company/CompanyWorkerAdmin';
import Add_Company from './component/Admin/Company/Add_Company';
import Subcategory from './component/Admin/subcategory/Subcategory';
import Add_Subcategory from './component/Admin/subcategory/Add_Subcategory';
import Booking from './component/Admin/Booking/Booking';
import Provider from './component/Admin/Provider/Provider';
import Add_Provider from './component/Admin/Provider/Add_Provider';
import Provider_Verified from './component/Admin/Provider/Provider_Verified';
import Certificate from './component/Admin/Certificate/Certificate';
import User from './component/Admin/User/User';
import Add_User from './component/Admin/User/Add_User';
import Static from './component/Admin/Static/Static';
import Add_Static from './component/Admin/Static/Add_static';
import User_Login from './component/User/Login/User_Login';
import Home_Page from './component/User/HomePage/Home_Page';
import Profile_Page from './component/User/Profile/Profile';
import Bookings_Page from './component/User/Book/Bookings';
import NotFound from './component/Comman/NotFound';
import NotAccess from './component/Comman/NotAccess';
import Description_Page from './component/User/Book/Description';
import Payouts from './component/Admin/Payouts/Payouts';
import Review from './component/Admin/Review/Review';
import Settings from './component/Admin/Setting/Setting';
import Email_Login from "./component/User/Login/Email_Login";
import Request from "./component/Admin/Request/Request";
import Booking_Details from "./component/Admin/Booking/Booking_Details";
import Invoice from './component/Admin/Booking/invoice';
import provider_detail from './component/User/Provider/Provider_Details';
import provider_earnings from './component/User/Provider/Provider_Earns';
import Booking_Detail from './component/User/Provider/Booking_Detail';
import Provider_Email_Login from './component/User/Login/Provider_Email_Login';
import Provider_Login from './component/User/Login/Provider_Login';
import { ConfrimPassword } from './component/User/Login/ConfrimPassword';
import { CHECK_DEMO } from './graphql/User/login';
import { Alert_msg } from './component/Comman/alert_msg';
import StaticPage from './component/Comman/static_page';
import Roles from './component/Admin/Roles/Roles';
import Add_Admin from './component/Admin/Roles/Add_Admin';
import AdminRoles from './component/Admin/Roles/Add_Roles';
import RoleView, { RoleViewFunction } from './component/Comman/roles_permission_view'
import Contract from './component/Admin/Contract/Contract';
import ContractDetail from './component/Admin/Contract/ContractDetail';
import ContractBooking from './component/User/Book/contract/ContractBooking';
import Currency from './component/Admin/Currency/Currency'
import AddCurrency from './component/Admin/Currency/AddCurrency';
import HowLearnMore from './component/User/About/HowLearnMore';
import ContractUserDetail from './component/User/Book/contract/view/ContractUserDetail';
function PrivateRoute({ permission, component: Component, ...rest }) {
  console.log("PrivateRoute -> permission", permission)
  let permission_condition = true
  if (permission) {
    permission_condition = RoleViewFunction(permission)
  }

  return (
    <Route
      {...rest}
      render={props => {
        if (localStorage.getItem('adminLogin') === "success") {
          if (permission_condition) {
            console.log("PrivateRoute -> permission_condition", "permission_condition")
            return (<Component {...props} />)
          } else {
            return <Redirect
              to={{
                pathname: "/notaccess",
              }}
            />
          }
        } else {
          return <Redirect
            to={{
              pathname: "/admin",
            }}
          />
        }
      }
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
          <Route exact path="/admin" component={LoginPage} />
          <PrivateRoute path="/admin-dashboard" component={Dashboard} />
          <PrivateRoute permission="add_category" path="/admin-category/add" component={Add_Category} exact />
          <PrivateRoute permission="edit_category" path="/admin-category/add/:id" component={Add_Category} exact />
          <PrivateRoute permission="view_category" path="/admin-category" component={Category} />
          <PrivateRoute permission="" path="/admin-company/add" component={Add_Company} exact />
          <PrivateRoute permission="" path="/admin-company/add/:id" component={Add_Company} exact />
          <PrivateRoute path="/admin-company" component={Company} />
          <PrivateRoute path="/admin-company-worker-detail" component={CompanyWorkerAdmin} />
          <PrivateRoute path="/admin-contract/view/:id" component={ContractDetail} />
          <PrivateRoute path="/admin-contract" component={Contract} />
          <PrivateRoute permission="view_subcategory" path="/admin-subcategory" component={Subcategory} />
          <PrivateRoute permission="edit_subcategory" path="/admin-add-subcategory/:id" component={Add_Subcategory} />
          <PrivateRoute permission="add_subcategory" path="/admin-add-subcategory" component={Add_Subcategory} />
          <PrivateRoute permission="view_booking" path="/admin-booking" component={Booking} />
          <PrivateRoute permission="view_booking_detail" path="/admin-booking-detail" component={Booking_Details} />
          <PrivateRoute permission="view_booking_request" path="/admin-request" component={Request} />
          <PrivateRoute path="/admin-currency/add/:id" component={AddCurrency} />
          <PrivateRoute path="/admin-currency/add" component={AddCurrency} />
          <PrivateRoute permission="view_currency" path="/admin-currency" component={Currency} />
          <PrivateRoute permission="view_payout" path="/admin-payouts" component={Payouts} />
          <PrivateRoute permission="add_provider" path="/admin-provider/add" component={Add_Provider} exact />
          <PrivateRoute permission="edit_provider" path="/admin-provider/add/:id" component={Add_Provider} exact />
          <PrivateRoute permission="approve_provider" path="/admin-provider/view/:id" component={Provider_Verified} exact />
          <PrivateRoute permission="view_provider" path="/admin-provider" component={Provider} exact />
          <PrivateRoute permission="view_review" path="/admin-review" component={Review} exact />
          <PrivateRoute permission="view_certificate" path="/admin-certificate" component={Certificate} exact />
          <Route path="/admin-booking-invoice/:id" component={Invoice} exact />
          <PrivateRoute permission="add_user" path="/admin-user/add" component={Add_User} exact />
          <PrivateRoute permission="edit_user" path="/admin-user/add/:id" component={Add_User} exact />
          <PrivateRoute permission="view_user" path="/admin-user" component={User} exact />
          <PrivateRoute permission="add_static" path="/admin-static/add" component={Add_Static} exact />
          <PrivateRoute permission="edit_user" path="/admin-static/add/:id" component={Add_Static} exact />
          <PrivateRoute permission="view_user" path="/admin-static" component={Static} exact />
          <PrivateRoute path="/admin-settings" component={Settings} exact />
          <PrivateRoute permission="view_roles" path="/admin-roles" component={Roles} exact />
          <PrivateRoute permission="add_roles" path="/admin-roles/add" component={AdminRoles} exact />
          <PrivateRoute permission="edit_roles" path="/admin-roles/add/:id" component={AdminRoles} exact />
          <PrivateRoute permission="add_admin" path="/admin-admin/add" component={Add_Admin} exact />
          <PrivateRoute permission="edit_admin" path="/admin-admin/add/:id" component={Add_Admin} exact />
          <Route exact path="/" component={Home_Page} />
          <Route exact path="/login" component={User_Login} />
          <Route exact path="/Confrim_password/:id" component={ConfrimPassword} />
          <Route exact path="/signup" component={Email_Login} />
          <Route exact path="/static_page/:id" component={StaticPage}/>
          <Route exact path="/howlearnmore" component={HowLearnMore}/>

          <UserRoute exact path="/profile" component={Profile_Page} />
          <UserRoute exact path="/description/:id" component={Description_Page} />
          <Route exact path="/contract_booking/:id" component={ContractBooking} />
          <Route exact path="/contract/view/:id" component={ContractUserDetail} />
          <Route exact path="/bookings" component={Bookings_Page} />
          <Route exact path="/provider_login" component={Provider_Login} />
          <Route exact path="/provider_signup" component={Provider_Email_Login} />
          <ProviderRoute exact path="/provider_detail" component={provider_detail} />
          <ProviderRoute exact path="/provider_earnings" component={provider_earnings} />
          <ProviderRoute exact path="/provider-booking-detail" component={Booking_Detail} />
          <Route exact path="/notaccess" component={NotAccess} />
          <Route component={NotFound} />
        </Switch>
      </ApolloProviderHooks>
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root'));

serviceWorker.unregister();
