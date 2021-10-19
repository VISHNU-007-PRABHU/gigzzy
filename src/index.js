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
const { Content } = Layout;


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
const Contract = React.lazy(() => import('./component/Admin/Contract/Contract'));
const ContractDetail = React.lazy(() => import('./component/Admin/Contract/ContractDetail'));
const Roles = React.lazy(() => import('./component/Admin/Roles/Roles'));
const Add_Admin = React.lazy(() => import('./component/Admin/Roles/Add_Admin'));
const AdminRoles = React.lazy(() => import('./component/Admin/Roles/Add_Roles'));
const Company = React.lazy(() => import('./component/Admin/Company/Company'));
const Add_Company = React.lazy(() => import('./component/Admin/Company/Add_Company'));
const CompanyWorkerAdmin = React.lazy(() => import('./component/Admin/Company/CompanyWorkerAdmin'));
const ContractBooking = React.lazy(() => import('./component/User/Book/contract/ContractBooking'));
const ContractUserDetail = React.lazy(() => import('./component/User/Book/contract/view/ContractUserDetail'));
const User_Login = React.lazy(() => import('./component/User/Login/User_Login'));
const HomePage = React.lazy(() => import('./component/User/HomePage/HomePage'));
const Profile_Page = React.lazy(() => import('./component/User/Profile/Profile'));
const Bookings_Page = React.lazy(() => import('./component/User/Book/Bookings'));
const Description_Page = React.lazy(() => import('./component/User/Book/Description'));
const Payouts = React.lazy(() => import('./component/Admin/Payouts/Payouts'));
const Review = React.lazy(() => import('./component/Admin/Review/Review'));
const Settings = React.lazy(() => import('./component/Admin/Setting/Setting'));
const Email_Login = React.lazy(() => import("./component/User/Login/Email_Login"));
const Request = React.lazy(() => import("./component/Admin/Request/Request"));
const Booking_Details = React.lazy(() => import("./component/Admin/Booking/Booking_Details"));
const Invoice = React.lazy(() => import('./component/Admin/Booking/invoice'));
const ContractInvoice = React.lazy(() => import('./component/Admin/Booking/ContractInvoice'));

const NotFound = React.lazy(() => import('./component/Comman/NotFound'));
const NotAccess = React.lazy(() => import('./component/Comman/NotAccess'));

const provider_detail = React.lazy(() => import('./component/User/Provider/Provider_Details'));
const provider_earnings = React.lazy(() => import('./component/User/Provider/Provider_Earns'));
const Booking_Detail = React.lazy(() => import('./component/User/Provider/Booking_Detail'));
const Provider_Email_Login = React.lazy(() => import('./component/User/Login/Provider_Email_Login'));
const Provider_Login = React.lazy(() => import('./component/User/Login/Provider_Login'));
const { ConfrimPassword } = React.lazy(() => import('./component/User/Login/ConfrimPassword'));
const StaticPage = React.lazy(() => import('./component/Comman/static_page'));
const FAQ = React.lazy(() => import('./component/User/About/Faq'));
const HowLearnMore = React.lazy(() => import('./component/User/About/HowLearnMore'));
const UserHeader = React.lazy(() => import('./component/User/Layout/UserHeader'));
const UserFooter = React.lazy(() => import('./component/User/Layout/UserFooter'));
const Currency = React.lazy(() => import('./component/Admin/Currency/Currency'));
const AddCurrency = React.lazy(() => import('./component/Admin/Currency/AddCurrency'));
const LoginPage = React.lazy(() => import('./component/Admin/Layout/LoginPage'));
const Dashboard = React.lazy(() => import('./component/Admin/Dashboard/Dashboard'));


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
          <Suspense fallback={<>
            {/* <p className="container mt-2" style={{ backgroundColor: "#eae5e5", width: '100%', height: "30px" }}></p>
            <p className="container mt-2" style={{ backgroundColor: "#eae5e5", width: '100%', height: "100px" }}></p>
            <p className="container mt-2" style={{ backgroundColor: "#eae5e5", width: '100%', height: "100px" }}></p>
            <p className="container mt-2" style={{ backgroundColor: "#eae5e5", width: '100%', height: "100px" }}></p>
            <p className="container mt-2" style={{ backgroundColor: "#eae5e5", width: '100%', height: "100px" }}></p> */}
          </>}>
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

            <UnAuthRoute path="/admin-booking-invoice/:id" component={Invoice} exact />
            <UnAuthRoute path="/admin-contract-invoice/:id" component={ContractInvoice} exact />
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
          </Suspense>
          <Route component={NotFound} />
        </Switch >
      </ApolloProviderHooks >
    </ApolloProvider >
  </BrowserRouter >,
  document.getElementById('root'));

serviceWorker.unregister();