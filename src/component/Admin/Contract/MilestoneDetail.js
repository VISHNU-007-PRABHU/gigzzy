import React, { useState, useEffect, Suspense } from 'react'
import { Row, Col, Form, Skeleton, Typography } from 'antd';
const { Title, Paragraph } = Typography;
const ShowCategory = React.lazy(() => import('../../Comman/ShowCategory'));
const BannerSlider = React.lazy(() => import('../../Comman/BannerSlider'));
const bill_data = [
    {
        title: "Billing details",
        data_view: true,
        data: "bill_detail"
    },
    {
        title: "Bill no.#",
        main_class:"border-bottom py-3",
        data: "ref"
    },
    {
        title: "Milestone",
        data: "budget"
    }, {
        title: "Other Cost",
        data: "extra_price"
    }, {
        title: "Total",
        class: "py-3",
        data: "total"
    }
]
function MilestoneDetail(props) {
    const [data, set_data] = useState({})
    const [isStripePayment, set_isStripePayment] = useState(false)
    useEffect(() => {
        if (props.data) {
            set_data(props.data)
        }
    }, [])
    return (
        <>
            <Row gutter={[16, 40]}>
                <Col span={24}>
                    <div className="normal_font_size primary_color d-flex justify-content-center">{data['title']}</div>
                </Col>
            </Row>
            <Row gutter={[12, 24]}>
                <Col span={24}>
                    <Suspense fallback={<Skeleton active />}>
                        <BannerSlider parent_images={data?.get_contract_all_files} />
                    </Suspense>
                </Col>
            </Row>
            <Row gutter={[12, 24]}>
                <Col span={24}>
                    <Title level={4}>{"Project description"}</Title>
                    <div>
                        <Paragraph ellipsis={{ rows: 3, expandable: true }}>
                            {data?.description}
                        </Paragraph>
                    </div>
                </Col>
            </Row>

            {bill_data.map(paydata => {
                return (
                    <Row gutter={[12, 24]}>
                        <Col span={24}>
                            <div className={`d-flex normal_font_size justify-content-between ${paydata?.main_class}`}>
                                <div className={`align-items-center d-flex ${paydata.class}`}>
                                    {paydata.title}
                                </div>
                                {paydata['data_view'] && <div >
                                    {data[paydata['ref']]}
                                </div>}
                            </div>
                        </Col>
                    </Row>
                )
            })}

            {/* {!isStripePayment && <><div className="">
                <StripePayout data={data} booking_type={"contract"} current_booking_status={10} />
            </div></>
            } */}

        </>

    )
}

export default Form.create()(MilestoneDetail);
