import React, { Suspense } from "react";
import { withRouter } from "react-router";
import { client } from "../../../apollo";
import { Layout, Button, Affix, Form, Card, Avatar, Row, Col, Rate, Skeleton, Typography } from 'antd';
import 'antd/dist/antd.css';
import '../../../scss/template.scss';
import { FaBarcode, FaDollarSign, FaRegImage, FaSignInAlt, FaSignOutAlt, FaUserAlt, FaUserCog, FaEye } from 'react-icons/fa';
import { AiFillTool, AiTwotoneBell, AiFillClockCircle, AiFillTags, AiTwotonePhone, AiTwotoneMail } from 'react-icons/ai';
import { GET_PARTICULAR_BOOKING, UPDATE_MANUAL_PAYMENT } from '../../../graphql/User/booking';
import AdminSider from '../Layout/AdminSider';
import AdminHeader from '../Layout/AdminHeader';
import Biding from "./biding";
import { Alert_msg } from '../../Comman/alert_msg';
import BidingList from "./BidingList";
const { Content } = Layout;
const { Meta } = Card;
const { Title } = Typography;

const DescriptionValue = React.lazy(() => import('../../User/Book/DescriptionValue'));
const Milestone = React.lazy(() => import('./Milestone'));
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

    manual_refund = (id) => {
        console.log("BookingDetails -> manual_refund -> id", id)
        client.query({
            query: UPDATE_MANUAL_PAYMENT,
            variables: { booking_id: id },
            fetchPolicy: 'no-cache',
        }).then(result => {
            Alert_msg(result.data.update_manual_payment.info);
            if (result.data.update_manual_payment.info.status === "success") {
                this.fetch_booking(id)
            }
        })
    }
    render() {
        console.log(this.state.u_rate);
        const { booking, booking_category, booking_provider, booking_user, u_rate } = this.state;
        console.log(this.props);


        return (
            <Layout style={{ height: '100vh' }}>
                <AdminSider update_collapsed={this.state.collapsed} />
                <Layout>
                    <AdminHeader />
                    <Content className="main_frame" style={{ background: 'none' }}>
                        <Row gutter={12}>
                            <Col lg={18} md={24}>
                                <Card bordered={0}>
                                    <Suspense fallback={<Skeleton active />}>
                                        <Milestone></Milestone>
                                    </Suspense>
                                    <Biding></Biding>   
                                    <Card bordered={0} >
                                        <BidingList></BidingList>
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