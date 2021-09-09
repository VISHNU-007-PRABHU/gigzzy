import React, { useState, Suspense } from 'react'
import { Icon, Button, message, Steps, Form, Skeleton } from 'antd';
import { Alert_msg } from '../../../Comman/alert_msg';
import SetAddress from '../SetAddress';
import step0 from '../../../../image/step0.png';
import findIndex from 'lodash/findIndex';
import size from 'lodash/size';
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
];

const layout = {
    // labelCol: { span: 8 },
    // wrapperCol: { span: 16 },
    offset: 8, span: 16
};
const ProjectDetail = React.lazy(() => import('./ProjectDetail'));
const ProjectBudget = React.lazy(() => import('./ProjectBudget'));
const ProjectImages = React.lazy(() => import('./ProjectImages'));

function ContractSteper(props) {
    const { form } = props;
    const [open, setOpen] = useState(false);
    const [current, setCurrent] = useState(0);
    const [stepsdetail, setSteps] = useState(original_steps);

    const next = (id) => {
        const newItems = [...stepsdetail];
        let index = findIndex(newItems, ['id', id]);
        newItems[index]['status'] = "finish";
        setSteps(newItems)
        setCurrent(current + 1);
    }

    const prev = (id) => {
        const newItems = [...stepsdetail];
        let index = findIndex(newItems, ['id', id]);
        newItems[index]['status'] = "wait";
        setSteps(newItems)
        setCurrent(current - 1);
    }
    const done = () => {
        const newItems = [...stepsdetail];
        newItems[size(newItems) - 1]['status'] = "finish";
        setSteps(newItems)
        message.success('Processing complete!')
    }

    return (
        <>
            <Steps size="large" className="contract_steper" labelPlacement="vertical" current={current}>
                {stepsdetail && stepsdetail.map(item =>
                    <Step key={item.title} status={item.status} icon={<img src={step0} />} title={item.content} />
                )}
            </Steps>
            <div className="d-flex justify-content-center pt-5">
                <Form {...layout} name="nest-messages" className="w-50">
                    <Suspense fallback={<Skeleton active />}>
                        <div className={current === 3 ? '' : 'd-none'}>
                            <ProjectImages />
                        </div>
                        <div className={current === 2 ? '' : 'd-none'}>
                            <ProjectBudget />
                        </div>
                        <div className={current === 0 ? '' : 'd-none'}>
                            <ProjectDetail />
                        </div>
                        <div className={current === 1 ? '' : 'd-none'}>
                            <Button type="primary" className="w-50" >
                                <div className="normal_font_size">Add new address
                                    <Icon type="plus" />
                                </div>
                            </Button>
                            <SetAddress user_id={"6136fd283765fd3febbcc435"} />
                        </div>
                    </Suspense>
                </Form>

            </div>
            <div className="steps-action justify-content-center d-flex">
                {current < stepsdetail.length - 1 && (
                    <Button type="primary" className="w-25" onClick={() => next(stepsdetail[current]['id'])}>
                        <div className="normal_font_size">Next</div>
                    </Button>
                )}
                {current === stepsdetail.length - 1 && (
                    <Button type="primary" className="w-25" onClick={() => done()}>
                        <div className="normal_font_size">Done</div>
                    </Button>
                )}
                {current > 0 && (
                    <Button style={{ marginLeft: 8 }} className="w-25" onClick={() => prev(stepsdetail[current]['id'])}>
                        <div className="normal_font_size">Back</div>
                    </Button>
                )}
            </div>
        </>

    )
}

export default Form.create()(ContractSteper);
