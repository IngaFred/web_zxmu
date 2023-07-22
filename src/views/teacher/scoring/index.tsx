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
} from "antd";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getDetails } from "../../../service/detail";
import styles from "./index.module.scss";
import { putCourse } from "../../../service/scoring";
import { InfoRow } from "../../student/detail";
// 作业批改（查看作业，提交作业，成果展示列表，批改作业）
// 娄竞楷
interface Homework {
  homeworkId: string;
  lessonId: string;
  lessonName: string;
  creatorName: string;
  info: string;
  name: string;
  start: string;
  end: string;
  status: string;
  resoursBOList: Resource[];
}
interface Resource {
  resourceId: string;
  belongId: string;
  userId: string;
  url: string;
  info: string;
}

export default function Detail() {
  const location = useLocation();
  const { lessonId: lessonId, submitId: submitId } = location?.state || {}; // 解构赋值

  const [homeworkBOList, setHomeworkBOList] = useState<Homework | null>();
  const [myResoursBOList, setMyResoursBOList] = useState([]);

  // const location = useLocation();
  // const lessonId: LessonId = location.state?.lessonId;
  type scoreParams = {
    submitHomeworkId: string;
    score: string;
  };

  const [scoreParam, setScoreParam] = useState<scoreParams>();
  const handleSend = (scores: string) => {
    //console.log('location?.state', location?.state);
    if (!scores) {
      message.warning("所打数不能为空");
      return null;
    }
    const score: scoreParams = {
      submitHomeworkId: submitId,
      score: scores,
    };
    // //console.log(score);

    setScoreParam(score);
    handleInputScore(score);
  };

  const handleInputScore = (scoreParam: scoreParams) => {
    putCourse(scoreParam).then((ret) => {
      if (ret.status === 200) {
        //console.log(ret);

        if (ret.data.success) {
          //console.log(scoreParam.score);

          message.info(ret.data.errorMsg);
        } else {
          //console.log(scoreParam.score);

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

  // 使用es6的解构赋值，来简化你对homeworkBOList对象的访问
  const { lessonName, name, creatorName, start, end, info } =
    homeworkBOList || {};
  const handleDownload = (url: string) => {
    fetch(url, { mode: "no-cors" })
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
    <div className={styles["show-all"]}>
      <Row justify={"start"} className={styles.detailHeader}>
        <div className={styles.detailTitle}>作业打分</div>
      </Row>

      <Row gutter={24}>
        <Col span={20}>
          <Row className={styles.head}>
            <h1>{name}</h1>
          </Row>
          <br />
          {/* InfoRow 封装组件 */}
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
            value={new Date(homeworkBOList?.end || "").toLocaleString("zh-CN", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
          />
          <Row className={styles.info}>
            <p className={styles["info-p"]}>{info}</p>
          </Row>
          <br />
          <div className={styles.detailALL}>
            <Space.Compact style={{ width: "10%", marginLeft: "20px" }}>
              <Input value={fen} onChange={(e) => handleInput(e)} />
              <Button type="primary" onClick={() => handleSend(scores)}>
                打分
              </Button>
            </Space.Compact>
          </div>
        </Col>
      </Row>
      <br></br>
    </div>
  );
}
