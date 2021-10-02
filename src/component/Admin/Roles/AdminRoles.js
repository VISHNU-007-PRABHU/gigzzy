import React from "react";
import { withRouter } from "react-router-dom";
import { GET_ADMIN_ROLES, DELETE_ADMIN_ROLES, SEARCH_ROLE } from '../../../graphql/Admin/roles';
import { client } from "../../../apollo";
import { Table, Button, Icon, Popconfirm } from 'antd';
import { Alert_msg } from '../../Comman/alert_msg';
import Search from "antd/es/input/Search";
import RoleView, { RoleViewFunction } from '../../Comman/roles_permission_view'
class AdminRoles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            search_user: [],
            loading: false,
            pagination: {
                pageSize: 10,
                current: 1,
                total: 0,
                simple: true,
            }
        };
    }
    componentDidMount() {
        this.fetch_user();
    }
    handleTableChange = async pagination => {
        const pager = { ...pagination };
        pager.current = pagination.current;
        this.setState({ loading: true });

        await client.query({
            query: GET_ADMIN_ROLES,
            variables: { limit: pager.pageSize, page: pager.current, role: "1" },
            fetchPolicy: 'no-cache',
        }).then(result => {
            console.log(result.data);
            const pagination = { ...this.state.pagination };
            pagination.total = result.data.get_admin_roles.pageInfo.totalDocs;
            pagination.current = result.data.get_admin_roles.pageInfo.page;
            console.log(pagination);
            this.setState({ pagination, loading: false, dataSource: result.data.get_admin_roles.data });
        });
    };

    fetch_user = async (visible) => {
        this.setState({ loading: true });

        await client.query({
            query: GET_ADMIN_ROLES,
            variables: { limit: this.state.pagination.pageSize, page: this.state.pagination.current, role: "1" },
            fetchPolicy: 'no-cache',
        }).then(result => {
            const pagination = { ...this.state.pagination };
            pagination.total = result.data.get_admin_roles.pageInfo.totalDocs;
            this.setState({ loading: false, pagination, dataSource: result.data.get_admin_roles.data });
        });
    }

    handleDelete = async (_id) => {
        await client.mutate({
            mutation: DELETE_ADMIN_ROLES,
            variables: { _id: _id },
        }).then((result, loading, error) => {
            Alert_msg(result.data.delete_admin_roles);
            if (result.data.delete_admin_roles.status === 'success') {
                this.fetch_user();
            }
        });
    }

    onFilter = async (value) => {
        console.log(value.target.value);
        var datas = { $or: [{ 'name': { $regex: '.*' + value.target.value + '.*', $options: 'i' } }, { 'key': { $regex: '.*' + value.target.value + '.*', $options: 'i' } }] }
        await client.query({
            query: SEARCH_ROLE,
            variables: { data: datas },
            fetchPolicy: 'no-cache',
        }).then(result => {
            this.setState({ dataSource: result?.data?.roles_search });
        });
    }
    render() {
        const { dataSource } = this.state;

        const columns = [
            {
                title: "Roles Name",
                width: '20%',
                render: (text, record) => {
                    return <span title="Roles Name">{record?.name}</span>;
                }

            },
            {
                title: () => {
                    return <div>
                        <div className="d-block">
                            <div>
                                Key Roles
                            </div>
                        </div>
                    </div>
                },
                width: '20%',
                render: (text, record) => {
                    return <span title="Key Roles" style={{ wordBreak: "keep-all" }}>{record?.key}</span>;
                }

            },
            {
                title: "Action",
                dataIndex: 'operation',
                className: RoleViewFunction('edit_roles') || RoleViewFunction('delete_roles') ? '' : 'd-none',
                render: (text, record) =>
                    this.state.dataSource.length >= 1 ? (
                        <span title="...." className="d-flex d-sm-inline justify-content-around">
                            <RoleView permission="edit_roles">
                                <span className='cursor_point' onClick={() => { this.props.history.push(`/admin-roles/add/${record._id}`); }}><Icon type="edit" theme="twoTone" twoToneColor="#52c41a" className='mx-3 f_25' /></span>
                            </RoleView>
                            <RoleView permission="delete_roles">
                                <Popconfirm title="Sure to delete the user ?" onConfirm={() => this.handleDelete(record._id)}>
                                    <Icon type="delete" theme="twoTone" twoToneColor="#52c41a" className='f_25' />
                                </Popconfirm>
                            </RoleView>
                        </span>
                    ) : null,
            },
        ];


        return (
            <div>
                <div className='mx-2 mx-sm-0 mb-3'>
                    <Search size="large" placeholder="search" onKeyUp={(event) => { this.onFilter(event) }} loading={false} />
                </div>
                <div id="no-more-tables">
                    <Table
                        rowClassName={() => 'editable-row'}
                        className='table_shadow'
                        dataSource={dataSource}
                        columns={columns}
                        size="middle"
                        pagination={this.state.pagination}
                        onChange={this.handleTableChange}
                        loading={this.state.loading}
                    />
                </div>
            </div>
        );
    }
}

export default withRouter(AdminRoles);