import React,{ useState }  from 'react'
import { Row, Col, Button, Form, Input,Icon,Upload } from 'antd';
import message from 'antd/lib/message';
import { useHistory } from "react-router-dom";

const content_data = {
    data1: "JOIN AS COMPANY",
    data2: "BACK",
    data3: "NEXT",
}

const FileUpload = (props) => {
    let history = useHistory();
    const [img_url, setimg_url] = useState("");
    const [user_data, setuser_data] = useState("");
    const [loading, setloading] = useState(false);
    const { form } = props;

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
        if (info.file.status === 'uploading') {
            setloading(true);
            return;
        }

        if (info.file.status) {
            console.log(info.file.originFileObj);
            this.getBase64(info.file.originFileObj, imageUrl =>{
                setimg_url(imageUrl)
                setloading(false)
            }
            );
        }
    };

    const uploadButton = (
        <div>
            <Icon type={loading ? 'loading' : 'plus'} />
            <div className="ant-upload-text">Upload</div>
        </div>
    );

    return (
        <>
            <Upload
                name="avatar"
                accept=".png"
                listType="picture-card"
                className="avatar-uploader d-flex justify-content-center"
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={handleChange}
            >
                {user_data ? <img src={img_url} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
        </>
    )
};

export default FileUpload;
