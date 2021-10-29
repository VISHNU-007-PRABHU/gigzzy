
import React from "react";
import 'antd/dist/antd.css';
import '../../../scss/template.scss';
import AdminSider from '../Layout/AdminSider';
import AdminHeader from '../Layout/AdminHeader';
import ContractTable from './ContractTable';
import { Layout, Tabs, Button } from 'antd';
import RoleView, { RoleViewFunction } from '../../Comman/roles_permission_view'
const { Content } = Layout;
const { TabPane } = Tabs;
class Contract extends React.Component {
    state = {
        collapsed: false,
        booking_status: 15
    };


    callback = (key) => {
        this.setState({
            booking_status:Number(key)
        })
    }
    render() {
        return (
            <Layout style={{ height: '100vh' }}>
                <AdminSider update_collapsed={this.state.collapsed} />
                <Layout>
                    <AdminHeader />
                    <Content className="main_frame">
                        <Tabs onChange={this.callback}>
                            <TabPane tab="Un-Approved Contract" key="15">
                                <ContractTable booking_status={this.state.booking_status} />
                            </TabPane>
                            <TabPane tab="Approved Contract" key="9">
                                <ContractTable booking_status={this.state.booking_status} />
                            </TabPane>
                            <TabPane tab="Award Contract" key="10">
                                <ContractTable booking_status={this.state.booking_status} />
                            </TabPane>
                            <TabPane tab="Ongoing Contract" key="4">
                                <ContractTable booking_status={this.state.booking_status} />
                            </TabPane>
                            <TabPane tab="Completed Contract" key="14">
                                <ContractTable booking_status={this.state.booking_status} />
                            </TabPane>
                        </Tabs>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}


export default React.memo(Contract);
