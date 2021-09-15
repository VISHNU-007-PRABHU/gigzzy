import React, { useState, useEffect } from 'react'
import { Row, Col, Button, Form, Input, Icon, Upload } from 'antd';
import message from 'antd/lib/message';
import { useHistory } from "react-router-dom";

const content_data = {
    data1: "JOIN AS COMPANY",
    data2: "BACK",
    data3: "NEXT",
}

const fileList = [
    {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
        uid: '-2',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
        uid: '-3',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
        uid: '-4',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
        uid: '-5',
        name: 'image.png',
        status: 'error',
    },
]

const FileUpload = (props) => {
    let history = useHistory();
    const [img_url, setimg_url] = useState("");
    const [fileList_status, setfileList_status] = useState(false);
    const [custom_class, setcustom_class] = useState("avatar-uploader d-flex ");
    const [user_data, setuser_data] = useState("");
    const [loading, setloading] = useState(false);
    const [content, setcontent] = useState("Upload");
    const [subcontent, setsubcontent] = useState("");
    const { form } = props;
    useEffect(() => {
        if (props['custom_class']) {
            setcustom_class(props['custom_class'])
        }
        if (props['custom_content']) {
            setcontent(props['custom_content'])
        }
        if (props['custom_sub_content']) {
            setsubcontent(props['custom_sub_content'])
        }
    }, [props])
    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    const normFile = e => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }

    const handleChange = async info => {
        setloading(true);
        if (info.file.status) {
            console.log(info.file.originFileObj);
            getBase64(info.file.originFileObj, imageUrl => {
                setimg_url(imageUrl)
                setloading(false)
            }
            );
        }
    };

    const uploadButton = (
        <div>
            <Icon type={loading ? 'loading' : 'plus'} className="py-3" />
            <div className="ant-upload-text">
                <div className="bold normal_font_size">{content}</div>
                <div>{subcontent}</div>
            </div>
        </div>
    );

    return (
        <>
            <Upload
                name="avatar"
                accept=".png"
                listType="picture-card"
                className={custom_class}
                fileList={fileList_status && fileList}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                showUploadList={true}
                beforeUpload={beforeUpload}
                onChange={handleChange}
            >
                {img_url ? <img src={img_url} alt="avatar" style={{ width: '50%' }} /> : uploadButton}
            </Upload>
        </>
    )
};

export default FileUpload;