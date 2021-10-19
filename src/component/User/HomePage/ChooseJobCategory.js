import React, { useState ,useMemo,useContext} from 'react'
import { Row, Col, Icon, Button, Input } from 'antd';
import main from '../../../image/sac.png';
import { useMutation, useQuery } from '@apollo/react-hooks';
import useReactRouter from 'use-react-router';
import { Alert_msg } from "../../Comman/alert_msg";
import {HomeContext} from '../../context/Location';
import { UPDATE_CONTRACT, GET_CONTRACT } from '../../../graphql/User/contract';

const content_data = {
    data1: "Tell us what you need",
    data2: "ON-DEMAND",
    data3: "Post a contract",

}
const ChooseJobCategory = (props) => {
    const [update_contract, { loading: removeLoading }] = useMutation(UPDATE_CONTRACT)
    const datas = useContext(HomeContext);
    console.log("ChooseJobCategory -> comman_data", datas)
    const { history } = useReactRouter();
    const gopage = async(pagetype) => {
        console.log(props)
        if (pagetype === "contract") {
            var input_data = {}
            if (localStorage.getItem('user')) {
                input_data["user_id"] = JSON.parse(localStorage.getItem("user"))._id
            }
            input_data['location_code']= ""
            input_data['lat']= 0.0
            input_data['lng']= 0.0
            input_data['current_page']=-1
            input_data['contract_data']= [
            {
                budget:0,
                category_id:props.current_id,
                category_type:props.comman_data.state.type
            }]
            if (localStorage.getItem('currency') && typeof localStorage.getItem('currency')!="undefined" && localStorage.getItem('currency')!="undefined") {
                input_data["local_location_code"] = localStorage.getItem('currency'); 
            }
            else
            {
                input_data["local_location_code"] = "IN"; 
            }
            
            let final_data = await update_contract({ variables: input_data });
            if (final_data.data.update_contract.status === "success") {
                history.push({ pathname: `/contract_booking/${final_data.data.update_contract._id}` })
            }
            else
            {
                Alert_msg(final_data.data.update_contract)
            }
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
