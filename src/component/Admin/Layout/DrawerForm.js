import React from "react";
import { Menu, Icon } from 'antd';
import { BrowserRouter as Link,withRouter } from "react-router-dom";
import { Drawer } from 'antd';
import main from '../../../image/Gigzzy.png';
import '../../../scss/template.scss';
import RoleView,{RoleViewFunction} from '../../Comman/roles_permission_view'
class DrawerForm extends React.Component {
  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const icon_style={
      fontSize: "2.5em",
      color:"white",
  }
    return (
      <div>
        <Icon type="menu-unfold" className="d-inline d-md-none" style={icon_style} onClick={this.showDrawer}/>
        <Drawer
          width={200}
          onClose={this.onClose}
          visible={this.state.visible}
          closable={false}
          placement="left"
        >
          <div className="logo">
            <img src={main} alt={'gigzzy'} className='w-50 object_fit' />
          </div>
          <Menu theme="dark" selectedKeys={[this.props.location.pathname]} mode="inline">
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
        </Drawer>
      </div>
    );
  }
}

export default withRouter(DrawerForm);