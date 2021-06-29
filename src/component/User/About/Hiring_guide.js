import React,{Suspense} from "react";
import 'antd/dist/antd.css';
import { Layout, Form, Row, Col,Skeleton } from 'antd';

const { Content } = Layout;
const UserHeader = React.lazy(() => import('../Layout/UserHeader'));
const UserFooter = React.lazy(() => import('../Layout/UserFooter'));

class Hiring_guide extends React.Component {
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
                                <h2 className="bold mb-5 text-center">Hiring Guide</h2>
                                <p className="normal_font_size">Verified Companies and Professionals: We use only the top-rated, government-licensed and ISO-certified movers. Every Packer and Mover Professional from UrbanClap goes through 4 Levels of Verification: Background Verification, Consumer Court Case Check, Physical Verification and ID Proof Verification </p>
                                <p className="normal_font_size">Quality of Packing: We use a 3-layered Packing system - using Fabric Sheet covered by a Bubble Wrap further covered by a Corrugated sheet base. Most Local companies just use Fabric sheet. </p>
                                <p className="normal_font_size">Quality of Packing: We use a 3-layered Packing system - using Fabric Sheet covered by a Bubble Wrap further covered by a Corrugated sheet base. Most Local companies just use Fabric sheet. </p>                                
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
export default Form.create()(Hiring_guide);