import React, { Suspense } from "react";
import 'antd/dist/antd.css';
import Modal from 'antd/lib/modal';
import Badge from 'antd/lib/badge';
import Empty from 'antd/lib/empty';
import Layout from 'antd/lib/layout';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Icon from 'antd/lib/icon';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Card from 'antd/lib/card';
import Avatar from 'antd/lib/avatar';
import Skeleton from 'antd/lib/skeleton';
import Rate from 'antd/lib/rate';
import Timeline from 'antd/lib/timeline';
import GoogleMapReact from 'google-map-react';
import OwlCarousel from 'react-owl-carousel';
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import send_icon from '../../../image/send message.png'
import { UPDATE_MSG_COUNT, GET_PARTICULAR_BOOKING, ADD_MSG, MSG_SUB, GET_MSG, ADD_COMMENTS, ACCEPT_JOB_MSG } from '../../../graphql/User/booking';
import { client } from "../../../apollo";
import CompletePayment from "./Complete_Payment";
import gql from 'graphql-tag';
import { Alert_msg } from "../../Comman/alert_msg";
import DescriptionValue from "../Book/DescriptionValue";
import { MdLocationOn } from "react-icons/md";
const { TextArea } = Input;
const { Content } = Layout;
const mapOptions = {
    fullscreenControl: false,
};


const UserHeader = React.lazy(() => import('../Layout/UserHeader'));
const UserFooter = React.lazy(() => import('../Layout/UserFooter'));
const PointLocation = React.lazy(() => import("./PointLocation"))
const Appointments = React.lazy(() => import("./Appointments"))

const SEND_ACCEPT_MSG = gql`
subscription SENDACCEPTMSG($_id:ID,$booking_id:ID){
    send_accept_msg (_id:$_id,booking_id:$booking_id){
        _id
        description
        user_image_url
        booking_status
        booking_type
        booking_date
        created_at
        job_start_time
        job_end_time
        final_payment
        start_job_image_url
        end_job_image_url
        booking_ref
        base_price
        extra_price
        payment_type
        mpeas_payment_callback
        ctob_shotcode
        ctob_billRef
        extra_hour_price
        total
        user_msg_count
        user_msg_is_read
        user_rating
        user_rating_status
        payment_status
        lat
        lng
      user_comments
        booking_category {
          category_name
          category_type
          subCategory_name
          description
          _id
          base_price
          hour_price
          hour_limit
          img_url
          booking_parent_category {
            category_name
            category_name
          }
        }
        booking_provider{
          name
          _id
          img_url
          lat
          lng
        }
        booking_user {
            _id
          name
          location
        }
      }
    }`

