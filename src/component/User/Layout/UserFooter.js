import React from "react";
import { Link } from "react-router-dom";
import { Layout, Row, Col } from "antd";
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterIcon,
  FacebookIcon,
  WhatsappIcon,
  LinkedinIcon,
  FacebookShareCount,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton
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
                <li><h6 style={{color:"green"}}>Company</h6></li>
                <li>
                  <Link to="/about" target="_blank" className="mr-1">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/about" target="_blank" className="mr-1">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/about" target="_blank" className="mr-1">
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
              <li><h6 style={{color:"green"}}>Legal</h6></li>
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
              <li><h6 style={{color:"green"}}>Resources</h6></li>
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
                  <Link to="/hiring_guide" target="_blank" className="mr-1">
                    Hiring Guide
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
              <li><h6 style={{color:"green"}}>Contact Us</h6></li>
                <li>info@gigzzy.com</li>
                <li>Tel +254 733 494 363</li>
                <li><LinkedinIcon size={32} round={true} /><FacebookShareButton url={"https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fgithub.com&quote=GitHub"} size={32} round={true} /><WhatsappIcon size={32} round={true} /></li>
              </ul>
            </div>
            <FacebookShareCount  />
          </Col>
        </Row>
      </Footer>
    </div>
  );
};
export default UserFooter;
