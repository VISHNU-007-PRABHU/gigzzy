import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { useLocation } from "react-router";
import { Layout, Skeleton } from 'antd';
import { Switch, Redirect, Route, BrowserRouter, useHistory } from 'react-router-dom';
import './index.css';
import 'antd/dist/antd.css';
import './scss/template.scss';
import './scss/user.scss';
import './scss/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';
import { client } from "./apollo";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloProviderHooks } from "@apollo/react-hooks";
import RoleView, { RoleViewFunction } from './component/Comman/roles_permission_view'



import Category from './component/Admin/Category/Category';
import Add_Category from './component/Admin/Category/Add_Category';
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
import Contract from './component/Admin/Contract/Contract';
import ContractDetail from './component/Admin/Contract/ContractDetail';
import Roles from './component/Admin/Roles/Roles';
import Add_Admin from './component/Admin/Roles/Add_Admin';
import AdminRoles from './component/Admin/Roles/Add_Roles';
import Company from './component/Admin/Company/Company';
import Add_Company from './component/Admin/Company/Add_Company';
import CompanyWorkerAdmin from './component/Admin/Company/CompanyWorkerAdmin';
import ContractBooking from './component/User/Book/contract/ContractBooking';
import ContractUserDetail from './component/User/Book/contract/view/ContractUserDetail';
import User_Login from './component/User/Login/User_Login';
import HomePage from './component/User/HomePage/HomePage';
import Profile_Page from './component/User/Profile/Profile';
import Bookings_Page from './component/User/Book/Bookings';
import Description_Page from './component/User/Book/Description';
import Payouts from './component/Admin/Payouts/Payouts';
import Review from './component/Admin/Review/Review';
import Settings from './component/Admin/Setting/Setting';
import Email_Login from "./component/User/Login/Email_Login";
import Request from "./component/Admin/Request/Request";
import Booking_Details from "./component/Admin/Booking/Booking_Details";
import Invoice from './component/Admin/Booking/invoice';
import NotFound from './component/Comman/NotFound';
import NotAccess from './component/Comman/NotAccess';

import provider_detail from './component/User/Provider/Provider_Details';
import provider_earnings from './component/User/Provider/Provider_Earns';
import Booking_Detail from './component/User/Provider/Booking_Detail';
import Provider_Email_Login from './component/User/Login/Provider_Email_Login';
import Provider_Login from './component/User/Login/Provider_Login';
import { ConfrimPassword } from './component/User/Login/ConfrimPassword';
import StaticPage from './component/Comman/static_page';
import FAQ from './component/User/About/Faq';
import HowLearnMore from './component/User/About/HowLearnMore';
import UserHeader from './component/User/Layout/UserHeader';
import UserFooter from './component/User/Layout/UserFooter';
import Currency from './component/Admin/Currency/Currency';
import AddCurrency from './component/Admin/Currency/AddCurrency';
import LoginPage from './component/Admin/Layout/LoginPage';
import Dashboard from './component/Admin/Dashboard/Dashboard';

const { Content } = Layout;
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

