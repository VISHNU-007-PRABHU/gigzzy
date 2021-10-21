
import React, { Suspense, useState, useEffect } from "react";
import { Icon, Tooltip, Tag } from "antd"
import useMobileDetect from 'use-mobile-detect-hook';
import main from '../../../image/main.png';
import useReactRouter from "use-react-router";
import { useQuery } from '@apollo/react-hooks';
import { GET_CONTRACT } from '../../../graphql/User/contract';
import { GET_BIDING_DETAIL } from '../../../graphql/User/biding';
import { GET_MILESTONE_PAGINATION } from '../../../graphql/User/milestone';
import _ from 'lodash'
const C2B_CONTENT = React.lazy(() => import('./C2B_CONTENT'));

const payment_status = {
    0: "welcome Gizzy",
    50: "waiting for payment confirmation",
    9: "Provider accept job",
    10: "Base price paid",
    11: "Booking canceled",
    4: "Job started",
    13: "Ongoing",
    14: "Completed"
}

const milestone_payment_status = {
    0: "welcome Gizzy",
    50: "waiting for payment confirmation",
    9: "Pending",
    4: "Job started",
    13: "Ongoing",
    14: "Completed"
}

function ContractInvoice() {
    const detectMobile = useMobileDetect();
    const { history, match } = useReactRouter();
    const [booking_category, set_booking_category] = useState([])
    const [booking_user, set_booking_user] = useState([])
    const [booking_biding, set_booking_biding] = useState({})
    const [booking_provider, set_booking_provider] = useState([])
    const [booking, set_booking] = useState([])
    const [booking_milestone, set_booking_milestone] = useState([])
    const [mpeas_payment_callback, set_mpeas_payment_callback] = useState(false)
    const [mpesa_detail, set_mpesa_detail] = useState({})

    const contract_detail = useQuery(GET_CONTRACT);
    const get_biding_detail = useQuery(GET_BIDING_DETAIL);
    const get_biding_milestone = useQuery(GET_MILESTONE_PAGINATION);

    useEffect(() => {
        fetch_contract()
    }, [])

    const fetch_contract = async () => {
        let finaldata = await contract_detail.refetch({ contract_id: match.params.id })
        set_booking(finaldata.data.get_contracts[0])
        set_booking_provider(finaldata.data.get_contracts[0].get_provider_user)
        set_booking_user(finaldata.data.get_contracts[0].get_user)
        set_booking_category(finaldata.data.get_contracts[0].get_contract_category)
        if (finaldata.data.get_contracts[0].biding_id) {
            let accept_biding_data = await get_biding_detail.refetch({ _id: finaldata.data.get_contracts[0].biding_id })
            set_booking_biding(accept_biding_data.data.get_biding_detail)
            let accept_milestone_data = await get_biding_milestone.refetch({ biding_id: finaldata.data.get_contracts[0].biding_id })
            set_booking_milestone(accept_milestone_data.data.get_biding_milestone)
            if (finaldata.data.get_contracts[0].booking_status === 50) {
                set_mpesa_detail(accept_biding_data.data.get_biding_detail)
            } else if (finaldata.data.get_contracts[0].currenct_milestone_status) {
                let current_mid = finaldata.data.get_contracts[0].currenct_milestone_id
                let mid_result = _.find(booking_milestone, ['_id', current_mid])
                if (_.size(mid_result)) {
                    set_mpesa_detail(mid_result)
                }
            }
        }
    }

    return (
        <>
            <div className=" col-xs-12 col-md-12 col-sm-12 invoice_body_color  " >
                <div className="col-xs-12 col-md-12 col-sm-12 col-lg-6 main_content mx-lg-auto">
                    <div className="invoice_header mt-1">
                        <div className={detectMobile.isMobile() ? "d-none" : ""}>
                            <a href="/bookings">
                                <Tooltip placement="left" title="Back to Booking">
                                    <Icon className="ml-2 cursor_point" type="arrow-left" style={{ fontSize: "26px" }} />
                                </Tooltip>
                            </a>
                        </div>
                        <div>
                            <img src={main} alt={'gigzzy'} className='w-50x object_fit cursor_point' />
                        </div>
                        <div className="invoice_info">
                            <div>INVOICE NO <b>{booking?.contract_ref}</b></div>
                            <div> <small>{booking?.booking_date}</small></div>
                            <div className="py-2">
                                <Tag color="green">
                                    {payment_status[booking.booking_status]}
                                </Tag>
                            </div>
                        </div>
                    </div>

                    <div className={(mpesa_detail?.booking_status === 50 && mpesa_detail?.payment_type == "c2b") ? "jumbotron p-1 mb-3 mx-3" : "d-none"}>
                        <Suspense fallback={
                            <div class="spinner-border text-success" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                        }>
                            <C2B_CONTENT
                                BusinessNumber={mpesa_detail?.ctob_shotcode}
                                AmountNumber={mpesa_detail?.ctob_billRef}
                                Amount={mpesa_detail?.budget} />
                        </Suspense>
                    </div>
                    <div className="user_batch mx-3">
                        <p><b>{booking_user?.[0]?.name}</b></p>
                        <p>Thanks for using gigzzy.</p>
                    </div>
                    <div className="total_fare">
                        <h5>TOTAL COST</h5>
                        <h1><small></small>{booking_biding?.budget}</h1>
                        {/* <h6>TOTAL HOURS : asd</h6> */}
                    </div>
                    <div className="fare_estimation col-xs-12 col-md-12 col-sm-12 nopad d-print-block d-md-flex">
                        <div className="fare_breakup mr-sm-3">
                            <p className="title">Fare Breakup</p>
                            <ul>
                                <li>
                                    <label>Base Price</label>
                                    <span>{booking_biding?.admin_fee}</span>
                                </li>
                            </ul>
                        </div>
                        <div className="tax_breakup ">
                            <p className="title">Service Breakup</p>
                            <ul>
                                <li>
                                    <label className="d-flex align-items-center">
                                        Service Fee
                                        <span className="ml-auto">
                                            {booking_biding?.service_fee}%
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
                                <span>{booking_category?.[0]?.category_type === 1 ? booking_category?.[0]?.category_name : booking_category?.[0]?.subCategory_name}</span>
                            </li>
                            <li>
                                <label>Booking Date</label>
                                <span>{booking?.created_at}</span>
                            </li>
                        </ul>
                    </div>
                    {booking_milestone.length > 0 && <div className="booking_details col-xs-12 col-md-12 col-sm-12">
                        <p className="title">Milestone Details</p>
                        {booking_milestone.map((m_data, m_i) => {
                            return (
                                <>
                                    <div className="jumbotron p-3 ">
                                        <div>Milestone {m_i}</div>
                                        <div className="justify-content-between d-flex">
                                            <div className="d-flex">
                                                Milestone Status
                                            </div>
                                            <div className='d-flex flex-grow-0'>
                                                <Tag color="green">{milestone_payment_status[m_data?.booking_status]}</Tag>
                                            </div>
                                        </div>
                                        <div className="justify-content-between d-flex">
                                            <div className="d-flex">
                                                Budget
                                            </div>
                                            <div className="d-flex flex-grow-0">
                                                {m_data?.budget}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        })}

                    </div>}
                    <div className="member_section col-xs-12 col-md-12 col-sm-12 nopad d-print-block d-md-flex">
                        <div className="user_details mr-sm-3">
                            <p className="title">User Details</p>
                            <ul>
                                <li>
                                    <label>Name</label>
                                    <span>{booking_user?.[0]?.name}</span>
                                </li>
                                <li>
                                    <label>Email</label>
                                    <span>{booking_user?.[0]?.email}</span>
                                </li>
                                <li>
                                    <label>Phone</label>
                                    <span>{booking_user?.[0]?.phone_number}</span>
                                </li>
                            </ul>
                        </div>
                        <div className="provider_details">
                            <p className="title">Provider Details</p>
                            <ul>
                                <li>
                                    <label>Name</label>
                                    <span>{booking_provider?.[0]?.name}</span>
                                </li>
                                <li>
                                    <label>Email</label>
                                    <span>{booking_provider?.[0]?.email}</span>
                                </li>
                                <li>
                                    <label>Phone</label>
                                    <span>{booking_provider?.[0]?.phone_number}</span>
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
        </>
    )
}

export default ContractInvoice
