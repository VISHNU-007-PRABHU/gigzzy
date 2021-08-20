import React, { Suspense } from 'react'
import { withRouter } from "react-router-dom";
import { Layout, Icon, Form, Input, Button, message, Typography, Row, Col, Select, Upload, Checkbox, Radio, Tag } from 'antd';
import Card from 'antd/es/card'
import { GET_COMPANY,UPDATE_COMPANY_DETAIL, USER_EMAIL_QUERY } from '../../../graphql/Admin/user';
import AdminSider from '../Layout/AdminSider';
import AdminHeader from '../Layout/AdminHeader';
import { client } from "../../../apollo";
import '../../../scss/template.scss';
import '../../../scss/Category.scss';
import { Alert_msg } from '../../Comman/alert_msg';
import size from 'lodash/size'
import RoleView, { RoleViewFunction } from '../../Comman/roles_permission_view'
import Table from 'antd/es/table'
const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

const CompanyWorker = React.lazy(() => import('./CompanyWorker'));
class Add_Company extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            dataSource: [],
            loading: false,
            imageUrl: '',
            update: 0,
            update_data: {},
            file: {},
            previewVisible: false,
            previewImage: '',
            pagination: {
                pageSize: 5,
                current: 1,
                total: 0,
                simple: true,
            },
            selectedItems: [],
            category: [],
            emails: [],
            company_provider: [],
        };

    }
    componentDidMount() {
        const { form } = this.props;
        form.resetFields();
        console.log(this.props.match.params.id);
        if (this.props.match.params.id !== undefined) {
            this.fetch_find_company();
        }
    }

    fetch_find_company = async () => {
        await client.query({
            query: GET_COMPANY,
            variables: { company_id: this.props.match.params.id },
            fetchPolicy: 'no-cache',
        }).then(result => {
            console.log(result);
            this.setState({
                update: 1,
                update_data: result.data.get_company_detail.data[0],
                company_provider: result.data.get_company_detail.data[0].get_parent_company_provider,
            });
        });
    }
    SearchEmail = async (value) => {
        let data = { 'email': { $regex: '.*' + value + '.*', $options: 'i' }, role: 2 }
        await client.query({
            query: USER_EMAIL_QUERY,
            variables: { data },
            fetchPolicy: 'no-cache',
        }).then(result => {
            console.log(result);
            this.setState({
                emails: result.data.user_search,
            });
        });
    }


    update_company = () => {
        const { form, history } = this.props;
        form.validateFields(async (err, values) => {
            if (!err) {
                let company_data = {}
                if (values['name']) {
                    company_data['name'] = values['name']
                }
                if (values['about']) {
                    company_data['about'] = values['about']
                }
                if (values['website_url']) {
                    company_data['website_url'] = values['website_url']
                }
                if (values['address']) {
                    company_data['address'] = values['address']
                }
                if (values['provider_email'] && values['provider_email'].length) {
                    company_data['provider_email'] = values['provider_email']
                }
                let update_data = {}
                if(this.props.match.params.id){
                    update_data['_id'] = this.props.match.params.id
                 }
                 if(size(company_data)){
                    update_data['company_data'] = [[company_data]]
                 }
                await client.mutate({
                    mutation: UPDATE_COMPANY_DETAIL,
                    variables:update_data
                }).then((result, loading, error) => {
                    Alert_msg(result.data.update_company_detail);
                    if (result.data.update_company_detail.status === "success") {
                        history.push('/admin-company');
                    }
                });
            }
        });
    };



    render() {

        const { form } = this.props;
        return (
            <Layout style={{ height: '100vh' }}>
                <AdminSider update_collapsed={this.state.collapsed} />
                <Layout>
                    <AdminHeader />
                    <Content className="main_frame">
                        <Row gutter={[24, 24]}>
                            <Col span={24}>
                                <Title level={3}>Add Company</Title>
                            </Col>
                        </Row>
                        <Form>
                            <Row>
                                <Col span={12} className="px-3">
                                    <Row gutter={12}>
                                        <Col span={24}>
                                            <Form.Item label="User Name">
                                                {form.getFieldDecorator("name", {
                                                    initialValue: this.state.update_data.name,
                                                    rules: [{ required: true }]
                                                })(<Input placeholder="Name" />)}
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={12}>
                                        <Col span={24}>
                                            <Form.Item label="Website">
                                                {form.getFieldDecorator("website_url", {
                                                    initialValue: this.state.update_data.website_url,
                                                    rules: [{ required: false }]
                                                })(<Input placeholder="Website url" />)}
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={12}>
                                        <Col span={24}>
                                            <Form.Item label="About">
                                                {form.getFieldDecorator("about", {
                                                    initialValue: this.state.update_data.about,
                                                    rules: [{ required: true }]
                                                })(<Input.TextArea placeholder="About" />)}
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={12} className="px-3">
                                    <Row gutter={12}>
                                        <Col span={24}>
                                            <Form.Item label="Email">
                                                {form.getFieldDecorator("provider_email", {
                                                    // initialValue: this.state.update_data.address,
                                                    rules: [{ required: false }]
                                                })(<Select mode="tags" style={{ width: '100%' }} placeholder="Enter your worker email" onSearch={this.SearchEmail}>
                                                    {this.state.emails.map(mailData => (
                                                        <Option key={mailData.email}>{mailData.email}</Option>
                                                    ))}
                                                </Select>)}
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={12}>
                                        <Col span={24}>
                                            <Form.Item label="Address">
                                                {form.getFieldDecorator("address", {
                                                    initialValue: this.state.update_data.address,
                                                    rules: [{ required: true }]
                                                })(<Input.TextArea placeholder="Address" />)}
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Form>
                        <Row className="py-3" gutter={12}>
                            <Col span={24} className="justify-content-end d-flex">
                                <Button type="primary" htmlType="submit" className="mx-3" onClick={() => { this.props.history.push('/admin-company') }}>
                                    Cancel
                                </Button>
                                <Button type="primary" className={this.state.update ? 'd-none' : ''} htmlType="submit" onClick={this.update_company}>
                                    Submit
                                </Button>
                                <Button type="primary" className={this.state.update ? '' : 'd-none'} htmlType="submit" onClick={this.update_company}>
                                    Update
                                </Button>
                            </Col>
                        </Row>
                        <Row className={this.state.update ? '' : 'd-none'} >
                            <Suspense fallback={<div>.......</div>}>
                                <CompanyWorker></CompanyWorker>
                            </Suspense>
                        </Row>
                    </Content>
                </Layout>
            </Layout >
        );
    }
}

export default Form.create()(Add_Company);
