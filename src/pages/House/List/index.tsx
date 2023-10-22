import { ProTable, PageContainer } from '@ant-design/pro-components';
import {Button} from "antd";
import {history} from "@umijs/max";

const HouseList = () => {

  const columns = [
    {
      title: '房间名字',
    }
  ]


  return (
    <PageContainer
      ghost
      extra={[
        <Button key='add' type='primary' onClick={() => history.push('/house/add')}>新增</Button>
      ]}
    >
      <ProTable
        columns={columns}
      />
    </PageContainer>
  );
};

export default HouseList;
