import React from 'react'
import { Layout, Form, Input, Button, message, Row, Col } from 'antd';
import { GET_ADMIN_ROLES, GET_ADMIN_PERMISSION, ADD_ADMIN_ROLE, UPDATE_ADMIN_ROLE } from '../../../graphql/Admin/roles';

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
import Card from 'antd/es/card';
import Modal from 'antd/es/modal';
import Select from 'antd/es/select';
import Checkbox from 'antd/es/checkbox';
import includes from 'lodash/includes';
import size from 'lodash/size';
const { Content } = Layout;
const { Title } = Typography;
const { Panel } = Collapse;
const { Option } = Select;
class Add_Roles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            dataSource: [],
            loading: false,
            imageUrl: '',
            update: false,
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
            _phone: "",
            role_permission: false,
            individual_permission: false,
            roles: '',
            roles_options: [],
            individual_based_permissions: [],
            role_based_permissions_detail: [],
            preview_permission: [],
            orginal_permissions_id: [],
            permissions_id: []
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
        this.fetch_add_permission();
    }

    fetch_find_user = async () => {
        await client.query({
            query: GET_ADMIN_ROLES,
            variables: { _id: this.props.match.params.id },
            fetchPolicy: 'no-cache',
        }).then(result => {
            console.log(result);
            this.setState({
                update: true,
                update_data: result.data?.get_admin_roles.data[0],
                permissions_id: result.data?.get_admin_roles.data[0].permissions || [],
                orginal_permissions_id: result.data?.get_admin_roles.data[0].permissions || [],
                preview_permission: result.data?.get_admin_roles.data[0].role_based_permissions_detail || [],
            });
        });
    }

    fetch_add_permission = async () => {
        await client.query({
            query: GET_ADMIN_PERMISSION,
            fetchPolicy: 'no-cache',
        }).then(result => {
            this.setState({
                role_based_permissions_detail: result.data?.get_admin_permission.data,
            });
        });
    }

    onRoleChanges = (value) => {
        this.setState({
            roles: value
        });

    }

    roles_permission_show = () => {
        this.setState({
            role_permission: !this.state.role_permission
        });
    };

    isActive_Role = e => {
        let permission_data = includes(this.state.permissions_id, e['_id'])
        if (permission_data) {
            // remove perviews permission
            this.setState({
                permissions_id: this.state.permissions_id.filter(i => i !== e['_id'])
            });
        } else {
            //add new permission
            this.setState({
                permissions_id: [...this.state.permissions_id, e['_id']]
            })
        }
    }
    Activated_Role = e => {
        let permission_data = includes(this.state.permissions_id, e['_id'])
        if (permission_data) {
            return true
        } else {
            return false
        }
    }
    roles_permission_ok = async () => {
        await client.mutate({
            mutation: UPDATE_ADMIN_ROLE,
            variables: { _id: this.state.update_data['_id'], permissions: this.state.permissions_id },
        }).then((result, loading, error) => {
            Alert_msg(result.data.update_admin_roles);
            if (result.data.update_admin_roles.status === 'success') {
                this.setState({
                    role_permission: false,
                });
            }
        });
    }

    add_new_permission = async () => {
        const { form, history } = this.props;
        form.validateFields(async (err, values) => {
            let input_data = {
                admin_type: 1,
                name: values['name'],
                key: values['key']
            }
            await client.mutate({
                mutation: ADD_ADMIN_ROLE,
                variables: input_data,
            }).then(async (result, loading, error) => {
                Alert_msg(result.data.add_admin_roles);
                if (result.data.add_admin_roles.status === 'success') {
                    history.push(`/admin-roles/add/${result.data.add_admin_roles._id}`);
                }
            });
        })
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
                                <Title level={3}>{
                                    this.state.update ? 'update' : 'Add'
                                } Roles</Title>
                            </Col>
                        </Row>
                        <Row>
                            <Form>
                                <Col span={12} className="px-3">
                                    <Row gutter={12}>
                                        <Form.Item label="Name">
                                            {form.getFieldDecorator("name", {
                                                initialValue: this.state.update_data?.name,
                                                rules: [{ required: true }]
                                            })(<Input placeholder="Name" disabled={this.state.update} />)}
                                        </Form.Item>
                                    </Row>
                                    <Row gutter={12} className={this.state.update ? '' : 'd-none'}>
                                        <Card className='mb-3' bordered={true} hoverable={true}>
                                            <div className="d-flex justify-content-between">
                                                <div className="bold">Roles Permission</div>
                                                <div>
                                                    <Icon onClick={this.roles_permission_show} type="eye" theme="twoTone" twoToneColor="#52c41a" className='f_25' />
                                                </div>
                                            </div>
                                        </Card>
                                    </Row>
                                </Col>
                                <Col span={12} className="px-3">
                                    <Row gutter={12}>
                                        <Form.Item label="Key">
                                            {form.getFieldDecorator("key", {
                                                initialValue: this.state.update_data?.key,
                                                rules: [{ required: true }]
                                            })(<Input placeholder="Key" disabled={this.state.update} />)}
                                        </Form.Item>
                                    </Row>
                                </Col>
                            </Form>
                        </Row>
                        <Modal
                            title="Roles permission"
                            visible={this.state.role_permission}
                            onOk={this.roles_permission_ok}
                            onCancel={this.roles_permission_show}
                            okButtonProps={{ disabled: size(this.state.orginal_permissions_id) === size(this.state.permissions_id) ? true : false }}
                        >
                            <Collapse className="mb-3" accordion >
                                {this.state.role_based_permissions_detail.map((main_permission, i) =>
                                (
                                    <Panel Panel header={<div className="d-flex justify-content-between" >
                                        <div>{main_permission['_id']}</div>
                                        <Badge style={{ backgroundColor: '#52c41a' }} count={main_permission['count'] ? main_permission['count'] : 0} />
                                    </div>} key={i}>
                                        {main_permission['permission'].map(sub_permission => {
                                            return (<div className="d-flex jumbotron p-1 my-2 justify-content-between align-items-center">
                                                <div>
                                                    <div className="bold">{sub_permission['name']}</div>
                                                    <div>{sub_permission['key']}</div>
                                                </div>
                                                <div>
                                                    <Checkbox
                                                        value={main_permission['_id']}
                                                        checked={this.Activated_Role(sub_permission)}
                                                        onChange={() => { this.isActive_Role(sub_permission) }}>
                                                        Active
                                                    </Checkbox>
                                                </div>
                                            </div>)
                                        })}
                                    </Panel>
                                )
                                )}
                            </Collapse>
                        </Modal>
                        <Row>
                            <Col span={24}>
                                <Form.Item className="float-right">
                                    <Button type="primary" htmlType="submit" className="mx-3" onClick={() => { this.props.history.push('/admin-roles') }}>
                                        Cancel
                                    </Button>
                                    <Button type="primary" className={this.state.update ? 'd-none' : ''} htmlType="submit" onClick={this.add_new_permission}>
                                        Submit
                                    </Button>
                                    {/* <Button type="primary" className={this.state.update ? '' : 'd-none'} htmlType="submit" onClick={this.update_user}>
                                        Update
                                    </Button> */}
                                </Form.Item>
                            </Col>
                        </Row>
                    </Content>
                </Layout >
            </Layout >
        );
    }
}

export default Form.create()(Add_Roles);
