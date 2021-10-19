import React, { Suspense } from "react";
import { withRouter } from "react-router";
import { client } from "../../../apollo";
import useMobileDetect from 'use-mobile-detect-hook';
import { GET_BIDING_PAGINATION } from '../../../graphql/User/biding';
import { List, Avatar, Button, Popover, Col, Card, Row, Typography, Drawer, Skeleton, Rate } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import filter_img from "../../../image/fil2.png";
import sort_img from "../../../image/fil1.png";
import white_flag from '../../../image/wbmark.png'
import green_flag from '../../../image/gbmark.png'
const { Title } = Typography;
const detectMobile = useMobileDetect();
const text = <span>Title</span>;
const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);
const BiderDetail = React.lazy(() => import('./biderDetail'));
class BidingList extends React.Component {
  state = {
    view_more_btn: false,
    loading: false,
    bider_id: 0,
    data: [],
    list: [],
    current_item: {},
    limit: 6,
    pagination: {
      totalDocs: 0,
      page: 0,
    }
  };

  componentDidMount() {
    if (this.props.match.params.id) {
      this.getData();
    }
  }

  getData = async () => {
    let inputdata = { contract_id: this.props.match.params.id, limit: this.state.limit }
    inputdata['page'] = this.state.pagination.page + 1;
    this.setState({ loading: true });
    if (localStorage.getItem('currency')) {
    } else {
      inputdata['location_code'] = "IN"
    }
    client.query({
      query: GET_BIDING_PAGINATION,
      variables: inputdata,
      fetchPolicy: 'no-cache',
    }).then(result => {
      let page = result.data.get_biding_pagination.pageInfo.page
      let total = result.data.get_biding_pagination.pageInfo.totalDocs
      if ( total && Number(total) >= page * this.state.limit) {
        this.setState({ view_more_btn: true })
      }
      this.setState({ loading: false, pagination: result.data.get_biding_pagination.pageInfo, data: [...this.state.data, ...result.data.get_biding_pagination.data] });
    })
  };



  onProfileDrawer = (item) => {
    this.setState({
      current_item: item,
      visible: !this.state.visible,
    });
  };

  handleInfiniteOnLoad = () => {

  }
  render() {

    const { view_more_btn, loading, data } = this.state;
    const loadMore =
      true ? (
        <div className="d-flex justify-content-center w-100">
          <Button className="mt-3 text-success" type="dashed" onClick={() => { this.getData() }}>View all request</Button>
        </div>
      ) : null;

    return (
      <>
        <Drawer
          width={detectMobile.isMobile() ? 320 : 500}
          placement="right"
          title="Bider Detail"
          closable={true}
          onClose={this.onProfileDrawer}
          visible={this.state.visible}
        >
          <>
            <Suspense fallback={<Skeleton active />}>
              <BiderDetail _id={this.props.match.params.id} close_drawer={this.onProfileDrawe} current_data={this.state.current_item}></BiderDetail>
            </Suspense>
          </>
        </Drawer>

        <Row gutter={[12, 24]}>
          <Col>
            <div className="d-flex justify-content-between normal_font_size">
              <div className="bold">
                Job Applicants
              </div>
              <div className="d-flex cursor_point">
                <Popover placement="bottom" trigger="click" title={text} content={content}>
                  <div className="px-2"><img className="pr-2" loading="lazy" src={sort_img}></img>Sort</div>
                </Popover>

                <Popover placement="bottom" trigger="click" title={text} content={content}>
                  <div className="px-2"> <img className="pr-2" loading="lazy" src={filter_img}></img>Filter</div>
                </Popover>
              </div>
            </div>
          </Col>
        </Row>

        <Row gutter={[12, 24]}>
          <List
            itemLayout="horizontal"
            dataSource={data}
            loading={loading}
            renderItem={item => (
              <Col lg={12}>
                <Card className="br_14" hoverable="true" bodyStyle={{ padding: "10px 8px" }} onClick={() => { this.onProfileDrawer(item) }} key={`a-${item.id}`}>
                  <List.Item className="p-0">
                    <div className="w-100 d-flex align-items-center">
                      <div>
                        <Avatar className="biding_avatar" size={64} src={item.get_user[0]?.img_url} />
                      </div>
                      <div className="w-100 px-1">
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="normal_font_size">{item.get_user[0]?.first_name || ""} {item.get_user[0]?.last_name || ""}</div>
                          <div>
                            <img alt='' src={item.add_to_shortlist ? green_flag : white_flag} loading="lazy" className="lazyload" />
                          </div>
                        </div>
                        <div>
                          {item.ref}
                        </div>
                        <div className="d-flex justify-content-between align-items-end mt-1">
                          <div>
                            <div>
                              <Rate count={1} value={1} className="mr-2" />
                              {item.provider_rating_by_category?.rating || "0"}
                            </div>
                            <div>Duration: {item.timeline}{item.timeline_type}</div>
                          </div>
                          <div className="normal_font_size bold">{item.budget}</div>
                        </div>
                      </div>
                    </div>
                  </List.Item>
                </Card>
              </Col>
            )}
          />
        </Row>
        {view_more_btn && loadMore }
      </>
    );
  }
}

export default (withRouter(BidingList));