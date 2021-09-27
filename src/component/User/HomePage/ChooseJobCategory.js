import React, { useState ,useMemo,useContext} from 'react'
import { Row, Col, Icon, Button, Input } from 'antd';
import main from '../../../image/sac.png';
import useReactRouter from 'use-react-router';
import { Alert_msg } from "../../Comman/alert_msg";
import {HomeContext} from '../../context/Location'
const content_data = {
    data1: "Tell us what you need",
    data2: "ON-DEMAND",
    data3: "Post a contract",

}
const ChooseJobCategory = (props) => {
    const datas = useContext(HomeContext);
    console.log("ChooseJobCategory -> comman_data", datas)
    const { history } = useReactRouter();
    // const value = useMemo(() => (
    //     console.log("ChooseJobCategory -> comman_data", comman_data)
    // ), [comman_data]);

    const gopage = (pagetype) => {
        console.log(props)
        if (pagetype === "contract") {
            localStorage.removeItem('current_contract_id')
            history.push({ pathname: `/contract_booking/${props.current_id}` })
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
                        <Button type="primary" className='w-50' onClick={() => { gopage("individual") }}>
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
                        <Button type="primary" className='w-50' onClick={() => { gopage("contract") }}>
                            <div>{content_data['data3']}</div>
                        </Button>
                    </div>
                </Col>
            </Row>
        </>
    )
}
export default ChooseJobCategory;
