import * as React from "react";
import { withRouter } from "react-router-dom";
import Table from 'antd/es/table';
import Tag from 'antd/es/tag';
import Paragraph from 'antd/es/typography/Paragraph'
import Icon from 'antd/es/icon'
import Form from 'antd/es/form'
import { GET_CONTRACT_PAGINATION, DELETE_CATEGORY } from '../../../graphql/Admin/contract';
import { client } from "../../../apollo";
import '../../../scss/template.scss';
import size from 'lodash/size'
import { Alert_msg } from '../../Comman/alert_msg';
import Search from "antd/lib/input/Search";
import RoleView, { RoleViewFunction } from '../../Comman/roles_permission_view'
class ContractTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
            booking_status: 15,
            pagination: {
                pageSize: 10,
                total: 0,
                current: 1,
                simple: true,
            }
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.booking_status !== state.booking_status) {
            return {
                booking_status: props.booking_status,
            };
        }
        return null;
    }

    componentDidMount() {
        this.fetch_category();
    }

    componentDidUpdate(prevProps) {
        if (this.props.booking_status !== prevProps.booking_status) {
            this.fetch_category();
        }

    }
    handleTableChange = async pagination => {
        const pager = { ...pagination };
        pager.current = pagination.current;
        this.setState({ loading: true });
        await client.query({
            query: GET_CONTRACT_PAGINATION,
            variables: { booking_status: this.state.booking_status, limit: pager.pageSize, page: pager.current, data: { is_parent: false } },
            fetchPolicy: 'no-cache',
        }).then(result => {
            const pagination = { ...this.state.pagination };
            pagination.total = result.data.get_contracts_pagination.pageInfo.totalDocs;
            pagination.current = result.data.get_contracts_pagination.pageInfo.page;
            console.log(pagination);
            this.setState({ pagination, loading: false, dataSource: result.data.get_contracts_pagination.data });
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
        let input = {
            booking_status: this.state.booking_status,
        };
        if (size(data)) {
            input['search'] = data
        }
        await client.query({
            query: GET_CONTRACT_PAGINATION,
            variables: input,
            fetchPolicy: 'no-cache',
        }).then(result => {
            const pagination = { ...this.state.pagination };
            pagination.total = result.data.get_contracts_pagination.pageInfo.totalDocs;
            this.setState({ loading: false, pagination, dataSource: result.data.get_contracts_pagination.data });
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
                this.fetch_category();
            }
        });
    }

    onFilter_Ref = async (data) => {
        if (data.target.value) {
            var datas = { 'contract_ref': { $regex: '.*' + data.target.value + '.*', $options: 'i' } }
            this.fetch_category(datas);
        } else {
            this.fetch_category();
        }
    }

    render() {
        const columns = [
            {
                title: <span>Contract Ref</span>,
                width: '15%',
                render: (text, record) => {
                    return <span title="Contract Ref">
                        <Paragraph copyable>{record.contract_ref}</Paragraph>
                    </span>;
                }
            },
            {
                title: <span>User Name</span>,
                width: '15%',
                render: (text, record) => {
                    return <span title="User Name">{record.get_user?.[0]?.first_name + record.get_user?.[0]?.last_name}</span>;
                }
            },
            {
                title: <span>Name</span>,
                width: '15%',
                render: (text, record) => {
                    return <span title="Name">{record.name}</span>;
                }
            },
            {
                title: <span>Budget</span>,
                width: '10%',
                render: (text, record) => {
                    return <span title="Budget">{record.budget}</span>;
                },
            }, {
                title: <span>Location</span>,
                width: '35%',
                render: (text, record) => {
                    return <span title="Location">
                        <Paragraph ellipsis={{ rows: 2, expandable: false, symbol: '...' }}>
                            {record.get_contract_address_detail?.address}
                        </Paragraph>
                    </span>
                },
            }, {
                title: <span>Category</span>,
                width: '10%',
                render: (text, record) => {
                    if (record && record.get_contract_category && record.get_contract_category[0]?.category_type === 1) {
                        return <span title="Category">
                            <Tag color="geekblue">{record.get_contract_category[0]?.category_name}</Tag>
                        </span>;
                    }
                    else if (record && record.get_contract_category && record.get_contract_category[0]?.category_type === 2) {
                        return <span title="Category">
                            <Tag color="geekblue">{record.get_contract_category[0]?.subCategory_name}</Tag>
                        </span>;
                    } else {
                        return <span title="Category">{"Not Found!"}</span>;
                    }
                },
            },
            {
                title: 'Action',
                width: '10%',
                dataIndex: 'operation',
                // className: RoleViewFunction('edit_category') || RoleViewFunction('delete_category') ? '' : 'd-none',
                render: (text, record) =>
                    this.state.dataSource.length >= 1 ? (
                        <span title="...." className="d-inline d-md-flex justify-content-around">
                            <RoleView permission="">
                                <span className="cursor_point" onClick={() => { this.props.history.push(`/admin-contract/view/${record._id}`); }}><Icon type="eye" theme="twoTone" twoToneColor="#52c41a" className='mx-3 f_25' /></span>
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