class ContractBookings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: '10',
            booking_loading: false,
            booking_detail: false,
            center: [9.9619289, 78.1288218],
            zoom: 18,
            draggable: true,
            lat: 9.9619289,
            lng: 78.1288218,
            responsive: {
                0: {
                    items: 2,
                },
                450: {
                    items: 3,
                },
                600: {
                    items: 3,
                },
                1000: {
                    items: 3,
                }
            },
            booking: [],
            particular_booking: [],
            message: [],
            msg: "",
            direction: false,
            loading: false,
            hasMore: true,
            chat: false,
            rating: 0,
            rate: 0,
            accept_pay_modal: 0,
            complete_button: 0,
            call_msg_sub: 0,
            msg_count: 0,
            comment: '',
            mange_state: 0,
            mode_state: "Pending",
            infinite_loading: false,
            pagination: {
                pageSize: 10,
                current: 1,
                total: 0,
                simple: true,
            },
        }
    }

    handleModeChange = (e) => {
        const mode = e;
        if (mode === "10") {
            this.setState({ mode_state: 'Pending', pagination: { ...this.state.pagination, current: 1 } });
        } else if (mode === "4") {
            this.setState({ mode_state: 'OnGoing', pagination: { ...this.state.pagination, current: 1 } });
        } else if (mode === "14") {
            this.setState({ mode_state: 'Completed', pagination: { ...this.state.pagination, current: 1 } });
        }
        this.setState({ mode });
    };



    view_booking = async (option, id) => {
        // console.log(option, id);
        if (option === true) {
            this.setState({ call_msg_sub: 1 });
            await client.query({
                query: GET_PARTICULAR_BOOKING,
                variables: { _id: id, },
                fetchPolicy: 'no-cache',
            }).then(result => {
                console.log(result);
                this.setState({
                    particular_booking: result.data.booking,
                    comment: result.data.booking[0].user_comments,
                    rate: result.data.booking[0].user_rating,
                    user_rating_status: result.data.booking[0].user_rating_status,
                    mange_state: result.data.booking[0].booking_status,
                    msg_count: result.data.booking[0].user_msg_count
                });
                this.booking_subcription(result.data.booking[0]._id);
            });
        }
        if (this.state.particular_booking[0]?.payment_status === 4 && !this.state.particular_booking[0]?.mpeas_payment_callback) {
            this.setState({ accept_pay_modal: 1, booking_detail: option })
        } else {
            console.log(this.state.particular_booking[0].booking_status, 'vis');
            if (this.state.particular_booking[0]?.booking_status === 13) {
                this.setState({ complete_button: 1, booking_detail: option });
            } else {
                this.setState({ complete_button: 0, booking_detail: option });
            }
        }
    }

    booking_subcription = async (b_id) => {
        var that = this;
        console.log(b_id);
        await client.subscribe({
            query: SEND_ACCEPT_MSG,
            variables: { _id: JSON.parse(localStorage.getItem('user'))._id, booking_id: b_id },
        }).subscribe({
            next(result, loading, error) {
                if (loading) {
                    console.log('loading');
                }
                if (result) {
                    console.log(result.data.send_accept_msg);
                    if (result.data.send_accept_msg.payment_status === 4) {
                        that.setState({ particular_booking: [result.data.send_accept_msg], accept_pay_modal: 1 });
                    } else {
                        if (result.data.send_accept_msg.booking_status === 13) {
                            that.setState({ complete_button: 1 });
                        }
                        that.setState({ particular_booking: [result.data.send_accept_msg], msg_count: result.data.send_accept_msg.user_msg_count });
                    }
                }

            }
        });
    };

    handleInfiniteOnLoad = async (pageInfo) => {
        console.log(pageInfo)
        const pagination = { ...this.state.pagination, current: pageInfo };
        this.setState({ pagination });
    };
    update_count = async (booking_id) => {
        await client.mutate({
            mutation: UPDATE_MSG_COUNT,
            variables: { booking_id, role: 1 },
            fetchPolicy: 'no-cache',
        }).then(result => {
            console.log(this.state.pagination.current);
            this.handleInfiniteOnLoad(this.state.pagination.current);
            this.setState({ msg_count: 0 });
        });
    }

    msg = async (option, booking_id, user_id, provider_id) => {
        this.update_count(booking_id);
        if (option === true) {
            await client.query({
                query: GET_MSG,
                variables: { booking_id, user_id, provider_id },
                fetchPolicy: 'no-cache',
            }).then(result => {
                console.log(result);
                if (this.state.call_msg_sub === 1) {
                    this.message_subcription(booking_id, provider_id);
                }
                this.setState({ message: result.data.get_message, call_msg_sub: 0 });
            });
            this.setState({ chat: option });
            this.scrollToBottom();
        }
    }

    add_msg = async (booking_id) => {
        console.log(this.state.msg);
        var message = this.state.msg;
        if (this.state.msg !== '') {
            await client.mutate({
                mutation: ADD_MSG,
                variables: { booking_id, user_id: JSON.parse(localStorage.getItem('user'))._id, data: message },
                fetchPolicy: 'no-cache',
            }).then(result => {
                console.log(result);
                this.setState({ msg: "" })
                this.scrollToBottom();
            });
        } else {
            Alert_msg({ msg: "Please Type Content", status: "failed" })
        }
    }

    scrollToBottom() {
        var scroll = document.getElementById('scroll');
        scroll.scrollTop = scroll.scrollHeight;
        scroll.animate({ scrollTop: scroll.scrollHeight });
    }

    message_subcription = async (b_id, provider_id) => {
        var that = this;
        console.log(b_id);
        await client.subscribe({
            query: MSG_SUB,
            variables: { user_id: JSON.parse(localStorage.getItem('user'))._id, provider_id, booking_id: b_id, },
            shouldResubscribe: false
        }).subscribe({
            next(result, loading, error) {

                if (loading) {
                    console.log('loading');
                }
                if (result) {
                    console.log(result.data.messageSent);
                    let joined = [...that.state.message, ...[result.data.messageSent]];
                    console.log(joined);
                    that.setState({ message: joined });
                    that.scrollToBottom();
                }

            }
        });
    };

    add_comments = async (booking_id) => {
        // var _rate = this.state.rate.toString()
        var _rate = this.state.rate;
        await client.mutate({
            mutation: ADD_COMMENTS,
            variables: { booking_id, user_id: JSON.parse(localStorage.getItem('user'))._id, comments: this.state.comment, rating: _rate },
            fetchPolicy: 'no-cache',
        }).then(result => {
            console.log(result);
            Alert_msg(result.data.addRating);
            if (result.data.addRating.status === 'success') {
                this.setState({ rating: 0, user_rating_status: result.data.addRating.user_rating_status });
            }
        });
    }

    complete_job = async (id) => {
        await client.query({
            query: ACCEPT_JOB_MSG,
            variables: { booking_id: id, role: 1, booking_status: 14, },
            fetchPolicy: 'no-cache',
        }).then(result => {
            console.log(result);
            Alert_msg(result.data.manage_booking[0])
            if (result.data.manage_booking[0].status === "success") {
                this.setState({ complete_button: 0, mange_state: 14 });
            }
        });
    }
    close_msg = async () => {
        this.setState({ chat: 0, message: [] });
    }
    close_direction_model = async () => {
        this.setState({ direction: false });
    }
    handleResult = async (data) => {
        if (data.status === 'success') {
            this.setState({ mange_state: 14 });
        }
    }

    render() {
        console.log(this.state.accept_pay_modal)
        return (
            <Layout className="white" style={{ minHeight: '100vh' }}>
                <Suspense fallback={<Skeleton active />}>
                    <UserHeader />
                </Suspense>
                <Content className="px-1">
                    <h2 className="bold mb-5 text-center">My Bookings</h2>
                    <Row gutter={[10, 10]} className='ant-row d-flex d-lg-block d-md-flex flex-column-reverse flex-column-sm mb-5'>
                        <Col lg={{ span: 16, offset: 2 }}>
                            <Suspense fallback={<Skeleton />}>
                                <Appointments
                                    contract={true}
                                    handleInfiniteOnLoad={this.handleInfiniteOnLoad}
                                    page={this.state.pagination.current}
                                    status={this.state.mode}
                                    heading={this.state.mode_state}
                                    view_booking={this.view_booking} />
                            </Suspense>
                        </Col>
                        <Col lg={{ span: 4 }}>
                            <Card className="booking_view_showdow">
                                <Card.Grid className='w-100 cursor_point' onClick={() => { this.handleModeChange("10") }}>
                                    <Row>
                                        <Col span={20}>
                                            <span className={this.state.mode_state === 'Pending' ? "primary_color bold" : "bold"}>Incoming</span>
                                        </Col>
                                        <Col span={4}>
                                            <span className={this.state.mode_state === 'Pending' ? "primary_color float-right" : "float-right"}> <Icon type="hourglass" /> </span>
                                        </Col>
                                    </Row>
                                </Card.Grid>
                                <Card.Grid className='w-100 cursor_point' onClick={() => { this.handleModeChange("4") }}>
                                    <Row>
                                        <Col span={20}>
                                            <span className={this.state.mode_state === 'OnGoing' ? "primary_color bold" : "bold"}>On Going</span>
                                        </Col>
                                        <Col span={4}>
                                            <span className={this.state.mode_state === 'OnGoing' ? "primary_color float-right" : "float-right"}> <Icon type="fire" /> </span>
                                        </Col>
                                    </Row>
                                </Card.Grid>
                                <Card.Grid className='w-100 cursor_point' onClick={() => { this.handleModeChange("14") }}>
                                    <Row >
                                        <Col span={20}>
                                            <span className={this.state.mode_state === 'Completed' ? "primary_color bold" : "bold"}>Completed</span>
                                        </Col>
                                        <Col span={4}>
                                            <span className={this.state.mode_state === 'Completed' ? "primary_color float-right" : "float-right"}> <Icon type="carry-out" /> </span>
                                        </Col>
                                    </Row>
                                </Card.Grid>
                            </Card>
                        </Col>
                    </Row>
                </Content>
                <Suspense fallback={<Skeleton active />}>
                    <UserFooter />
                </Suspense>
            </Layout >
        );
    }
}
export default Form.create()(ContractBookings);