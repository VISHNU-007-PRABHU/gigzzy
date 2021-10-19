import React, { Suspense } from "react";
import { withRouter } from "react-router";
import { Layout, BackTop, Affix, Form, Card, Avatar, Row, Col, Rate, Skeleton } from 'antd';
import 'antd/dist/antd.css';

const Milestone = React.lazy(() => import('../../../../Admin/Contract/Milestone'));
const CreateMilestone = React.lazy(() => import('../../milestone/update/CreateMilestone'));
const Biding = React.lazy(() => import('../../../../Admin/Contract/biding'));
const BidingList = React.lazy(() => import('../../../../Admin/Contract/BidingList'));
const UserHeader = React.lazy(() => import('../../../Layout/UserHeader'));
const padding_setting = { padding: "0px" }

class ContractUserDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contract_id: "",
            booking_status: ""
        };
    }

    componentDidMount() {
        if (this.props.match.params.id) {
            this.setState({ contract_id: this.props.match.params.id });
        }
    }

    render() {

        return (
            <>
                <BackTop />
                <Row gutter={12}>
                    <Col lg={3}></Col>
                    <Col lg={18} md={24} className="my-3">
                        <Card bordered={0} bodyStyle={padding_setting}>
                            <Suspense fallback={<Skeleton active />}>
                                <Biding contract_id={this.state.contract_id}></Biding>
                            </Suspense>
                            <Card bordered={0} className="my-3" bodyStyle={padding_setting}>
                                <Suspense fallback={<Skeleton active />}>
                                    <BidingList contract_id={this.state.contract_id}></BidingList>
                                </Suspense>
                            </Card>
                            {/* {this.state.booking_status === 10 && */}
                                <Suspense fallback={<Skeleton active />}>
                                    <CreateMilestone contract_id={this.state.contract_id}></CreateMilestone>
                                </Suspense>
                                <Suspense fallback={<Skeleton active />}>
                                    <Milestone contract_id={this.state.contract_id}></Milestone>
                                </Suspense>
                            {/* } */}
                        </Card>
                    </Col>
                    <Col lg={6} md={24}>

                    </Col>
                </Row>
            </>
        );
    }
}

export default Form.create()(withRouter(ContractUserDetail));