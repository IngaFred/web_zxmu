import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Button, Divider } from "antd";
import styles from "./index.module.scss";
import ModalComponent from './modal';
import { getUserInfo } from "../../service/personal";
// 个人信息（设置密码）
// 蔡启航

export default function Personal() {
  // 得到学生信息
  const student = useSelector((state: RootState) => state.user.infos);
  console.log(student);
  
  const [modalVisible, setModalVisible] = useState(false);
  const handleOpenModal = () => {
    setModalVisible(true);
  };
  const handleOk = () => {
    console.log('Clicked OK');
  };
  const handleCancel = () => {
    console.log('Clicked Cancel');
  };
  
  return (
    <>
      <h1>个人信息</h1>
      <Divider />
      <div className={styles.introduce}>
        <img
          src="https://t7.baidu.com/it/u=4162611394,4275913936&fm=193&f=GIF"
          className={styles.icons_items}
          alt="头像"
        />
        <button className={styles.fixtx} /* onClick={()=> }  */>
        {"修改头像"}
      </button>
      </div>

      <div className={styles.shuchu}>学号：{111}</div>
      <div className={styles.shuchu}>姓名；{"我"}</div>

      <button className={styles.fixmima} onClick={()=> handleOpenModal} >
        {"修改密码"}
        Open Modal
      </button>
      <ModalComponent
        title="Modal Title"
        content="Modal Content"
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      />

      {/* <div className={styles.modal} >
        <div className={styles.modal2}>

        </div>

      </div> */}
    </>
  );
}
