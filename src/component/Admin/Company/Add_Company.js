import React, { Suspense } from 'react'
import { withRouter } from "react-router-dom";
import { Layout, Icon, Form, Input, Button, message, Typography, Row, Col, Select, Checkbox, Radio, Tag, Drawer } from 'antd';
import Card from 'antd/es/card'
import Upload from 'antd/es/upload'
import { GET_COMPANY, UPDATE_COMPANY_DETAIL, USER_EMAIL_QUERY } from '../../../graphql/Admin/user';
import AdminSider from '../Layout/AdminSider';
import AdminHeader from '../Layout/AdminHeader';
import { client } from "../../../apollo";
import '../../../scss/template.scss';
import '../../../scss/Category.scss';
import { Alert_msg } from '../../Comman/alert_msg';
import size from 'lodash/size'
import RoleView, { RoleViewFunction } from '../../Comman/roles_permission_view'
import Table from 'antd/es/table'
import Address from "../../User/Book/Address";
import SetAddress from '../../User/Book/SetAddress'
import { LocationContext } from '../../context/Location'

const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;
const CompanyWorker = React.lazy(() => import('./CompanyWorker'));
const ProfileCompany = React.lazy(() => import('./CompanyProfile'));
class Add_Company extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: "",
            visibleAddress: false,
            modalVisible: false,
            dataSource: [],
            loading: false,
            imageUrl: '',
            profile_imageUrl: '',
            update: 0,
            update_data: {},
            file: {},
            logo_file: {},
            profile_file: {},
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
            visible: false,
            company_address: [],
            address_id: '',
        };

    }
    componentDidMount() {
        const { form } = this.props;
        let data = localStorage.getItem('hokjighsasd')
        if (data) {
            this.setState({ user_id: JSON.parse(window.atob(data))._id })
        }
        form.resetFields();
        if (this.props.match.params.company_id !== undefined) {
            this.fetch_find_company();
        }
    }

    fetch_find_company = async () => {
        await client.query({
            query: GET_COMPANY,
            variables: { company_id: this.props.match.params.company_id },
            fetchPolicy: 'no-cache',
        }).then(result => {
            console.log(result);
            this.setState({
                update: 1,
                update_data: result.data.get_company_detail.data[0],
                company_provider: result.data.get_company_detail.data[0].get_parent_company_provider,
                company_address: result.data.get_company_detail.data[0].get_company_address_detail
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

    normFile = e => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }


    handle_logo_Change = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status) {
            console.log(info.file.originFileObj);
            this.setState({ logo_file: info.file.originFileObj });
            this.getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
    };

    handle_profile_Change = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status) {
            console.log(info.file.originFileObj);
            this.setState({ profile_file: info.file.originFileObj });
            this.getBase64(info.file.originFileObj, profile_imageUrl =>
                this.setState({
                    profile_imageUrl,
                    loading: false,
                }),
            );
        }
    };
    on_popup_closed = () => {
    
    }
    on_location_change = (data) => {
        if (data) {
            this.setState({ address_id: data.user_address[0]._id, visibleAddress: false })
        }
    }

    update_company = () => {
        const { form, history } = this.props;
        form.validateFields(async (err, values) => {
            if (!err) {
                let company_data = {}
                if (values['company_name']) {
                    company_data['company_name'] = values['company_name']
                }
                if (values['about_company']) {
                    company_data['about_company'] = values['about_company']
                }
                if (values['company_category']) {
                    company_data['company_category'] = values['company_category']
                }

                if (values['company_website']) {
                    company_data['company_website'] = values['company_website']
                }
                if (values['provider_email'] && values['provider_email'].length) {
                    company_data['provider_email'] = values['provider_email']
                }
                if (this.props.match.params.user_id) {
                    company_data['user_id'] = this.props.match.params.user_id
                }
                let update_data = {}
                if (this.props.match.params.company_id) {
                    update_data['_id'] = this.props.match.params.company_id
                }
                if (size(company_data)) {
                    update_data['company_data'] = [company_data]
                }
                if (this.state.logo_file && size(this.state.logo_file)) {
                    update_data['logo_file'] = this.state.logo_file
                }
                if (this.state.profile_file && size(this.state.profile_file)) {
                    update_data['profile_file'] = this.state.profile_file
                }
                await client.mutate({
                    mutation: UPDATE_COMPANY_DETAIL,
                    variables: update_data
                }).then((result, loading, error) => {
                    this.setState({
                        loading: true
                    })
                    Alert_msg(result.data.update_company_detail);
                    if (result.data.update_company_detail.status === "success") {
                        history.push('/admin-company');
                    }
                });
            }
        });
    };

    showDrawer = () => {
        this.setState({
            visible: !this.state.visible,
        });
    };
    goPage = (page, id) => {
        if (page === "profile") {
            let user_url = `/admin-user/add/`
            if (this.props.match.params.user_id) {
                user_url = `/admin-user/add/${this.props.match.params.user_id}`
            }

            this.props.history.push(user_url)
        }
    }
    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const { form } = this.props;
        return (
            <>
                <Drawer
                    title="Create a Profile document"
                    width={500}
                    onClose={this.showDrawer}
                    visible={this.state.visible}
                    bodyStyle={{ paddingBottom: 80 }}
                >
                    <Suspense fallback={<div>.......</div>}>
                        <ProfileCompany></ProfileCompany>
                    </Suspense>
                </Drawer>

                <Layout style={{ height: '100vh' }}>
                    <AdminSider update_collapsed={this.state.collapsed} />
                    <Layout>
                        <AdminHeader />
                        <Content className="main_frame">
                            <Row gutter={[24, 24]}>
                                <Col span={24}>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <Title level={3}>Add Company</Title>
                                        <div>
                                            <Button className="mx-2" type="primary" shape="round" size={'small'} onClick={this.showDrawer}>
                                                Document
                                            </Button>
                                            <Button className="mx-2" type="primary" shape="round" size={'small'} onClick={() => { this.goPage("profile") }}>
                                                Profile
                                            </Button>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Form>
                                <Row>
                                    <Col span={12} className="px-3">
                                        {/* left side */}
                                        <Row gutter={12}>
                                            <Col span={24}>
                                                <Form.Item label="Company Name">
                                                    {form.getFieldDecorator("company_name", {
                                                        initialValue: this.state.update_data.company_name,
                                                        rules: [{ required: true }]
                                                    })(<Input placeholder="Company Name" />)}
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={12}>
                                            <Col span={24}>
                                                <Form.Item label="Company Website">
                                                    {form.getFieldDecorator("company_website", {
                                                        initialValue: this.state.update_data.company_website,
                                                        rules: [{ required: true }]
                                                    })(<Input placeholder="Company Website" />)}
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={12}>
                                            <Col span={24}>
                                                <Form.Item label="Company About">
                                                    {form.getFieldDecorator("about_company", {
                                                        initialValue: this.state.update_data.about_company,
                                                        rules: [{ required: true }]
                                                    })(<Input.TextArea placeholder="Company About" />)}
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={12} className="px-3">
                                        {/* right side */}
                                        <Row gutter={12}>
                                            <Col span={24}>
                                                <Form.Item label="Provider Email">
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
                                                <Form.Item label="Company Category">
                                                    {form.getFieldDecorator("company_category", {
                                                        initialValue: this.state.update_data.company_category,
                                                        rules: [{ required: true }]
                                                    })(<Input placeholder="Company Category" />)}
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={12}>
                                            <Col span={24}>

                                            </Col>
                                        </Row>

                                        <LocationContext.Provider value={{
                                            location_change: this.on_location_change,
                                            popup_closed: this.on_popup_closed
                                        }}>
                                            <Card onClick={() => { this.setState({ visibleAddress: true }) }}>
                                                Address
                                                {this.state.address_id}
                                            </Card>
                                            <SetAddress user_id={this.state.user_id} address_id={this.state.address_id} />
                                        <Address visible={this.state.visibleAddress} user_id={this.state.user_id} address_id={this.state.address_id} />
                                        </LocationContext.Provider>
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
            </>
        );
    }
}

export default Form.create()(Add_Company);
