import React, { useState } from 'react'
import { Row, Col, Icon, Button, Input } from 'antd';
import main from '../../../image/sac.png';
import useReactRouter from 'use-react-router';
import { Alert_msg } from "../../Comman/alert_msg";

const content_data = {
    data1: "Tell us what you need",
    data2: "ON-DEMAND",
    data3: "Post a contract",

}
const ChooseJobCategory = (props) => {
    const { history } = useReactRouter();
    const [email, setEmail] = useState("");
    
    const gopage = (pagetype) => {
        console.log(props)
        if (pagetype === "contract") {
            history.push({pathname: `/contract_booking/${props.current_id}`})
        } else {
           history.push(props.comman_data);
        }
    }

    return (
        <>
            <Row gutter={[16, 40]}>
                <Col span={24}>
                    <div className="normal_font_size primary_color d-flex justify-content-center">{content_data['data1']}</div>
                </Col>
            </Row>
            <Row gutter={[16, 32]}>
                <Col span={24}>
                    <div className="normal_font_size primary_color d-flex justify-content-center">
                        <Button type="primary" className='w-50' onClick={()=>{gopage("individual")}}>
                            <div>{content_data['data2']}</div>
                        </Button>
                    </div>
                </Col>
            </Row>
            <Row gutter={[16, 32]}>
                <Col span={24}>
                    <div className="normal_font_size primary_color d-flex justify-content-center">
                       or
                    </div>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <div className="normal_font_size primary_color d-flex justify-content-center">
                        <Button type="primary" className='w-50' onClick={()=>{gopage("contract")}}>
                            <div>{content_data['data3']}</div>
                        </Button>
                    </div>
                </Col>
            </Row>
        </>
    )
}
export default ChooseJobCategory;
