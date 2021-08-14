import React from 'react'
import { Carousel } from 'antd';

function MinImage(props) {
    const img_style = {
        height: "65px",
    }
    return (
        <div style={img_style}>
            {props.img.length>0?
            <Carousel autoplay className="w-75x">
                {props.img.map((datas, i) =>
                    <div className='img_div'>
                        <img src={datas?.thumbUrl} height="68" alt='' />
                    </div>
                )}
            </Carousel>
            :<></>}
        </div>

    )
}

export default MinImage
