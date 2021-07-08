import React, { Suspense } from "react";
import "antd/dist/antd.css";
import { Layout, Form, Row, Col, Skeleton } from "antd";

const { Content } = Layout;
const UserHeader = React.lazy(() => import("../User/Layout/UserHeader"));
const UserFooter = React.lazy(() => import("../User/Layout/UserFooter"));

class About extends React.Component {
  render() {
    return (
      <Layout className="white" style={{ minHeight: "100vh" }}>
        <span className=" d-none d-md-block">
          <Suspense fallback={<Skeleton active />}>
            <UserHeader />
          </Suspense>
        </span>
        <Content className="px-1">
          <Row>
            <Col lg={{ span: 20, offset: 2 }}>
              <div id="section-1" className="why_jiffy position-relative pt-1">
                <h2 className="bold mb-5 text-center">About Gigzzy</h2>
                <p>
                  Gigzzy Africa is an innovation birthed in the wake &nbsp;of
                  Covid 19 pandemic. The global pandemic has{" "}
                    accelerated digitalization at an unprecedented rate,
                {" "}
                  with Gigzzy online platform created to take on an
                  indispensable role in helping subscribers transition to the
                  new reality of living in a pandemic, and in enabling them to
                  navigate their daily lives with as much normalcy as possible
                  despite recurrent uncertainties.
                </p>
                <p>
                  Gigzzy is a digital marketplace platform connecting
                  subscribers with prescreened, local service professionals to
                  carry out on demand services in Kenya.{" "}
                </p>
                <p>
                  The company is revolutionizing how people get services by
                  creating a better connection between consumers and service
                  providers. Instant bookings allow subscribers to instantly
                  schedule appointments with service professional for plumping,
                  appliance repairs, electrical repairs among other myriad of
                  services on demand.
                </p>
                <p>
                  Gigzzy was started in 2020 and is headquartered in Nairobi,
                  Kenya with a clear mandate of delivering value, based on
                  professionalism while giving the consumer the desired choice
                  and convenience.
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
export default Form.create()(About);
