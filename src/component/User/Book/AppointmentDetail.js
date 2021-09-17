import React, { Suspense, useState, useEffect } from 'react'
import { Query } from "react-apollo";
import { My_APPOINTMENTS, MY_CONTRACT_APPOINTMENTS } from '../../../graphql/User/booking';
import Badge from 'antd/lib/badge';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Card from 'antd/lib/card';
import Skeleton from 'antd/lib/skeleton';
import Pagination from 'antd/lib/pagination';
import Tooltip from 'antd/lib/tooltip';
import timer_icon from '../../../image/bookLater.png';
const AppiontmentsEmpty = React.lazy(() => import('./AppiontmentsEmpty'));
function AppointmentDetail(props) {
    const [user_id, set_user_id] = useState('');
    const [appointment_data, set_appointment_data] = useState([]);

    useEffect(() => {
        set_appointment_data(props.data)
    }, [props])
    return (
        <>
            {appointment_data.map(data => (
                <Card.Grid  style={{ borderRadius: '1em', boxShadow: 'grey 1px 1px 5px 0px' }} className='p-0 my-1 w-100 col-12 col-sm-6 cursor_point'>
                    <div className="d-flex justify-content-between">
                        <div className="d-flex flex-column w-100 p-1">
                            <div className="normal_font_size bold">
                                {data.name}
                            </div>
                            <div>
                                {data.contract_ref}
                            </div>
                            <div className="d-flex justify-content-between">
                                <div>{data.budget}</div>
                                <div>{data.budget}</div>
                            </div>
                        </div>
                        <div>
                            <img style={{ borderRadius: '1em' }} height="90" width="100" alt='' src={""} />
                        </div>
                    </div>
                </Card.Grid>
            ))
            }
        </>
    )
};


export default React.memo(AppointmentDetail);