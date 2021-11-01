import React, { Suspense } from "react";
import { withRouter } from "react-router";
import { client } from "../../../apollo";
import { Layout, Form, Card, Row, Col, Skeleton, Button, Spin, Tag } from 'antd';
import 'antd/dist/antd.css';
import '../../../scss/template.scss';
import { Alert_msg } from '../../Comman/alert_msg';
import { BOOKING_STATUS_REVERSE } from '../../Comman/booking_status'
import { GET_CONTRACT } from '../../../graphql/User/contract';
import { MANAGE_CONTRACT_BOOKING } from '../../../graphql/Admin/contract'
const { Content } = Layout;
const Biding = React.lazy(() => import('./biding'));
const Milestone = React.lazy(() => import('./Milestone'));
const AdminSider = React.lazy(() => import('../Layout/AdminSider'));
const AdminHeader = React.lazy(() => import('../Layout/AdminHeader'));
const { Meta } = Card;
class ContractDetail extends React.Component {
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
            address: {},
            diffDuration: 0,
            previewVisible: false,
            previewImage: '',
            pagination: {
                pageSize: 10,
                current: 1,
                total: 0,
                simple: true,
            },
            message: [],
            booking: [],
            booking_user: [],
            booking_provider: [],
            booking_category: [],
            booking_status: 15,
            nav_text: ['', ''],
            u_rate: 0,
            p_rate: 0,
        };
    }

    componentDidMount() {
        this.getData()
    }
    getData = async () => {
        this.setState({ loading: true, });
        let input_data = { contract_id: this.props.match.params.id }
        client.query({
            query: GET_CONTRACT,
            variables: input_data,
            fetchPolicy: 'no-cache',
        }).then(result => {
            this.setState({
                loading: false,
                update_data: result.data.get_contracts[0],
                booking_status: result.data.get_contracts[0].booking_status,
                booking_user: result.data.get_contracts[0].get_user,
                address: result.data.get_contracts[0].get_contract_address_detail,
            });
        })
    };
    change_status = async () => {
        this.setState({ loading: true })
        let input_data = { contract_id: this.props.match.params.id, booking_status: 9 }
        await client.mutate({
            mutation: MANAGE_CONTRACT_BOOKING,
            variables: input_data,
        }).then((result, loading, error) => {
            Alert_msg(result.data.manage_contract_booking);
            this.setState({ loading: false })
            this.getData()
        });
    }

    render() {

        return (
            <Layout style={{ height: '100vh' }}>
                <Suspense fallback={<Skeleton active />}>
                    <AdminSider update_collapsed={this.state.collapsed} />
                </Suspense>
                <Layout>
                    <Suspense fallback={<Skeleton active />}>
                        <AdminHeader />
                    </Suspense>
                    <Content className="main_frame" style={{ background: 'none' }}>
                        <Spin size="large" spinning={this.state.loading}>
                            <Row gutter={12}>
                                <Col lg={18} md={24}>
                                    <Card bordered={0}>
                                        <Suspense fallback={<Skeleton active />}>
                                            <Biding></Biding>
                                        </Suspense>
                                        <Suspense fallback={<Skeleton active />}>
                                            <Milestone></Milestone>
                                        </Suspense>
                                    </Card>
                                </Col>
                                <Col lg={6} md={24}>
                                    <Card bordered={0}>
                                        {this.state.booking_status === 15 ? <>
                                            <Button onClick={() => { this.change_status() }} type="danger" size={"large"} block>
                                                Waiting for approval
                                            </Button></> : <>
                                            <Button type="dashed" size={"large"} className="text-success" block disabled>
                                                {BOOKING_STATUS_REVERSE[this.state.booking_status]}
                                            </Button></>
                                        }

                                    </Card>
                                    <Card
                                        className="mt-2"
                                        hoverable
                                        title="Job Location"
                                    >
                                        {this.state.address?.address}
                                    </Card>
                                    <Card
                                        className="mt-2"
                                        hoverable
                                        cover={<img alt="gigzzy user img" src={this.state.booking_user?.[0]?.img_url} />}
                                    >
                                        <Meta
                                            className="d-flex"
                                            title={this.state.booking_user?.[0]?.first_name + this.state.booking_user?.[0]?.last_name}
                                            description={this.state.booking_user?.[0]?.email} />
                                        <div className="d-flex w-100 justify-content-between mt-4">
                                            <div className="w-50"> Phone </div>
                                            <div className="w-50">: {this.state.booking_user?.[0]?.phone_no}</div>
                                        </div>
                                        <div className="d-flex w-100 justify-content-between mt-4">
                                            <div className="w-50"> User Type </div>
                                            <div className="w-50">:{this.state.booking_user?.[0]?.user_type}</div>
                                        </div>
                                    </Card>
                                </Col>
                            </Row>
                        </Spin>
                    </Content>
                </Layout>
            </Layout >
        );
    }
}
export default Form.create()(withRouter(ContractDetail));