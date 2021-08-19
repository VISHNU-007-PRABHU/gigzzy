
import React from "react";
import 'antd/dist/antd.css';
import '../../../scss/template.scss';
import AdminSider from '../Layout/AdminSider';
import AdminHeader from '../Layout/AdminHeader';
import CompanyTable from './Company_Table';
import { Layout, Tabs, Button } from 'antd';
import RoleView, { RoleViewFunction } from '../../Comman/roles_permission_view'
const { Content } = Layout;
const { TabPane } = Tabs;
class Company extends React.Component {
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
                                <Button type="primary" onClick={() => { this.props.history.push('/admin-company/add'); }}>
                                    Add Company
                                </Button>
                            </RoleView>
                        }>
                            <TabPane tab="Company" key="1">
                                <CompanyTable />
                            </TabPane>
                            {/* <TabPane tab="Parent Category" key="2">
                                <ParentCategoryTable />
                            </TabPane> */}
                        </Tabs>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}


export default Company;
