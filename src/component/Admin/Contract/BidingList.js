import React, { Suspense } from "react";
import { withRouter } from "react-router";
import { client } from "../../../apollo";
import filter_img from "../../../image/fil2.png";
import sort_img from "../../../image/fil1.png";
import { GET_BIDING_PAGINATION } from '../../../graphql/User/biding';
import { List, Avatar, Button, Popover, Col, Card, Row, Typography, Drawer } from 'antd';
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
    view_more_btn: true,
    loading: false,
    bider_id: 0,
    data: [],
    list: [],
    pagination: {
      totalDocs:0,
      page: 0,
  }
  };

  componentDidMount() {
    if (this.props.match.params.id) {
      this.getData();
    }
  }

  getData = async () => {
    let inputdata = { contract_id: this.props.match.params.id,limit:10 }
    inputdata['page'] = this.state.pagination.page + 1 ;
    this.setState({ loading: true});
    client.query({
      query: GET_BIDING_PAGINATION,
      variables: inputdata,
      fetchPolicy: 'no-cache',
    }).then(result => {
      let page = result.data.get_biding_pagination.pageInfo.page
      let total = result.data.get_biding_pagination.pageInfo.totalDocs
      if( !total || Number(Number(total)/10) >= page ){
        this.setState({view_more_btn:false})
      }
      this.setState({ loading: false, pagination:result.data.get_biding_pagination.pageInfo, data: result.data.get_biding_pagination.data });
    })
  };

 

  onProfileDrawer = (_id) => {
    this.setState({
      bider_id: _id,
      visible: !this.state.visible,
    });
  };


  render() {
 
    const { view_more_btn, loading, data } = this.state;
    const loadMore =
      true ? (
        <div className="d-flex justify-content-center w-100">
          <Button className="mt-3 text-success" type="dashed" onClick={()=>{this.getData()}}>View all request</Button>
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
                          <div className="normal_font_size">{item.get_user.name}</div>
                          <div>{item?.budget}</div>
                        </div>
                        <div className="d-flex justify-content-between align-items-end mt-1">
                          <div>
                            <div>{item.created_at}</div>
                            <div>Duration: {item.timeline}</div>
                          </div>
                          <div className="normal_font_size">{item.budget}</div>
                        </div>
                      </div>
                    </div>
                  </List.Item>
                </Card>
              </Col>
            )}
          />
        </Row>
        {view_more_btn && loadMore}
      </>
    );
  }
}

export default (withRouter(BidingList));