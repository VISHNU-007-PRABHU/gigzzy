import React from 'react'
import { Row, Col, Button } from 'antd';
import { useHistory } from "react-router-dom";

const content_data = {
  data1: "REGISTRATION ",
  data2: "COMPANY REGISTRATION",
  data3: "INDIVIDUAL REGISTRATION",
}


export default function ChooseRegistration(props) {
  let history = useHistory();
  const chooseType=(type)=>{
      if(type === 1){ 
          console.log(props)
          props.change_from_type("COMPANY_REGISTRATION")
      }else if(type === 2){
        console.log(props)
        props.change_from_type("INDIVIDUAL_REGISTRATION")
      }
  } 
  return (
    <>
      <Row gutter={[16, 40]}>
        <Col span={24}>
          <div className="normal_font_size primary_color d-flex justify-content-center">{content_data['data1']}</div>
        </Col>
      </Row>
      <Row gutter={[16, 40]}>
        <Col span={24}>
          <div className="normal_font_size primary_color d-flex justify-content-center">
            <Button type="primary" className='w-50' onClick={()=>{chooseType(1)}}>
              <div>{content_data['data2']}</div>
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
        <div className="normal_font_size primary_color d-flex justify-content-center">
          <Button type="primary" className='w-50' onClick={()=>{chooseType(2)}}>
            <div>{content_data['data3']}</div>
          </Button>
          </div>
        </Col>
      </Row>
    </>
  )
};

