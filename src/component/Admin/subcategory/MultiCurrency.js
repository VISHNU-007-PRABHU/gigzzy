import React, { useState, useEffect, Suspense } from 'react'
import { Collapse, Form, Typography, Skeleton, Icon, Button, Modal, Popconfirm, Empty,Spin } from 'antd';
import { REMOVE_CATEGORY_CURRENCY } from "../../../graphql/Admin/sub_category";
import { useMutation, useQuery } from '@apollo/react-hooks';
import useReactRouter from 'use-react-router';
import { Alert_msg } from "../../Comman/alert_msg";
import { GET_CATEGORY_CURRENCY } from '../../../graphql/Admin/sub_category';

const { Panel } = Collapse;
const { Title } = Typography;
const title = "Currency"
const MultiCurrencyFrom = React.lazy(() => import('./MultiCurrencyFrom'));
const MultiCurrency = (props) => {
    const { form } = props;
    const { history, match } = useReactRouter();
    const [currency_data, set_currency_data] = useState([]);
    const [local_currency_data, set_local_currency_data] = useState({});
    const [DeleteCategoryCurrency, { loading: removeLoading }] = useMutation(REMOVE_CATEGORY_CURRENCY)
    const [add_currency_visible, set_add_currency_visible] = useState(false);
    const [loading, set_loading] = useState(false);
    const GetCategoryCurrency = useQuery(GET_CATEGORY_CURRENCY);

    useEffect(() => {
        if (match.params.id) {
            getCurrencyResponse()
        }
    }, [])

    const getCurrencyResponse = async () => {
        set_loading(true)
        let input_data = { pagination: false, category_id: match.params.id }
        let finaldata = await GetCategoryCurrency.refetch(input_data)
        set_currency_data(finaldata.data?.GetCategoryCurrency?.data)
        set_loading(false)
    }

    const genExtra = async (event, id) => {
        let input_data = {
            _id: id
        }
        set_loading(true)
        let remove_data = await DeleteCategoryCurrency({ variables: input_data });
        Alert_msg(remove_data.data.DeleteCategoryCurrency)
        if (remove_data.data.DeleteCategoryCurrency.status === "success") {
            getCurrencyResponse()
        }
        event.stopPropagation();
    }

    const from_parent = () => {
        getCurrencyResponse()
        set_add_currency_visible(false)
    }

    return (<>
        <Spin spinning={loading}>
            <div className="d-flex justify-content-between m-3">
                <Title level={4} className={""}>
                    {title}
                </Title>
                <Button className="align-items-center d-flex" type="primary" icon="plus" onClick={() => { set_add_currency_visible(!add_currency_visible) }}>
                    Add Currency
                </Button>
            </div>
            <Collapse accordion >
                {(currency_data && currency_data.length && currency_data.map((cdata, i) => {
                    return (
                        <Panel key={i} Panel className="multi_currency_panel" header={
                            <div className="d-flex justify-content-between">
                                <div>{cdata?.get_parent_currency?.name}</div>
                                <div>
                                </div>
                            </div>}
                            key={i} extra={<div>
                                <Popconfirm title="Sure to delete because may be under some more bookings ?" onConfirm={(e) => { genExtra(e, cdata._id) }}>
                                    <Icon type="delete" theme="twoTone" twoToneColor="#52c41a" className='f_25' />
                                </Popconfirm>
                            </div>
                            }>
                            <Suspense fallback={<Skeleton active />}>
                                <MultiCurrencyFrom from_parent={from_parent} data={cdata} currency_disable={true} />
                            </Suspense>

                        </Panel>
                    )
                }))}
                {!currency_data && !currency_data.length && <div className="d-flex justify-content-center p-4">
                    <Empty description={false} />
                </div>
                }
            </Collapse>
        </Spin>
        <Modal
            visible={add_currency_visible}
            title="Add new currency"
            onCancel={() => { set_add_currency_visible(!add_currency_visible) }}
            footer={null}
        >
            <Suspense fallback={<Skeleton active />}>
                <MultiCurrencyFrom currency_data={currency_data} from_parent={from_parent} />
            </Suspense>
        </Modal>
    </>);
};
export default Form.create()((MultiCurrency));


