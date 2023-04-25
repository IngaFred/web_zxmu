import React, { useEffect, useState } from 'react';
import {
	Row,
	Space,
	Button,
	Form,
	Input,
	message,
	DatePicker,
	Upload,
} from 'antd';
import styles from './index.module.scss';
import { PlusOutlined } from '@ant-design/icons';
import { postFile, postUploadFile } from '../../../service/teacherdetail';
import 'dayjs/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import MyUpload from './components';

export default function Detail() {
	const [form] = Form.useForm();
	const [fileList, setFileList] = useState([]);
	const [sss, sSSSss] = useState([]);
	const submitEvent = (e: any) => {
		console.log('submitEvent', e);
	};
	const { RangePicker } = DatePicker;
	const { TextArea } = Input;
	console.log('fileList', fileList);
	useEffect(() => {
		setFileList(fileList);
	}, [fileList]);
	return (
		<div className={styles.detailALL}>
			<div className={styles.detailHeader}>
				<div className={styles.title}>
					<h2>新建作业</h2>
				</div>
				<div>
					<Button className={styles.btn}>保存</Button>
					<Button
						className={styles.btn}
						type="primary"
						onClick={() => {
							console.log('form', form);
							const values = form?.getFieldsValue();
							console.log(' form?.getFieldsValue()', values);
							const resourceList = fileList.map((item) => {
								// @ts-ignore
								return item?.resourceId;
							});
							const newObj = {
								lessonId: values.lessonId,
								name: values.name,
								info: values.info,
								resourceList: resourceList,
								/* start: values.time?.[0]?.valueOf?.(),
                    end: values.time?.[1]?.valueOf?.(), */
							};
							console.log('newObj', newObj);
							postUploadFile(newObj);
						}}
					>
						作业发布
					</Button>
				</div>
			</div>

			<Form
				form={form}
				labelCol={{ span: 4 }}
				wrapperCol={{ span: 14 }}
				layout="horizontal"
				className={styles.form}
			>
				<div>
					<Form.Item name="LessonId" label="所属课程">
						<Input />
					</Form.Item>

					<Form.Item name="Name" label="作业名称">
						<Input />
					</Form.Item>

					<Form.Item name="RangePicker" label="作业名称">
						<RangePicker showTime  locale={locale} />
					</Form.Item>

					<Form.Item name="Info" label="作业内容">
						<TextArea className={styles.text} style={{ width: '1000px' }} />
					</Form.Item>
				</div>

				<Form.Item label="上传资料" valuePropName="fileList">
					<div>
						<MyUpload />
					</div>

					{/* <Upload
						action="/upload.do"
						listType="picture-card"
						customRequest={(fileInfo) => {
							console.log('fileInfo', fileInfo);
							postFile(fileInfo.file as File).then((res) => {
								console.log('res', res);
								if (res.data.success) {
									setFileList((list) => {
										const newList = list;
										const item = newList.pop();
										// @ts-ignore
										newList.push({
											// @ts-ignore
											...item,
											status: 'done',
											resourceId: res.data.data.resourceId,
										});
										console.log('newList', newList);
										return newList;
									});
								}
							});
						}}
						fileList={fileList}
						onChange={(info) => {
							console.log('info', info);
							// @ts-ignore
							setFileList(info.fileList);
						}}
					>
						<div>
							<PlusOutlined />
							<div style={{ marginTop: 8 }}>Upload</div>
						</div>
					</Upload> */}
				</Form.Item>
			</Form>
		</div>
	);
}
