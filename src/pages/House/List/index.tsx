import {ProTable, PageContainer} from '@ant-design/pro-components';
import {Button, message, Modal, Form, Input, Upload} from "antd";
import ImgCrop from 'antd-img-crop';
import {useEffect, useState} from "react";
import {connect} from "@umijs/max";

const HouseList = (props) => {
  const {updateLoading, dispatch} = props
  const [visible, setVisible] = useState(false)
  const [form] = Form.useForm()
  const [fileList, setFileList] = useState([])
  const columns = [
    {
      title: '房间名字',
      dataIndex: 'name'
    },
    {
      title: '价格',
      dataIndex: 'price'
    },
    {
      title: '简介',
      dataIndex: 'info'
    },
    {
      title: '详细地址',
      dataIndex: 'address'
    }
  ]

  const submitForm = async () => {
    const res = await form.validateFields()
    if (res) {
      console.log(res)
    }
  }

  const onChange = ({file, fileList}) => {
    if (file.status !== 'uploading') {
      console.log(file, fileList.fileList);
    }
    if (file.status === 'done') {
      message.success(`${file.name} file uploaded successfully`);
    } else if (file.status === 'error') {
      message.error(`${file.name} file upload failed.`);
    }
    setFileList(fileList)

  }

  useEffect(() => {
    dispatch({
      type: 'HouseList/pageInit'
    })
  }, [])
  return (
    <PageContainer
      ghost
      extra={[
        <Button key='add' type='primary' onClick={() => setVisible(true)}>新增</Button>
      ]}
    >
      <ProTable
        columns={columns}
        // request={params => {}}
        request={async (params) => {
          return dispatch({
            type: 'HouseList/pageInit',
            params,
          })
        }}
      />
      <Modal
        open={visible}
        title='新增房型'
        onCancel={() => setVisible(false)}
        footer={false}
      >
        <Form
          form={form}
        >
          <Form.Item label='房间名称' name='avatar'>
            <ImgCrop>
              <Upload
                action="/api/v1/uploads"
                listType="picture-card"
                name='file'
                accept="image/*"
                // listType="picture-card"
                headers={{
                  token: localStorage.getItem('token')
                }}
                fileList={fileList}
                onChange={onChange}
              >
                <Button>Add image</Button>
              </Upload>
            </ImgCrop>
          </Form.Item>
          <Form.Item label='房间名称' name='name'>
            <Input placeholder='请输入'/>
          </Form.Item>
          <Form.Item label='简介' name='info'>
            <Input placeholder='请输入'/>
          </Form.Item>
          <Form.Item label='地址' name='address'>
            <Input placeholder='请输入'/>
          </Form.Item>
          <Form.Item label='价格' name='price'>
            <Input placeholder='请输入'/>
          </Form.Item>

          <Form.Item label='城市' name='cityCode'>
            <Input placeholder='请输入'/>
          </Form.Item>

          <Form.Item label='发布时间' name='publish_time'>
            <Input placeholder='请输入'/>
          </Form.Item>

          <Form.Item label='发布区间' name='timeRange'>
            <Input placeholder='请输入'/>
          </Form.Item>
          <Button
            type='primary'
            block
            loading={updateLoading}
            onClick={submitForm}
          >
            提交
          </Button>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default connect(({HouseList, loading}) => ({
  ...HouseList,
  updateLoading: loading.effects['HouseList/submitForm']
}))(HouseList);
