import { ContainerTwoTone } from "@ant-design/icons";
import { Select, Input } from "antd";
import {
  Button,
  Card,
  Col,
  Empty,
  message,
  Row,
  Space,
  Tooltip,
  UploadFile,
  Descriptions,
} from "antd";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getDetails, getHomeworkInfo, getSubmitHomework, getAllSubmitHomework } from "../../../service/detail";
import styles from "./index.module.scss";
import { putCourse } from "../../../service/scoring";
import { InfoRow } from "../../student/detail";
// 作业批改（查看作业，提交作业，成果展示列表，批改作业）
// 娄竞楷
interface HomeworkInfo {
  homeworkId: string;
  lessonId: string;
  lessonName: string;
  info: string;
  name: string;
  start: string;
  end: string;
  status: string;
  resoursBOList: any[];
  //额外的属性检查
  [propName: string]: any
}
interface submitHomework {
  content: string;
  homeworkId: string;
  resoursBOList: any[];
  score: string;
  user: User
  submitId: string;
  status: string;
  //额外的属性检查
  [propName: string]: any
}
interface User {
  userName: string
  picUrl: string
  sex: string
  stuId: string
  userId: string
}
interface Resource {
  resourceId: string;
  belongId: string;
  userId: string;
  url: string;
  info: string;
}
type scoreParams = {
  submitHomeworkId: string;
  score: string;
};

export default function Detail() {
  const location = useLocation();
  // 解构赋值
  const { lessonId, submitId, homeworkId } = location.state;
  //作业信息
  const [homeworkInfo, setHomeworkInfo] = useState<HomeworkInfo>();
  //作业信息资源列表
  const [infoResoursBOList, setInfoResoursBOList] = useState<any[]>([]);
  //学生提交的作业内容
  const [submitHomework, setSubmitHomework] = useState<submitHomework>();
  //学生提交的作业内容资源列表
  const [submitResoursBOList, setSubmitResoursBOList] = useState<any[]>([]);

  //获取第一次渲染页面所需的作业信息和学生提交的作业内容
  useEffect(() => {
    getHomeworkInfo(homeworkId).then((res) => {
      // console.log(res);
      setHomeworkInfo(res.data.data)
      setInfoResoursBOList(res.data.data.resoursBOList)
    })
    getSubmitHomework(submitId).then((res) => {
      // console.log(res);
      setSubmitHomework(res.data.data)
      setSubmitResoursBOList(res.data.data.resoursBOList)
    })
  }, [])

  // 使用es6的解构赋值，来简化你对homeworkInfo对象的访问
  const { lessonName, name, start, end, info, resoursBOList } = homeworkInfo || {};
  const { user, content } = submitHomework || {};
  const { userName } = user || {};

  const handleSend = (scores: string) => {
    console.log(scores);
    if (!scores) {
      message.warning("所打分数不能为空");
      return null;
    }
    const score: scoreParams = {
      submitHomeworkId: submitId,
      score: scores,
    };
    console.log(score);
    // setScoreParam(score);
    handleInputScore(score);
  };

  const handleInputScore = (scoreParam: scoreParams) => {
    putCourse(scoreParam).then((ret) => {
      if (ret.status === 200) {
        // console.log(ret);
        if (ret.data.success) {
          // console.log(scoreParam.score);
          message.success(ret.data.errorMsg);
        } else {
          // console.log(scoreParam.score);
          message.warning(ret.data.errorMsg);
        }
      } else {
        message.error("请求失败！");
      }
    });
  };

  const [scores, setScores] = useState("");
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFen(e.target.value);
    setScores(e.target.value);
  };
  const [fen, setFen] = useState("");

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

  const HTMLDecode = (text: any) => {
    let temp: any = document.createElement("div");
    temp.innerHTML = text;
    let output = temp.innerText || temp.textContent;
    console.log(output);
    temp = null;
    return output;
  };

  return (
    <div className={styles["show-all"]}>

      <Row justify={"start"} className={styles.detailHeader}>
        <div className={styles.detailTitle}>作业打分</div>
      </Row>

      <Row gutter={24}>
        <Descriptions title={name} className={styles.head} column={1}>
          <Descriptions.Item label="作业内容" >{info}</Descriptions.Item>
          <Descriptions.Item label="附件资源" contentStyle={{ flexFlow: "column" }} >
            <div style={{ display: infoResoursBOList.length === 0 ? "inline" : "none", }}>
              暂无资源
            </div>
            <div>
              {infoResoursBOList.map((item, index) => (
                <div style={{ display: "flex", padding: "5px" }}>
                  <a
                    href={item.url}
                    download={item.name}
                    className={styles.download}
                    key={index}
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
          </Descriptions.Item>
        </Descriptions>
        <Card title={userName + "提交的作业"} bordered={false} style={{ width: 1000 }}>
          <Card>
            <p dangerouslySetInnerHTML={{ __html: content! }}></p>
            {/* <Input className={styles.text} style={{ width: 900 }} value={content} /> */}

          </Card>
          <div
            style={{
              display: submitResoursBOList.length === 0 ? "block" : "none",
              margin: "10px 0 0 8px",
              fontSize: "16px",
            }}
          >
            无作业附件资源
          </div>
          <div>
            {submitResoursBOList.map((item, index) => (
              <div style={{ display: "flex", padding: "5px" }}>
                <a
                  href={item.url}
                  download={item.name}
                  className={styles.download}
                  key={index}
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
          <Space.Compact style={{ width: "13vh", marginTop: "10px" }}>
            <Input value={fen} onChange={(e) => handleInput(e)} />
            <Button type="primary" onClick={() => handleSend(scores)}>
              打分
            </Button>
          </Space.Compact>
        </Card>

        {/* <Row>
          <div className={styles.outline}>
            <div>
              <div className={styles.resoursListTitle}>
                <h1>附件资源</h1>
              </div>
              <div className={styles.outlineCardContent}>
                <div
                  style={{
                    display: infoResoursBOList.length === 0 ? "inline" : "none",
                  }}
                >
                  暂无资源
                </div>
                <div className={styles.resoursList}>
                  {infoResoursBOList.map((item, index) => (
                      <div style={{ display: "flex", padding: "5px" }}>
                        <a
                          href={item.url}
                          download={item.name}
                          className={styles.download}
                          key={index}
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
              </div>
            </div>
          </div>
        </Row> */}
        {/* InfoRow 封装组件 */}
        {/* <InfoRow
          label="发布日期："
          value={new Date(homeworkInfo?.start || "").toLocaleString(
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
          value={new Date(homeworkInfo?.end || "").toLocaleString("zh-CN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })}
        /> */}
      </Row>
      <br></br>
    </div>
  );
}
