import React, { useState, useEffect,useContext } from "react";
import { Button, Row, Col } from 'antd';
import { useQuery } from '@apollo/react-hooks';
import { GET_FUTURE } from '../../../../graphql/User/home_page'

import {HomeContext} from '../../../context/Location'

const TrendingCategory = (props) => {
    const data = useContext(HomeContext);
    const [category_data, set_category_data] = useState([])
    const search_category = useQuery(GET_FUTURE)
    useEffect(() => {
        fetch_future()
    }, [])

    const fetch_future = async () => {
        let result = await search_category.refetch({ limit: 8 })
        set_category_data(result.data.get_is_future)
    }

    const open_model=async(datas)=>{
        data.on_book(datas)
    }
    return (
        <>
            <Row gutter={[24, 24]} className="owl-stage-outer">
                {category_data &&  category_data.map(data => {
                    return (
                        <Col sm={12} md={6}>
                            <div>
                                <img alt='gigzzy home banner'
                                    src={data?.small_img_url}
                                    loading="lazy" class="br_10 lazyload img-fluid" />
                                <div className="px-3 mt-n4">
                                    <Button onClick={()=>{open_model(data)}} className="py-4 align-items-center d-flex justify-content-center bold br_10 border-0 primary_blue_color table_shadow" size={"large"} block>
                                        {data.category_type === 2 ? data?.subCategory_name : data?.category_name}
                                    </Button>
                                </div>
                            </div>
                        </Col>
                    )
                })}
            </Row>
        
        </>
    )
}
export default TrendingCategory;
