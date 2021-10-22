
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
    };



    render() {

        return (
            <Layout style={{ height: '100vh' }}>
                <AdminSider update_collapsed={this.state.collapsed} />
                <Layout>
                    <AdminHeader />
                    <Content className="main_frame">
                        <Tabs>
                            <TabPane tab="Picked Contract" key="1">
                                <ContractTable booking_status={10}/>
                            </TabPane>
                            <TabPane tab="Ongoing Contract" key="2">
                                <ContractTable booking_status={4}/>
                            </TabPane>
                            <TabPane tab="Completed Contract" key="3">
                                <ContractTable booking_status={14}/>
                            </TabPane>
                            <TabPane tab="Pending Contract" key="4">
                                <ContractTable booking_status={9}/>
                            </TabPane>
                        </Tabs>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}


export default Contract;
