
import React from "react";
import 'antd/dist/antd.css';
import '../../../scss/template.scss';
import AdminSider from '../Layout/AdminSider';
import AdminHeader from '../Layout/AdminHeader';
import CompanyWorkerTable from './CompanyWorker_Table'
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
            <Tabs>
                <TabPane tab="Active workers" key="1">
                    <CompanyWorkerTable type="active" />
                </TabPane>
                <TabPane tab="Pending workers" key="2">
                    <CompanyWorkerTable type="inactive" />
                </TabPane>
            </Tabs>
        );
    }
}


export default Company;