function UserRoute({ component: Component,isFooter, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem('userLogin') === 'success' ? (
          <>
            <Layout className="white">
              <Content className="px-md-5">
                <Suspense fallback={<p className="container mt-2" style={{ backgroundColor: "#eae5e5", width: '100%', height: "30px" }}></p>}>
                  <UserHeader />
                </Suspense>
                <Component {...props} />
                {isFooter &&
                  <Suspense fallback={<Skeleton active />}>
                    <UserFooter />
                  </Suspense>
                }
              </Content>
            </Layout>
          </>
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

function UnAuthRoute({ component: Component, isHeader, isFooter, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => (
        <>
          <Layout className="white">
            <Content className="px-md-5">
              {isHeader &&
                <Suspense fallback={<p className="container mt-2" style={{ backgroundColor: "#eae5e5", width: '100%', height: "30px" }}></p>}>
                  <UserHeader />
                </Suspense>
              }
              <Component {...props} />
              {isFooter &&
                <Suspense fallback={<Skeleton active />}>
                  <UserFooter />
                </Suspense>
              }

            </Content>
          </Layout>
        </>
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
            <PrivateRoute path="/admin-dashboard" component={Dashboard} />
            <PrivateRoute exact path="/admin-category/add" component={Add_Category} />
            <PrivateRoute exact path="/admin-category/add/:id" component={Add_Category} />
            <PrivateRoute exact path="/admin-category" component={Category} />
            <PrivateRoute exact path="/admin-add-subcategory/:id" component={Add_Subcategory} />
            <PrivateRoute exact path="/admin-add-subcategory" component={Add_Subcategory} />
            <PrivateRoute exact path="/admin-subcategory" component={Subcategory} />
            <PrivateRoute exact path="/admin-booking" component={Booking} />
            <PrivateRoute exact path="/admin-booking-detail" component={Booking_Details} />
            <PrivateRoute exact path="/admin-request" component={Request} />
            <PrivateRoute exact path="/admin-payouts" component={Payouts} />
            <PrivateRoute exact path="/admin-provider/add" component={Add_Provider} />
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
            <PrivateRoute path="/admin-currency/add/:id" component={AddCurrency} exact />
            <PrivateRoute path="/admin-currency/add" component={AddCurrency} exact />
            <PrivateRoute permission="view_currency" path="/admin-currency" component={Currency} exact />
            <ProviderRoute exact path="/provider_detail" component={provider_detail} />
            <ProviderRoute exact path="/provider_earnings" component={provider_earnings} />
            <ProviderRoute exact path="/provider-booking-detail" component={Booking_Detail} />
            <PrivateRoute permission="" path="/admin-company/add/:user_id" component={Add_Company} exact />
            <PrivateRoute permission="" path="/admin-company/add/:user_id/:company_id" component={Add_Company} exact />
            <PrivateRoute exact path="/admin-company" component={Company} />
            <PrivateRoute exact path="/admin-company-worker-detail" component={CompanyWorkerAdmin} />
            <PrivateRoute exact path="/admin-contract/view/:id" component={ContractDetail} />
            <PrivateRoute exact path="/admin-contract" component={Contract} />
            <PrivateRoute permission="view_roles" path="/admin-roles" component={Roles} exact />
            <PrivateRoute permission="add_roles" path="/admin-roles/add" component={AdminRoles} exact />
            <PrivateRoute permission="edit_roles" path="/admin-roles/add/:id" component={AdminRoles} exact />
            <PrivateRoute permission="add_admin" path="/admin-admin/add" component={Add_Admin} exact />
            <PrivateRoute permission="edit_admin" path="/admin-admin/add/:id" component={Add_Admin} exact />
            {/* <PrivateRoute exact path="/contract_booking/:id" component={ContractBooking} /> */}
            <PrivateRoute exact path="/contract/view/:id" component={ContractUserDetail} />

            <UnAuthRoute path="/admin-booking-invoice/:type/:id" component={Invoice} exact />
            <UnAuthRoute exact path="/admin" component={LoginPage} />
            <UnAuthRoute isHeader={true} isFooter={true} exact path="/" component={HomePage} />
            <UnAuthRoute exact path="/login" component={User_Login} />
            <UnAuthRoute exact path="/Confrim_password/:id" component={ConfrimPassword} />
            <UnAuthRoute exact path="/signup" component={Email_Login} />
            <UnAuthRoute exact path="/static_page/:id" component={StaticPage} />
            <UnAuthRoute isHeader={true} isFooter={true} exact path="/howlearnmore" component={HowLearnMore} />
            <UnAuthRoute isHeader={true} isFooter={true} exact path="/faq" component={FAQ} />
            <UnAuthRoute exact path="/provider_login" component={Provider_Login} />
            <UnAuthRoute exact path="/provider_signup" component={Provider_Email_Login} />
            <UnAuthRoute exact path="/notaccess" component={NotAccess} />

            <UserRoute exact path="/profile" component={Profile_Page} />
            <UserRoute isFooter={false} exact path="/description/:id" component={Description_Page} />
            <UserRoute isFooter={false} exact path="/bookings" component={Bookings_Page} />
            <UserRoute exact path="/contract_booking/:id" component={ContractBooking} />
            <UserRoute isHeader={true} exact path="/contract/user_view/:id" component={ContractUserDetail} />
          <Route component={NotFound} />
        </Switch >
      </ApolloProviderHooks >
    </ApolloProvider >
  </BrowserRouter >,
  document.getElementById('root'));

serviceWorker.unregister();