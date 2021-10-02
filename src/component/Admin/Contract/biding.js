import React, { Suspense } from "react";
import { withRouter } from "react-router";
import { client } from "../../../apollo";
import { Col, Tag, Row, Typography, Skeleton } from 'antd';
import { GET_CONTRACT } from '../../../graphql/User/contract';
const ShowCategory = React.lazy(() => import('../../Comman/ShowCategory'));
const BannerSlider = React.lazy(() => import('../../Comman/BannerSlider'));

const { Title, Paragraph } = Typography;
class Biding extends React.Component {
    state = {
        loading: false,
        data: {},
        catgeory: {}
    };

    componentDidMount() {
        if (this.props.match.params.id) {
            this.getData();
        }
    }

    getData = async () => {
        this.setState({ loading: true, });
        client.query({
            query: GET_CONTRACT,
            variables: { contract_id: this.props.match.params.id },
            fetchPolicy: 'no-cache',
        }).then(result => {
            console.log("Biding -> getData -> result", result.data.get_contracts)
            this.setState({
                loading: false,
                data: result.data.get_contracts[0],
                catgeory: result.data.get_contracts[0]?.get_contract_category[0] || {}
            });
        })
    };

    render() {
        const { data, catgeory } = this.state
        return (
            <>
                <Row gutter={[12, 24]}>
                    <Col span={24}>
                        <div className="d-flex flex-column flex-md-row justify-content-between normal_font_size">
                            <div>Contract Detail</div>
                            <div>Contract Ref : {data?.contract_ref}</div>
                        </div>
                    </Col>
                </Row>
                <Row gutter={[12, 24]}>
                    <Col span={24}>
                        <Suspense fallback={<Skeleton active />}>
                            <BannerSlider parent_images={data?.get_contract_all_files} />
                        </Suspense>
                    </Col>
                </Row>
                <Row gutter={[12, 24]}>
                    <Col>
                        <Title level={4}>{data?.name}</Title>
                        <Title level={4} className="font-weight-light m-0 mb-1">{data?.company_name}</Title>
                        <Suspense fallback={<Skeleton active />}>
                            <ShowCategory parent_catgeory={catgeory} custom_font={4} custom_class="font-weight-light m-0 text-success"/>
                        </Suspense>
                    </Col>
                </Row>
                <Row gutter={[12, 24]}>
                    <Col>
                        <div className="normal_font_size d-flex justify-content-between py-2">
                            <div className="d-flex align-items-center">
                                <Suspense fallback={<Skeleton active />}>
                                    <ShowCategory parent_catgeory={catgeory} custom_class="font-weight-light m-0" custom_font={4} />
                                </Suspense>
                                <div className="px-3">{data?.biding_count || 0}Bids</div>
                                <Tag color="green">green</Tag>
                            </div>
                            <div>
                                <div>{data?.budget}</div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row gutter={[12, 24]}>
                    <Col>
                        <Title level={4}>{"Project description"}</Title>
                        <div>
                            <Paragraph ellipsis={{ rows: 3, expandable: true }}>
                                {data?.description}
                            </Paragraph>
                        </div>

                    </Col>
                </Row>
                <Row gutter={[12, 24]}>
                    <Col>
                        <div className="d-flex justify-content-around normal_font_size bold">Duration : {data?.timeline}</div>
                        <Title level={2} className="font-weight-normal text-success d-flex justify-content-around">
                            <div className="align-items-center d-flex flex-column">
                                <div>
                                    {data?.budget || 0.0}
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