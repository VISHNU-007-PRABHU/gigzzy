import React,{Suspense} from "react";
import 'antd/dist/antd.css';
import { Layout, Form, Row, Col,Skeleton } from 'antd';

const { Content } = Layout;
const UserHeader = React.lazy(() => import('../Layout/UserHeader'));
const UserFooter = React.lazy(() => import('../Layout/UserFooter'));

class Why_Gigzzy extends React.Component {
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
                            <div id="section-1" className="why_jiffy position-relative pt-1 container text-center">
                                <h2 className="bold mb-5 text-center">Why Gigzzy</h2>
                                <p className="normal_font_size">
                                Availability of on demand specialized and credentialed  skill sets at an affordable rate.
                                Large workforce pool to choose from<br/>
                                Background checks on regulatory compliance on all partners   <br/>                                 
                                </p>
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
export default Form.create()(Why_Gigzzy);