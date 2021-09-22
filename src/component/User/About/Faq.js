import React, { Suspense } from "react";
import 'antd/dist/antd.css';
import { Layout, Form, Row, Col, Collapse, Icon, Skeleton } from 'antd';
import { FAQ_DATA } from './faqData'

const { Content } = Layout;
const { Panel } = Collapse;
const UserHeader = React.lazy(() => import('../Layout/UserHeader'));
const UserFooter = React.lazy(() => import('../Layout/UserFooter'));

class Faq extends React.Component {
    render() {
        return (
            <Layout className="white" style={{ minHeight: '100vh' }}>
                <span className=" d-none d-md-block">
                    <Suspense fallback={<Skeleton active />}>
                        <UserHeader />
                    </Suspense>
                </span>
                <Content className="px-1">
                    <Row>
                        <Col lg={{ span: 20, offset: 2 }}>
                            <div id="section-1" className="why_jiffy position-relative pt-1 container ">
                                <h2 className="bold mb-5 text-center">GIGZZY FAQS</h2>
                                <h2 className="bold mb-3">Frequently Asked Questions</h2>
                                <Collapse defaultActiveKey={[0]} expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}>
                                    {FAQ_DATA.map((values, i) => (
                                        <Panel header={values?.title} key={i}>
                                            <div>{values?.data}</div>
                                        </Panel>
                                    ))}
                                </Collapse>
                                <div className="bold my-5 d-flex justify-content-between">
                                    <div>
                                        Contact Email : info@gigizzy.com
                                    </div>
                                    <div>
                                        Contact Email : info@gigizzy.com
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Content>
                <span className=" d-none d-md-block">
                    <Suspense fallback={<Skeleton active />}>
                        <UserFooter />
                    </Suspense>
                </span>
            </Layout>
        );
    }
}
export default Form.create()(Faq);