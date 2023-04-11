import React, { useState } from "react";
import { Modal, Button, Form, Input, message } from "antd";
import styles from "./index.module.scss";
import { postUploadPsd } from "../../service/personal";
import { mapValues, values } from "lodash";

//用open取代了visible
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
// modal 对话框
const LocalizedModal = () => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setOpen(true);
  };
  const hideModal1 = () => {
    setOpen(false);
  };
  const hideModal2 = () => {
    const psd = form.getFieldValue("password");
    const psd1 = form.getFieldValue("confirm");
    if (psd === psd1 && psd) {
      postUploadPsd({
        password: psd,
      }).then((res) => {
        console.log(res);
        message.success(res.data.errorMsg);
      });
      setOpen(false);
    }
  };

  //密码输入框
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <>
      <Button type="primary" className={styles.fixpsd} onClick={showModal}>
        修改密码
      </Button>
      <Modal
        title="修改密码"
        open={open}
        onOk={hideModal2}
        onCancel={hideModal1}
        okText="确认"
        cancelText="取消"
      >
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          style={{
            maxWidth: 600,
          }}
          scrollToFirstError
        >
          <Form.Item
            name="password"
            label="新的密码"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="确认密码"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("你输入的两个密码不一致!"));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default LocalizedModal;
