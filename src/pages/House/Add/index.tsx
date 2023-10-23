import { PageContainer } from '@ant-design/pro-components';
import {connect} from "umi";
import {useEffect} from "react";

const HouseAdd = (props) => {
  const {dispatch} = props
  console.log(dispatch)
  useEffect(() => {

  }, [])

  return (
    <PageContainer ghost>
      HouseList
    </PageContainer>
  );
};

// export default connect(({
//
// }) => ({
//
// }))(HouseAdd);

export default HouseAdd
