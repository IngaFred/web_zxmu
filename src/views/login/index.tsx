import React from 'react';
import styles from './index.module.scss';
import { Button, Form, Input, message, Row, Col } from 'antd';
// token
import { useAppDispatch } from '../../store';
// 引入登录接口
import { updateToken } from '../../store/modules/user';
// 引入第三方模块 classnames
import classNames from 'classnames';
// 引入编程式 路由跳转
import { useNavigate } from 'react-router-dom';
import { loginAction } from '../../service/login';
import logo from '../../assets/images/logo/myLogo.png';

// 登录页面
// 邱致彬

export default function Login() {
	const navigate = useNavigate();
	// 从useSelector中解出User中的token
	// const token = useSelector((state: RootState) => state.user.token);
	const dispatch = useAppDispatch();

	// form的表单对象拿到 使用Form.useForm() 然后绑定到已写form中 将对象绑定到组件
	const [form] = Form.useForm();
	// 编写登录测试用例
	interface User {
		account: string;
		password: string;
	}
	const testUsers: User[] = [
		// 测试1 学生
		{
			account: '202112213801013',
			password: '123456',
		},
		// 测试2 教师
		{
			account: '19841015',
			password: '123456',
		},
	];

	// antd 方法
	const onFinish = (values: User) => {
		loginAction(values).then((res) => {
			const { success, data, errorMsg } = res?.data || {};
			if (success && typeof data === 'string') {
				//类型正确，且token更新成功
				dispatch(updateToken(data));
				message.success(errorMsg);
				navigate('/');
			}
		});
	};

	// 已经知道errorInfo的类型，将它解出
	const onFinishFailed = ({ values }: { values: User }) => {
		// 去除字符串两端的空白字符，然后检查字符串的长度是否为零,避免用户输入空白字符或其他非字符串类型的值
		if (
			typeof values.account !== 'string' &&
			typeof values.password !== 'string'
		) {
			message.error('请输入账号和密码！');
		} else if (values.account.trim().length === 0) {
			message.error('请输入账号！');
		} else if (values.password.trim().length === 0) {
			message.error('请输入密码！');
		}
	};
	// 测试使用的自动登录
	const autoLogin = (values: User) => {
		return () => {
			// 设置表单数据的回显
			form.setFieldsValue(values);
			onFinish(values);
		};
	};

	return (
		<div>
			<div className={styles.login}>
				<div className={styles.header}>
					<span className={styles['header-logo']}>
						{/* <i
							className={classNames(
								'iconfont icon-react',
								styles['icon-react']
							)}
						></i>
						<i
							className={classNames(
								'iconfont icon-icon-test',
								styles['icon-icon-test']
							)}
						></i>
						<i
							className={classNames(
								'iconfont icon-typescript',
								styles['icon-typescript']
							)}
						></i> */}
						<img src={logo} className={styles['home-icon']} />
					</span>
					<span className={styles['header-title']}>最美护理</span>
				</div>
				{/* <div className={styles.desc}>React18 + TypeScript4</div> */}
				<div className={styles.desc} />

				<Form
					name="basic"
					labelCol={{ span: 6 }}
					wrapperCol={{ span: 16 }}
					style={{ maxWidth: 600 }}
					initialValues={{ remember: true }}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
					className={styles.main}
					// 将对象绑定到组件
					form={form}
				>
					<Form.Item
						label="账号"
						name="account"
						rules={[{ required: true, message: '请输入账号！' }]}
					>
						<Input placeholder="请输入账号" />
					</Form.Item>

					<Form.Item
						label="密码"
						name="password"
						rules={[{ required: true, message: '请输入密码！' }]}
					>
						<Input.Password placeholder="请输入密码" />
					</Form.Item>

					<div className={styles.desc} />
					<Form.Item wrapperCol={{ offset: 12, span: 16 }}>
						<Button type="primary" htmlType="submit">
							登录
						</Button>
					</Form.Item>
				</Form>

				<div className={styles['test-users']}>
					<Row gutter={20}>
						{testUsers.map((v) => (
							<Col key={v.account} span={12} push={5}>
								<h3>
									测试账号-{v.account.length === 8 ? '教师' : '学生'}:
									<p>
										<Button
											onClick={autoLogin({
												account: v.account,
												password: v.password,
											})}
										>
											一键登录
										</Button>
									</p>
								</h3>
							</Col>
						))}
					</Row>
				</div>
			</div>
		</div>
	);
}
