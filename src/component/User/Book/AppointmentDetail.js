import React, { Suspense, useState, useEffect } from 'react'
import {  MY_CONTRACT_APPOINTMENTS } from '../../../graphql/User/booking';
import Card from 'antd/lib/card';
import {  useQuery } from '@apollo/react-hooks';
import Spin from 'antd/lib/spin';
import useReactRouter from 'use-react-router';
import InfiniteScroll from 'react-infinite-scroller';
import size from 'lodash/size'
const AppiontmentsEmpty = React.lazy(() => import('./AppiontmentsEmpty'));
function AppointmentDetail(props) {
    const { history, match } = useReactRouter();
    const [user_id, set_user_id] = useState('61306d9257602fcea82c5fb3');
    const [page, set_page] = useState(1);
    const [totalDocs, set_totalDocs] = useState(0);
    const [limit, set_limit] = useState(10);
    const [hasMore, set_hasMore] = useState(false)
    const [loading, set_loading] = useState(false)
    const [appointment_data, set_appointment_data] = useState([]);
    const [booking_status, set_booking_status] = useState(9);

    const get_contracts_pagination = useQuery(MY_CONTRACT_APPOINTMENTS);

    useEffect(() => {
        if (localStorage.getItem('user')) {
            set_user_id(JSON.parse(localStorage.getItem("user"))._id)
        }
        fetch_data()
    }, [props])

    const fetch_data = async () => {
        set_loading(true)
        let input_data = {
            limit,
            page: page,
            booking_status:Number(props.parent_data.status),
            user_id,
            role: 1,
        }
        let finaldata = await get_contracts_pagination.refetch(input_data)
        set_loading(false)
        if (finaldata.data && finaldata.data.get_contracts_pagination) {
            let tem_total = finaldata.data.get_contracts_pagination.pageInfo.totalDocs
            console.log("fetch_data -> booking_status", booking_status)
            if(booking_status === props.parent_data.status){
                let appointment_datas = [...appointment_data, ...finaldata.data.get_contracts_pagination.data];
                set_appointment_data(appointment_datas.reverse());
            }else{
                set_appointment_data(finaldata.data.get_contracts_pagination.data)
            }
            set_booking_status(props.parent_data.status)
            set_totalDocs(tem_total)
            if (tem_total && tem_total > (page * limit)) {
                set_page(page + 1)
                set_hasMore(true)
            } else {
                set_hasMore(false)
            }
        }
    }
    const handleInfiniteOnLoad = async (data) => {
        if (hasMore) {
            fetch_data()
        }
    }
    const onBookingDetailModel = (data) => {
        if (props.view_booking) {
            props.view_booking(true, data._id)
        }
        history.push(`/contract/user_view/${data._id}`)
    }

    return (
        < div className="booking_infinite_container" >
            {!appointment_data.length &&
                <Suspense>
                    <AppiontmentsEmpty />
                </Suspense>
            }
            <InfiniteScroll
                initialLoad={false}
                pageStart={1}
                loadMore={handleInfiniteOnLoad}
                hasMore={hasMore}
                useWindow={true}
            >
                {loading && (
                    <div className="d-flex justify-content-center my-4">
                        <Spin />
                    </div>
                )}
                {appointment_data.map(data => {
                    return (
                        <Card.Grid key={data._id} hoverable={false} className='p-0 w-100 col-12 col-sm-6 cursor_point box_shadow_none'>
                            <div className="d-flex justify-content-between m-2 border br_10" onClick={() => { onBookingDetailModel(data) }}>
                                <div className="d-flex flex-column w-100 justify-content-around px-2">
                                    <div className="normal_font_size bold">
                                        {data.name}
                                    </div>
                                    <div>
                                        {data.contract_ref}
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <div>{data.created_at}</div>
                                        <div>{data.budget}</div>
                                    </div>
                                </div>
                                <div className="position-relative">
                                    <img className="br_10" height="90" width="100" alt='' src={data?.get_contract_all_files[0]?.small_image} />
                                    <div className="contract_tag">Contract</div>
                                </div>
                            </div>
                        </Card.Grid>
                    )
                })}
            </InfiniteScroll>
        </div >
    )
};


export default React.memo(AppointmentDetail);