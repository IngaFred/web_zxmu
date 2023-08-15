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
  updateContent,
  updateResource
} from "../../../service/detail";
import Item from "antd/es/list/Item";

// 作业详情（查看作业，修改作业，提交作业，成果展示列表）
// 邱致彬
interface HomeworkInfo {
  homeworkId: string;
  lessonId: string;
  lessonName: string;
  name: string;
  info: string;
  start: string;
  end: string;
  creator: any;
  term: any;
  resoursBOList: Resource[];
  subHomework: any
}
export interface ShowHomework {
  lessonName: string;
  info: string;
  name: string;
}
interface Resource {
  name: string
  info: string;
  resourceId: string;
  url: string;
  userId: string;
  belongId: string;
}
interface HomeworkList {
  homeworkId: string;
  content: string;
  termId: string;
  resourceListIds: string[];
}
export default function Detail(props: any) {
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location.state);
  // 解构赋值

  const initHomeworkInfo = {
    homeworkId: "",
    lessonId: "",
    lessonName: "",
    name: "",
    info: "",
    start: "",
    end: "",
    creator: "",
    term: "",
    resoursBOList: [],
    subHomework: "",
  }
  //
  const [homeworkInfo, setHomeworkInfo] = useState<HomeworkInfo>(initHomeworkInfo);
  //判断作业是否提交的标识
  const [isSubmitted, setSubmit] = useState(false);
  //教师发布作业详情的资源数组
  const [infoResoursBOList, setInfoResoursBOList] = useState<Resource[]>([]);
  //学生已提交的作业内容资源附件
  const [subResoursBOList, setSubResoursBOList] = useState<any[]>([]);
  //新增资源id的数组
  const [resourceIdList, setResourceIdList] = useState<string[]>([]);
  //删除资源id的数组
  const [deleteResourceIdList, setDeleteResourceIdList] = useState<string[]>([]);

  //富文本编辑器有关配置
  const [editor, setEditor] = useState<IDomEditor | null>(null); // TS 语法
  const [html, setHtml] = useState("");
  const toolbarConfig: Partial<IToolbarConfig> = {
    /* 隐藏哪些菜单 */
    excludeKeys: ["insertImage", "group-video"],
  };
  const toolbar = editor ? DomEditor.getToolbar(editor) : null;
  const curToolbarConfig = toolbar?.getConfig();
  // //console.log(curToolbarConfig?.toolbarKeys ?? 'noEditor');
  //编辑器配置
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
    placeholder: "请输入内容..."
  };
  editorConfig.onCreated = (editor: IDomEditor) => { };
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  const { homeworkId, lessonId, lessonName, name, info, start, end, resoursBOList, creator, term, subHomework
  } = homeworkInfo;
  //页面首次渲染
  useEffect(() => {
    getDetails(location.state.lessonId).then((res) => {
      console.log(res);
      if (res.data.code == "200") {
        message.success("作业获取成功")
        setHomeworkInfo(res.data.data)
      }
    })
  }, []);
  useEffect(() => {
    setInfoResoursBOList(resoursBOList)
    if (subHomework) {
      setSubResoursBOList(subHomework.resoursBOList)
      setSubmit(true)
      setTimeout(() => {
        setHtml(subHomework.content)
      }, 100)
    }
  }, [homeworkInfo]);

  const showHomework: ShowHomework = {
    lessonName: lessonName as string,
    name: name as string,
    info: info as string,
  };

  //学生首次提交作业
  const SubmitHomework = () => {
    let subHomework: HomeworkList = {
      homeworkId: homeworkId || "",
      content: html,
      termId: term.termId as string,
      resourceListIds: resourceIdList as string[],
    };
    console.log(subHomework);
    postSubmit(subHomework).then((res) => {
      // console.log(res);
      if (res.data.success) {
        message.success(res.data.errorMsg);
      }
    });
  };
  //学生修改已提交的作业
  const updateHomework = () => {
    console.log(
      subHomework.submitId,
      html,
      resourceIdList,
      deleteResourceIdList
    );

    updateContent(
      subHomework.submitId,
      html
    ).then((res) => {
      console.log(res);
      if (res.data.success) {
        message.success(res.data.errorMsg);
      }
    })
    updateResource(
      subHomework.submitId,
      resourceIdList,
      deleteResourceIdList
    ).then((res) => {
      console.log(res);
      if (res.data.success) {
        message.success(res.data.errorMsg);
      }
    })
  }
  //优秀作业查看
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
  //资源文件下载
  const handleDownload = (url: string) => {
    fetch(url, { mode: "cors" })
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = url.split("/").pop()!;
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });
  };

  return (
    <div className={styles.detailALL}>
      {isSubmitted ? (
        //修改提交作业
        <>
          <Row justify={"space-between"} className={styles.detailHeader}>
            <div className={styles.detailTitle}>作业作答</div>
            <Space size={40}>
              <Button
                onClick={() => {
                  handleGoodHomework(
                    term.termId,
                    homeworkId,
                    showHomework
                  );
                }}
              >
                优秀作业查看
              </Button>
              <Button
                type="primary"
                onClick={updateHomework}
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
              <InfoRow label="发布人：" value={creator.userName} />
              <InfoRow
                label="发布日期："
                value={new Date(start || "").toLocaleString(
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
                value={new Date(end || "").toLocaleString(
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
              <div className={styles.resoursListTitle}>作业资源附件</div>
              <div
                style={{
                  display: infoResoursBOList.length === 0 ? "block" : "none",
                  margin: " 7px 0 25px 40px",
                  fontSize: "14px",
                }}
              >
                暂无资源
              </div>
              <div className={styles.resoursList}>
                {infoResoursBOList.map((item, index) => (
                  <div style={{ display: "flex", margin: "7px 0 7px 40px" }}>
                    <a
                      href={item.url}
                      download={item.name}
                      className={styles.download}
                      key={index}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <ContainerTwoTone className={styles.downloadIcon} />
                      {item.name}
                    </a>
                    <Button
                      onClick={() => handleDownload(item.url)}
                      size="small"
                      style={{ marginLeft: "20px" }}
                    >
                      下载
                    </Button>

                  </div>

                ))}
              </div>

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
              resoursBOList={subResoursBOList}
              getNewResourceIdLists={setResourceIdList}
              getDeleteResoursIdList={setDeleteResourceIdList}
            />
          </Row>
        </>
      ) : (
        //首次提交作业
        <>
          <Row justify={"space-between"} className={styles.detailHeader}>
            <div className={styles.detailTitle}>作业作答</div>
            <Space size={40}>
              <Button
                onClick={() => {
                  handleGoodHomework(
                    term.termId,
                    homeworkId,
                    showHomework
                  );
                }}
              >
                优秀作业查看
              </Button>
              <Button type="primary" onClick={SubmitHomework}>
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
              <InfoRow label="发布人：" value={creator?.userName} />
              <InfoRow
                label="发布日期："
                value={new Date(start || "").toLocaleString(
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
                value={new Date(end || "").toLocaleString(
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
              <div className={styles.resoursListTitle}>作业资源附件</div>
              <div
                style={{
                  display: infoResoursBOList.length === 0 ? "block" : "none",
                  margin: " 7px 0 25px 40px",
                  fontSize: "14px",
                }}
              >
                暂无资源
              </div>
              <div className={styles.resoursList}>
                {infoResoursBOList.map((item, index) => (
                  <div style={{ display: "flex", margin: "7px 0 7px 40px" }}>
                    <a
                      href={item.url}
                      download={item.name}
                      className={styles.download}
                      key={index}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <ContainerTwoTone className={styles.downloadIcon} />
                      {item.name}
                    </a>
                    <Button
                      onClick={() => handleDownload(item.url)}
                      size="small"
                      style={{ marginLeft: "20px" }}
                    >
                      下载
                    </Button>

                  </div>

                ))}
              </div>

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
              resoursBOList={[]}
              getNewResourceIdLists={setResourceIdList}
              getDeleteResoursIdList={setDeleteResourceIdList}
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
