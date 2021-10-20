import React, { useState, useEffect, Suspense } from 'react'
import { Icon, Button, message, Steps, Form, Skeleton, Modal, Row, Col } from 'antd';
import { Alert_msg } from '../../../Comman/alert_msg';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { UPDATE_CONTRACT, GET_CONTRACT } from '../../../../graphql/User/contract';
import SetAddress from '../SetAddress';
import useReactRouter from 'use-react-router';

import { LocationContext,EditLocationContext } from '../../../context/Location'
import Address from "../Address";
import findIndex from 'lodash/findIndex';
import size from 'lodash/size';
import { CurrentCallContext } from 'twilio/lib/rest/preview/trusted_comms/currentCall';
const { Step } = Steps;
const original_steps = [
    {
        id: 1,
        title: 'First',
        content: 'Project Details',
        status: "wait"
    },
    {
        id: 2,
        title: 'Second',
        content: 'Project Location',
        status: "wait"
    },
    {
        id: 3,
        title: 'Last',
        content: 'Budget',
        status: "wait"
    },
    {
        id: 4,
        title: 'final',
        content: 'Document',
        status: "wait"
    },
    {
        id: 5,
        title: 'preview',
        content: 'Post Preview',
        status: "process"
    }
];

const layout = { offset: 8, span: 16 };
const ProjectDetail = React.lazy(() => import('./ProjectDetail'));
const ProjectBudget = React.lazy(() => import('./ProjectBudget'));
const ProjectImages = React.lazy(() => import('./ProjectImages'));
const PostProjectSuccess = React.lazy(() => import('./PostProjectSuccess'));

