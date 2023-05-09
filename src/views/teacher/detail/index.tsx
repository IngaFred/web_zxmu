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
import { setHomework } from '../../../service/teacherdetail';
import 'dayjs/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import MyUpload from './components';

export default function Detail() {
	const [form] = Form.useForm();
	const { RangePicker } = DatePicker;
	const { TextArea } = Input;

	const [resourceList, setResourceList] = useState([])
	// const [fileList, setFileList] = useState([]);
	// console.log('fileList', fileList);
	// useEffect(() => {
	// 	setFileList(fileList);
	// }, [fileList]);

	return (
		<div className={styles.detailALL}>
			<div className={styles.detailHeader}>
				<div className={styles.title}>新建作业</div>
				<div>
					{/* <Button className={styles.btn} onClick={saveBtn}>保存</Button> */}
					<Button
						className={styles.btn}
						type="primary"
						onClick={() => {
							const values = form?.getFieldsValue();
							// const resourceList = fileList.map((item) => {
							// 	// @ts-ignore
							// 	return item?.resourceId;
							// });	
							const newHomework = {
								lessonId: values.LessonId,
								name: values.Name,
								info: values.Info,
								start: new Date(values.RangePicker[0]).getTime(),
								end: new Date(values.RangePicker[1]).getTime(),
								resourceList: resourceList,
							};
							console.log('newObj--->', newHomework);
							setHomework(newHomework);
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

					<Form.Item name="RangePicker" label="时间设置">
						<RangePicker showTime locale={locale} />
					</Form.Item>

					<Form.Item name="Info" label="作业内容">
						<TextArea className={styles.text} style={{ width: '1000px' }} />
					</Form.Item>
				</div>

				<Form.Item label="上传资料" valuePropName="fileList">
					<div>
						<MyUpload />
					</div>
				</Form.Item>
			</Form>
		</div>
	);
}
