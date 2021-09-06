import React, { Suspense } from "react";
import { withRouter } from "react-router";
import { client } from "../../../apollo";
import { List, Avatar, Button, Skeleton, Col, Card, Row,Typography } from 'antd';
import { divide } from "lodash";
const { Title } = Typography;
const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat&noinfo`;

class BidingList extends React.Component {
  state = {
    initLoading: true,
    loading: false,
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
      loading: true,
    });
  };

  render() {
    const data = [
      {
        name: 'Ant Design Title 1',
        price:'20000 Ksh',
        basde:"basde",
        time:"3.5",
        year:"1 day"

      },
      {
        name: 'Ant Design Title 1',
        price:'20000 Ksh',
        basde:"basde",
        time:"3.5",
        year:"1 day"
      },
      {
        name: 'Ant Design Title 1',
        price:'20000 Ksh',
        basde:"basde",
        time:"3.5",
        year:"1 day"
      },
     
    ];
    const { initLoading, loading, list } = this.state;
    const loadMore =
      true ? (
        <div className="text-center">
          <Button className="mt-3" type="dashed" onClick={this.onLoadMore}>View all request</Button>
        </div>
      ) : null;

    return (
      <Row gutter={[12, 12]}>
        <List
          itemLayout="horizontal"
          dataSource={data}
          loading={loading}
          loadMore={loadMore}
          renderItem={item => (
            <Col lg={12}>
              <Card className="br_14" hoverable="true" bodyStyle={{ padding: "18px 8px" }}>
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
    );
  }
}

export default (withRouter(BidingList));