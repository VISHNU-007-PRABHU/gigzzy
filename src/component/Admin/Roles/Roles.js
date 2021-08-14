
import React, { Suspense } from "react";
import 'antd/dist/antd.css';
import '../../../scss/template.scss';
import Layout from 'antd/es/layout';
import Tabs from 'antd/es/tabs';
import Button from 'antd/es/button';
import Skeleton from 'antd/es/skeleton'
const { Content } = Layout;
const { TabPane } = Tabs;

const AdminSider = React.lazy(() => import('../Layout/AdminSider'));
const AdminHeader = React.lazy(() => import('../Layout/AdminHeader'));
const AdminUsers = React.lazy(() => import('./AdminUsers'));
const AdminRoles = React.lazy(() => import('./AdminRoles'));
const AdminPermission = React.lazy(() => import('./AdminPermission'));

class Roles extends React.Component {
    state = {
        collapsed: false,
        activeKey: "1",
        add_btn: 'admin',
        btns: ['admin', 'roles'],
        add_permission:false,
    };
    changeTab = activeKey => {
        this.setState({
            activeKey,
            add_btn: this.state.btns[activeKey - 1]
        });
    };
    render() {
        return (
            <Layout style={{ height: '100vh' }}>
                <Suspense fallback={<Skeleton active />}>
                    <AdminSider update_collapsed={this.state.collapsed} />
                </Suspense>
                <Layout>
                    <Suspense fallback={<Skeleton active />}>
                        <AdminHeader />
                    </Suspense>
                    <Content className="main_frame">
                        <Tabs
                            onChange={this.changeTab}
                            tabBarExtraContent={<div>
                                <Button className="mx-2" type="primary" onClick={() => { this.props.history.push(`/admin-${this.state.add_btn}/add`); }}>
                                    Add {this.state.add_btn}
                                </Button>
                                <Button className={this.state.activeKey === "2" ? '' : 'd-none'} type="primary" onClick={() => {this.setState({add_permission:true}) }}>
                                    Add permission
                                </Button>
                                <Suspense fallback={<Skeleton active />}>
                                    <AdminPermission active={this.state.add_permission} />
                                </Suspense>
                            </div>
                            }>
                            <TabPane tab="Admin Users" key="1">
                                <Suspense fallback={<Skeleton active />}>
                                    <AdminUsers />
                                </Suspense>
                            </TabPane>
                            <TabPane tab="Roles & Permission" key="2">
                                <Suspense fallback={<Skeleton active />}>
                                    <AdminRoles />
                                </Suspense>
                            </TabPane>
                        </Tabs>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}
export default Roles;
