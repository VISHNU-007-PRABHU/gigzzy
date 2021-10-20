import React, { Suspense, useState, useEffect } from 'react'
import Tabs from 'antd/lib/tabs';
import Skeleton from 'antd/lib/skeleton';

const { TabPane } = Tabs;

const AppointmentDetail = React.lazy(() => import('./AppointmentDetail'));

function Appointments(props) {
    return (
        <>
            <Tabs defaultActiveKey="1" className="border">
                <TabPane tab="Contract Job" key="1" className='p-3'>
                    <Suspense fallback={<Skeleton />}>
                        <AppointmentDetail parent_data ={props}/>
                    </Suspense>
                </TabPane>
                {/* <TabPane tab="On Demand job" key="2">
                    <Suspense fallback={<Skeleton />}>
                        <AppointmentDetail />
                    </Suspense>
                </TabPane>
                <TabPane tab="On hold project" key="3">
                    <Suspense fallback={<Skeleton />}>
                        <AppointmentDetail />
                    </Suspense>
                </TabPane> */}
            </Tabs>
        </>
    );
};


export default React.memo(Appointments);