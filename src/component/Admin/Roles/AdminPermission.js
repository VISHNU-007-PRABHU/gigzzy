import React from "react";
import { withRouter } from "react-router-dom";
import Drawer from 'antd/es/drawer';
import Select from 'antd/es/select';
import Button from 'antd/es/button';
import Collapse from 'antd/es/collapse';
import Typography from 'antd/es/typography';
import Popconfirm from 'antd/es/popconfirm';
import Input from 'antd/es/input';
import Icon from 'antd/es/icon';
const { Title } = Typography;


const { Option } = Select;
const { Panel } = Collapse;


class AdminPermission extends React.Component {
    state = {
        visible: false,
        data: [
            {
                permission_type: "user",
                permission: [{
                    type: 'user',
                    name: 'Edit User',
                    key: 'edit_user',
                    is_delete: false
                }, {
                    type: 'user',
                    name: 'Add User',
                    key: 'add_user',
                    is_delete: false
                }, {
                    type: 'user',
                    name: 'Delete User',
                    key: 'delete_user',
                    is_delete: false
                }, {
                    type: 'user',
                    name: 'View User',
                    key: 'view_user',
                    is_delete: false
                }]
            }, {
                permission_type: "Booking",
                permission: [{
                    type: 'user',
                    name: 'Edit User',
                    key: 'edit_user',
                    is_delete: false
                }, {
                    type: 'user',
                    name: 'Add User',
                    key: 'add_user',
                    is_delete: false
                }, {
                    type: 'user',
                    name: 'Delete User',
                    key: 'delete_user',
                    is_delete: false
                }, {
                    type: 'user',
                    name: 'View User',
                    key: 'view_user',
                    is_delete: false
                }]
            }
        ]
    };
    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };
    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.active !== this.state.active) {
            this.setState({ visible: nextProps.active });
        }
    }
    handleDelete = async (_id) => {
        console.log(_id);
        // await client.mutate({
        //     mutation: DELETE_CATEGORY,
        //     variables: { _id: _id },
        // }).then((result, loading, error) => {
        //     Alert_msg(result.data.deleteCategory);
        //     if (result.data.deleteCategory.status === 'success') {
        //         this.fetch_category({ is_parent: true });
        //     }
        // });
    }


    render() {
        return (
            <>
                <Drawer
                    title="Create a new permission"
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
                        {this.state.data.map((main_permission,i) => {
                        console.log("AdminPermission -> render -> i", i)
                            return (
                                <>
                                    <Collapse className="mb-3" collapsible="header" >
                                        <Panel header={main_permission['permission_type']} key="1">
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
                        })}
                    </div>
                </Drawer>
            </>
        );
    }
}
export default withRouter(AdminPermission);