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
      list: this.state.data.concat([...new Array(count)].map(() => ({ loading: true, name: "" }))),
    });
    this.getData(res => {
      const data = this.state.data.concat(res.results);
      this.setState(
        {
          data,
          list: data,
          loading: false,
        },
        () => {
          // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
          // In real scene, you can using public method of react-virtualized:
          // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
          window.dispatchEvent(new Event('resize'));
        },
      );
    });
  };

  render() {
    const data = [
      {
        title: 'Ant Design Title 1',
      },
      {
        title: 'Ant Design Title 2',
      },
      {
        title: 'Ant Design Title 3',
      },
      {
        title: 'Ant Design Title 4',
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
          loading={false}
          loadMore={loadMore}
          renderItem={item => (
            <Col lg={12}>
              <Card className="br_7" hoverable="true" bodyStyle={{ padding: "18px 8px" }}>
                <List.Item className="p-0">
                  <div className="w-100 d-flex align-items-center">
                    <div>
                      <Avatar size={64} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    </div>
                    <div className="w-100 px-1">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="normal_font_size">vishnu prabhu testing long name</div>
                        <div>basde</div>
                      </div>
                      <div className="d-flex justify-content-between align-items-end mt-1">
                        <div>
                          <div>3.5</div>
                          <div>Duration: 1 day</div>
                        </div>
                        <div className="normal_font_size">Ksh 200000</div>
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