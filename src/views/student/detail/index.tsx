import { ContainerTwoTone } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Divider,
  Empty,
  message,
  Row,
  Space,
  Tooltip,
  UploadFile,
} from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MyEditor from "./components/myEditor";
import MyUpload from "../../../components/upload";
import styles from "./index.module.scss";

import "@wangeditor/editor/dist/css/style.css";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import { DomEditor } from "@wangeditor/editor";
import { IDomEditor, IEditorConfig, IToolbarConfig } from "@wangeditor/editor";
import {
  postUploadImage,
  postUploadVideo,
  getDetails,
  getHomeworkInfo,
  postSubmit,
  getMyHomeWork,
  getSubmitHomework,
  putChangeHomeWork,
} from "../../../service/detail";

// 作业详情（查看作业，修改作业，提交作业，成果展示列表）
// 邱致彬
interface Homework {
  homeworkId: string;
  lessonId: string;
  lessonName: string;
  info: string;
  name: string;
  start: string;
  end: string;
  status: string;
  creator: any;
  term: any;
  resoursBOList: Resource[];
}
export interface ShowHomework {
  lessonName: string;
  info: string;
  name: string;
}
interface Resource {
  resourceId: string;
  belongId: string;
  userId: string;
  url: string;
  info: string;
}
interface HomeworkList {
  homeworkId: string;
  content: string;
  termId: string;
  resourceListIds: string[];
}
export default function Detail(props: any) {
  const location = useLocation();
  // const { lessonId: myLesson, homeworkId: myHomework } = location?.state || {};
  const { lessonId: myLesson } = location?.state || {}; // 解构赋值
  const [homeworkBOList, setHomeworkBOList] = useState<Homework | null>();
  const [myResoursBOList, setMyResoursBOList] = useState([]);
  // 使用useState创建一个本地状态fileList，用来存放文件列表
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  // 定义一个handleChange函数，用来更新fileList状态
  const handleChange = (info: { fileList: UploadFile[] }) => {
    setFileList(info.fileList);
  };
  // 定义一个handleRemove函数，用来从fileList中移除文件
  const handleRemove = (file: UploadFile) => {
    setFileList(fileList.filter((f) => f.uid !== file.uid));
  };

  const [editor, setEditor] = useState<IDomEditor | null>(null); // TS 语法
  const [html, setHtml] = useState("");
  const toolbarConfig: Partial<IToolbarConfig> = {
    /* 隐藏哪些菜单 */
    excludeKeys: ["insertImage", "group-video"],
  };
  const toolbar = editor ? DomEditor.getToolbar(editor) : null;
  const curToolbarConfig = toolbar?.getConfig();
  // //console.log(curToolbarConfig?.toolbarKeys ?? 'noEditor');
  const editorConfig: Partial<IEditorConfig> = {
    MENU_CONF: {
      uploadImage: {
        base64LimitSize: 1000 * 1024,
        fieldName: "myImage",
        maxFileSize: 2000 * 1024 * 1024,
        maxNumberOfFiles: 1,
        allowedFileTypes: ["image/*"],
        onBeforeUpload(file: File) {
          return file;
        },
        onProgress(progress: number) {
          //console.log('progress 进度', progress);
        },
        onSuccess(file: File, res: any) {
          //console.log(`${file.name} 上传成功`, res);
        },
        onFailed(file: File, res: any) {
          //console.log(`${file.name} 上传失败`, res);
        },
        onError(file: File, err: any, res: any) {
          //console.log(`${file.name} 上传出错`, err, res);
        },
        async customUpload(file: File, insertFn: any) {
          postUploadImage(file).then((ret) => {
            const { success, data, errorMsg } = ret?.data || null;
            if (success) {
              message.success(errorMsg);
              const url = data?.url;
              insertFn(url);
            }
          });
        },
      },
    },
  };
  editorConfig.placeholder = "请输入内容...";
  editorConfig.onCreated = (editor: IDomEditor) => {};
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  const [isSubmitted, setSubmit] = useState(false);
  const [myHomeworkId, setMyHomeworkId] = useState("");
  useEffect(() => {
    getMyHomeWork().then((res) => {
      console.log("我的作业", res.data.data);
      if (res.data.data) {
        // console.log("我执行了");
        for (var i = 0; i < res.data.data.length; i++) {
          if (res.data.data[i].lessonId === myLesson.id) {
            setSubmit(true);
            // console.log("需要的", res.data.data[i]);
            setMyHomeworkId(res.data.data[i].subHomework.submitId);
            break; // 找到一个对象的 lessonId 值相等后，可以立即结束循环
          }
        }
      }
    });

    getDetails(myLesson).then((ret) => {
      const { success, data, errorMsg } = ret?.data || {};
      if (success) {
        message.success(errorMsg);
        // console.log("已有作业", data);
        setHomeworkBOList(data);
        setMyResoursBOList(data?.resoursBOList);
      } else {
        message.error("获取详细作业失败");
      }
    });
    return () => {};
  }, []);
  useEffect(() => {
    if (myHomeworkId !== "") {
      getSubmitHomework(myHomeworkId).then((res) => {
        if (res.data.success) {
          const str = res.data.data.content;
          const extractedString = str.slice(
            1,
            res.data.data.content.length - 2
          );
          setHtml(extractedString);
        }
      });
    }
  }, [myHomeworkId]);
  // 使用es6的解构赋值，来简化你对homeworkBOList对象的访问
  const { lessonName, name, info, start, end } = homeworkBOList || {};
  const showHomework: ShowHomework = {
    lessonName: lessonName as string,
    name: name as string,
    info: info as string,
  };
  const userName = homeworkBOList?.creator?.userName;
  const termId = homeworkBOList?.term?.termId;

  const [resourceLists, setResourceLists] = useState<string[]>();

  // 全体作业存储
  const myHomework: HomeworkList = {
    homeworkId: homeworkBOList?.homeworkId || "",
    content: html,
    termId: termId as string,
    resourceListIds: resourceLists as string[],
  };
  let subHomework: HomeworkList;
  useEffect(() => {
    subHomework = {
      homeworkId: homeworkBOList?.homeworkId || "",
      content: html,
      termId: termId as string,
      resourceListIds: resourceLists as string[],
    };
    // //console.log('newResourceList-- :>> ', newResourceList);
    // //console.log('newResourceListIds-- :>> ', newResourceListIds);
    // //console.log('subHomework---- :>> ', subHomework);
  }, [html, resourceLists]);

  const SubmitEvent = () => {
    //console.log('subHomework---- :>> ', subHomework);
    postSubmit(subHomework).then((ret) => {
      const { success, data, errorMsg } = ret?.data || null;
      if (success) {
        //console.log(errorMsg);
        message.success(errorMsg);
      } else {
        //console.log(errorMsg);
      }
    });
  };
  const navigate = useNavigate();
  const handleGoodHomework = (
    termId: string,
    myHomeworkId: string,
    showHomework: ShowHomework
  ) => {
    // //console.log('showHomework :>> ', showHomework);
    navigate("/show", {
      state: {
        termId: termId,
        myHomeworkId: myHomeworkId,
        showHomework: showHomework,
      },
    });
  };

  return (
    <div className={styles.detailALL}>
      {isSubmitted ? (
        <>
          <Row justify={"space-between"} className={styles.detailHeader}>
            <div className={styles.detailTitle}>作业作答</div>
            <Space size={40}>
              <Button
                onClick={() => {
                  handleGoodHomework(
                    termId,
                    myHomework?.homeworkId,
                    showHomework
                  );
                }}
              >
                优秀作业查看
              </Button>
              <Button
                type="primary"
                onClick={() =>
                  putChangeHomeWork(myHomeworkId, html).then((res) => {
                    if (res.data.success) {
                      message.success(res.data.errorMsg);
                    }
                  })
                }
              >
                提交
              </Button>
            </Space>
          </Row>

          <Row gutter={24}>
            <Col span={24}>
              <Row className={styles.head}>
                {lessonName} | {name}
              </Row>
              {/* InfoRow 封装组件 */}
              <InfoRow label="发布人：" value={userName} />
              <InfoRow
                label="发布日期："
                value={new Date(homeworkBOList?.start || "").toLocaleString(
                  "zh-CN",
                  {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
              />
              <InfoRow
                label="截止日期："
                value={new Date(homeworkBOList?.end || "").toLocaleString(
                  "zh-CN",
                  {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
              />
              <Divider />
              <Row className={styles.info}>
                <p className={styles["info-p"]}>题目：{info}</p>
              </Row>
              {/* 富文本控件 */}
              <Row>
                <div
                  style={{
                    border: "1px solid #ccc",
                    zIndex: 100,
                    width: "100%",
                  }}
                >
                  <Toolbar
                    editor={editor}
                    defaultConfig={toolbarConfig}
                    mode="default"
                    style={{ borderBottom: "1px solid #ccc" }}
                  />
                  <Editor
                    defaultConfig={editorConfig}
                    value={html}
                    onCreated={setEditor}
                    onChange={(editor) => setHtml(editor.getHtml())}
                    mode="default"
                    style={{ height: "400px", overflowY: "hidden" }}
                  />
                </div>
              </Row>
            </Col>
          </Row>

          <Row gutter={24}>
            <MyUpload
              // getResourceLists={(resourceLists) => {
              //   setResourceLists(resourceLists);
              // }}
              getResourceLists={() => {}}
              deleteResoursIdList={[]}
              setDeleteResoursIdList={() => {}}
            />
          </Row>
        </>
      ) : (
        <>
          <Row justify={"space-between"} className={styles.detailHeader}>
            <div className={styles.detailTitle}>作业作答</div>
            <Space size={40}>
              <Button
                onClick={() => {
                  handleGoodHomework(
                    termId,
                    myHomework?.homeworkId,
                    showHomework
                  );
                }}
              >
                优秀作业查看
              </Button>
              <Button type="primary" onClick={SubmitEvent}>
                提交
              </Button>
            </Space>
          </Row>

          <Row gutter={24}>
            <Col span={24}>
              <Row className={styles.head}>
                {lessonName} | {name}
              </Row>
              {/* InfoRow 封装组件 */}
              <InfoRow label="发布人：" value={userName} />
              <InfoRow
                label="发布日期："
                value={new Date(homeworkBOList?.start || "").toLocaleString(
                  "zh-CN",
                  {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
              />
              <InfoRow
                label="截止日期："
                value={new Date(homeworkBOList?.end || "").toLocaleString(
                  "zh-CN",
                  {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
              />
              <Divider />
              <Row className={styles.info}>
                <p className={styles["info-p"]}>题目：{info}</p>
              </Row>
              {/* 富文本控件 */}
              <Row>
                <div
                  style={{
                    border: "1px solid #ccc",
                    zIndex: 100,
                    width: "100%",
                  }}
                >
                  <Toolbar
                    editor={editor}
                    defaultConfig={toolbarConfig}
                    mode="default"
                    style={{ borderBottom: "1px solid #ccc" }}
                  />
                  <Editor
                    defaultConfig={editorConfig}
                    value={html}
                    onCreated={setEditor}
                    onChange={(editor) => setHtml(editor.getHtml())}
                    mode="default"
                    style={{ height: "400px", overflowY: "hidden" }}
                  />
                </div>
              </Row>
            </Col>
          </Row>

          <Row gutter={24}>
            <MyUpload
              // getResourceLists={(resourceLists) => {
              //   setResourceLists(resourceLists);
              // }}
              getResourceLists={() => {}}
              deleteResoursIdList={[]}
              setDeleteResoursIdList={() => {}}
            />
          </Row>
        </>
      )}
    </div>
  );
}
// 自定义组件，来封装一些重复的逻辑和样式
export function InfoRow(props: { label: string; value: string | undefined }) {
  return (
    <Row className={styles.infoHead}>
      <span>{props.label}</span>
      <p>{props.value}</p>
    </Row>
  );
}
