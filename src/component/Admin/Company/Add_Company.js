import React from 'react'
import { withRouter } from "react-router-dom";
import { Layout, Icon, Form, Input, Button, message, Typography, Row, Col, Select, Upload, Checkbox, Radio } from 'antd';
import { GET_COMPANY, USER_EMAIL_QUERY } from '../../../graphql/Admin/user';
import AdminSider from '../Layout/AdminSider';
import AdminHeader from '../Layout/AdminHeader';
import { client } from "../../../apollo";
import '../../../scss/template.scss';
import '../../../scss/Category.scss';
import { Alert_msg } from '../../Comman/alert_msg';
import { CERTIFICATE } from '../../../graphql/Admin/certificate';
const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;
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
    add_category = () => {
        const { form, history } = this.props;
        // form.validateFields(async (err, values) => {
        //     if (!err) {
        //         await client.mutate({
        //             mutation: ADD_CATEGORY,
        //             variables: {
        //                 base_price: values.base_price, hour_limit: values.hour_limit, hour_price: values.hour_price, service_fee: values.service_fee, certificates: values.certificates,
        //                 category_name: values.category_name, description: values.description, file: this.state.file, is_parent: this.state.is_parent, price_type: this.state.price_type, day_price: values.day_price, day_limit: values.day_limit,
        //             },
        //         }).then((result, loading, error) => {
        //             Alert_msg(result.data.addCategory.info);
        //             if (result.data.addCategory.info.status === "success") {
        //                 history.push('/admin-company');
        //             }
        //         });
        //     }
        // });
    };

    update_category = () => {
        const { form, history } = this.props;
        // form.validateFields(async (err, values) => {
        //     if (!err) {
        //         await client.mutate({
        //             mutation: UPDATE_CATEGORY,
        //             variables: {
        //                 base_price: values.base_price, hour_limit: values.hour_limit, hour_price: values.hour_price, service_fee: values.service_fee, certificates: values.certificates,
        //                 category_id: values.category_name, description: values.description, file: this.state.file, _id: this.props.match.params.id, is_parent: this.state.is_parent, price_type: this.state.price_type, day_price: values.day_price, day_limit: values.day_limit
        //             },
        //         }).then((result, loading, error) => {
        //             Alert_msg(result.data.updateCategory.info);
        //             if (result.data.updateCategory.info.status === "success") {
        //                 history.push('/admin-company');
        //             }
        //         });
        //     }
        // });
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
                                            <Form.Item label="Address">
                                                {form.getFieldDecorator("address", {
                                                    // initialValue: this.state.update_data.address,
                                                    rules: [{ required: true }]
                                                })(<Select mode="tags" style={{ width: '100%' }} placeholder="Tags Mode" onSearch={this.SearchEmail}>
                                                    {this.state.emails.map(mailData=>(
                                                        <Option key={mailData.email}>{mailData.email}</Option>
                                                    ))}
                                                </Select>)}
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
                            </Row>
                        </Form>


                        <Row className="py-3" gutter={12}>
                            <Col span={24}>
                                <Button type="primary" htmlType="submit" className="mx-3" onClick={() => { this.props.history.push('/admin-company') }}>
                                    Cancel
                                </Button>
                                <Button type="primary" className={this.state.update ? 'd-none' : ''} htmlType="submit" onClick={this.add_category}>
                                    Submit
                                </Button>
                                <Button type="primary" className={this.state.update ? '' : 'd-none'} htmlType="submit" onClick={this.update_category}>
                                    Update
                                </Button>
                            </Col>
                        </Row>
                    </Content>
                </Layout>
            </Layout >
        );
    }
}

export default Form.create()(Add_Company);
