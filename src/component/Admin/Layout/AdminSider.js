import React from "react";
import { Menu, Icon, Layout } from "antd";
import { BrowserRouter as Router,Link, withRouter } from "react-router-dom";
import main from "../../../image/Gigzzy.png";
import "../../../scss/template.scss";
import RoleView,{RoleViewFunction} from '../../Comman/roles_permission_view'
const { Sider } = Layout;
class AdminSider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      change: 1,
    };
  }
  render() {
    return (
      <div>
        <Sider
          style={{ overflow: "auto", height: "100vh", left: 0 }}
          className="d-none d-sm-none d-lg-block d-xl-block d-xxl-block template_sider bg-gradient-primary"
          trigger={null}
          collapsible
          collapsed={this.props.update_collapsed}
        >
          <div className="logo">
            <img
              src={main}
              alt={"gigzzy"}
              onClick={() => {
                this.props.history.push("/admin-dashboard");
              }}
              className="w-75 object_fit cursor_point"
            />
          </div>
          <Menu
            theme="dark"
            selectedKeys={[this.props.location.pathname]}
            mode="inline"
          >
            <Menu.Item key="/admin-dashboard">
              <Icon type="dashboard" />
              <span>Dashboard</span>
              <Link to="/admin-dashboard" />
            </Menu.Item>
            <Menu.Item key="/admin-user" className={RoleViewFunction('view_user') ? '':'d_none'}>
              <Icon type="user" />
              <span>Users</span>
              <Link to="/admin-user" />
            </Menu.Item>
            <Menu.Item key="/admin-provider" className={RoleViewFunction('view_provider') ? '':'d_none'}>
              <Icon type="shop" />
              <span>Providers</span>
              <Link to="/admin-provider" />
            </Menu.Item>
            <Menu.Item key="/admin-company" className={RoleViewFunction('view_company') ? '':''}>
              <Icon type="bank" />
              <span>Companys</span>
              <Link to="/admin-company" />
            </Menu.Item>
            <Menu.Item key="/admin-category" className={RoleViewFunction('view_category') ? '':'d_none'}>
              <Icon type="deployment-unit" />
              <span>Categories</span>
              <Link to="/admin-category" />
            </Menu.Item>
            <Menu.Item key="/admin-subcategory" className={RoleViewFunction('view_subcategory') ? '':'d_none'}>
              <Icon type="cluster" />
              <span>Sub Categories</span>
              <Link to="/admin-subcategory" />
            </Menu.Item>
            <Menu.Item key="/admin-request" className={RoleViewFunction('view_booking_request') ? '':'d_none'}>
              <Icon type="appstore" />
              <span>Job Request</span>
              <Link to="/admin-request" />
            </Menu.Item>
            <Menu.Item key="/admin-booking" className={RoleViewFunction('view_booking') ? '':'d_none'}>
              <Icon type="appstore" />
              <span>Bookings</span>
              <Link to="/admin-booking" />
            </Menu.Item>
            <Menu.Item key="/admin-contract" className={RoleViewFunction('') ? '':'d_none'}>
              <Icon type="hourglass" />
              <span>Contract</span>
              <Link to="/admin-contract" />
            </Menu.Item>
            <Menu.Item key="/admin-review" className={RoleViewFunction('view_review') ? '':'d_none'}>
              <Icon type="star" />
              <span>Reviews</span>
              <Link to="/admin-review" />
            </Menu.Item>
            <Menu.Item key="/admin-payouts"  className={RoleViewFunction('view_payout') ? '':'d_none'}>
              <Icon type="transaction" />
              <span>Payouts</span>
              <Link to="/admin-payouts" />
            </Menu.Item>
            <Menu.Item key="/admin-certificate"  className={RoleViewFunction('view_certificate') ? '':'d_none'}>
              <Icon type="file-unknown" />
              <span>Certificates</span>
              <Link to="/admin-certificate" />
            </Menu.Item>
            <Menu.Item key="/admin-static"  className={RoleViewFunction('view_staticContent') ? '':'d_none'}>
              <Icon type="book" />
              <span>Static Pages</span>
              <Link to="/admin-static" />
            </Menu.Item>
            <Menu.Item key="/admin-currency"  className={RoleViewFunction('view_currency') ? '':'d_none'}>
              <Icon type="dollar" />
              <span>Currency</span>
              <Link to="/admin-currency" />
            </Menu.Item>
            <Menu.Item key="/admin-roles"  className={RoleViewFunction('view_admin') ? '':'d_none'}>
              <Icon type="usergroup-add" />
              <span>Manage Admin</span>
              <Link to="/admin-roles" />
            </Menu.Item>
            {/* <Menu.Item key="/admin-settings">
              <Icon type="setting" />
              <span>Settings</span>
              <Link to="/admin-settings" />
            </Menu.Item> */}
          </Menu>
        </Sider>
      </div>
    );
  }
}
export default withRouter(AdminSider);
