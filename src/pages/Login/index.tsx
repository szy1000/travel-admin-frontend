import { LockOutlined, MobileOutlined, UserOutlined } from '@ant-design/icons'
import { Alert, message, Tabs, Statistic } from 'antd'
import React, { useState } from 'react'
import {
  ProFormCheckbox,
  ProFormCaptcha,
  ProFormText,
  LoginForm,
  PageContainer
} from '@ant-design/pro-components'
import { history } from 'umi'
import { loginReq, loginByCodeReq, sendCodeReq } from "./api";
import { TOKEN, PROJECT_NAME, SLOGAN } from '@/constants'
import { getItem, setItem } from '@/utils/localstorage'
import styles from './style.less'
import { mobileReg } from '@/utils/regExp'

const { Countdown } = Statistic
message.config({
  maxCount: 1
})

const LoginMessage: React.FC<{
  content: string
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24
    }}
    message={content}
    type="error"
    showIcon
  />
)

const Login: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({})
  const [type, setType] = useState<string>('account')
  // const { initialState, setInitialState } = useModel('@@initialState')

  if (getItem(TOKEN)) {
    history.replace('/home')
  }


  const onFinish = () => {
    console.log('finished!')
    message.destroy()
  }

  const handleSubmit = async (values: API.LoginParams) => {
    try {
      console.log(values)
      //username code password
      // 登录
      const res = type === 'account' ? await loginReq(values) : await loginByCodeReq(values)
      debugger
      if (res.code === 200) {
        setItem(TOKEN, res.data.token)
        message.success('登录成功!')
        window.location.reload()
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return

      } else {

        if (res.code === 500) {
          if (res.msg.indexOf('&') !== -1) {
            const deadline = Date.now() + Number(res.msg.split('&')[1])
            void message.open({
              type: 'error',
              className: 'accountLocking',
              content: (
                <>
                  <text>{res.msg.split('&')[0]}&nbsp;</text>
                  <Countdown
                    valueStyle={{ color: 'red' }}
                    // title={res.msg.split('&')[0]}
                    value={deadline}
                    onFinish={onFinish}
                    format="mm:ss"
                  />
                </>
              ),
              duration: 0
            })
          } else {
            message.open({
              type: 'warning',
              className: 'pwdErr',
              content: res.msg,
              duration: 3
            })
          }
        }
        // debugger
        // todo 错误处理
        setUserLoginState({
          code: 0,
          currentAuthority: '',
          msg: '',
          status: 'error',
          type: 'account'
        })
      }
    } catch (error) {
      console.log(error)
      message.error('登录失败，请重试！')
    }
  }
  const { status, type: loginType } = userLoginState

  return (
    <PageContainer className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          logo={<img alt="logo" src="/logo.png" />}
          title={PROJECT_NAME}
          subTitle={SLOGAN}
          // initialValues={{
          //   username: 'admin',
          //   password: 'admin123',
          //   autoLogin: true,
          // }}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams)
          }}
        >
          <Tabs
            centered
            activeKey={type}
            onChange={setType}
            items={[
              { label: '密码登录', key: 'account' },
              { label: '手机登录', key: 'mobile' }
            ]}
          >
          </Tabs>

          {/* {status === 'error' && loginType === 'account' && (
            <LoginMessage content="账户或密码错误" />
          )} */}

          {type === 'account' && (
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                  maxLength: 20,
                  // showCount:true,
                }}
                placeholder="请输入用户名"
                rules={[
                  {
                    required: true,
                    message: '请输入用户名!'
                  }
                ]}

              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                  maxLength: 20,
                  // showCount:true,
                }}
                placeholder="请输入密码"
                rules={[
                  {
                    required: true,
                    message: '请输入密码！'
                  }
                ]}
              />
            </>
          )}

          {status === 'error' && loginType === 'mobile' && (
            <LoginMessage content="验证码错误" />
          )}
          {type === 'mobile' && (
            <>
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <MobileOutlined className={styles.prefixIcon} />
                }}
                name="username"
                placeholder="手机号"
                rules={[
                  {
                    required: true,
                    message: '请输入手机号！'
                  },
                  {
                    pattern: mobileReg,
                    message: '手机号格式错误！'
                  }
                ]}
              />
              <ProFormCaptcha
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                  maxLength: 6,
                  onChange: (e) => {
                    if (e.target.value.length > 6) {
                      message.error('验证码不能超过6位！')
                    }
                  }
                }}
                phoneName="username"
                captchaProps={{
                  size: 'large'
                }}
                placeholder="请输入验证码"
                captchaTextRender={(timing, count) => {
                  if (timing) {
                    return `${count}获取验证码`
                  }
                  return '获取验证码'
                }}
                name="code"
                rules={[
                  {
                    required: true,
                    message: '请输入验证码！'
                  }
                ]}
                onGetCaptcha={async (phone) => {
                  if (!phone) {
                    return
                  }
                  const result = await sendCodeReq({ phone })
                  if (result?.code === 200) {
                    message.success(result.data)
                  } else {
                    message.error(result?.data || '发送失败，请稍后再试！')
                  }
                }}
              />
            </>
          )}
          <div
            style={{
              marginBottom: 24
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox>
          </div>
        </LoginForm>
      </div>
    </PageContainer>
  )
}

export default Login
