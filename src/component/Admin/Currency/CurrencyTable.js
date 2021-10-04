import React, { Suspense } from "react";
import { withRouter } from "react-router-dom";
import { Table, Form, Icon, Row, Col, Modal, Collapse, Popconfirm } from 'antd';
import { GET_CURRENCY_PAGINATION, DELETE_CURRENCY } from '../../../graphql/Admin/currency';
import { client } from "../../../apollo";
import { Alert_msg } from '../../Comman/alert_msg';
import size from 'lodash/size';
import RoleView, { RoleViewFunction } from '../../Comman/roles_permission_view'
const { Panel } = Collapse;

const CommonSearch = React.lazy(() => import('../User/CommonSearch'));
class CurrencyTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            openPanel: 2,
            dataSource: [],
            provider_total: '',
            provider_data: [],
            update_data: {},
            update: 0,
            loading: false,
            loading_img: false,
            imageUrl: '',
            file: {},
            input_data: {},
            previewVisible: false,
            previewImage: '',
            pagination: {
                pageSize: 10,
                current: 1,
                total: 0,
                simple: true,
            },
            _id_provider: ''
        };
    }

    componentDidMount() {
        this.fetch_payouts();
    }
    handleTableChange = async pagination => {
        const pager = { ...pagination };
        pager.current = pagination.current;
        this.setState({ loading: true });

        await client.query({
            query: GET_CURRENCY_PAGINATION,
            variables: { limit: pager.pageSize, page: pager.current, pagination: true },
            fetchPolicy: 'no-cache',
        }).then(result => {
            const pagination = { ...this.state.pagination };
            pagination.total = result.data.get_currencys.totaldata;
            pagination.current = result.data.get_currencys.page;
            this.setState({ pagination, loading: false, dataSource: result.data.get_currencys.data });
        });
    };


    fetch_payouts = async (data) => {
        console.log("CurrencyTable -> fetch_payouts -> data", data)
        this.setState({ loading: true });
        let input = {};
        if (data && size(data)) {
            input = { search: data, limit: this.state.pagination.pageSize, page: this.state.pagination.current, pagination: false };
        } else {
            input = { limit: this.state.pagination.pageSize, page: this.state.pagination.current, pagination: true };
        }
        await client.query({
            query: GET_CURRENCY_PAGINATION,
            variables: input,
            fetchPolicy: 'no-cache',
        }).then(result => {
            const pagination = { ...this.state.pagination };
            pagination.total = result.data.get_currencys.totaldata;
            this.setState({ loading: false, pagination, dataSource: result.data.get_currencys.data });
        });
    }

    delete_booking = async (_id) => {
        this.setState({ loading: true })
        await client.query({
            query: DELETE_CURRENCY,
            variables: { _id },
            fetchPolicy: 'no-cache',
        }).then(result => {
            this.setState({ loading: false });
            this.fetch_payouts()
        });
    }

    onFilter = async (data) => {
        this.setState({ input_data: { ...this.state.input_data, ...data } });
        var input_data = { ...this.state.input_data, ...data };
        this.fetch_payouts(input_data);
    }

    render() {
        const columns = [
            {
                width: '15%',
                editable: true,
                title: "Name",
                render: (text, record) => {
                    return <span title="Name"> {record?.name}</span>;
                },
            },
            {
                width: '15%',
                editable: true,
                title: () => {
                    return <div>
                        <div className="d-block">
                            <>
                                <Suspense fallback={<div>.......</div>}>
                                    <CommonSearch role={2} value='location' placeholder='Enter location' passedFunction={this.onFilter} />
                                </Suspense>
                            </>
                        </div>
                    </div>
                },
                render: (text, record) => {
                    return <span title="Location"> {record?.location || "Not found"}</span>;
                },
            },
            {
                width: '15%',
                editable: true,
                title: "Country code",
                render: (text, record) => {
                    return <span title="Country code"> {record?.country_code || "Not found"}</span>;
                },
            },
            {
                width: '15%',
                editable: true,
                title: () => {
                    return <div>
                        <div className="d-block">
                            <>
                                <Suspense fallback={<div>.......</div>}>
                                    <CommonSearch role={2} value='code' placeholder='Enter Code' passedFunction={this.onFilter} />
                                </Suspense>
                            </>
                        </div>
                    </div>
                },
                render: (text, record) => {
                    return <span title="Code"> {record?.code}</span>;
                },
            },
            {
                width: '15%',
                editable: true,
                title: "Symbol",
                render: (text, record) => {
                    return <span title="Symbol"> {record?.symbol}</span>;
                },
            },
            {
                title: 'Rate',
                width: '15%',
                editable: true,
                render: (text, record) => {
                    return <span title="Rate">{record?.rate}</span>;
                },
            },
            {
                title: 'Action',
                dataIndex: 'operation',
                className: RoleViewFunction('view_currency') ? 'd-flex' : 'd-none',
                render: (text, record) =>
                    this.state.dataSource.length >= 1 ? (
                        <>
                            <RoleView permission="view_currency">
                                <span onClick={() => { this.props.history.push(`/admin-currency/add/${record._id}`); }} title="...." className="d-flex d-sm-inline justify-content-around">
                                    <span className='cursor_point'><Icon type="edit" theme="twoTone" twoToneColor="#52c41a" className='f_25' /></span>
                                </span>
                            </RoleView>
                            <RoleView permission="view_currency">
                                <Popconfirm title="Sure to delete this currency ?" onConfirm={() => this.delete_booking(record._id)}>
                                    <Icon type="delete" theme="twoTone" twoToneColor="#52c41a" className='f_25 px-3' />
                                </Popconfirm>
                            </RoleView>
                        </>
                    ) : null,
            },
        ];
        const { dataSource } = this.state;
        return (
            <div id="no-more-tables">
                <Table
                    rowClassName={() => 'editable-row'}
                    rowKey={record => record._id}
                    className='table_shadow'
                    dataSource={dataSource}
                    columns={columns}
                    size="middle"
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange}
                    loading={this.state.loading}
                />
            </div>
        );
    }
}

export default Form.create()(withRouter(CurrencyTable));