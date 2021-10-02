import React, { Suspense, useState } from 'react'
import { Row, Col, Button, Input, Skeleton } from 'antd';
import main from '../../../../image/sac.png';
import play_store_img from '../../../../image/play_store.png';
import app_store_img from '../../../../image/app_store.png';
import useReactRouter from 'use-react-router';
import {isMobile} from 'react-device-detect';
import { Alert_msg } from "../../../Comman/alert_msg";
const TrendingHeader = React.lazy(() => import('../Trending/TrandingHeader'));

const header_data = {
    title1: "Your",
    title2: "home of convenience",
    title3: "Choose and book 100+ services and track then on Gigzzy App",
    title4: "we will send you a link, open it on your phone to download the app",
}
const header_class = "justify-content-center d-flex flex-column align-items-baseline"
const mobile_header_class ="text-center justify-content-center d-flex flex-column align-items-baseline"
const DownloadPage = () => {
    const { history } = useReactRouter();
    const [email, setEmail] = useState("");

    const sendLink = () => {
        if (email) {
            Alert_msg({ msg: "We will send to that email", status: "success" });
            setEmail("");
        } else {
            Alert_msg({ msg: "Please enter email", status: "success" });
        }
    }

    return (
        <div className="my-4 ">
            <Row className="align-items-center d-flex flex-column flex-md-row bg_light_pink">
                <Col sm={24} md={12}>
                    <Suspense fallback={<Skeleton active />}>
                        <TrendingHeader header_class={isMobile ? mobile_header_class:header_class} header_data={header_data} />
                    </Suspense>
                    <div className="download_section position-relative p-0 p-md-4">
                        <div className="d-flex mb-5 justify-content-center justify-content-md-start">
                            <Input className="w-50" placeholder="Enter your email" size={"large"} onChange={(e) => { setEmail(e.target.value) }} />
                            <Button size={"large"} className="ml-4 primary_bg_blue_color border d-flex text-white align-items-center" onClick={() => { sendLink() }}>
                                Send Link
                            </Button>
                        </div>
                        <div className="d-flex justify-content-around justify-content-md-start">
                            <a rel="noopener noreferrer" href="https://play.google.com/store/apps/details?id=com.gigzzy.user" target="_blank">
                                <img alt='' loading="lazy" className="lazyload mr-3" src={play_store_img} />
                            </a>
                            <a rel="noopener noreferrer" href="https://apps.apple.com/us/app/gigzzy-user/id1574904567" target="_blank">
                                <img alt='' loading="lazy" className="lazyload ml-3" src={app_store_img} />
                            </a>
                        </div>
                    </div>
                </Col>
                <Col sm={24} md={12} className="px-1 my-5">
                    <img src={main} alt={'gigzzy'} className='w-100 py-3 object_fit cursor_point' />
                </Col>
            </Row>
        </div>
    )
}
export default DownloadPage;
