import React, { Suspense, useState, useEffect } from 'react'
import { Query } from "react-apollo";
import { My_APPOINTMENTS, MY_CONTRACT_APPOINTMENTS } from '../../../graphql/User/booking';
import Badge from 'antd/lib/badge';
import Row from 'antd/lib/row';
import Tabs from 'antd/lib/tabs';
import Card from 'antd/lib/card';
import Skeleton from 'antd/lib/skeleton';
import Pagination from 'antd/lib/pagination';
import Tooltip from 'antd/lib/tooltip';
import timer_icon from '../../../image/bookLater.png';

const { TabPane } = Tabs;

const AppiontmentsEmpty = React.lazy(() => import('./AppiontmentsEmpty'));
const AppointmentDetail = React.lazy(() => import('./AppointmentDetail'));

function Appointments(props) {
    const [user_id, set_user_id] = useState('');

    useEffect(() => {
        if (!localStorage.getItem('user')) {
            set_user_id(JSON.parse(localStorage.getItem('user'))._id)
        } else {
            set_user_id('61306d9257602fcea82c5fb3')
        }
    }, [localStorage.getItem('user')])

    return (
        <Query
            query={MY_CONTRACT_APPOINTMENTS}
            variables={{
                limit: 10,
                page: props.page,
                _id: user_id,
                user_id: user_id,
                role: 1,
                booking_status: Number(props.status)
            }}
            fetchPolicy='no-cache'
        // pollInterval={25000}
        >
            {({ loading, error, data, startPolling, stopPolling }) => {
                if (loading) return <Skeleton />;
                if (error) return `Error! ${error}`;
                const handleInfiniteOnLoad = (page, pagesize) => {
                    props.handleInfiniteOnLoad(page);
                }
                return (
                    <>
                        <Tabs defaultActiveKey="1" className="border">
                            <TabPane tab="Contract Job" key="1"  className='p-3'>
                                {data.get_contracts_pagination.data.length > 0 ?
                                    <>
                                        <Suspense fallback={<Skeleton />}>
                                            <AppointmentDetail data={data.get_contracts_pagination.data} />
                                        </Suspense>
                                    </>
                                    :
                                    <>
                                        <Suspense fallback={<Skeleton />}>
                                            <AppiontmentsEmpty />
                                        </Suspense>
                                    </>
                                }
                            </TabPane>
                            <TabPane tab="On Demand job" key="2">
                                {data.get_contracts_pagination.data.length > 0 ?
                                    <>
                                        <Suspense fallback={<Skeleton />}>
                                            <AppointmentDetail data={data.get_contracts_pagination.data} />
                                        </Suspense>
                                    </>
                                    :
                                    <>
                                        <Suspense fallback={<Skeleton />}>
                                            <AppiontmentsEmpty />
                                        </Suspense>
                                    </>
                                }
                            </TabPane>
                            <TabPane tab="On hold project" key="3">
                                {data.get_contracts_pagination.data.length > 0 ?
                                    <>
                                        <Suspense fallback={<Skeleton />}>
                                            <AppointmentDetail data={data.get_contracts_pagination.data} />
                                        </Suspense>
                                    </>
                                    :
                                    <>
                                        <Suspense fallback={<Skeleton />}>
                                            <AppiontmentsEmpty />
                                        </Suspense>
                                    </>
                                }
                            </TabPane>
                        </Tabs>
                    </>
                );
            }}
        </Query >
    )
};


export default React.memo(Appointments);