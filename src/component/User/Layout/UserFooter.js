import React from "react";
import { Link } from "react-router-dom";
import { Layout, Row, Col, Icon } from "antd";
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterIcon,
  FacebookIcon,
  WhatsappIcon,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
const { Footer } = Layout;

const UserFooter = () => {
  return (
    <div>
      <Footer className="footer_bg px-1">
        <Row>
          <Col
            lg={{ span: 20, offset: 2 }}
            className="d-flex justify-content-around py-1"
          >
            <div>
              <ul>
                <li>
                  <h6 style={{ color: "green" }}>Company</h6>
                </li>
                <li>
                  <Link to="/about" target="_blank" className="mr-1">
                    About
                  </Link>
                </li>
                <li>
                  <Link target="_blank" className="mr-1">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link target="_blank" className="mr-1">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="/provider_login" target="_blank" className="mr-1">
                    Become a Pro
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <ul>
                <li>
                  <h6 style={{ color: "green" }}>Legal</h6>
                </li>
                <li>
                  <Link to="/terms" target="_blank" className="mr-1">
                    Terms & Condition
                  </Link>
                </li>
                <li>
                  <Link to="/client" target="_blank" className="mr-1">
                    Client Guarantee
                  </Link>
                </li>
                <li>
                  <Link to="/policy" target="_blank" className="mr-1">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/conduct" target="_blank" className="mr-1">
                    Gigzzy Conduct
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <ul>
                <li>
                  <h6 style={{ color: "green" }}>Resources</h6>
                </li>
                <li>
                  <Link to="/provider_login" target="_blank" className="mr-1">
                    Pro Login
                  </Link>
                </li>
                <li>
                  <Link to="/why_gigzzy" target="_blank" className="mr-1">
                    Why Gigzzy
                  </Link>
                </li>
                <li>
                  <Link to="/professional_screening_process" target="_blank" className="mr-1">
                      Professional Screening Process
                  </Link>
                </li>
                <li>
                  <Link to="/faq" target="_blank" className="mr-1">
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <ul>
                <li>
                  <h6 style={{ color: "green" }}>Contact Us</h6>
                </li>
                <li>info@gigzzy.com</li>
                <li>Tel +254 733 494 363</li>
                <li>
                  <FacebookShareButton
                    url="https://web.facebook.com/gigzzy"
                    hashtag="#programing joke"
                  >
                    <FacebookIcon
                      logoFillColor="white"
                      size={32}
                      round={true}
                    />
                  </FacebookShareButton>
                  {"    "}
                  <TwitterShareButton
                    url="https://twitter.com/Gigzzyafrica"
                    hashtag="#programing joke"
                  >
                    <TwitterIcon logoFillColor="white" size={32} round={true} />
                  </TwitterShareButton>
                  {"    "}
                  <LinkedinShareButton
                    url="https://www.linkedin.com/company/gigzzy-africa/about/?viewAsMember=true"
                    hashtag="#programing joke"
                  >
                    <LinkedinIcon
                      logoFillColor="white"
                      size={32}
                      round={true}
                    />
                  </LinkedinShareButton>
                  {"     "}
                  <WhatsappShareButton
                    url="https://www.whatsapp.com/"
                    hashtag="#programing joke"
                  >
                    <WhatsappIcon
                      logoFillColor="white"
                      size={32}
                      round={true}
                    />
                  </WhatsappShareButton>
                  {/* <a >
                  <Icon style={{width:40,height:50,fontSize:30}} type="instagram" />
                  </a> */}
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Footer>
    </div>
  );
};
export default UserFooter;
