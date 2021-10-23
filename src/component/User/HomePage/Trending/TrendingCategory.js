import React, { useState, useEffect, useContext } from "react";
import { Button, Row, Col } from 'antd';
import { useQuery } from '@apollo/react-hooks';
import { GET_FUTURE } from '../../../../graphql/User/home_page'
import { HomeContext } from '../../../context/Location'
import ReplacementImage from '../../../../image/no_img.png'
import { chunk } from "lodash";

const TrendingCategory = (props) => {
    const data = useContext(HomeContext);
    const [category_data, set_category_data] = useState([])
    const search_category = useQuery(GET_FUTURE)
    useEffect(() => {
        fetch_future()
    }, [])

    const fetch_future = async () => {
        let result = await search_category.refetch({ limit: 8 })
        set_category_data(chunk(result.data.get_is_future, 4))
    }

    const open_model = async (datas) => {
        data.on_book(datas)
    }
    return (
        <>
            {category_data && category_data.map(Maindata => {
                return (
                    <>
                        <Row  className="owl-stage-outer">
                            {Maindata && Maindata.map((data,i) => {
                                return (
                                    <Col sm={12} md={6} key={`future_key${i}`}>
                                        <div className="p-2">
                                            <img alt='gigzzy home banner'
                                                src={data?.small_img_url}
                                                onError={(e) => (e.target.onerror = null, e.target.src = ReplacementImage)}
                                                loading="lazy" class="h-200x br_10 lazyload img-fluid w-100" />
                                            <div className="px-3 mt-n4">
                                                <Button onClick={() => { open_model(data) }} className="py-4 align-items-center d-flex justify-content-center bold br_10 border-0 primary_blue_color table_shadow" size={"large"} block>
                                                    {data.category_type === 2 ? data?.subCategory_name : data?.category_name}
                                                </Button>
                                            </div>
                                        </div>
                                    </Col>
                                )
                            })
                            }
                        </Row>
                    </>
                )
            })}
        </>
    )
}
export default TrendingCategory;
