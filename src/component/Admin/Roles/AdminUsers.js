import React from "react";
import { withRouter } from "react-router-dom";
import { GET_ADMIN_USER,SEARCH_ADMIN,DELETE_ADMIN_USER } from '../../../graphql/Admin/roles';
import { client } from "../../../apollo";
import { Table,Icon, Popconfirm } from 'antd';
import Tag from 'antd/es/tag';
import Search from "antd/es/input/Search";
import { Alert_msg } from '../../Comman/alert_msg';
class AdminUsers extends React.Component {
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
            query: GET_ADMIN_USER,
            variables: { limit: pager.pageSize, page: pager.current},
            fetchPolicy: 'no-cache',
        }).then(result => {
            const pagination = { ...this.state.pagination };
            pagination.total = result.data.get_admin_users.pageInfo.totalDocs;
            pagination.current = result.data.get_admin_users.pageInfo.page;
            this.setState({ pagination, loading: false, dataSource: result.data.get_admin_users.data });
        });
    };

    fetch_user = async (visible) => {
        this.setState({ loading: true });

        await client.query({
            query: GET_ADMIN_USER,
            variables: { limit: this.state.pagination.pageSize, page: this.state.pagination.current, role: "1" },
            fetchPolicy: 'no-cache',
        }).then(result => {
            const pagination = { ...this.state.pagination };
            pagination.total = result.data.get_admin_users.pageInfo.totalDocs;
            this.setState({ loading: false, pagination, dataSource: result.data.get_admin_users.data });
        });
    }

    handleDelete = async (_id) => {
        await client.mutate({
            mutation: DELETE_ADMIN_USER,
            variables: { _id: _id },
        }).then((result, loading, error) => {
            Alert_msg(result.data.delete_admin_user);
            if (result.data.delete_admin_user.status === 'success') {
                this.fetch_user();
            }
        });
    }

    onFilter = async (value) => {
        console.log(value.target.value);
        var datas = {
            $or: [{ 'name': { $regex: '.*' + value.target.value + '.*', $options: 'i' } },
            { 'email': { $regex: '.*' + value.target.value + '.*', $options: 'i' } }]
        }
        await client.query({
            query: SEARCH_ADMIN,
            variables: { data: datas },
            fetchPolicy: 'no-cache',
        }).then(result => {
            this.setState({ dataSource: result?.data?.admin_search });
        });
    }

    render() {
        const { dataSource } = this.state;

        const columns = [
            {
                title: "Name",
                width: '20%',
                render: (text, record) => {
                    return <span title="Name">{record.name}</span>;
                }

            },
            {
                title: () => {
                    return <div>
                        <div className="d-block">
                            <div>
                                Email
                            </div>
                        </div>
                    </div>
                },
                width: '20%',
                render: (text, record) => {
                    return <span title="Email" style={{ wordBreak: "keep-all" }}>{record.email}</span>;
                }

            },
            {
                title: () => {
                    return <div>
                        <div className="d-block">
                            <div>
                                Roles
                            </div>
                        </div>
                    </div>
                },
                width: '20%',
                render: (text, record) => {
                    return <span title="Email" style={{ wordBreak: "keep-all" }}>
                        {record['roles'] ?
                            <Tag color="purple">{record?.admin_role_detail?.name}</Tag> : record?.admin_role_detail?.msg}
                    </span>;
                }

            },
            {
                title: "Action",
                dataIndex: 'operation',
                render: (text, record) =>
                    this.state.dataSource.length >= 1 ? (
                        <span title="...." className="d-flex d-sm-inline justify-content-around">
                            <span className='cursor_point' onClick={() => { this.props.history.push(`/admin-admin/add/${record._id}`); }}><Icon type="edit" theme="twoTone" twoToneColor="#52c41a" className='mx-3 f_25' /></span>
                            <Popconfirm title="Sure to delete the admin ?" onConfirm={() => this.handleDelete(record._id)}>
                                <Icon type="delete" theme="twoTone" twoToneColor="#52c41a" className='f_25' />
                            </Popconfirm>
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

export default withRouter(AdminUsers);