import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Button, Modal, Divider, Space, message, Upload } from "antd";
import type { UploadProps } from "antd";
import { ExclamationCircleOutlined, UploadOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";
import LocalizedModal from "./modal";
import { getUserInfo } from "../../service/personal";
// 个人信息（设置密码）
// 蔡启航

export default function Personal() {
  // 得到学生信息
  /* const student = useSelector((state: RootState) => state.user.infos);
  console.log(student); */
  const [userInfo, setUserInfo] = useState<any>({});
  useEffect(() => {
    getUserInfo().then((res) => {
      console.log(res);
      if (res.data.success) {
        setUserInfo(res.data.data);
      } else {
        message.error(res.data.errorMsg);
      }
    });
  }, []);

  const [modal, contextHolder] = Modal.useModal();

  const props: UploadProps = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <>
      <h1 className={styles["h1style"]}>个人信息</h1>
      <Divider />
      <div className={styles.introduce}>
        <img src={userInfo.picUrl} className={styles.icons_items} alt="头像" />
        <Upload {...props}>
          <Button icon={<UploadOutlined />} className={styles.fixtx}>
            修改头像
          </Button>
        </Upload>
      </div>

      <div className={styles.shuchu}>学号：{userInfo.stuId}</div>
      <div className={styles.shuchu}>姓名；{userInfo.userName}</div>

      <Space>
        <LocalizedModal />
      </Space>
      {contextHolder}
    </>
  );
}
