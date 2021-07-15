
import React from "react";
import { Icon, Tooltip,Tag } from "antd"
import 'antd/dist/antd.css';
import '../../../scss/template.scss';
import { client } from "../../../apollo";
import gql from 'graphql-tag';
import '../../../scss/template.scss';
import { GET_PARTICULAR_BOOKING } from '../../../graphql/User/booking';
import main from '../../../image/main.png';

const payment_status = {
    0: "welcome Gizzy",
    50: "waiting for payment confirmation",
    10: "Base price paid",
    13: "Ongoing",
    14: "Completed"
}


const SEND_ACCEPT_MSG = gql`
subscription SENDACCEPTMSG($_id:ID,$booking_id:ID){
    send_accept_msg (_id:$_id,booking_id:$booking_id){
      _id
      status
      booking_status
    }
}`
class Invoice extends React.Component {
    state = {
        currency_symbol: 'Ksh',
        collapsed: false,
        booking: [],
        booking_user: [],
        booking_provider: [],
        booking_category: [],
        booking_status:0,
    };
    onToggle = (val) => {
        console.log(val);
        this.setState({
            collapsed: val,
        });
    };

    componentDidMount() {
        console.log(this.props.match.params.id);
        this.fetch_booking(this.props.match.params.id);
    }

    fetch_booking = (_id) => {
        client.query({
            query: GET_PARTICULAR_BOOKING,
            variables: { _id },
            fetchPolicy: 'no-cache',
        }).then(result => {
            console.log(result);
            this.setState({
                booking: result.data.booking,
                booking_category: result.data.booking[0].booking_category,
                booking_user: result.data.booking[0].booking_user,
                booking_provider: result.data.booking[0].booking_provider,
                message: result.data.booking[0].get_booking_message,
                booking_status:result.data.booking[0].booking_status,
            })
            if(result.data.booking[0].booking_status === 50){
                this.current_booking_status(this.props.match.params.id)
            }
        });
    }

    current_booking_status = async (b_id) => {
        var that = this;
        await client.subscribe({
            query: SEND_ACCEPT_MSG,
            variables: { _id: JSON.parse(localStorage.getItem('user'))._id, booking_id: b_id },
        }).subscribe({
            next(data, loading, error) {
                if (loading) {
                    // console.log('load');
                }
                if (data) {
                    console.log(data.data.send_accept_msg.booking_provider);
                    that.setState({ booking_category: data.data.send_accept_msg.booking_status });
                }

            }
        });
    };

    render() {
        const { booking, booking_category, booking_provider, booking_user } = this.state;
        return (
            <div className=" col-xs-12 col-md-12 col-sm-12 invoice_body_color  " >
                <div className="col-xs-12 col-md-12 col-sm-12 col-lg-6 main_content mx-lg-auto">
                    <div className="invoice_header mt-1">
                        <div>
                            <img src={main} alt={'gigzzy'} className='w-50x object_fit cursor_point' />
                        </div>
                        <div className="invoice_info">
                            <div>INVOICE NO <b>{booking[0] ? booking[0].booking_ref : ""}</b></div>
                            <div> <small>{booking[0] ? booking[0].booking_date : ""}</small></div>
                            <div className="py-2">
                                <Tag color="green">
                                    { payment_status[this.state.booking_status]}
                                </Tag>
                            </div>
                        </div>
                    </div>
                    <div className="user_batch mx-3">
                        <p><b>{booking_user[0] ? booking_user[0].name : ""}</b></p>
                        <p>Thanks for using gigzzy</p>
                    </div>
                    <div className="total_fare">
                        <h5>TOTAL FARE</h5>
                        <h1><small></small>{booking[0] ? booking[0].total : ""}</h1>
                        {/* <h6>TOTAL HOURS : asd</h6> */}
                    </div>
                    <div className="fare_estimation col-xs-12 col-md-12 col-sm-12 nopad d-print-block d-md-flex">
                        <div className="fare_breakup mr-sm-3">
                            <p className="title">Fare Breakup</p>
                            <ul>
                                <li>
                                    <label>Base Price</label>
                                    <span>{booking[0] ? booking[0].base_price : ""}</span>
                                </li>
                                {/* <li>
                                            <label>Hour Fare</label>
                                            <span>ad</span>
                                        </li> */}
                                <li>
                                    <label>Extra Price </label>
                                    <span>{booking[0] ? booking[0].extra_price : ""}</span>
                                </li>
                            </ul>
                        </div>
                        <div className="tax_breakup ">
                            <p className="title">Service Breakup</p>
                            <ul>
                                <li>
                                    <label className="d-flex align-items-center">
                                        Service Fee
                                        <Tooltip placement="right" title={`${booking[0]?.service_fee} %`}>
                                            <Icon className="ml-2 cursor_point" type="info-circle" />
                                        </Tooltip>

                                        <span className="ml-auto">
                                            {booking[0] ? booking[0].admin_fee : ""}
                                        </span>
                                    </label>
                                </li>
                                {/* <li>
                                    <label>( added to your total fare)</label>
                                </li> */}
                            </ul>
                        </div>
                    </div>
                    <div className="booking_details col-xs-12 col-md-12 col-sm-12">
                        <p className="title">Booking Details</p>
                        <ul>
                            <li>
                                <label>Service Type</label>
                                <span>{booking_category[0] ? booking_category[0].category_type === 1 ? booking_category[0].category_name : booking_category[0].subCategory_name : ''}</span>
                            </li>
                            <li>
                                <label>Booking Date</label>
                                <span>{booking[0] ? booking[0].booking_date : ""}</span>
                            </li>
                            <li>
                                <label>Scheduled Date</label>
                                <span>{booking[0] ? booking[0].booking_date : ""}</span>
                            </li>
                        </ul>
                    </div>
                    <div className="member_section col-xs-12 col-md-12 col-sm-12 nopad d-print-block d-md-flex">
                        <div className="user_details mr-sm-3">
                            <p className="title">User Details</p>
                            <ul>
                                <li>
                                    <label>Name</label>
                                    <span>{booking_user[0] ? booking_user[0].name : ""}</span>
                                </li>
                                <li>
                                    <label>Email</label>
                                    <span>{booking_user[0] ? booking_user[0].email : ""}</span>
                                </li>
                                <li>
                                    <label>Phone</label>
                                    <span>{booking_user[0] ? booking_user[0].phone_number : ""}</span>
                                </li>
                            </ul>
                        </div>
                        <div className="provider_details">
                            <p className="title">Provider Details</p>
                            <ul>
                                <li>
                                    <label>Name</label>
                                    <span>{booking_provider[0] ? booking_provider[0].name : ""}</span>
                                </li>
                                <li>
                                    <label>Email</label>
                                    <span>{booking_provider[0] ? booking_provider[0].email : ""}</span>
                                </li>
                                <li>
                                    <label>Phone</label>
                                    <span>{booking_provider[0] ? booking_provider[0].phone_number : ""}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="invoice_footer col-xs-12 m-3">
                        <hr />
                        <p>	Thanks,</p>
                        gigzzy Team
                    </div>
                </div>
            </div>
        );
    }
}

export default Invoice;
