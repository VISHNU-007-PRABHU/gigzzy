import React, { Suspense, useState, useEffect } from 'react'
import { Skeleton } from 'antd';
import useReactRouter from "use-react-router";
import _ from 'lodash'
const OnDemand = React.lazy(() => import('./OndemandInvoice'));
const Contract = React.lazy(() => import('./ContractInvoice'));

const Invoice = (props) => {
    const { history ,match} = useReactRouter();
    const [booking_type, set_booking_type] = useState(false)
    useEffect(() => {
        console.log("Invoice -> match.params['type']", match.params['type'])
        if (match.params['type']) {
            set_booking_type(match.params['type'])
        }else{
            set_booking_type('contract')
            // history.push('/bookings')
        }
    }, [])

    console.log(booking_type)
    return (
        <>
            {booking_type === "ondemand" &&
                <Suspense fallback={<Skeleton active />}>
                    <OnDemand />
                </Suspense>
            }
            {booking_type === "contract" &&
                <Suspense fallback={<Skeleton active />}>
                    <Contract />
                </Suspense>
            }

        </>
    )
}

export default Invoice
