import React from "react";
import { Link } from "react-router-dom";
import Layout from 'antd/lib/layout';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import {
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
      <Footer className="footer_bg">
        <Row gutter={[16, 16]}>
          <Col className="gutter-row justify-content-around d-flex" xs={12} md={6}>
            <div>
              <ul>
                <li>
                  <h6 style={{ color: "green" }}>Company</h6>
                </li>
                <li>
                  <Link to="/static_page/about_us" target="_blank" className="mr-1">About</Link>
                </li>
                {/* <li>
                  <Link className="mr-1">Blog</Link>
                </li>
                <li>
                  <Link>Careers</Link>
                </li> */}
                <li>
                  <Link to="/provider_login" target="_blank" className="mr-1">Become a Pro</Link>
                </li>
              </ul>
            </div>
          </Col>
          <Col className="gutter-row justify-content-around d-flex" xs={12} md={6}>
            <div>
              <ul>
                <li>
                  <h6 style={{ color: "green" }}>Legal</h6>
                </li>
                <li>
                  <Link to="/static_page/terms" target="_blank" className="mr-1">
                    Terms & Condition
                  </Link>
                </li>
                <li>
                  <Link to="/static_page/client" target="_blank" className="mr-1">
                    Client Guarantee
                  </Link>
                </li>
                <li>
                  <Link to="/static_page/policy" target="_blank" className="mr-1">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/static_page/conduct" target="_blank" className="mr-1">
                    Gigzzy Conduct
                  </Link>
                </li>
              </ul>
            </div>
          </Col>
          <Col className="gutter-row justify-content-around d-flex" xs={12} md={6}>
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
                  <Link to="/static_page/why_gigzzy" target="_blank" className="mr-1">
                    Why Gigzzy
                  </Link>
                </li>
                <li>
                  <Link to="/static_page/professional_screening_process" target="_blank" className="mr-1">
                      Professional Screening Process
                  </Link>
                </li>
                <li>
                  <Link to="/static_page/faq" target="_blank" className="mr-1">
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>
          </Col>
          <Col className="gutter-row justify-content-around d-flex" xs={12} md={6}>
            <div>
              <ul>
                <li>
                  <h6 style={{ color: "green" }}>Contact Us</h6>
                </li>
                <li>UMEA, Address Nyago house,</li>
                <li>Mombasa road 2nd Floor</li> 
                <li>14314 S Myers Park Rd Cheney WA 99004, USA .</li>
                <li className="pt-3 ">info@gigzzy.com</li>
                {/* <li>Tel +254 733 494 363</li> */}
                <li>Tel +1 (509) 319-6332</li>
                <li>
                  <FacebookShareButton
                    url="https://web.facebook.com/gigzzy"
                    hashtag="#programing joke"
                  >
                    <FacebookIcon
                      size={32}
                      round={true}
                    />
                  </FacebookShareButton>
                  {"    "}
                  <TwitterShareButton
                    url="https://twitter.com/Gigzzyafrica"
                    hashtag="#programing joke"
                  >
                    <TwitterIcon size={32} round={true} />
                  </TwitterShareButton>
                  {"    "}
                  <LinkedinShareButton
                    url="https://www.linkedin.com/company/gigzzy-africa/about/?viewAsMember=true"
                    hashtag="#programing joke"
                  >
                    <LinkedinIcon
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
