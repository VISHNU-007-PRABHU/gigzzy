import React, { Suspense } from "react";
import "antd/dist/antd.css";
import { Layout, Form, Row, Col, Skeleton } from "antd";

const { Content } = Layout;
const UserHeader = React.lazy(() => import("../User/Layout/UserHeader"));
const UserFooter = React.lazy(() => import("../User/Layout/UserFooter"));

class Gigzzyconduct extends React.Component {
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
              <div
                id="section-1"
                className="why_jiffy position-relative pt-1 container text-center"
              >
                <h2 className="bold mb-5 text-center">
                  Gigzzy Code of Conduct
                </h2>
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      '<div class="ql-editor" data-gramm="false" contenteditable="true" data-placeholder="Description" spellcheck="false">"<p><br></p><p><strong>The Gigzzy Code of Conduct</strong></p><p><span style="color: rgb(66, 66, 66);">Gigzzy is honored to connect homeowners and home service professionals to complete home projects. To ensure that we’re providing the best experience for all, we require that pros and homeowners alike uphold our core values:</span></p><p><br></p><p><strong>Be respectful</strong></p><p><span style="color: rgb(66, 66, 66);">Respect each other and each other’s property. If there’s a conflict, respectfully work together to resolve it.</span></p><p><br></p><p><strong>Be fair</strong></p><p><span style="color: rgb(66, 66, 66);">As a pro, ensure that you’re providing good customer service and producing quality work at a fair price. As a homeowner, be considerate of pros’ time and money. Also, be fair in giving pros the reviews they’ve earned and deserve.</span></p><p><br></p><p><strong>Be professional</strong></p><p><span style="color: rgb(66, 66, 66);">Present yourself in a professional manner. Communicate clearly and often and do your part to ensure each other’s comfort in every situation.</span></p><p><br></p><p><strong>Be honest</strong></p><p><span style="color: rgb(66, 66, 66);">Honor your agreements and be honest about your expectations and limitations. As a pro, be honest if a job is outside your skillset or licensing. As a homeowner, be honest if you have no intention of completing a project. Always be upfront if something isn’t going as agreed upon or planned.</span></p><p><br></p><p><strong>Be reliable</strong></p><p><span style="color: rgb(66, 66, 66);">Answer calls, texts and emails in a timely manner. Show that you value each other’s time by being present and punctual for all appointments. Never leave someone wondering how to reach you or where you are.</span></p><p><br></p><p><strong>Be inclusive</strong></p><p><span style="color: rgb(66, 66, 66);">Don’t discriminate based on race, national origin, social and economic class, sex, sexual orientation, gender identity and expression, age, political belief, religion, mental and physical ability, or any other factor. HomeAdvisor adheres to a strict zero-tolerance discrimination policy.</span></p><p><span style="color: rgb(66, 66, 66);">Gigzzy reserves the right to remove all users who fail to follow this code of conduct from our site and platform.</span></p><p class="ql-indent-1"><br></p>"',
                  }}
                ></div>
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
export default Form.create()(Gigzzyconduct);
