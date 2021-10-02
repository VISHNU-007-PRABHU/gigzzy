import React from "react";

import hb1 from "../../../../image/home/hb4.png"
import hb2 from "../../../../image/home/hb1.png"
import hb3 from "../../../../image/home/hb2.png"
import hb4 from "../../../../image/home/hb3.png"
import hb5 from "../../../../image/home/hb5.png"
let HomeBannerIng = [{
    className: "d-flex flex-column",
    linkes: [{
        type: 1,
        link: hb1
    }, {
        type: 1,
        link: hb2
    }]
}, {
    className: "d-flex flex-column justify-content-around",
    linkes: [{
        type: 2,
        link: hb3
    }]
}, {
    className: "d-flex flex-column",
    linkes: [{
        type: 3,
        link: hb4
    }, {
        type: 3,
        link: hb5
    }]
}
]

const BannerIamges = () => {

    return (
        <div className="d-flex justify-content-around">
            {HomeBannerIng.map(outer_img => {
                return (
                    <div className={outer_img.className}>
                        <div>
                            {outer_img.linkes.map(inner_img => {
                                return (
                                    <div class="d-flex justify-content-around">
                                        <img alt='gigzzy home banner' src={inner_img.link} loading="lazy" class="p-2 lazyload img-fluid" />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
export default BannerIamges;
