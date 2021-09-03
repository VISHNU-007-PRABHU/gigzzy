import React, { Suspense } from "react";
import { withRouter } from "react-router";
import { client } from "../../../apollo";
import { Layout, Button, Affix, Form, Card, Avatar, Row, Col, Rate, Skeleton, Typography } from 'antd';
import 'antd/dist/antd.css';
import '../../../scss/template.scss';
import { FaBarcode, FaDollarSign, FaRegImage, FaSignInAlt, FaSignOutAlt, FaUserAlt, FaUserCog, FaEye } from 'react-icons/fa';
import { AiFillTool, AiTwotoneBell, AiFillClockCircle, AiFillTags, AiTwotonePhone, AiTwotoneMail } from 'react-icons/ai';
import { GET_PARTICULAR_BOOKING, UPDATE_MANUAL_PAYMENT } from '../../../graphql/User/booking';
import { TiLocation } from 'react-icons/ti';
import AdminSider from '../Layout/AdminSider';
import AdminHeader from '../Layout/AdminHeader';
import Geocode from "react-geocode";
import { Alert_msg } from '../../Comman/alert_msg';
import BidingList from "./BidingList";
const { Content } = Layout;
const { Meta } = Card;
const { Title } = Typography;

const DescriptionValue = React.lazy(() => import('../../User/Book/DescriptionValue'));
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
                                <Card bordered={0} title="Job Detail" className="mb-3">
                                    <BidingList></BidingList>
                                </Card>
                                <Card bordered={0} title="Job Detail" className="mb-3">
                                    <Row gutter={[12, 12]}>
                                        <Col span={12}>
                                            <div className="in_card"><FaBarcode className="mx-2" />Invoice no:{booking[0] ? booking[0].booking_ref : ''}</div>
                                        </Col>
                                        <Col span={12}>
                                            <div className="in_card justify-content-end d-flex">
                                                <Button type="link" target="=_blank" onClick={() => { this.props.history.push({ pathname: `/admin-booking-invoice/${booking[0] ? booking[0]._id : ''}` }) }}>Print Invoice</Button>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row gutter={[12, 12]}>
                                        <Col span={24}>
                                            <div className="d-block in_card">
                                                <div className="">
                                                    <AiFillTool className="mx-3" /> Category:  {booking_category[0] ? booking_category[0].category_type === 1 ? booking_category[0].category_name : booking_category[0].subCategory_name : ''}
                                                </div>
                                                <div className="in_card_spilt">
                                                    <Suspense fallback={<Skeleton active />}>
                                                        <DescriptionValue
                                                            data={booking[0] ? booking[0].description : ""}
                                                            img={booking[0]?.user_image_url} />
                                                    </Suspense>
                                                    {/* {booking[0] ? booking[0].description : ""} */}
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row gutter={[12, 12]}>
                                        <Col span={24}>
                                            <div className="d-block in_card">
                                                <div>
                                                    <TiLocation className="mx-3" /> Location:
                                                </div>
                                                <div className="in_card_spilt">
                                                    {this.state.address}
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row gutter={[12, 12]}>
                                        <Col md={12} sm={24}>
                                            <div className="d-block in_card">
                                                <div>
                                                    <AiTwotoneBell className="mx-3" /> Status:
                                                </div>
                                                <div className="in_card_spilt">
                                                    {
                                                        // booking==12,provider_cancel==8,provider_accept==9,user_accept==10,user_cancel==11,end==13,complete=14, 
                                                        booking.length > 0 ?
                                                            booking[0].booking_status === 10 ?
                                                                "User Accept" :
                                                                booking[0].booking_status === 8 ?
                                                                    "Provider Cancel" :
                                                                    booking[0].booking_status === 9 ?
                                                                        "Provider Accept" :
                                                                        booking[0].booking_status === 11 ?
                                                                            "User Cancel" :
                                                                            booking[0].booking_status === 13 ?
                                                                                "Job End" :
                                                                                booking[0].booking_status === 14 ?
                                                                                    "Job Complete" : '' : ''

                                                    }
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md={12} sm={24}>
                                            <div className="d-block in_card">
                                                <div>
                                                    <AiFillClockCircle className="mx-3" /> Scheduled at:
                                                </div>
                                                <div className="in_card_spilt">
                                                    {booking[0] ? booking[0].booking_date : ""}
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card>
                                <Card bordered={0} title="Initial Payment" className="mb-3">
                                    <Row gutter={[12, 12]}>
                                        <Col md={12} sm={24}>
                                            <div className="d-block in_card">
                                                <div>
                                                    <FaDollarSign className="mx-3" /> Amount
                                                </div>
                                                <div className="in_card_spilt">
                                                    {booking[0] ? booking[0].base_price : ""}
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md={12} sm={24}>
                                            <div className="d-block in_card">
                                                <div>
                                                    <AiFillTags className="mx-3" />  Transaction Id
                                                </div>
                                                <div className="in_card_spilt">
                                                    {booking[0] ? booking[0].MpesaReceiptNumber : ""}
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card>
                                <Card bordered={0} title="Job Proof" className="mb-3">
                                    <Row gutter={[12, 12]}>
                                        <Col md={12} sm={24}>
                                            <div className="d-block in_card">
                                                <div>
                                                    <FaSignInAlt className="mx-3" />  Started Job
                                                </div>
                                                <div className="in_card_spilt">
                                                    {booking[0] ? booking[0].job_start_time : ""}
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md={12} sm={24}>
                                            <div className="d-block in_card">
                                                <div>
                                                    <FaSignOutAlt className="mx-3" />    Ended Job
                                                </div>
                                                <div className="in_card_spilt">
                                                    {booking[0] ? booking[0].job_end_time : ""}
                                                </div>
                                            </div>
                                        </Col>
                                        {/* <Col span={8}>
                                            <div className="d-block in_card">
                                                <div>
                                                    <AiFillClockCircle className="mx-3" /> Actual hours
                                                 </div>
                                                <div className="in_card_spilt">
                                                    {this.state.diffDuration}
                                                </div>
                                            </div>
                                        </Col> */}
                                    </Row>
                                </Card>
                                <Card bordered={0} title="Pricing Details" className="mb-3">
                                    {/* <Row gutter={[12, 12]}>
                                        <Col span={24}>
                                            <div className="d-flex in_card justify-content-between">
                                                <div>
                                                    Currency
                                                 </div>
                                                <div>
                                                    Category:
                                                </div>
                                            </div>
                                        </Col>
                                    </Row> */}
                                    <Row>
                                        <Col span={24}>
                                            <div className="d-flex in_card justify-content-between">
                                                <div>
                                                    Base Price
                                                </div>
                                                <div>
                                                    {booking[0] ? booking[0].base_price : ""}
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row gutter={[12, 12]} className={booking[0]?.extra_price === undefined ? 'd-none' : ''}>
                                        <Col span={24}>
                                            <div className="d-flex in_card justify-content-between">
                                                <div>
                                                    Extra Price
                                                </div>
                                                <div>
                                                    {booking[0] ? booking[0].extra_price : ""}
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row gutter={[12, 12]}>
                                        <Col span={24}>
                                            <div className="d-flex in_card justify-content-between">
                                                <div>
                                                    Total
                                                </div>
                                                <div>
                                                    {booking[0] ? booking[0].total : ""}
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>

                                </Card>
                            </Col>
                            <Col lg={6} md={24}>
                            </Col>
                        </Row>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default Form.create()(withRouter(ContractDetail));