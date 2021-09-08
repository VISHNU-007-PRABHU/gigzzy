import React,{useState} from 'react'
import { Row, Col, Icon,Button,Input } from 'antd';
import main from '../../../image/sac.png';
import useReactRouter from 'use-react-router';
import { Alert_msg } from "../../Comman/alert_msg";

const content_data = {
    data1: "Your home of convenience",
    data2: "Choose and book 100+ services and track then on Gigzzy App",
    data3: "we will send you a link, open it on your phone to download the app",

}
const DownloadApp = () => {
    const { history } = useReactRouter();
    const [email, setEmail] = useState("");
    
    const sendLink = () => {
        if(email){
            Alert_msg({ msg: "We will send to that email", status: "success" });
            setEmail("");
        }else{
            Alert_msg({ msg: "Please enter email", status: "success" });
        }
    }

    return (
        <div>
            <Row className="download_bg_color">
                <Col lg={{ span: 20, offset: 2 }}>
                    <Row>
                        <Col lg={12} className="px-1">
                            <img src={main} alt={'gigzzy'} className='w-100 py-3 object_fit cursor_point' />
                        </Col>
                        <Col lg={12} className="px-1">
                            <div className="download_section position-relative pt-5 text-center">
                                <h2 className="bold text-center">{content_data['data1']}</h2>
                                <p className="normal_font_size mb-5 ">{content_data['data2']}</p>
                                <p className="">{content_data['data3']}</p>
                                <div className="d-flex justify-content-center mb-5">
                                    <Input className="w-50" placeholder="Enter your email" size={"large"} onChange={(e)=>{setEmail(e.target.value)}}/>
                                    <Button type="primary" size={"large"} className="ml-4" onClick={()=>{sendLink()}}>
                                        Send Link
                                    </Button>
                                </div>
                                <a rel="noopener noreferrer" href="https://play.google.com/store/apps/details?id=com.gigzzy.user" target="_blank">
                                    <img alt='' loading="lazy" className="lazyload mr-3" src={require("../../../image/play_store.png")} />
                                </a>
                                <a rel="noopener noreferrer" href="https://apps.apple.com/us/app/gigzzy-user/id1574904567" target="_blank">
                                    <img alt='' loading="lazy" className="lazyload ml-3" src={require("../../../image/app_store.png")} />
                                </a>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}
export default DownloadApp;