function ContractSteper(props) {
    const { form } = props;
    const { history, match } = useReactRouter();
    const [add_address, set_add_address] = useState(false);
    const [page_loading, set_page_loading] = useState(true);
    const [address_id, set_address_id] = useState("");
    const [current, setCurrent] = useState(0);
    const [contract_id, set_contract_id] = useState("");
    const [user_id, set_user_id] = useState("");
    const [contract_detail_data, set_contract_detail] = useState({});
    const [user_all_address, set_user_all_address] = useState([]);
    const [stepsdetail, setSteps] = useState(original_steps);
    const [update_contract, { loading: removeLoading }] = useMutation(UPDATE_CONTRACT)
    const contract_detail = useQuery(GET_CONTRACT);
    const [address_from, setaddress_from] = useState({});

    useEffect(async () => {
        if (localStorage.getItem('user')) {
            set_user_id(JSON.parse(localStorage.getItem("user"))._id)
        }
        if (match.params.id) {
            let finaldata = await contract_detail.refetch({ contract_id: match.params.id })
            finaldata.data.get_contracts[0].current_page = finaldata.data.get_contracts[0].current_page || -1
            var db_current_page = parseInt(finaldata.data.get_contracts[0].current_page)+1
                
            let update_steps = original_steps.map(data => {
                if(db_current_page>=data.id)
                {
                    return data.status = "finish"
                }
            })
            // setSteps(update_steps)
            
            set_contract_detail(finaldata.data.get_contracts[0])
            set_address_id(finaldata.data.get_contracts[0]?.address_id)
            setCurrent(Number(finaldata.data.get_contracts[0].current_page) + 1)
            set_page_loading(false)
            
        }
    }, [match.params.id])
    const next = (id) => {
        const { form } = props;
        form.validateFields(async (err, values) => {
            if (!err) {
                let input_data = {}
                if (match.params.id) {
                    input_data['_id'] = match.params.id
                }
                values['current_page'] = (current>=4)?4:current
                switch (current) {
                    case 2:
                        if ((!values['budget'] || values['budget']<=0 )) {
                            Alert_msg({ status: 'failed', msg: "Please Enter the budget" })
                            return false
                        }
                        if(values['timeline_type']=="2" || values['timeline_type']=="3")
                        {
                            if(values['timeline']<=0)
                            {
                                Alert_msg({ status: 'failed', msg: "Enter Timeline more than 1" })
                                return false
                            }
                        }
                        break;
                    case 1:
                        if (address_id=="" || address_id==null) {
                            Alert_msg({ status: 'failed', msg: "Select any one address" })
                            return false
                        } 
                        else if (address_id) {
                            let index = findIndex(user_all_address, ['_id', address_id]);
                            if(index==-1)
                            {
                                Alert_msg({ status: 'failed', msg: "Select any one address" })
                                return false;
                            }
                            else
                            {
                                values['address_id'] = address_id
                            }
                        }
                        break;
                    case 5:
                        values['contract_status'] = "12"
                        break;
                    default:
                        break;
                }
                if (values && size(values)) {
                    input_data['contract_data'] = [values]
                }
                let final_data = await update_contract({ variables: input_data });
                Alert_msg(final_data.data.update_contract)
                console.log(current)
                if(current === 5 || current === 6)
                {
                    let all_completed = original_steps.map(data => {
                        return data.status = "finish"
                    })
                    setSteps(all_completed)
                    setCurrent(4);
                    message.success('Processing complete!')
                    history.push({ pathname: `/contract/view/${match.params.id}` })
                }
                else {
                    const newItems = [...stepsdetail];
                    let index = findIndex(newItems, ['id', current+1]);
                    newItems[index]['status'] = "finish";
                    setSteps(newItems)
                    setCurrent(current + 1);
                }
            }
        })
    }

    const prev = () => {
        if (current === 0) {
            history.push({ pathname: `/bookings` })
        } else {
            setCurrent(current - 1);
        }
    }
    const done = () => {
        let all_completed = original_steps.map(data => {
            return data.status = "finish"
        })
        setSteps(all_completed)
        setCurrent(4);

        message.success('Processing complete!')
    }
 
    const edit_location = (item) => {
        setaddress_from(item)
        set_add_address(true);
    }
    const all_address = (data) => {
        set_user_all_address(data);
    }
    const on_popup_closed = () => {
        set_add_address(false);
    }
    const on_location_change = (item) => {
        set_address_id(item._id);
    }
    const stepperIcon = (item) =>{
        return <img src={require('../../../../image/step'+item.id+'.png')}/>;
    }
    const button_prev_text = (item) =>{
        switch(item) {
            case 0:
                return "Cancel";
          default:
            return "Back";
        }
    }
    const button_next_text = (item) =>{
        switch(item) {
            case 3:
                return "Save and Preview";
            case 4:
                return "Publish";
            case 5:
                return "Publish";
          default:
            return "Next";
        }
    }
    return (
        
        <div>
        { !page_loading && <>    
            <h4 className="text-center mb-5">
                {(contract_detail_data?.get_contract_category?.[0]?.category_type==2)?contract_detail_data?.get_contract_category?.[0]?.subCategory_name:contract_detail_data?.get_contract_category?.[0]?.category_name}
            </h4>
            <Steps size="large" className="contract_steper" labelPlacement="vertical" current={current}>
                {stepsdetail && stepsdetail.map(item =>
                    <Step key={item.title} status={item.status} icon={stepperIcon(item)} title={item.content} />
                )}
            </Steps>
            <div className="d-flex justify-content-center my-5">
                <Form  {...layout} name="nest-messages" className="w-100">
                    <Suspense fallback={<Skeleton active />}>
                        <div className={current === 4 || current === 5 ? '' : 'd-none'}>
                            <h4 className="text-center">Review and publish your project</h4>
                            <ProjectDetail contract_detail_data={contract_detail_data} current={current} customform={form} />
                            <ProjectBudget contract_detail_data={contract_detail_data} current={current} customform={form} />
                            <ProjectImages hide_common_upload={true} contract_detail_data={contract_detail_data} current={current} customform={form} />
                        </div>
                        <div className={current === 3 ? 'contract_images_section' : 'd-none'}>
                            <Col md={{ span: 18, offset: 3 }}>
                                <ProjectImages contract_detail_data={contract_detail_data} current={current} customform={form} />
                            </Col>
                        </div>
                        <div className={current === 2 ? '' : 'd-none'}>
                            <Col md={{ span: 18, offset: 3 }}>
                                <ProjectBudget contract_detail_data={contract_detail_data} current={current} customform={form} />
                            </Col>
                        </div>
                        <div className={current === 0 ? '' : 'd-none'}>
                            <Col md={{ span: 18, offset: 3 }}>
                                <ProjectDetail contract_detail_data={contract_detail_data} current={current} customform={form} />
                            </Col>
                        </div>
                        <div className={current === 1 ? '' : 'd-none'}>
                            <LocationContext.Provider value={{
                                location_change: on_location_change,
                                popup_closed: on_popup_closed,
                                popup_closed_option:true
                            }}>
                                <Button type="primary" className="mb-3 h-50x" onClick={() => {setaddress_from({}); set_add_address(true) }}>
                                    <div className="normal_font_size d-flex justify-content-around align-items-center">
                                        <div className="mr-3">
                                            Add New Address
                                        </div>
                                        <Icon type="plus" />
                                    </div>
                                </Button>
                                <h4 className="text-center mb-5">My Saved Address</h4>
                                <Col md={{ span: 18, offset: 3 }} className="extra_radius_input shadow-lg">
                                    <EditLocationContext.Provider value={{ location_edit: edit_location,no_data:all_address}}>
                                        <SetAddress user_id={user_id} address_id={address_id} />
                                    </EditLocationContext.Provider>
                                </Col>
                                <Address address_from={address_from} visible={add_address}  />
                            </LocationContext.Provider>
                        </div>
                    </Suspense>
                    
                </Form>
            </div>
            <div className="steps-action justify-content-between d-flex mb-5">
                <Col md={{ span: 18, offset: 3 }}>
                    <Row gutter={[12, 24]} >
                        <Col md={12}>
                            <Button type="primary" ghost className="contract_actions w-100" onClick={() => prev()}>
                                {button_prev_text(current)}
                            </Button>
                        </Col>
                        <Col md={12}>
                            <Button type="primary" className="contract_actions w-100" onClick={() => next()}>
                                {button_next_text(current)}
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </div>
            </>
            }
        </div>
    )
}

export default Form.create()(ContractSteper);
