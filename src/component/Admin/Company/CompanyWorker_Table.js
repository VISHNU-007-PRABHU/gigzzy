import * as React from "react";
import { withRouter } from "react-router-dom";
import { Table, Modal, Form, Avatar, Popconfirm, Tag, Icon, Switch } from "antd";
import { GET_COMPANY, DELETE_COMPANY_PROVIDER } from '../../../graphql/Admin/user';
import { client } from "../../../apollo";
import '../../../scss/template.scss';
import { Alert_msg } from '../../Comman/alert_msg';
import Search from "antd/lib/input/Search";
import RoleView, { RoleViewFunction } from '../../Comman/roles_permission_view'
class CompanyWorkerTable extends React.Component {
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
        },
    }
    componentDidMount() {
        if (this.props.match.params.id) {
            this.fetch_find_company();
        }
    }
    handleTableChange = async pagination => {
        const pager = { ...pagination };
        pager.current = pagination.current;
        this.setState({ loading: true });
        await client.query({
            query: GET_COMPANY,
            variables: { limit: pager.pageSize, page: pager.current },
            fetchPolicy: 'no-cache',
        }).then(result => {
            const pagination = { ...this.state.pagination };
            pagination.total = result.data.get_company_detail.pageInfo.totalDocs;
            pagination.current = result.data.get_company_detail.pageInfo.page;
            this.setState({ pagination, loading: false, dataSource: result.data.get_company_detail.data });
        });
    };

    fetch_find_company = async (datas) => {
        let provider_search = {
            register_status: "success",
            register_link_status: "accepted"
        }
        if (this.props['type'] === "inactive"){
            provider_search = {
                $or: [
                    {
                        register_link_status: { $ne: "success" }
                    },
                    {
                        register_status: { $ne: "accepted" }
                    }
                ]
            }
        }
        if(datas){
            provider_search = {...provider_search,...datas}
        }
        await client.query({
            query: GET_COMPANY,
            variables: { company_id: this.props.match.params.id,provider_search },
            fetchPolicy: 'no-cache',
        }).then(result => {
            this.setState({
                update: 1,
                dataSource: result.data.get_company_detail.data[0].get_parent_company_provider,
            });
        });
    }


    handleDelete = async (_id) => {
        await client.mutate({
            mutation: DELETE_COMPANY_PROVIDER,
            variables: { _id: _id },
        }).then((result, loading, error) => {
            Alert_msg(result.data.deleteCompanyProvider);
            if (result.data.deleteCompanyProvider.status === 'success') {
                this.fetch_find_company();
            }
        });
    }


    onFilter_Ref = async (data) => {
        if (data.target.value) {
            var datas = { 'email': { $regex: '.*' + data.target.value + '.*', $options: 'i' } }
            this.fetch_find_company(datas);
        } else {
            this.fetch_find_company();
        }
    }

    render() {
        const columns = [
            {
                title: 'Email',
                render: (text, record) => {
                    return <span title="Email">{record.email}</span>;
                }
            },
            {
                title: 'Link Sent Date',
                render: (text, record) => {
                    return <span title="Link Sent Date">{<Tag color="geekblue">{record.created_at}</Tag>}</span>;
                },
            },
            {
                title: 'Register Link Status',
                render: (text, record) => {
                    return <span title="Register Link Status">{<Tag color="geekblue">{record.register_link_status}</Tag>}</span>;
                },
            },
            {
                title: 'Provider Register Status',
                render: (text, record) => {
                    return <span title="Provider Register Status">{<Tag color="geekblue">{record.register_status}</Tag>}</span>;
                },
            },
            {
                title: 'View',
                render: (text, record) =>
                    this.state.dataSource.length >= 1 ? (
                        <span title="...." className="d-flex justify-content-around">
                            <RoleView permission="">
                                <span className="cursor_point">
                                    <Icon type="eye" theme="twoTone" twoToneColor="#52c41a"  className={this.props['type'] === "inactive" ? 'd-none':'mx-3 f_25'} />
                                </span>
                            </RoleView>
                            
                            <RoleView permission="" >
                                <Popconfirm title="Sure to delete this worker ?" onConfirm={() => this.handleDelete(record._id)}>
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
                    <Search className='' size="large" placeholder="Search Worker Email" onKeyUp={(event) => { this.onFilter_Ref(event) }} loading={false} />

                </div>
                <div id="no-more-tables">
                    <Table
                        className='table_shadow'
                        rowKey={record => record.id}
                        loading={this.state.loading}
                        dataSource={this.state.dataSource}
                        columns={columns}
                        pagination={false}
                    />
                </div>
            </React.Fragment>
        );
    }
}

export default Form.create()(withRouter(CompanyWorkerTable));