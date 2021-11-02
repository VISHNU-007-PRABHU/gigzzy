import React, { useState, useEffect } from 'react'
import { Carousel } from 'antd';

const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    lazyLoad: true,
    cssEase: "linear",
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ],
};

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
                            <img key={data?.small_image} alt='' src={data?.small_image} loading="lazy" className="h_18_em w-100 br_14 object_fit lazyload" />
                        </>
                    )
                })}
            </Carousel>
        </div>
    )
};

export default BannerSlider;
