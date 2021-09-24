import React, { useState } from "react";
import { Icon, Input, AutoComplete, Button, Row, Col } from 'antd';
import link_img from '../../../../image/home/c1.png'
const BannerLocationSearch = () => {
    const [home_page_city, set_home_page_city] = useState('kenya')
    const [LocationModal, setLocationModal] = useState(false)
    const [category_values, set_category_values] = useState("")
    const [center, set_center] = useState([9.9252, 78.1198])
    const [auto_complete_data, set_auto_complete_data] = useState([])

    const on_book = async () => {

        // if (this.state.category_values !== undefined && this.state.center.length > 0) {
        //     var data = this.state.category_values.split("_");
        //     if (data[2] === "false") {
        //         if (localStorage.getItem('userLogin') === 'success') {
        //             this.props.history.push({ pathname: `/description/${data[0]}`, state: { type: Number(data[1]), location: this.state.center, location_detail: this.state.home_page_city } });
        //         } else {
        //             this.props.history.push('/login');
        //         }
        //     } else {
        //         await client.query({
        //             query: FIND_CATEGORY,
        //             variables: { _id: data[0] },
        //             fetchPolicy: 'no-cache',
        //         }).then(result => {
        //             this.setState({ child_data: result.data.category[0] ? result.data.category[0].child_category : [], service_modal: 1 });
        //         });
        //     }
        // }
    }


    const category_search = async value => {
        set_category_values(value);
        if (value === undefined) {
            value = "a"
        }
        if (value.length >= 0) {
            // const { data } = await client.query({
            //     query: SEARCH_CATEGORY,
            //     variables: { data: { value: value } },
            // });
            // set_auto_complete_data(data ? data.search_category : [])
        }
    };


    return (
        <>
            <Row className='d-flex flex-column flex-md-row align-items-md-center'>
                <Col sm={24} md={8} className='pr-0 pr-md-2'>
                    <Button icon="environment" className="px-1 jiffy_btn h-50x normal_font_size w-100" onClick={() => setLocationModal(true)}>
                        {home_page_city}
                    </Button>
                </Col>
                <Col sm={24} md={16} className='py-3'>
                    <AutoComplete
                        size={"large"}
                        className="w-100 h-50x service_autocomplete certain-category-search"
                        dropdownClassName="certain-category-search-dropdown"
                        onSelect={(value) => { set_category_values(value) }}
                        onSearch={category_search}
                        onFocus={category_search}
                        placeholder="Search for Services"
                        value={category_values}
                        dataSource={auto_complete_data.map((data, index) => {
                            console.log(data);
                            return (
                                <AutoComplete.Option key={`${data._id}_${data.category_type}_${data.is_parent}`}>
                                    {data.category_type === 1 ? data.category_name : data.subCategory_name}
                                </AutoComplete.Option>
                            );
                        })}
                    >
                        <Input size={"large"} prefix={<Icon type="search" className="certain-category-icon" />} />

                    </AutoComplete>
                    {/* <AutoComplete
                        className="w-100 border py-2 br_10"
                        // dropdownClassName="certain-category-search-dropdown"
                        onSelect={(value) => { set_category_values(value) }}
                        // onSearch={this.category_search}
                        // onFocus={this.category_search}
                        placeholder="Search for Services"
                        value={category_values}
                        dataSource={auto_complete_data.map((data, index) => {
                            return (
                                <AutoComplete.Option key={`${data._id}_${data.category_type}_${data.is_parent}`}>
                                    {data.category_type === 1 ? data.category_name : data.subCategory_name}
                                </AutoComplete.Option>
                            );
                        })}
                    >
                        <Input size={'large'} />

                    </AutoComplete> */}
                </Col>
            </Row>
            <Row>
                <Col sm={24} md={14} className="pr-0">
                    <Button block size="large" className="py-4 align-items-center d-flex justify-content-center bold br_10 border-0 primary_bg_blue_color white-text" onClick={() => { on_book() }}>
                        Book Now
                    </Button>
                </Col>
                <Col sm={24} md={10} className="d-none d-md-flex px-0">
                    <img alt='gigzzy link tag' src={link_img} loading="lazy" class="ml-3 position-absolute lazyload img-fluid" />
                </Col>
            </Row>
        </>
    )
}
export default BannerLocationSearch;
