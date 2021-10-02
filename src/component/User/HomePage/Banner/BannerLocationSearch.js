import React, { useState, Suspense,useContext } from "react";
import { Icon, Input, AutoComplete, Button, Row, Col, Modal, Skeleton } from 'antd';
import link_img from '../../../../image/home/c1.png'
import { useQuery } from '@apollo/react-hooks';
import { SEARCH_CATEGORY } from '../../../../graphql/User/home_page'
import {HomeContext} from '../../../context/Location'

const PlaceComplete = React.lazy(() => import('../../../Comman/PlaceComplete'));
const BannerLocationSearch = () => {
    const [home_page_city, set_home_page_city] = useState('kenya')
    const [LocationModal, setLocationModal] = useState(false)
    const home_context = useContext(HomeContext);

    const [category_values, set_category_values] = useState("")
    const [address, set_address] = useState("")
    const [center, set_center] = useState([9.9252, 78.1198])
    const [auto_complete_data, set_auto_complete_data] = useState([])
    const search_category = useQuery(SEARCH_CATEGORY)

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
            const result = await search_category.refetch({ data: { value: value } })
            if(result?.data && result?.data.search_category){
                set_auto_complete_data(result?.data.search_category)
            }
        }
    };

    const PlaceCompleteFunction = async (data) => {
        set_home_page_city(data?.home_page_city)
        set_center(data?.center)
        home_context.set_home_page_location(data)
    }

    return (
        <>
            <Row className='d-flex flex-column flex-md-row align-items-md-center'>
                <Col sm={24} md={8} className='pr-0 pr-md-2'>
                    <Button icon="environment" className="overflow-hidden px-1 jiffy_btn h-50x normal_font_size w-100" onClick={() => setLocationModal(true)}>
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
                </Col>
            </Row>
            <Row>
                <Col sm={24} md={14} className="pr-0">
                    <Button block size="large" className="py-4 align-items-center d-flex justify-content-center bold br_10 border-0 primary_bg_blue_color white-text" onClick={() => { on_book() }}>
                        Book Now
                    </Button>
                </Col>
                <Col sm={24} md={10} className="d-none d-md-flex px-0">
                    <img alt='gigzzy link tag' src={link_img} loading="lazy" class="ml-5 position-absolute lazyload img-fluid" />
                </Col>
            </Row>
            <Modal
                title="Choose Your Location"
                style={{ borderRadius: "2em" }}
                className="home_modal new_modal"
                centered style={{ top: 20 }}
                visible={LocationModal}
                onOk={() => setLocationModal(false)}
                onCancel={() => setLocationModal(false)}
            >
                <Suspense fallback={<Skeleton active />}>
                    <PlaceComplete PlaceCompleteFunction={PlaceCompleteFunction} />
                </Suspense>
            </Modal>
        </>
    )
}
export default BannerLocationSearch;
