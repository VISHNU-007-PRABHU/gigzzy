import React,{Suspense} from "react";
import { Skeleton } from 'antd';
const BannerText = React.lazy(() => import('./BannerText'));
const BannerLocationSearch = React.lazy(() => import('./BannerLocationSearch'));
const BannerSearch = () => {
    return (
        <>
            <Suspense fallback={<Skeleton active />}>
                <BannerText />
            </Suspense>
            <Suspense fallback={<Skeleton active />}>
                <BannerLocationSearch />
            </Suspense>

        </>
    )
}
export default BannerSearch;
