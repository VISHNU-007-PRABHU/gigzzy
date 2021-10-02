import React, { Suspense } from "react";
import { Link } from "react-router-dom";
import 'antd/dist/antd.css';

import { Layout, Row, Col, Skeleton } from "antd";
import { FooterData } from "./FooterData";
const ShareButton = React.lazy(() => import('../../Comman/ShareButton'));

const { Footer } = Layout;


class UserFooter extends React.Component {
  render() {
    return (
      <div>
        <Footer className="bg-white pb-0 p-0 mt-5">
          <Row className="my-3">
            {FooterData.map(parentdata => {
              return (
                <>
                  <Col className="gutter-row justify-content-md-around d-flex" sm={24} md={6}>
                    <div className="p-4">
                      <ul>
                        <div className='h5 bold primary_color'>{parentdata.title}</div>
                        {parentdata.data.map(innerdata => {
                          if (innerdata.title === "SHAREBUTTON") {
                            return (
                              <>
                                <Suspense fallback={<Skeleton active />}>
                                  <ShareButton />
                                </Suspense>
                              </>
                            )
                          } else {
                            return (<>
                              <li className="my-3">
                                <Link to={innerdata.link} target="_blank" className="primary_blue_color normal_font_size mr-1">{innerdata.title}</Link>
                              </li>
                            </>)
                          }
                        })}
                      </ul>
                    </div>
                  </Col>
                </>
              )
            })}
          </Row>
          <Row className='border-top'>
            <Col>
              <div className="d-flex justify-content-center my-2">Copyright c 2021 Gigzzy. All Rights Reserved</div>
            </Col>
          </Row>
        </Footer>
      </div >
    );
  }

};
export default UserFooter;
