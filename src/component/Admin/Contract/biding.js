import React, { Suspense } from "react";
import { withRouter } from "react-router";
import { client } from "../../../apollo";
import { List, Avatar, Button, Skeleton, Col, Tag, Row, Typography } from 'antd';
import { divide } from "lodash";
const { Title, Paragraph } = Typography;
const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat&noinfo`;

class Biding extends React.Component {
    state = {
        initLoading: true,
        loading: false,
        data: {
            name: "Garding setup",
            company_name: "XYZ Pct ltd",
            data1: "Cleaing",
            data2: "16 bids",
            data3: "active",
            price: "20000 Ksh",
            detail: " Content testing (when performed at the beginning of a project) can save you the frustration of reaching the end of the project, only to find that people don't understand what you're saying. It can also provide designers with context around what users care about, and how to best structure information",
            duration: "3 day",
            loading: false
        },
        list: [],
    };

    componentDidMount() {
        this.getData(res => {
            this.setState({
                initLoading: false,
                data: res.results,
                list: res.results,
            });
        });
    }

    getData = callback => {

    };

    onLoadMore = () => {
        this.setState({
            loading: !this.state.loading,
        });
    };

    render() {
        const data = [
            {
                name: 'Ant Design Title 1',
                price: '20000 Ksh',
                basde: "basde",
                time: "3.5",
                year: "1 day"

            },
            {
                name: 'Ant Design Title 1',
                price: '20000 Ksh',
                basde: "basde",
                time: "3.5",
                year: "1 day"
            },
            {
                name: 'Ant Design Title 1',
                price: '20000 Ksh',
                basde: "basde",
                time: "3.5",
                year: "1 day"
            },

        ];
        const { initLoading, loading, list } = this.state;

        return (
            <>
                <Row gutter={[12, 24]}>
                    <Col span={24}>
                        <div className="d-flex justify-content-between normal_font_size">
                            <div>Contract Detail</div>
                            <div>Contract Ref : 90879278958924357089</div>
                        </div>
                    </Col>
                </Row>
                <Row gutter={[12, 24]}>
                    <Col span={24}>
                        <img alt='' src={require("../../../image/handyman.jpg")} loading="lazy" className="w-100 br_14 h_18_em lazyload" />
                    </Col>
                </Row>
                <Row gutter={[12, 24]}>
                    <Col>
                        <Title level={4}>{this.state.data.name}</Title>
                        <Title level={4} className="font-weight-light m-0 mb-1">{this.state.data.company_name}</Title>
                        <Title level={4} className="font-weight-light m-0 text-success">{"gradening"}</Title>
                    </Col>
                </Row>
                <Row gutter={[12, 24]}>
                    <Col>
                        <div className="normal_font_size d-flex justify-content-between py-2">
                            <div className="d-flex align-items-center">
                                <div>{this.state.data.data1}</div>
                                <div className="px-3">{this.state.data.data2}</div>
                                <Tag color="green">green</Tag>
                            </div>
                            <div>
                                <div>{this.state.data.price}</div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row gutter={[12, 24]}>
                    <Col>
                        <Title level={4}>{"Project description"}</Title>
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
                    <Col>
                        <div className="d-flex justify-content-around normal_font_size bold">Duration : {this.state.data.duration}</div>
                        <Title level={2} className="font-weight-normal text-success d-flex justify-content-around">
                            <div className="align-items-center d-flex flex-column">
                                <div>
                                    {this.state.data.price}
                                </div>
                                <div className="f_25">
                                    {"Budget"}
                                </div>
                            </div>
                        </Title>
                    </Col>
                </Row>
            </>
        );
    }
}

export default (withRouter(Biding));