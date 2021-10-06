import React, { Suspense, useState, useEffect } from 'react'
import { Query } from "react-apollo";
import { My_APPOINTMENTS, MY_CONTRACT_APPOINTMENTS } from '../../../graphql/User/booking';
import Badge from 'antd/lib/badge';
import Card from 'antd/lib/card';
import Skeleton from 'antd/lib/skeleton';
import Pagination from 'antd/lib/pagination';
import Tooltip from 'antd/lib/tooltip';
import useReactRouter from 'use-react-router';

import timer_icon from '../../../image/bookLater.png';
const AppiontmentsEmpty = React.lazy(() => import('./AppiontmentsEmpty'));
function AppointmentDetail(props) {
    const { history, match } = useReactRouter();
    const [user_id, set_user_id] = useState('');
    const [appointment_data, set_appointment_data] = useState([]);

    useEffect(() => {
        set_appointment_data(props.data)
    }, [props])

    const onBookingDetailModel=(data)=>{
        console.log("onBookingDetailModel -> data", data)
        if(props.view_booking){
            props.view_booking(true, data._id)
        }
        history.push(`/contract/user_view/${data._id}`)
    }
    return (
        <>
            {appointment_data.map(data => {
                return (
                    <Card.Grid key={data._id} hoverable={false} className='p-0 w-100 col-12 col-sm-6 cursor_point box_shadow_none'>
                        <div className="d-flex justify-content-between m-2 border br_10" onClick={() => {onBookingDetailModel(data)}}>
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
            })
            }
        </>
    )
};


export default React.memo(AppointmentDetail);