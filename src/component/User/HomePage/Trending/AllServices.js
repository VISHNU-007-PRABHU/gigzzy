import React from "react";
import { Button, Row, Col } from 'antd';
import links from "../../../../image/home/c2.png"

const btn_name ="See All Services"
const AllServices = () => {
    return (
        <div className="d-flex align-items-center justify-content-center">
            <Button className="mt-5 p-4 d-flex align-items-center primary_bg_blue_color text-white br_10 border-0 table_shadow" size={"large"} >{btn_name}</Button>
            <img alt='gigzzy home banner' src={links} loading="lazy" class="d-none d-md-flex c2Link lazyload img-fluid" />
        </div>
    )
}
export default AllServices;
