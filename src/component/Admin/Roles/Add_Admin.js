import React from 'react'
import { Layout, Form, Input, Button, message, Row, Col } from 'antd';
import { FIND_ADMIN_USER, UPDATE_ADMIN_USER_PERMISSION } from '../../../graphql/Admin/roles';

import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import Geocode from "react-geocode";
import AdminSider from '../Layout/AdminSider';
import AdminHeader from '../Layout/AdminHeader';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { client } from "../../../apollo";
import '../../../scss/template.scss';
import '../../../scss/Category.scss';
import { Alert_msg } from '../../Comman/alert_msg';
import Collapse from 'antd/es/collapse';
import Typography from 'antd/es/typography';
import Popconfirm from 'antd/es/popconfirm';
import Badge from 'antd/es/badge'
import Icon from 'antd/es/icon';

const { Content } = Layout;
const { Title } = Typography;
const { Panel } = Collapse;

class Add_Admin extends React.Component {
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
            OPTIONS: ['Apples', 'Nails', 'Bananas', 'Helicopters'],
            selectedItems: [],
            category: [],
            address: '',
            lat_lng: {},
            country_code: '',
            m_no: '',
            demo: false,
            _phone: ""
        };

    }
    componentDidMount() {
        console.log(this.props.match.params.id, "testinf");
        const { form } = this.props;
        form.resetFields();
        console.log(this.props.match.params.id, "testinf");
        if (this.props.match.params.id !== undefined) {
            this.fetch_find_user();
        }
    }

    fetch_find_user = async () => {
        await client.query({
            query: FIND_ADMIN_USER,
            variables: { _id: this.props.match.params.id },
            fetchPolicy: 'no-cache',
        }).then(result => {
            console.log(result);
            this.setState({
                update: 1,
                update_data: result.data?.get_admin_users.data[0],
            });
        });
    }

    // add_user = () => {
    //     const { form, history } = this.props;
    //     form.validateFields(async (err, values) => {
    //         if (!err) {
    //             await client.mutate({
    //                 mutation: ADD_USER,
    //                 variables: {
    //                     role: 1,
    //                     country_code: this.state.country_code,
    //                     phone_no: this.state.m_no,
    //                     email: values.email,
    //                     password: values.password,
    //                     name: values.user_name,
    //                     lat: this.state.lat_lng.lat,
    //                     lng: this.state.lat_lng.lng,
    //                     address: this.state.address,
    //                     demo: this.state.demo
    //                 },
    //             }).then((result, loading, error) => {
    //                 Alert_msg(result.data.admin_add_user.info);
    //                 if (result.data.admin_add_user.info.status === "success") {
    //                     history.push('/admin-user');
    //                 }
    //             });
    //         }
    //     });
    // };

    // update_user = () => {
    //     const { form, history } = this.props;
    //     form.validateFields(async (err, values) => {
    //         var datas = {};
    //         console.log(values.phone.length)
    //         if (values.phone.length > 10) {
    //             datas = {
    //                 _id: this.props.match.params.id,
    //                 demo: this.state.demo,
    //                 country_code: this.state.country_code,
    //                 phone_no: this.state.m_no,
    //                 email: values.email,
    //                 password: values.password,
    //                 name: values.user_name,
    //                 lat: this.state.lat_lng.lat,
    //                 lng: this.state.lat_lng.lng,
    //                 address: this.state.address
    //             };
    //         } else {
    //             datas = {
    //                 _id: this.props.match.params.id,
    //                 demo: this.state.demo,
    //                 email: values.email,
    //                 password: values.password,
    //                 name: values.user_name,
    //                 lat: this.state.lat_lng.lat,
    //                 lng: this.state.lat_lng.lng,
    //                 address: this.state.address
    //             };
    //         }

    //         if (!err) {
    //             await client.mutate({
    //                 mutation: UPDATE_USER,
    //                 variables: datas,
    //             }).then((result, loading, error) => {
    //                 Alert_msg(result.data.admin_update_user.info);
    //                 if (result.data.admin_update_user.info.status === "success") {
    //                     history.push('/admin-user');
    //                 }
    //             });
    //         }
    //     });
    // };

    render() {
        const { form } = this.props;
        console.log(this.state.update_data);
        return (
            <Layout style={{ height: '100vh' }}>
                <AdminSider update_collapsed={this.state.collapsed} />
                <Layout>
                    <AdminHeader />
                    <Content className="main_frame">
                        <Row gutter={[24, 24]}>
                            <Col span={24}>
                                <Title level={3}>Add Admin</Title>
                            </Col>
                        </Row>
                        <Row>
                            <Form>
                                <Col span={24}>
                                    <Row gutter={12}>
                                        <Col className="" lg={12}>
                                            <Form.Item label="Name">
                                                {form.getFieldDecorator("name", {
                                                    initialValue: this.state.update_data.name,
                                                    rules: [{ required: true }]
                                                })(<Input placeholder="Name" />)}
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={12}>
                                        <Col className="" lg={12}>
                                            <Form.Item label="Email">
                                                {form.getFieldDecorator("email", {
                                                    initialValue: this.state.update_data.email,
                                                    rules: [{ required: true }]
                                                })(<Input placeholder="Email" />)}
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={12}>
                                        <Col className="" lg={12}>
                                            <Form.Item label="Password">
                                                {form.getFieldDecorator("password", {
                                                    initialValue: this.state.update_data.password,
                                                    rules: [{ required: true }]
                                                })(<Input.Password placeholder="Password" />)}
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={12}>
                                        <div className="p-3">
                                            {/* {this.state.update_data?.role_based_permissions_detail.map((main_permission, i) => {
                                                return (
                                                    <>
                                                        <Collapse className="mb-3" collapsible="header" >
                                                            <Panel header={<div className="d-flex justify-content-between">
                                                                <div>{main_permission['_id']}</div>
                                                                <Badge count={main_permission['count'] ? main_permission['count'] : 0} />

                                                            </div>} key="1">
                                                                {main_permission['permission'].map(sub_permission => {
                                                                    return (<div className="d-flex jumbotron p-1 my-2 justify-content-between align-items-center">
                                                                        <div>
                                                                            <div className="bold">{sub_permission['name']}</div>
                                                                            <div>{sub_permission['key']}</div>
                                                                        </div>
                                                                        <div>
                                                                            <Popconfirm title="Sure to delete this permission ?" onConfirm={() => this.handleDelete(sub_permission['_id'])}>
                                                                                <Icon type="delete" theme="twoTone" twoToneColor="#52c41a" className='f_25' />
                                                                            </Popconfirm>
                                                                        </div>
                                                                    </div>)
                                                                })}
                                                            </Panel>
                                                        </Collapse>
                                                    </>
                                                )
                                            })} */}
                                        </div>
                                    </Row>
                                    <Row>
                                        <Col span={24}>
                                            <Form.Item className="float-right">
                                                <Button type="primary" htmlType="submit" className="mx-3" onClick={() => { this.props.history.push('/admin-roles') }}>
                                                    Cancel
                                                </Button>
                                                <Button type="primary" className={this.state.update ? 'd-none' : ''} htmlType="submit" onClick={this.add_user}>
                                                    Submit
                                                </Button>
                                                <Button type="primary" className={this.state.update ? '' : 'd-none'} htmlType="submit" onClick={this.update_user}>
                                                    Update
                                                </Button>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Col>
                            </Form>
                        </Row>
                    </Content>
                </Layout>
            </Layout >
        );
    }
}

export default Form.create()(Add_Admin);
