import React, { Suspense, useEffect, useState, useMemo } from "react";
import { Row, Col, Modal, Skeleton } from 'antd';
import { HomeContext } from '../../context/Location'
import useReactRouter from 'use-react-router';

const How = React.lazy(() => import('./How/How'));
const DownloadPage = React.lazy(() => import('./DownloadPage/DownloadPage'));
const ChoosePage = React.lazy(() => import('./DownloadPage/ChoosePage'));
const ReadyPage = React.lazy(() => import('./DownloadPage/ReadyPage'));
const HomeBanner = React.lazy(() => import('./Banner/HomeBanner'));
const HomeTranding = React.lazy(() => import('./Trending/HomeTranding'));
const ProfessionalPage = React.lazy(() => import('./Professional/ProfessionalPage'));
const OutdoorPage = React.lazy(() => import('./OutDoor/OutdoorPage'));
const ChooseJobCategory = React.lazy(() => import('./ChooseJobCategory'));


const HomePage = () => {

    const [VisibleChooseCategory, SetVisibleChooseCategory] = useState(false)
    const [current_type, set_current_type] = useState("")
    const [home_page_city, set_home_page_city] = useState("Kenya")
    const [center, set_center] = useState([9.9252, 78.1198])
    const [current_id, set_current_id] = useState("")
    const [comman_data, set_comman_data] = useState({})
    const { history } = useReactRouter();

    const set_home_page_location = async(data) => {
        console.log("set_home_page_location -> data", data)
        set_home_page_city(data?.home_page_city)
        set_center(data?.center)
    }
    const on_book = async (data) => {
        console.log(home_page_city)
        if (localStorage.getItem('userLogin') === 'success') {
            let local_data = {
                pathname: `/description/${data._id}`,
                state: {
                    type: data.category_type,
                    location: center,
                    location_detail: home_page_city
                }
            }
            set_comman_data(local_data)
            set_current_id(data._id)
            set_current_type("trending")
            SetVisibleChooseCategory(!VisibleChooseCategory)
        } else {
            history.push('/login');
        }
    }
    return (
        <>
            <HomeContext.Provider value={{ set_home_page_location, on_book }}>
                <Suspense fallback={<p className="container mt-2" style={{ backgroundColor: "#eae5e5", width: '100%', height: "30px" }}></p>}>
                    <HomeBanner />
                </Suspense>
                <Suspense fallback={<p className="container mt-2" style={{ backgroundColor: "#eae5e5", width: '100%', height: "30px" }}></p>}>
                    <HomeTranding />
                </Suspense>
                <Suspense fallback={<p className="container mt-2" style={{ backgroundColor: "#eae5e5", width: '100%', height: "30px" }}></p>}>
                    <OutdoorPage />
                </Suspense>
                <Suspense fallback={<p className="container mt-2" style={{ backgroundColor: "#eae5e5", width: '100%', height: "30px" }}></p>}>
                    <How />
                </Suspense>

                <Suspense fallback={<p className="container mt-2" style={{ backgroundColor: "#eae5e5", width: '100%', height: "30px" }}></p>}>
                    <ProfessionalPage />
                </Suspense>

                <Suspense fallback={<p className="container mt-2" style={{ backgroundColor: "#eae5e5", width: '100%', height: "30px" }}></p>}>
                    <ReadyPage />
                </Suspense>

                <Suspense fallback={<p className="container mt-2" style={{ backgroundColor: "#eae5e5", width: '100%', height: "30px" }}></p>}>
                    <DownloadPage />
                </Suspense>

                <Suspense fallback={<p className="container mt-2" style={{ backgroundColor: "#eae5e5", width: '100%', height: "30px" }}></p>}>
                    <ChoosePage />
                </Suspense>

                <Modal footer={null} centered visible={VisibleChooseCategory} onCancel={() => { SetVisibleChooseCategory(false) }}>
                    <Suspense fallback={<Skeleton active />}>
                        <ChooseJobCategory current_id={current_id} comman_data={comman_data} />
                    </Suspense>
                </Modal>
            </HomeContext.Provider>
        </>
    )
}
export default HomePage;
