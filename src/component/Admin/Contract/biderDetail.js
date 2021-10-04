import React, { Suspense, useState, useEffect } from "react";
import useReactRouter from 'use-react-router';
import { client } from "../../../apollo";
import test_image from "../../../image/test.png";
import { Icon } from 'antd';
import size from 'lodash'
import { Modal, Avatar, Button, Skeleton, Col, Tag, Row, Typography, Rate } from 'antd';
const { Title, Paragraph } = Typography;
const { confirm } = Modal;

function BiderDetail(props) {
    const { history } = useReactRouter();
    const [loading, set_loading] = useState(false);
    const [price_visible, set_price_visible] = useState(false);
    const [company_visible, set_company_visible] = useState(false);
    const [data, set_data] = useState({});
    const [user_data, set_user_data] = useState({});

    useEffect(() => {
        if (props.current_data) {
            set_data(props.current_data)
            if (props.current_data.get_user && size(props.current_data.get_user)) {
                set_user_data(props.current_data.get_user[0])
            }
        }
    }, [props])

    const gotoPage = () => {
        set_price_visible(!price_visible)
    }

    return (
        <div className="p-3">
            <Row gutter={[12, 24]}>
                <Col span={24}>
                    <div className="d-flex justify-content-between">
                        <div>
                            <Avatar className="biding_avatar" size={64} src={user_data?.img_url || ""} />
                        </div>
                        <div className="w-100 px-1">
                            <div className="d-flex justify-content-between align-items-center">
                                <Title level={4} className="d-flex flex-column align-items-baseline">
                                    <div>
                                        {user_data?.first_name || ""}{user_data?.last_name || ""}
                                    </div>
                                    <div className="font-weight-light figure-caption">
                                        {"XYZ pvt"}
                                    </div>
                                </Title>
                                <div>
                                    <Rate count={1} value={1} className="mr-2" />
                                    {user_data?.rating || "0"}
                                </div>
                            </div>
                            <div>
                                <Paragraph ellipsis={{ rows: 3, expandable: true }}>
                                    Ant Design, a design language for background applications, is refined by Ant UED Team. Ant
                                    Design, a design language for background applications, is refined by Ant UED Team. Ant Design,
                                    a design language for background applications, is refined by Ant UED Team. Ant Design, a
                                    design language for background applications, is refined by Ant UED Team. Ant Design, a design
                                    language for background applications, is refined by Ant UED Team. Ant Design, a design
                                    language for background applications, is refined by Ant UED Team.
                                    Ant Design, a design language for background applications, is refined by Ant UED Team. Ant
                                    Design, a design language for background applications, is refined by Ant UED Team. Ant Design,
                                    a design language for background applications, is refined by Ant UED Team. Ant Design, a
                                    design language for background applications, is refined by Ant UED Team. Ant Design, a design
                                    language for background applications, is refined by Ant UED Team. Ant Design, a design
                                    language for background applications, is refined by Ant UED Team.
                                </Paragraph>
                            </div>
                            <div className={user_data?.user_type === "company" ? "" : "d-none"}>
                                <Button type="primary" onClick={() => { set_company_visible(!company_visible) }}> Company Detail</Button>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row gutter={[12, 24]}>
                <Col>
                    <Title level={4} className="font-weight-normal">Category : <Tag color="green">gradening</Tag>
                        <Tag color="green">gradening</Tag>
                        <Tag color="green">gradening</Tag>
                    </Title>
                </Col>
            </Row>
            <Row gutter={[12, 24]}>
                <Col>
                    <div className="d-flex justify-content-around normal_font_size bold">Duration : {data?.timeline}{data?.timeline_type}</div>
                    <Title level={2} className="font-weight-normal text-success d-flex justify-content-around">
                        <div className="align-items-center d-flex flex-column">
                            <div>
                                {data?.budget}
                            </div>
                            <div className="f_25">
                                {"Budget"}
                            </div>
                        </div>
                    </Title>
                </Col>
            </Row>
            <Row gutter={[12, 24]}>
                <Col>
                    <Title level={4}>{"Description about bids"}</Title>
                    <div>
                        <Paragraph ellipsis={{ rows: 3, expandable: true }}>
                            {data?.description}
                        </Paragraph>
                    </div>

                </Col>
            </Row>
            <Row gutter={[12, 24]}>
                <Col>
                    <Title level={4} className="font-weight-normal">Experience : {data?.experience || 0}</Title>
                </Col>
            </Row>
            <Row gutter={[12, 24]}>
                <Col>
                    <Title level={4} className="font-weight-normal">Company Legal Document</Title>
                    <img loading="lazy" alt="example" className="h_200x w-100" src={test_image} />
                </Col>
            </Row>
            <Row gutter={[12, 32]}>
                <Col>
                    <Title level={4} className="font-weight-normal">Company Legal License</Title>
                    <img loading="lazy" alt="example" className="h_200x w-100" src={test_image} />
                </Col>
            </Row>
            <Row gutter={[12, 24]}>
                <Col span={24}>
                    <div className="d-flex justify-content-around mt-4">
                        <Button type="primary" > Add to shortlist</Button>
                    </div>
                </Col>
            </Row>
            <Row gutter={[12, 24]}>
                <Col span={12}>
                    <div className="d-flex justify-content-around">
                        <Button size={'large'} > Reject</Button>
                    </div>
                </Col>
                <Col span={12}>
                    <div className="d-flex justify-content-around">
                        <Button size={'large'} type="primary" onClick={() => { set_price_visible(!price_visible) }}> Adward</Button>
                    </div>
                </Col>
            </Row>
            <Modal
                title="Please fund the Project"
                visible={price_visible}
                footer={null}
                onCancel={() => { set_price_visible(!price_visible) }}
            >
                <Row gutter={[12, 24]}>
                    <Col span={24}>
                        <div className="d-flex normal_font_size justify-content-between">
                            <div className="">
                                Project Budget
                            </div>
                            <div >
                                10.00 ksh
                            </div>
                        </div>
                    </Col>
                </Row>

                <Row gutter={[12, 24]}>
                    <Col span={24}>
                        <Tag color={'#99d332'} className="w-100" onClick={() => { gotoPage() }}>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex flex-column">
                                    <div> Service fees</div>
                                    <div className="normal_font_size"> 1.05 Ksh</div>
                                </div>
                                <div className="normal_font_size" I> Pay Now</div>
                            </div>
                        </Tag>
                    </Col>

                </Row>
            </Modal>
            <Modal
                visible={company_visible}
                footer={null}
                header={null}
                className="company_detail_modal"
                onCancel={() => { set_company_visible(!company_visible) }}
            >
                <Row gutter={[12, 24]} className="mt-5">
                    <Col span={24}>
                        <div className="d-flex normal_font_size justify-content-between align-items-center">
                            <div>
                                <div className="bold">
                                    XYZ PRIVATE LT
                                </div>
                                <div >
                                    WWW.test.com
                                </div>
                            </div>
                            <div>
                                <Avatar className="biding_avatar" size={64} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            </div>
                        </div>
                    </Col>
                </Row>

                <Row gutter={[12, 24]}>
                    <Col>
                        <div>
                            <Paragraph ellipsis={{ rows: 3, expandable: true }}>
                                Ant Design, a design language for background applications, is refined by Ant UED Team. Ant
                                Design, a design language for background applications, is refined by Ant UED Team. Ant Design,
                                a design language for background applications, is refined by Ant UED Team. Ant Design, a
                                design language for background applications, is refined by Ant UED Team. Ant Design, a design
                                language for background applications, is refined by Ant UED Team. Ant Design, a design
                                language for background applications, is refined by Ant UED Team.
                                Ant Design, a design language for background applications, is refined by Ant UED Team. Ant
                                Design, a design language for background applications, is refined by Ant UED Team. Ant Design,
                                a design language for background applications, is refined by Ant UED Team. Ant Design, a
                                design language for background applications, is refined by Ant UED Team. Ant Design, a design
                                language for background applications, is refined by Ant UED Team. Ant Design, a design
                                language for background applications, is refined by Ant UED Team.
                            </Paragraph>
                        </div>
                    </Col>
                </Row>

                <Row gutter={[12, 24]}>
                    <Col span={24}>
                        <div>
                            <Button type="link" className="option_blue normal_font_size">
                                <div className="d-flex align-items-center">
                                    Dowwnload Profile <Icon type="download" className="px-2" />
                                </div>
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Modal>
        </div>
    );
}
export default BiderDetail;