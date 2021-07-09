import React, { Suspense } from "react";
import 'antd/dist/antd.css';
import { Layout, Form, Row, Col, Skeleton } from 'antd';

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
                                <p><strong>Gigzzy Professional Screening Process</strong></p><p>Gigzzy uses an extensive screening process to screen businesses and business owners/principals. We perform this screening when a business applies to join our network and, if the business is accepted, whenever concerns are brought to our attention. If you have concerns that a pro in our network doesn't meet these standards, please contact us to investigate. We're committed to maintaining a network of trusted home service businesses, and those who don't meet our criteria will be rejected or promptly removed from our network.</p><p><strong>Criminal Background Check</strong></p><p><strong>Who does Gigzzy background check?</strong></p><p>The owner or principal of each business in Gigzzy network (with the exception of Corporate Accounts) must pass a background check. Unfortunately, we cannot perform a background check on every employee of a business—the background checks are performed only on the owner or principal. As always, we recommend that you conduct your own research on the businesses you hire, including making inquiries directly with the businesses regarding their employee background check policies.</p><p><strong>What does the background check cover?</strong></p><p>We use relevant Government Agencies to check the criminal record of a potential provider before onboarding.</p><p><strong>Licensing</strong></p><p>We require every professional to attest that they carry the appropriate local licensing to practice their trade.</p><p><strong>Business Compliance</strong></p><p>If a business states that it's registered as a corporation or limited liability company, we confirm that the company is in good standing in the country.</p><p><strong>Ratings</strong></p><p>Professionals receive ratings from homeowners through Gigzzy. Once a business or provider is rated, we require it to maintain an overall average of two stars or greater.</p><p>Please see <em>Gigzzy Terms and Conditions</em> for more detailed information on our pro requirements, screening processes, and disclaimers.</p>
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