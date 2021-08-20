import * as React from "react";
import { withRouter } from "react-router-dom";
import { Table, Modal, Form, Avatar, Popconfirm, Tag, Icon, Switch } from "antd";
import { GET_COMPANY, DELETE_COMPANY } from '../../../graphql/Admin/user';
import { client } from "../../../apollo";
import '../../../scss/template.scss';
import { Alert_msg } from '../../Comman/alert_msg';
import Search from "antd/lib/input/Search";
import RoleView, { RoleViewFunction } from '../../Comman/roles_permission_view'
class CompanyWorkerAdmin extends React.Component {
    state = {
        modalVisible: false,
        dataSource: [],
        update_data: {},
        update: 0,
        loading: false,
        loading_img: false,
        imageUrl: '',
        file: {},
        previewVisible: false,
        previewImage: '',
        view_img: '',
        pagination: {
            pageSize: 10,
            total: 0,
            current: 1,
            simple: true,
        }
    }
    componentDidMount() {
        this.fetch_category();
    }
    handleTableChange = async pagination => {
        const pager = { ...pagination };
        pager.current = pagination.current;
        this.setState({ loading: true });
        await client.query({
            query: GET_COMPANY,
            variables: { limit: pager.pageSize, page: pager.current},
            fetchPolicy: 'no-cache',
        }).then(result => {
            const pagination = { ...this.state.pagination };
            pagination.total = result.data.get_company_detail.pageInfo.totalDocs;
            pagination.current = result.data.get_company_detail.pageInfo.page;
            this.setState({ pagination, loading: false, dataSource: result.data.get_company_detail.data });
        });
    };

    showModal = () => {
        this.setState({ modalVisible: true });
    };

    closeModal = () => {
        this.setState({ modalVisible: false, update_data: {}, imageUrl: '' });
    };

    fetch_category = async (data) => {
        this.setState({ loading: true });
        let input = {};
        input = data;
        await client.query({
            query: GET_COMPANY,
            variables: { limit: this.state.pagination.pageSize, page:  this.state.pagination.current , search:input},
            fetchPolicy: 'no-cache',
        }).then(result => {
            const pagination = { ...this.state.pagination };
            pagination.total = result.data.get_company_detail.pageInfo.totalDocs;
            this.setState({ loading: false, pagination, dataSource: result.data.get_company_detail.data });
        });
    }


    handleDelete = async (_id) => {
        console.log(_id);
        await client.mutate({
            mutation: DELETE_COMPANY,
            variables: { company_id: _id },
        }).then((result, loading, error) => {
            Alert_msg(result.data.deleteCompany);
            if (result.data.deleteCompany.status === 'success') {
                this.fetch_category();
            }
        });
    }

    change_future = async (data) => {
        // await client.mutate({
        //     mutation: UPDATE_CATEGORY,
        //     variables: data,
        // }).then((result, loading, error) => {
        //     Alert_msg(result.data.updateCategory.info);
        //     this.fetch_category({ is_parent: false });
        // });
    }

    onFilter_Ref = async (data) => {
        if (data.target.value) {
            var datas = { 'name': { $regex: '.*' + data.target.value + '.*', $options: 'i' } }
            this.fetch_category(datas);
        } else {
            this.fetch_category();
        }
    }

    render() {
        const columns = [
            {
                title: <span>Company Name</span>,
                dataIndex: 'company_name',
                width: '25%',
                render: (text, record) => {
                    return <span title="Company Name">{record.name}</span>;
                }
            },
            {
                title: <span>Website</span>,
                dataIndex: 'website',
                width: '25%',
                render: (text, record) => {
                    return <span title="Website">{<Tag color="geekblue">{record.website_url}</Tag>}</span>;
                },
            },
            {
                title: <span>Address</span>,
                dataIndex: 'address',
                width: '25%',
                render: (text, record) => {
                    return <span title="Address">{record?.address}</span>;
                },
            },
            {
                title: 'Action',
                width: '15%',
                dataIndex: 'operation',
                // className: RoleViewFunction('edit_category') || RoleViewFunction('delete_category') ? '' : 'd-none',
                render: (text, record) =>
                    this.state.dataSource.length >= 1 ? (
                        <span title="...." className="d-flex justify-content-around">
                            <RoleView permission="">
                                <span className="cursor_point" onClick={() => { this.props.history.push(`/admin-company/add/${record._id}`); }}><Icon type="edit" theme="twoTone" twoToneColor="#52c41a" className='mx-3 f_25' /></span>
                            </RoleView>
                            <RoleView permission="">
                                <Popconfirm title="Sure to delete this company ?" onConfirm={() => this.handleDelete(record._id)}>
                                    <Icon type="delete" theme="twoTone" twoToneColor="#52c41a" className='f_25' />
                                </Popconfirm>
                            </RoleView>
                        </span>

                    ) : null,
            },
        ];

        return (
            <React.Fragment>

                <div className='mb-3'>
                    <Search className='' size="large" placeholder="Search Company" onKeyUp={(event) => { this.onFilter_Ref(event) }} loading={false} />

                </div>
                <div id="no-more-tables">
                    <Table
                        className='table_shadow'
                        pagination={this.state.pagination}
                        rowKey={record => record.id}
                        loading={this.state.loading}
                        dataSource={this.state.dataSource}
                        columns={columns}
                        onChange={this.handleTableChange}
                    />
                </div>
            </React.Fragment>
        );
    }
}

export default Form.create()(withRouter(CompanyWorkerAdmin));