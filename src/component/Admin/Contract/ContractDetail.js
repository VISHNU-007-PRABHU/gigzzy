import React, { Suspense } from "react";
import { withRouter } from "react-router";
import { client } from "../../../apollo";
import { Layout, Form, Card, Row, Col, Skeleton, BackTop } from 'antd';
import 'antd/dist/antd.css';
import '../../../scss/template.scss';
const { Content } = Layout;
const padding_setting = { padding: "0px" }
const Biding = React.lazy(() => import('./biding'));
const BidingList = React.lazy(() => import('./BidingList'));
const Milestone = React.lazy(() => import('./Milestone'));
const AdminSider = React.lazy(() => import('../Layout/AdminSider'));
const AdminHeader = React.lazy(() => import('../Layout/AdminHeader'));
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
            address: '',
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
            nav_text: ['', ''],
            u_rate: 0,
            p_rate: 0,
        };
    }

    componentDidMount() {
        console.log("ContractDetail -> componentDidMount -> this.props", this.props.match.params.id)
        // this.fetch_booking(this.props.match.params.id);
    }

    fetch_booking = (_id) => {
        // client.query({
        //     query: GET_PARTICULAR_CONTRACT,
        //     variables: { _id },
        //     fetchPolicy: 'no-cache',
        // }).then(result => {
        //     // console.log(result);
        //     Geocode.setApiKey("AIzaSyDYRYnxipjEBUNazDUwUa_8BDvm8ON7TIk");
        //     Geocode.enableDebug();
        //     Geocode.fromLatLng(result?.data?.booking[0]?.lat, result?.data?.booking[0]?.lng).then(
        //         response => {
        //             // console.log(response.results);
        //             this.setState({ address: response.results[0].formatted_address });
        //         },
        //         error => {
        //             console.error(error);
        //         }
        //     );

        //     this.setState({
        //         booking: result.data.booking,
        //         booking_category: result.data.booking[0].booking_category,
        //         booking_user: result.data.booking[0].booking_user,
        //         booking_provider: result.data.booking[0].booking_provider,
        //         message: result.data.booking[0].get_booking_message,
        //         u_rate: result.data.booking[0].user_rating,
        //         p_rate: result.data.booking[0].provider_rating,
        //     })
        // });
    }

    render() {
        console.log(this.state.u_rate);
        const { booking, booking_category, booking_provider, booking_user, u_rate } = this.state;
        console.log(this.props);


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
                        <Row gutter={12}>
                            <Col lg={18} md={24}>
                                <Card bordered={0}>
                                    <Suspense fallback={<Skeleton active />}>
                                        <Milestone></Milestone>
                                    </Suspense>
                                    <Suspense fallback={<Skeleton active />}>
                                        <Biding></Biding>
                                    </Suspense>
                                    <Card bordered={0} bodyStyle={padding_setting}>
                                        <Suspense fallback={<Skeleton active />}>
                                            <BidingList></BidingList>
                                        </Suspense>
                                    </Card>
                                </Card>
                            </Col>
                        </Row>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}
export default Form.create()(withRouter(ContractDetail));