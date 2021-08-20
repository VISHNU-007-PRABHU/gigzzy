import * as React from "react";
import { withRouter } from "react-router-dom";
import { Table, Modal, Form, Avatar, Popconfirm, Tag, Icon, Switch } from "antd";
import { GET_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY } from '../../../graphql/Admin/category';
import { client } from "../../../apollo";
import '../../../scss/template.scss';
import { Alert_msg } from '../../Comman/alert_msg';
import Search from "antd/lib/input/Search";
import RoleView, { RoleViewFunction } from '../../Comman/roles_permission_view'
class ContractTable extends React.Component {
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
        // this.fetch_category({ is_parent: false });
    }
    handleTableChange = async pagination => {
        const pager = { ...pagination };
        pager.current = pagination.current;
        this.setState({ loading: true });
        await client.query({
            query: GET_CATEGORY,
            variables: { limit: pager.pageSize, page: pager.current, data: { is_parent: false } },
            fetchPolicy: 'no-cache',
        }).then(result => {
            const pagination = { ...this.state.pagination };
            pagination.total = result.data.get_category.pageInfo.totalDocs;
            pagination.current = result.data.get_category.pageInfo.page;
            console.log(pagination);
            this.setState({ pagination, loading: false, dataSource: result.data.get_category.data });
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
            query: GET_CATEGORY,
            variables: { data: input },
            fetchPolicy: 'no-cache',
        }).then(result => {
            const pagination = { ...this.state.pagination };
            pagination.total = result.data.get_category.pageInfo.totalDocs;
            this.setState({ loading: false, pagination, dataSource: result.data.get_category.data });
        });
    }


    handleDelete = async (_id) => {
        console.log(_id);
        await client.mutate({
            mutation: DELETE_CATEGORY,
            variables: { _id: _id },
        }).then((result, loading, error) => {
            Alert_msg(result.data.deleteCategory);
            if (result.data.deleteCategory.status === 'success') {
                this.fetch_category({ is_parent: false });
            }
        });
    }

    change_future = async (data) => {
        await client.mutate({
            mutation: UPDATE_CATEGORY,
            variables: data,
        }).then((result, loading, error) => {
            Alert_msg(result.data.updateCategory.info);
            this.fetch_category({ is_parent: false });
        });
    }

    onFilter_Ref = async (data) => {
        // if (data.target.value) {
        //     var datas = { is_parent: false, 'category_name': { $regex: '.*' + data.target.value + '.*', $options: 'i' } }
        //     this.fetch_category(datas);
        // } else {
        //     this.fetch_category({ is_parent: false });
        // }
    }

    render() {
        const columns = [
            {
                title: <span>Provider Name</span>,
                width: '15%',
                render: (text, record) => {
                    return <span title="Biding Category">{record.biding_category}</span>;
                }
            },
            {
                title: <span>Biding Category</span>,
                width: '15%',
                render: (text, record) => {
                    return <span title="Biding Category">{record.biding_category}</span>;
                }
            },
            {
                title: <span>Type</span>,
                dataIndex: 'is_parent',
                render: (text, record) => {
                    return <span title="Type">{record.is_parent ? <Tag color="green">Parent</Tag> : <Tag color="geekblue">Category</Tag>}</span>;
                },
            },
            {
                title: 'Action',
                width: '10%',
                dataIndex: 'operation',
                // className: RoleViewFunction('edit_category') || RoleViewFunction('delete_category') ? '' : 'd-none',
                render: (text, record) =>
                    this.state.dataSource.length >= 1 ? (
                        <span title="...." className="d-flex d-sm-inline justify-content-around">
                            <RoleView permission="">
                                <span className="cursor_point" onClick={() => { this.props.history.push(`/admin-contract/view/${record._id}`); }}><Icon type="edit" theme="twoTone" twoToneColor="#52c41a" className='mx-3 f_25' /></span>
                            </RoleView>
                            <RoleView permission="">
                                <Popconfirm title="Sure to delete this contract ?" onConfirm={() => this.handleDelete(record._id)}>
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
                    <Search className='' size="large" placeholder="Search Biding" onKeyUp={(event) => { this.onFilter_Ref(event) }} loading={false} />

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

export default Form.create()(withRouter(ContractTable));