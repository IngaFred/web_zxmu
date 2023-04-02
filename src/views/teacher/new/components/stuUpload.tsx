import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd";
import { Button, message, Upload } from "antd";
import { importStudent } from "../../../../service/course";

// 定义一个MyUploadProps接口，用来描述props的类型
interface MyUploadProps {
  // fileList是一个UploadFile类型的数组
  fileList: UploadFile[];
  // onChange是一个函数类型，接收一个对象参数，返回值为void
  onChange: (info: { fileList: UploadFile[] }) => void;
  // onRemove是一个函数类型，接收一个UploadFile类型的参数，返回值为void
  onRemove: (file: UploadFile) => void;
  // disabled是一个布尔类型
  disabled: boolean;
}
const StuUpload = (props: MyUploadProps) => {
  // 使用useState创建一个本地状态uploading，用来表示是否正在上传文件
  const [uploading, setUploading] = useState(false);

  // 定义一个uploadFile函数，用来处理文件上传的逻辑
  const uploadFile = (file: File) => {
    // 设置uploading状态为true，表示正在上传文件
    setUploading(true);
    // 使用service中封装函数上传文件
    importStudent(file).then((ret) => {
      // 处理响应数据
      const { success, errorMsg, data } = ret?.data || {};
      if (success) {
        // 输出返回数据
        console.log(data);
        // 设置uploading状态为false，表示上传文件完成
        setUploading(false);
        // 通知上传成功
        message.success(errorMsg);
      } else {
        // 设置uploading状态为false，表示上传文件失败
        setUploading(false);
        // 通知上传失败
        message.error("上传失败");
      }
    });
  };

  // 定义一个handleRemove函数，用来处理文件删除的逻辑
  const handleRemove = (file: UploadFile) => {
    // 调用props中传入的onRemove函数，并传入file参数
    props.onRemove(file);
  };

  // 定义一个customRequest函数，用来覆盖antd的Upload组件默认的上传行为
  const customRequest = (options: any) => {
    // 获取options中的file对象
    const { file } = options;
    // 调用uploadFile函数，并传入file参数
    uploadFile(file);
  };

  return (
    <Upload
      // 使用props中传入的fileList作为文件列表
      fileList={props.fileList}
      // 使用props中传入的onChange函数作为文件列表变化的回调
      onChange={props.onChange}
      // 使用handleRemove函数作为文件删除的回调
      onRemove={handleRemove}
      // 使用customRequest函数作为自定义的上传行为
      customRequest={customRequest}
      // 使用props中传入的disabled作为是否禁用上传的标志
      disabled={props.disabled}
    >
      <Button icon={<UploadOutlined />}>上传</Button>
    </Upload>
  );
};
export default StuUpload;
