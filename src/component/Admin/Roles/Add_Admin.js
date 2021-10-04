import React from 'react'
import { Layout, Form, Input, Button, message, Row, Col } from 'antd';
import { FIND_ADMIN_USER, UPDATE_ADMIN_USER_PERMISSION,GET_ADMIN_PERMISSION, GET_FETCH_ADMIN_PERMISSION } from '../../../graphql/Admin/roles';
import AdminSider from '../Layout/AdminSider';
import AdminHeader from '../Layout/AdminHeader';
import PhoneInput from 'react-phone-input-2'
import { client } from "../../../apollo";
import '../../../scss/template.scss';
import '../../../scss/Category.scss';
import { Alert_msg } from '../../Comman/alert_msg';
import Collapse from 'antd/es/collapse';
import Typography from 'antd/es/typography';
import Badge from 'antd/es/badge';
import Popconfirm from 'antd/es/popconfirm';
import Icon from 'antd/es/icon';
import Card from 'antd/es/card';
import Modal from 'antd/es/modal';
import Select from 'antd/es/select';
import includes from 'lodash/includes';
import Checkbox from 'antd/es/checkbox';
import size from 'lodash/size';
const { Content } = Layout;
const { Title } = Typography;
const { Panel } = Collapse;
const { Option } = Select;
class Add_Admin extends React.Component {
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
            non_role_all_permission: [],
            perview_permission: [],
            perview_roles_permission: [],
            role_based_permissions_detail:[]
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
        this.fetch_add_permission()
    }

    fetch_find_user = async () => {
        await client.query({
            query: FIND_ADMIN_USER,
            variables: { _id: this.props.match.params.id },
            fetchPolicy: 'no-cache',
        }).then(result => {
            console.log(result);
            this.setState({
                update: true,
                update_data: result.data?.get_admin_users.data[0],
                roles_options: result.data?.get_admin_users.data[0].get_admin_roles_all || [],
                perview_permission: result.data?.get_admin_users.data[0].permissions || [],
                perview_roles_permissions: result.data?.get_admin_users.data[0].roles_permissions || [],
                individual_based_permissions: result.data?.get_admin_users.data[0].individual_based_permissions_detail || [],
                non_role_all_permission: result.data?.get_admin_users.data[0].non_role_permissions_detail || [],
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

    isActive_Role = e => {
        let permission_data = includes(this.state.perview_permission, e['_id'])
        if (permission_data) {
            // remove perviews permission
            this.setState({
                perview_permission: this.state.perview_permission.filter(i => i !== e['_id'])
            });
        } else {
            //add new permission
            this.setState({
                perview_permission: [...this.state.perview_permission, e['_id']]
            })
        }
    }
    Activated_Role = e => {
        let permission_data = includes(this.state.perview_permission, e['_id'])
        if (permission_data) {
            return true
        } else {
            return false
        }
    }
    onRoleChanges = (value) => {
        value.forEach(element => {
            let permission_data = includes(this.state.perview_permission, element)
            if (permission_data) {
                // remove perviews permission
                this.setState({
                    perview_permission: this.state.perview_permission.filter(i => i !== element)
                });
            } else {
                //add new permission
                this.setState({
                    perview_permission: [...this.state.perview_permission, element]
                })
            }
        });
    }

    roles_permission_show = () => {
        this.setState({
            role_permission: !this.state.role_permission
        });
    };

    roles_permission_ok = e => {
        this.setState({
            role_permission: false,
        });
    };

    individual_permission_show = () => {
        this.setState({
            individual_permission: !this.state.individual_permission
        });
    };

    individual_permission_ok = e => {
        this.setState({
            individual_permission: false,
        });
    };

    update_user = () => {
        const { form, history } = this.props;
        form.validateFields(async (err, values) => {
            var datas = {
            };
            if (this.state.update_data['_id']) {
                datas['_id'] = this.state.update_data['_id']
            }
            if (values['roles'] && values['roles'] !== this.state.update_data.roles) {
                datas['roles'] = values['roles']
            }
            if (values['name']) {
                datas['name'] = values['name']
            }
            if (values['email']) {
                datas['email'] = values['email']
            }
            if (values['password']) {
                datas['password'] = values['password']
            }
            datas['permissions'] = this.state.perview_permission
            await client.mutate({
                mutation: UPDATE_ADMIN_USER_PERMISSION,
                variables: datas,
            }).then((result, loading, error) => {
                Alert_msg(result.data.update_admin_user_permission);
                if (result.data.update_admin_user_permission.status === "success") {
                    history.push(`/admin-roles`);
                }
            });
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
                                <Title level={3}>Add Admin</Title>
                            </Col>
                        </Row>
                        <Row>
                            <Form>
                                <Col span={12} className="px-3">
                                    <Row gutter={12}>
                                        <Form.Item label="Name">
                                            {form.getFieldDecorator("name", {
                                                initialValue: this.state.update_data.name,
                                                rules: [{ required: true }]
                                            })(<Input placeholder="Name" />)}
                                        </Form.Item>
                                    </Row>
                                    <Row gutter={12}>
                                        <Form.Item label="Email">
                                            {form.getFieldDecorator("email", {
                                                initialValue: this.state.update_data.email,
                                                rules: [{ required: true }]
                                            })(<Input placeholder="Email" />)}
                                        </Form.Item>
                                    </Row>
                                    <Row gutter={12}>
                                        <Form.Item label="Password">
                                            {form.getFieldDecorator("password", {
                                                initialValue: this.state.update_data.password,
                                                rules: [{ required: true }]
                                            })(<Input.Password placeholder="Password" />)}
                                        </Form.Item>
                                    </Row>
                                </Col>
                                <Col className={this.state.update ? 'px-3' : 'd-none'} span={12} >
                                    <Row gutter={12}>
                                        <Form.Item label="Current Role">
                                            {form.getFieldDecorator("roles", {
                                                initialValue: this.state.update_data.roles,
                                                rules: [{ required: false }]
                                            })(
                                                <Select
                                                    placeholder="Select a option and change input text above"
                                                    // onChange={this.onRoleChanges}
                                                    allowClear
                                                >
                                                    {this.state.roles_options.map(item => (
                                                        <Option value={item['_id']}>{item['name']}</Option>
                                                    ))}
                                                </Select>
                                            )}
                                        </Form.Item>
                                    </Row>
                                    <Row gutter={12} className={this.state.update_data.roles ? '' : 'd-none'}>
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
                            </Form>
                        </Row>

                        <Row>
                            <Col span={24}>
                                <Form.Item className="float-right">
                                    <Button type="primary" htmlType="submit" className="mx-3" onClick={() => { this.props.history.push('/admin-roles') }}>
                                        Cancel
                                    </Button>
                                    <Button type="primary" className={this.state.update ? 'd-none' : ''} htmlType="submit" onClick={this.update_user}>
                                        Submit
                                    </Button>
                                    <Button type="primary" className={this.state.update ? '' : 'd-none'} htmlType="submit" onClick={this.update_user}>
                                        Update
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Modal
                            title="Roles permission"
                            visible={this.state.role_permission}
                            onOk={this.update_user}
                            onCancel={this.roles_permission_show}
                            // okButtonProps={{ disabled: true }}
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



                    </Content>
                </Layout>
            </Layout >
        );
    }
}

export default Form.create()(Add_Admin);
