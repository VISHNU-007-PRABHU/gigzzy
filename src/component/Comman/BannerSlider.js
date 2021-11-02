import React, { useState, useEffect } from 'react'
import Carousel from 'antd/lib/carousel';
import ReplacementImage from '../../image/no_img.png'

const BannerSlider = (props) => {
    const [fileList, set_fileList] = useState([]);
    useEffect(() => {
        if (props['parent_images']) {
            set_fileList(props['parent_images'])
        }
    }, [props])
    return (
        <div className="">
            <Carousel className="h-100" effect="fade" dots={true}>
                {fileList.map(data => {
                    return (
                        <>
                            <img
                                key={data?.small_image}
                                alt='gigzzy images'
                                onError={(e) => (e.target.onerror = null, e.target.src = ReplacementImage)}
                                src={data?.small_image}
                                loading="lazy"
                                className="h_18_em w-100 br_14 object_fit lazyload" />
                        </>
                    )
                })}
            </Carousel>
        </div>
    )
};

export default BannerSlider;
