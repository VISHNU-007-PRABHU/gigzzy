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
import Icon from 'antd/es/icon';
import { client } from "../../../apollo";
import { GET_ADMIN_PERMISSION } from '../../../graphql/Admin/roles';
const { Title } = Typography;
const { Option } = Select;
const { Panel } = Collapse;
class AdminPermission extends React.Component {
    state = {
        visible: false,
        dataSource: [],
        pagination: {
            pageSize: 10,
            current: 1,
            total: 0,
            simple: true,
        }
    };

    componentDidMount() {
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
            this.setState({ loading: false, pagination, dataSource: result.data.get_admin_permission.data });
        });
    }

    showDrawer = () => {
        this.setState({
            visible: true,
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
                        {this.state.dataSource.map((main_permission, i) => {
                            console.log("AdminPermission -> render -> i", i)
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
                        })}
                    </div>
                </Drawer>
            </>
        );
    }
}
export default withRouter(AdminPermission);