import React, { useState,useEffect } from "react";
import { Typography, Row, Col } from 'antd';
const { Paragraph, Text } = Typography;

let StaticData = {
    title1: "Tranding",
    title2: "Services",
    title3: "Service provider Sign-up for free, no more lead chatgesfor jobs that you don't get",
    title4: "Get instant access to reliable and affordable Gigzzy service providers."
}

const TrendingHeader = (props) => {

    const [LocalData,set_LocalData]=useState(StaticData)
    const [LocalClass,set_LocalClass]=useState("justify-content-center d-flex flex-column align-items-center")
    useEffect(() => {
        if(props.header_data){
            set_LocalData(props.header_data)
        }
        if(props.header_class){
            set_LocalClass(props.header_class)
        }
    }, [props])
    return (
        <>
            <Row gutter={[32,48]}>
                <Col md={24}>
                    <div className={LocalClass}>
                        <Paragraph className="h2 mb-2 font-weight-bold line_h_1_3">
                            <Text className="primary_color pr-2">
                                {LocalData.title1}
                            </Text>
                            <Text className="primary_blue_color">
                                {LocalData.title2}
                            </Text>
                        </Paragraph>
                        <Paragraph className="mb-0">{LocalData?.title4}</Paragraph>
                        <Paragraph className="mb-2">{LocalData?.title3}</Paragraph>
                    </div>
                </Col>
            </Row>

        </>
    )
}
export default TrendingHeader;
