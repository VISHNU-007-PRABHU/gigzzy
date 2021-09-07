import React, { Suspense } from "react";
import { withRouter } from "react-router";
import { client } from "../../../apollo";
import test_image from "../../../image/test.png";
import { Modal, Avatar, Button, Skeleton, Col, Tag, Row, Typography } from 'antd';
const { Title, Paragraph } = Typography;
const { confirm } = Modal;
const count = 3;

const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat&noinfo`;

class BiderDetail extends React.Component {
    state = {
        initLoading: true,
        loading: false,
        price_visible: false,
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
            <div className="p-4">
                <Row gutter={[12, 24]}>
                    <Col span={24}>
                        <div className="d-flex justify-content-between">
                            <div>
                                <Avatar className="biding_avatar" size={64} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            </div>
                            <div className="w-100 px-1">
                                <div className="d-flex justify-content-between align-items-center">
                                    <Title level={4} className="d-flex flex-column align-items-baseline">
                                        <div>
                                            {this.state.data.name}
                                        </div>
                                        <div className="font-weight-light figure-caption">
                                            {"XYZ pvt"}
                                        </div>
                                    </Title>
                                    <div>{this.state.data.name}</div>
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
                                <div>
                                    <Button type="primary"> Company Detail</Button>
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
                <Row gutter={[12, 24]}>
                    <Col>
                        <Title level={4}>{"Description about bids"}</Title>
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
                        <Title level={4} className="font-weight-normal">Experience : 3 Years</Title>
                    </Col>
                </Row>
                <Row gutter={[12, 24]}>
                    <Col>
                        <Title level={4} className="font-weight-normal">Company Legal Document</Title>
                         <img loading="lazy" alt="example" className="h_200x w-100"  src={test_image} />
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
                            <Button size={'large'} type="primary" onClick={() => { this.setState({ price_visible: !this.state.price_visible }) }}> Adward</Button>
                        </div>
                    </Col>
                </Row>
                <Modal
                    title="Please fund the Project"
                    visible={this.state.price_visible}
                    footer={null}
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
                            <Tag color="#87d068" className="w-100">
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
            </div>
        );
    }
}

export default (withRouter(BiderDetail));