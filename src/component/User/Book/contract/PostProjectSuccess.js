import React from 'react'
import { Row, Col, Button } from 'antd';
import LoadImg from "../../../../image/bookLater.png"
import useReactRouter from 'use-react-router';
const content = {
    data1: "Project Submitted",
    data2: "Successfully",
    sub: "Your project is under review",
    btn_content: "CONTINUE"
}


const PostProjectSuccess = (props) => {
    const { history } = useReactRouter();

    const gotoPage=()=>{
        history.push({pathname: `/contract/view/${props._id}`})
    }
    return (
        <>
            <Row>
                <Col className="px-1">
                    <div className="normal_font_size my-3 bold primary_color justify-content-center d-flex">{content.data1}</div>
                    <div className="normal_font_size my-3 bold primary_color justify-content-center d-flex">{content.data2}</div>
                </Col>
                <Col className="px-1">
                    <div className="image_head">
                        <img alt='' loading="lazy" className="lazyload img-fluid" src={LoadImg} />
                    </div>
                    <p className="normal_font_size my-3 primary_color justify-content-center d-flex">{content.sub}</p>
                </Col>
                <Col className="px-1">
                    <div className="d-flex justify-content-center ">
                        <Button type="primary" block onClick={gotoPage()}>
                            {content.btn_content}
                        </Button>
                    </div>
                </Col>
            </Row>
        </>
    )
}
export default PostProjectSuccess;
