import React from "react";
import 'antd/dist/antd.css';
import '../../../scss/template.scss';
import AdminSider from '../Layout/AdminSider';
import AdminHeader from '../Layout/AdminHeader';
import { Tabs, Button } from 'antd';
import RoleView, { RoleViewFunction } from '../../Comman/roles_permission_view'
import Layout from 'antd/es/layout';
import CurrencyTable from "./CurrencyTable";

const { Content } = Layout;
const { TabPane } = Tabs;

class Currency extends React.Component {
    state = {
        collapsed: false,
    };
    onToggle = (val) => {
        console.log(val);
        this.setState({
            collapsed: val,
        });
    };
    render() {

        return (
            <Layout style={{ height: '100vh' }}>
                <AdminSider update_collapsed={this.state.collapsed} />
                <Layout>
                    <AdminHeader />
                    <Content className="main_frame">
                        <Tabs tabBarExtraContent={
                            <RoleView permission="">
                                <Button type="primary" onClick={() => { this.props.history.push('/admin-currency/add'); }}>
                                    Add Currency
                                </Button>
                            </RoleView>
                        }>
                            <TabPane tab="Currency" key="1">
                                <CurrencyTable />
                            </TabPane>
                        </Tabs>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default Currency;
