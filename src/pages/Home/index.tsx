import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import styles from './index.less';
import {useEffect} from "react";





const HomePage: React.FC = () => {
  const { name } = useModel('global');
  useEffect(() => {
    let source = new EventSource('http://127.0.0.1:7001/api/v1/sse/register?clientId=' + 1234);
// let source = new EventSource('/stream');

    source.onopen = (event) => {
      console.log('open event===>', event)
    }

    // 收到消息，触发`message` 事件
    source.onmessage = (event) => {
      console.log('onmessage event===>', event)
    }

    // 发生错误，触发`error` 事件
    source.onerror = (event) => {
      console.log('onerror event', event)
    }
  }, [])
  return (
    <PageContainer ghost>
      <div className={styles.container}>
        <Guide name={trim(name)} />
      </div>
    </PageContainer>
  );
};

export default HomePage;
