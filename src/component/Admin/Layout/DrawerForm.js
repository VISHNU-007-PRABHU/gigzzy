import React from "react";
import { Menu, Icon,  Layout } from 'antd';
import { BrowserRouter as Route,Link,withRouter } from "react-router-dom";
import { Drawer, Button, Select } from 'antd';
import main from '../../../image/Gigzzy.png';
import '../../../scss/template.scss';
const { Option } = Select;

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
            <img src={main} alt={'Jiffy'} className='w-50 object_fit' />
          </div>
          <Menu theme="dark" selectedKeys={[this.props.location.pathname]} mode="inline">
            <Menu.Item key="/admin-dashboard">
              <Icon type="dashboard" />
              <span>Dashboard</span>
              <Link to="/admin-dashboard" />
            </Menu.Item>
            <Menu.Item key="/admin-user">
              <Icon type="user" />
              <span>Users</span>
              <Link to="/admin-user" />
            </Menu.Item>
            <Menu.Item key="/admin-provider">
              <Icon type="shop" />
              <span>Providers</span>
              <Link to="/admin-provider" />
            </Menu.Item>
            <Menu.Item key="/admin-category">
              <Icon type="deployment-unit" />
              <span>Categories</span>
              <Link to="/admin-category" />
            </Menu.Item>
            <Menu.Item key="/admin-subcategory">
              <Icon type="cluster" />
              <span>Sub Categories</span>
              <Link to="/admin-subcategory" />
            </Menu.Item>
            <Menu.Item key="/admin-request">
              <Icon type="appstore" />
              <span>Job Request</span>
              <Link to="/admin-request" />
            </Menu.Item>
            <Menu.Item key="/admin-booking">
              <Icon type="appstore" />
              <span>Bookings</span>
              <Link to="/admin-booking" />
            </Menu.Item>
            <Menu.Item key="/admin-review">
              <Icon type="star" />
              <span>Reviews</span>
              <Link to="/admin-review" />
            </Menu.Item>
            <Menu.Item key="/admin-payouts">
              <Icon type="transaction" />
              <span>Payouts</span>
              <Link to="/admin-payouts" />
            </Menu.Item>
            <Menu.Item key="/admin-certificate">
              <Icon type="file-unknown" />
              <span>Certificates</span>
              <Link to="/admin-certificate" />
            </Menu.Item>
            <Menu.Item key="/admin-static">
              <Icon type="book" />
              <span>Static Pages</span>
              <Link to="/admin-static" />
            </Menu.Item>
            <Menu.Item key="/admin-currency" >
              <Icon type="dollar" />
              <span>Currency</span>
              <Link to="/admin-currency" />
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