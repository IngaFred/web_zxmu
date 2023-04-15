import React, { useState } from 'react';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd';
import { Button, message, Upload } from 'antd';
import { uploadResource } from '../../../../service/course';

// 定义一个MyUploadProps接口，用来描述props的类型
interface MyUploadProps {
  resourceList: any[];
  setNewResourceList: (data: any[]) => void;
}
const MyUpload = (props: MyUploadProps) => {
  const { setNewResourceList, resourceList } = props;
  const { Dragger } = Upload;
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleChange = (info: { file: UploadFile; fileList: UploadFile[] }) => {
    console.log('info', info);
    if (fileList.find((item) => info.file.name === item.name)) {
      message.error('文件名不能重复');
      return;
    }
    // 组件内部格式
    setFileList(info.fileList);
    info.fileList.forEach((file) => {
      file.status = 'success';
    });
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
    if (fileList.find((item) => file.name === item.name)) {
      message.error('文件名不能重复');
      return;
    }
    // 使用service中封装函数上传文件
    uploadResource(file).then((ret) => {
      // 处理响应数据
      const { success, errorMsg, data } = ret?.data || {};
      if (success) {
        // 输出返回数据
        props.setNewResourceList([...props.resourceList, data]);
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
      // 使用props中传入的onChange函数作为文件列表变化的回调
      onChange={handleChange}
      // 使用handleRemove函数作为文件删除的回调
      onRemove={handleRemove}
      // 使用customRequest函数作为自定义的上传行为
      customRequest={customRequest}
    >
      <>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        {fileList.length === 0 && (
          <p className="ant-upload-text">暂无课程资源</p>
        )}
        <p className="ant-upload-hint">
          把文件拖入指定区域，完成上传，同样支持点击上传，可以一次上传多个文件。
        </p>
      </>
    </Dragger>
  );
};
export default MyUpload;
