import React, { useState, useEffect } from "react";
import useReactRouter from 'use-react-router';
import { Icon } from 'antd';
import size from 'lodash'
import { UPDATE_BIDING } from '../../../graphql/User/biding'
import { Alert_msg } from '../../Comman/alert_msg';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Modal, Avatar, Button, Skeleton, Col, Tag, Row, Typography, Rate } from 'antd';
import StripePayout from "../../User/Book/payment/stripe_payment";
const { Title, Paragraph } = Typography;
const { confirm } = Modal;

function BiderDetail(props) {
    const { history } = useReactRouter();
    const [loading, set_loading] = useState(false);
    const [isStripePayment, setisStripePayment] = useState(false);
    const [price_visible, set_price_visible] = useState(false);
    const [company_visible, set_company_visible] = useState(false);
    const [data, set_data] = useState({});
    const [user_data, set_user_data] = useState({});
    const [update_biding] = useMutation(UPDATE_BIDING);


    useEffect(() => {
        if (props.current_data) {
            set_data(props.current_data)
            if (props.current_data.get_user && size(props.current_data.get_user)) {
                set_user_data(props.current_data.get_user[0])
            }
        }
    }, [props])

    const gotoPage = () => {
        set_price_visible(!price_visible)
    }

    const update_biding_data = async () => {
        let input_data = {
            _id: data._id,
            biding_data: [{ add_to_shortlist: !data?.add_to_shortlist }]
        }
        let final_data = await update_biding({ variables: input_data });
        Alert_msg(final_data.data.update_biding)
        if (final_data.data.update_biding.status === "success") {
        }
    }

    return (
        <div className="p-3">
            <Row gutter={[12, 24]}>
                <Col span={24}>
                    <div className="d-flex justify-content-between">
                        <div>
                            <Avatar className="biding_avatar" size={64} src={user_data?.img_url || ""} />
                        </div>
                        <div className="w-100 px-1">
                            <div className="d-flex justify-content-between align-items-center">
                                <Title level={4} className="d-flex flex-column align-items-baseline">
                                    <div>
                                        {user_data?.first_name || ""}{user_data?.last_name || ""}
                                    </div>
                                    <div className="font-weight-light figure-caption">
                                        {user_data.user_type && user_data.user_type === "company" ? user_data?.get_company_root_detail?.company_name : "Individual User"}
                                    </div>
                                </Title>
                                <div>
                                    <Rate count={1} value={1} className="mr-2" />
                                    {user_data?.rating || "0"}
                                </div>
                            </div>
                            {user_data.user_type && user_data.user_type === "company" ?
                                <div>
                                    <Paragraph ellipsis={{ rows: 3, expandable: true }}>
                                        {user_data?.get_company_root_detail?.about_company}
                                    </Paragraph>
                                </div>
                                : <></>}
                            <div className={user_data?.user_type === "company" ? "" : "d-none"}>
                                <Button type="primary" onClick={() => { set_company_visible(!company_visible) }}> Company Detail</Button>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row gutter={[12, 24]}>
                <Col>
                    <Title level={4} className="font-weight-normal">Category : <Tag color="green">gradening</Tag>
                        <Tag color="green">gradening</Tag>
                        <Tag color="green">gradening</Tag>
                    </Title>
                </Col>
            </Row>
            <Row gutter={[12, 24]}>
                <Col>
                    <div className="d-flex justify-content-around normal_font_size bold">Duration : {data?.timeline}{data?.timeline_type}</div>
                    <Title level={2} className="font-weight-normal text-success d-flex justify-content-around">
                        <div className="align-items-center d-flex flex-column">
                            <div>
                                {data?.budget}
                            </div>
                            <div className="f_25">
                                {"Budget"}
                            </div>
                        </div>
                    </Title>
                </Col>
            </Row>
            <Row gutter={[12, 24]}>
                <Col>
                    <Title level={4}>{"Description about bids"}</Title>
                    <div>
                        <Paragraph ellipsis={{ rows: 3, expandable: true }}>
                            {data?.description}
                        </Paragraph>
                    </div>

                </Col>
            </Row>
            <Row gutter={[12, 24]}>
                <Col>
                    <Title level={4} className="font-weight-normal">Experience : {data?.experience || 0}</Title>
                </Col>
            </Row>
            {user_data.get_biding_all_files && user_data.get_biding_all_files.map((data, i) => {
                return (
                    <Row gutter={[12, 24]}>
                        <Col>
                            <Title level={4} className="font-weight-normal">{i}Biding Documents:</Title>
                            <img loading="lazy" alt="example" className="h_200x w-100" src={data.small_image} />
                        </Col>
                    </Row>
                )
            })}

            <Row gutter={[12, 24]}>
                <Col span={24}>
                    <div className="d-flex justify-content-around mt-4">
                        <Button type="primary" onClick={() => { update_biding_data() }}>
                            {data?.add_to_shortlist ? "Remove from shortlist" : "Add to shortlist"}
                        </Button>
                    </div>
                </Col>
            </Row>
            <Row gutter={[12, 24]}>
                <Col span={12}>
                    <div className="d-flex justify-content-around">
                        <Button size={'large'} > Reject</Button>
                    </div>
                </Col>
                <Col span={12}>
                    <div className="d-flex justify-content-around">
                        <Button size={'large'} type="primary" onClick={() => { set_price_visible(!price_visible) }}> Adward</Button>
                    </div>
                </Col>
            </Row>
            <Modal
                title="Please fund the Project"
                visible={price_visible}
                footer={null}
                onCancel={() => { set_price_visible(!price_visible) }}
            >
                <Row gutter={[12, 24]}>
                    <Col span={24}>
                        <div className="d-flex normal_font_size justify-content-between">
                            <div className="">
                                Project Budget
                            </div>
                            <div >
                                {data?.budget}
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row gutter={[12, 24]}>
                    <Col span={24}>
                        <div className="d-flex normal_font_size justify-content-between">
                            <div className="">
                                Service Fee
                            </div>
                            <div >
                                {data?.service_fee}
                            </div>
                        </div>
                    </Col>
                </Row>
               
                {!isStripePayment && <><div className="">
                    <StripePayout data={data} booking_type={"contract"} current_booking_status={10} />
                </div></>
                }
            </Modal>
            <Modal
                visible={company_visible}
                footer={null}
                header={null}
                className="company_detail_modal"
                onCancel={() => { set_company_visible(!company_visible) }}
            >
                <Row gutter={[12, 24]} className="mt-5">
                    <Col span={24}>
                        <div className="d-flex normal_font_size justify-content-between align-items-center">
                            <div>
                                <div className="bold">
                                    {user_data?.get_company_root_detail?.company_name}
                                </div>
                                <div >
                                    {user_data?.get_company_root_detail?.company_website}
                                </div>
                            </div>

                            <Avatar className="biding_avatar" size={64} src={user_data?.img_url} />
                        </div>

                    </Col>
                </Row>

                <Row gutter={[12, 24]}>
                    <Col>
                        <div>
                            <Paragraph ellipsis={{ rows: 3, expandable: true }}>
                                {user_data?.get_company_root_detail?.about_company}
                            </Paragraph>
                        </div>
                    </Col>
                </Row>

                {user_data?.get_company_root_detail?.get_company_images && user_data?.get_company_root_detail.get_company_images.map(data => {
                    return (

                        <Row gutter={[12, 24]}>
                            <Col>
                                <Title level={4} className="font-weight-normal">Company Legal Document</Title>
                                <img loading="lazy" alt="example" className="h_200x w-100" src={data?.small_image} />
                            </Col>
                        </Row>
                    )
                })}
                <Row gutter={[12, 24]}>
                    <Col span={24}>
                        <div>
                            <Button type="link" className="option_blue normal_font_size">
                                <div className="d-flex align-items-center">
                                    Dowwnload Profile <Icon type="download" className="px-2" />
                                </div>
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Modal>
        </div>
    );
}
export default BiderDetail;