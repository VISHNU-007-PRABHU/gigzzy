import React from "react";
import { useLocation } from "react-router-dom";

import {
  Layout,
  Row,
  Button,
  Col,
  Avatar,
  Menu,
  Icon,
  Dropdown,
  Skeleton,
} from "antd";
import main from "../../../image/Gigzzy.png";
import useReactRouter from "use-react-router";
import { GET_SETTING } from "../../../graphql/Admin/static";
import { useQuery } from "@apollo/react-hooks";

const { Header } = Layout;

const UserHeader = () => {
  const location = useLocation();
  const { loading, error, data } = useQuery(GET_SETTING, {});
  const { history } = useReactRouter();
  if (loading)
    return (
      <p
        className="container mt-2"
        style={{ backgroundColor: "#eae5e5", width: "100%", height: "30px" }}
      ></p>
    );
  const logout = () => {
    if (localStorage.getItem("userLogin") === "success") {
      localStorage.removeItem("userLogin");
      localStorage.removeItem("user");
      history.push("/login");
    }
  };
  const open_new_tab = (data) => {
    const url = `${data}`;
    console.log(url);
    window.open(url);
  };
 

  const menu = (
    <Menu>
      <Menu.Item
        className={
          localStorage.getItem("userLogin") === "success"
            ? "d-flex align-items-center px-3"
            : "d-none"
        }
        onClick={() => {
          history.push("/");
        }}
      >
        <Icon type="home" />
        Home
      </Menu.Item>
      <Menu.Item
        className={
          localStorage.getItem("userLogin") === "success"
            ? "d-flex align-items-center px-3"
            : "d-none"
        }
        onClick={() => {
          history.push("/profile");
        }}
      >
        <Icon type="user" />
        Profile
      </Menu.Item>
      <Menu.Item
        className={
          localStorage.getItem("userLogin") === "success"
            ? "d-flex align-items-center px-3"
            : "d-none"
        }
        onClick={() => {
          history.push("/bookings");
        }}
      >
        <Icon type="book" />
        Bookings
      </Menu.Item>
      <Menu.Item
        className={
          localStorage.getItem("userLogin") === "success"
            ? "d-flex align-items-center px-3"
            : "d-none"
        }
        onClick={() => {
          open_new_tab("/static_page/about_us");
        }}
      >
        <Icon type="setting" />
        Help & Support
      </Menu.Item>
      <Menu.Item
        className={
          localStorage.getItem("userLogin") === "success"
            ? "d-flex align-items-center px-3"
            : "d-none"
        }
        onClick={() => {
          open_new_tab("/static_page/terms");
        }}
      >
        <Icon type="info-circle" />
        Terms & Conditions
      </Menu.Item>
      <Menu.Item
        className={
          localStorage.getItem("userLogin") === "success"
            ? "d-flex align-items-center px-3"
            : "d-none"
        }
        onClick={logout}
      >
        <Icon type="logout" />
        Logout
      </Menu.Item>
      {/* <Menu.Item
                className={localStorage.getItem('userLogin') === 'success' ? 'd-none' : "d-flex align-items-center px-3"}
                onClick={() => { history.push('/login') }}>
                <Icon type="login" />
                Login
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item
                className="d-flex align-items-center px-3"
                onClick={() => { open_new_tab('/provider_login') }}>
                <Icon type="shop" theme="twoTone" twoToneColor="#52c41a" />
                <span className="primary_color">Become a Provider</span>
            </Menu.Item> */}
    </Menu>
  );

  return (
    <div>
      <Header className="white user_header px-0">
        <Row>
          <Col lg={{ span: 20, offset: 2 }} className="px-1">
            <img
              src={main}
              height="75"
              width="75"
              alt={"Jiffy"}
              className="object_fit cursor_point"
              onClick={() => {
                history.push("/");
              }}
            />{"    "}

              {location.pathname==="/static_page/about_us" ? "": <Button style={{margin:'0px 0px 0px 10px'}}
                    onClick={() => {
                      open_new_tab("/static_page/about_us");
                    }}
                  >
                   About us
                  </Button>}

            <div className="float-right cursor_point">
              {localStorage.getItem("userLogin") === "success" ? (
                <Dropdown overlay={menu} placement="bottomRight">
                  <Avatar
                    shape="circle"
                    className="ant-dropdown-link avatar_shadow"
                    icon={
                      <Icon type="user" style={{ verticalAlign: "baseline" }} />
                    }
                    src={
                      JSON.parse(localStorage.getItem("user"))
                        ? JSON.parse(localStorage.getItem("user")).img_url
                        : ""
                    }
                  />
                </Dropdown>
              ) : (
                <div>
                  <Button
                    onClick={() => {
                      history.push("/login");
                    }}
                    style={{ backgroundColor: "black", color: "white" }}
                  >
                    Login
                  </Button>
                  {"  "}
                  <Button
                    onClick={() => {
                      open_new_tab("/provider_login");
                    }}
                  >
                    Pro Login
                  </Button>
                
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Header>
    </div>
  );
};

export default UserHeader;
