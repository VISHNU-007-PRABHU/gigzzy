import React from "react";
import { withRouter } from "react-router-dom";
import Drawer from 'antd/es/drawer';
import Select from 'antd/es/select';
import Button from 'antd/es/button';
import Collapse from 'antd/es/collapse';
import Typography from 'antd/es/typography';
import Popconfirm from 'antd/es/popconfirm';
import Badge from 'antd/es/badge';
import Input from 'antd/es/input';
import Row from 'antd/es/row';
import Checkbox from 'antd/es/checkbox';
import Icon from 'antd/es/icon';
import Modal from 'antd/es/modal';
import Form from 'antd/es/form';
import { client } from "../../../apollo";
import { Alert_msg } from '../../Comman/alert_msg';
import { DELETE_ADMIN_PERMISSION, GET_FETCH_ADMIN_PERMISSION, GET_ADMIN_PERMISSION, ADD_ADMIN_PERMISSION } from '../../../graphql/Admin/roles';
import RoleView, { RoleViewFunction } from '../../Comman/roles_permission_view'
const { Title } = Typography;
const { Option } = Select;
const { Panel } = Collapse;
let index = 0;
class AdminPermission extends React.Component {
    state = {
        visible: false,
        visibleAddPermission: false,
        dataSource: [],
        pagination: {
            pageSize: 10,
            current: 1,
            total: 0,
            simple: true,
        },
        items: ['jack', 'lucy'],
        permission: [],
        name: '',
        input_new_type: false
    };

    componentDidMount() {
        const { form } = this.props;
        form.resetFields();
        this.fetch_permission();
    }

    fetch_permission = async (visible) => {
        this.setState({ loading: true });

        await client.query({
            query: GET_ADMIN_PERMISSION,
            variables: { limit: this.state.pagination.pageSize, page: this.state.pagination.current },
            fetchPolicy: 'no-cache',
        }).then(result => {
            const pagination = { ...this.state.pagination };
            pagination.total = result.data.get_admin_permission.pageInfo.totalDocs;
            this.setState({
                loading: false,
                pagination,
                permission: result.data.get_admin_permission.data,
                dataSource: result.data.get_admin_permission.data
            });
        });
    }

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };


    showModal = () => {
        this.setState({
            visibleAddPermission: true,
        });
    };
    onClose = () => {
        this.setState({
            visible: false,
        });
        this.props.closePermission()
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.active !== this.state.active) {
            this.setState({ visible: nextProps.active });
        }
    }
    handleDelete = async (_id) => {
        console.log(_id);
        await client.mutate({
            mutation: DELETE_ADMIN_PERMISSION,
            variables: { _id: _id },
        }).then((result, loading, error) => {
            Alert_msg(result.data.delete_admin_permission);
            if (result.data.delete_admin_permission.status === 'success') {
                this.fetch_permission();
            }
        });
    }

    add_new_permission = async () => {
        const { form, history } = this.props;
        form.validateFields(async (err, values) => {
            await client.mutate({
                mutation: ADD_ADMIN_PERMISSION,
                variables: { type: values['input_new_type'] ? values['add_new_type'] : values['type'], name: values['name'], key: values['key'] },
            }).then(async (result, loading, error) => {
                Alert_msg(result.data.add_admin_permission);
                if (result.data.add_admin_permission.status === 'success') {
                    this.fetch_permission();
                    await this.setState({ visibleAddPermission: false })
                }
            });
        })
    };


    render() {
        const { form } = this.props;
        return (
            <>
                <Drawer
                    title={<><div>
                        <RoleView permission="add_permission">
                            <Button type="primary" onClick={this.showModal}>
                                Create a new permission
                            </Button>
                        </RoleView>
                    </div></>}
                    width={500}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    bodyStyle={{ paddingBottom: 80 }}
                    footer={
                        <div
                            style={{
                                textAlign: 'right',
                            }}
                        >
                            <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                                Cancel
                            </Button>
                            <Button onClick={this.onClose} type="primary">
                                Submit
                            </Button>
                        </div>
                    }
                >
                    <div className="p-3">
                        <Collapse accordion >
                            {this.state.dataSource.map((main_permission, i) => (
                                <Panel key={i} header={<div className="d-flex justify-content-between">
                                    <div>{main_permission['_id']}</div>
                                    <Badge count={main_permission['count'] ? main_permission['count'] : 0} />
                                </div>} >
                                    {main_permission['permission'].map(sub_permission => {
                                        return (<div className="d-flex jumbotron p-1 my-2 justify-content-between align-items-center">
                                            <div>
                                                <div className="bold">{sub_permission['name']}</div>
                                                <div>{sub_permission['key']}</div>
                                            </div>
                                            <RoleView permission="delete_permission">
                                                <div>
                                                    <Popconfirm title="Sure to delete this permission ?" onConfirm={() => this.handleDelete(sub_permission['_id'])}>
                                                        <Icon type="delete" theme="twoTone" twoToneColor="#52c41a" className='f_25' />
                                                    </Popconfirm>
                                                </div>
                                            </RoleView>
                                        </div>)
                                    })}
                                </Panel>
                            ))}
                        </Collapse>
                    </div>
                </Drawer>
                <Modal
                    title="Add new permission"
                    visible={this.state.visibleAddPermission}
                    onOk={this.add_new_permission}
                    onCancel={() => { this.setState({ visibleAddPermission: false }) }}
                >

                    <Form.Item label="Input Permission Type">
                        {form.getFieldDecorator("input_new_type", {
                            initialValue: this.state.input_new_type,
                            rules: [{ required: false, message: 'Permission type is required' }]
                        })(<Checkbox onChange={() => { this.setState({ input_new_type: !this.state.input_new_type }) }}>Are you create new permission type</Checkbox>)}
                    </Form.Item>
                    <Form.Item className={this.state.input_new_type ? '' : 'd-none'} label="Permission Type">
                        {form.getFieldDecorator("add_new_type", {
                            rules: [{ required: this.state.input_new_type, message: 'Permission type is required' }]
                        })(<Input placeholder="Enter your new permission" />)}
                    </Form.Item>
                    <Form.Item className={this.state.input_new_type ? 'd-none' : ''} label="Permission type">
                        {form.getFieldDecorator("type", {
                            // initialValue: this.state.permission,
                            rules: [{ required: !this.state.input_new_type, message: 'Permission type is required' }]
                        })(<Select style={{ width: '100%' }} placeholder="Permission type">
                            {this.state.permission.map(data =>
                                <Option key={data._id}>{data._id}</Option>
                            )}
                        </Select>)}
                    </Form.Item>
                    <Form.Item label="Permission Name">
                        {form.getFieldDecorator("name", {
                            initialValue: this.state.name,
                            rules: [{ required: true, message: 'Permission name is required' }]
                        })(<Input placeholder="Permission Name" />)}
                    </Form.Item>
                    <Form.Item label="Permission Key">
                        {form.getFieldDecorator("key", {
                            initialValue: this.state.key,
                            rules: [{ required: true, message: 'Permission key is required' }]
                        })(<Input placeholder="Permission Key" />)}
                    </Form.Item>
                </Modal>
            </>
        );
    }
}
export default Form.create()(withRouter(AdminPermission));