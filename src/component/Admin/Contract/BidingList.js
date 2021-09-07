import React, { Suspense } from "react";
import { withRouter } from "react-router";
import { client } from "../../../apollo";
import filter_img from "../../../image/fil2.png";
import sort_img from "../../../image/fil1.png";
import { List, Avatar, Button, Skeleton, Popover, Col, Card, Row, Typography, Drawer } from 'antd';
import BiderDetail from "./biderDetail";
const { Title } = Typography;
const text = <span>Title</span>;
const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);
const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat&noinfo`;
class BidingList extends React.Component {
  state = {
    initLoading: true,
    loading: false,
    bider_id: 0,
    data: [{
      name: "vishnu",
      loading: false
    }, {
      name: "vishnu",
      loading: false
    }],
    list: [],
  };

  componentDidMount() {
    this.getData(res => {
      this.setState({
        initLoading: false,
        data: res.results,
        list: res.results,

      });
    });
  }

  getData = callback => {

  };

  onLoadMore = () => {
    this.setState({
      loading: !this.state.loading,
    });
  };

  onProfileDrawer = (_id) => {
    this.setState({
      bider_id: _id,
      visible: !this.state.visible,
    });
  };


  render() {
    const data = [
      {
        name: 'Ant Design Title 1',
        price: '20000 Ksh',
        basde: "basde",
        time: "3.5",
        _id: 1,
        year: "1 day"

      },
      {
        name: 'Ant Design Title 1',
        price: '20000 Ksh',
        basde: "basde",
        time: "3.5",
        _id: 1,
        year: "1 day"
      },
      {
        name: 'Ant Design Title 1',
        price: '20000 Ksh',
        basde: "basde",
        time: "3.5",
        _id: 1,
        year: "1 day"
      },

    ];
    const { initLoading, loading, list } = this.state;
    const loadMore =
      true ? (
        <div className="d-flex justify-content-center w-100">
          <Button className="mt-3 text-success" type="dashed" onClick={this.onLoadMore}>View all request</Button>
        </div>
      ) : null;

    return (
      <>
        <Drawer
          width={500}
          placement="right"
          title="Bider Detail"
          closable={true}
          onClose={this.onProfileDrawer}
          visible={this.state.visible}
        >
          <>
            <BiderDetail></BiderDetail>
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
            // loadMore={loadMore}
            renderItem={item => (
              <Col lg={12}>
                <Card className="br_14" hoverable="true" bodyStyle={{ padding: "18px 8px" }} onClick={() => { this.onProfileDrawer(item.id) }} key={`a-${item.id}`}>
                  <List.Item className="p-0">
                    <div className="w-100 d-flex align-items-center">
                      <div>
                        <Avatar className="biding_avatar" size={64} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                      </div>
                      <div className="w-100 px-1">
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="normal_font_size">{item.name}</div>
                          <div>{item.basde}</div>
                        </div>
                        <div className="d-flex justify-content-between align-items-end mt-1">
                          <div>
                            <div>{item.time}</div>
                            <div>Duration: {item.year}</div>
                          </div>
                          <div className="normal_font_size">{item.price}</div>
                        </div>
                      </div>
                    </div>
                  </List.Item>
                </Card>
              </Col>
            )}
          />
        </Row>
        {loadMore}
      </>
    );
  }
}

export default (withRouter(BidingList));