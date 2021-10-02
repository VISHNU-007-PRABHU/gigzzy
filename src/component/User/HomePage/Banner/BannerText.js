import React, { useState } from "react";
import { Typography, Row, Col } from 'antd';
const { Paragraph, Text } = Typography;

let LocalData = {
    title1: "A marketplace",
    title2: "connecting consumers with services providers at an affordable rate",
    title3: "Service provider Sign-up for free, no more lead chatgesfor jobs that you don't get",
    title4: "Get instant access to reliable and affordable Gigzzy service providers."
}

const BannerText = () => {
    return (
        <>
            <Row>
                <Col md={24} className="">
                    <Paragraph className="h3 mb-2 font-weight-bold">
                        <Text className="primary_color d-flex">
                            {LocalData.title1}
                        </Text>
                        <Text className="primary_blue_color d-flex">
                            {LocalData.title2}
                        </Text>
                    </Paragraph>
                    <Paragraph className="h5 mb-2">{LocalData?.title2}</Paragraph>
                    <Paragraph className="mb-2">{LocalData?.title3}</Paragraph>
                </Col>
            </Row>
               
        </>
    )
}
export default BannerText;
