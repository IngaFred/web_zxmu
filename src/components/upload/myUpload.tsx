import React, { useEffect, useState } from "react";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd";
import { Button, message, Upload } from "antd";
import { uploadResource } from "../../service/myUpload";
import styles from "./index.module.scss";
// 定义一个MyUploadProps接口，用来描述props的类型
interface MyUploadProps {
	resourceList: any[];
	setNewResourceList: (data: any[]) => void;
}
const MyUpload = (props: MyUploadProps) => {
	const { setNewResourceList, resourceList } = props;
	const { Dragger } = Upload;
	const [fileList, setFileList] = useState<UploadFile[]>([]);

	/* 
		@handleBeforeUpload 上传文件之前的钩子
		判断是否上传重名文件
		返回false只会阻止customRequest函数的调用，但任然会调用handleChange函数
	*/
	const handleBeforeUpload = (file: UploadFile, fList: UploadFile[]) => {
		// console.log("执行handleBeforeUpload");
		// console.log(fileList);
		if (fileList.find((item) => file.name === item.name)) {
			message.error('文件名不能重复');
			return false;
		}
	}

	/* 
		@handleChange 上传文件改变时的回调，上传中、完成、失败都会调用这个函数。
		会先于customRequest函数的调用
	*/
	const handleChange = (info: { file: UploadFile; fileList: UploadFile[] }) => {
		// console.log("执行handleChange");
		// console.log('info', info);
		if (fileList.find((item) => info.file.name === item.name)) {
			return;
		}
		// 组件内部格式
		info.fileList.forEach((file) => {
			file.status = 'success';
		});
		setFileList(info.fileList);
	};
	
	const handleRemove = (file: UploadFile) => {
		console.log('delete info', file);
		// 组件内部格式
		setFileList(fileList.filter((f) => f.uid !== file.uid));

		// 后端存储格式
		const newFileList = resourceList.filter((f) => f.name !== file.name);
		setNewResourceList(newFileList);
	};

	// 定义一个uploadFile函数，用来处理文件上传的逻辑
	const uploadFile = (file: File) => {
		// console.log("执行uploadFile");
		// console.log(file);
		// 使用service中封装函数上传文件
		uploadResource(file).then((ret) => {
			// 处理响应数据
			const { success, errorMsg, data } = ret?.data || {};
			if (success) {
				// 输出返回数据
				setNewResourceList([...resourceList, data]);
				// 通知上传成功
				message.success(errorMsg);
			} else {
				// 通知上传失败
				message.error('上传失败');
			}
		});
	};

	// 定义一个customRequest函数，用来覆盖antd的Upload组件默认的上传行为
	const customRequest = (options: any) => {
		// 获取options中的file对象
		const { file } = options;
		// 调用uploadFile函数，并传入file参数
		uploadFile(file);
	};

	return (
		<Dragger
			multiple={true}
			// 使用props中传入的fileList作为文件列表
			fileList={fileList}
			//beforeUpload
			beforeUpload={handleBeforeUpload}
			// 使用props中传入的onChange函数作为文件列表变化的回调
			onChange={handleChange}
			// 使用handleRemove函数作为文件删除的回调
			onRemove={handleRemove}
			// 使用customRequest函数作为自定义的上传行为
			customRequest={customRequest}
		// className={styles['ant-upload-up']}
		>
			<>
				<p className="ant-upload-drag-icon">
					<InboxOutlined />
				</p>
				{fileList.length === 0 && (
					<>
						<p>
							<b>暂无作业上传</b>
						</p>
						<br />
					</>
				)}
				<p className="ant-upload-hint">
					把文件拖入指定区域，完成上传，同样支持点击上传，可以一次上传多个文件。
				</p>
			</>
		</Dragger>
	);
};
export default MyUpload;
