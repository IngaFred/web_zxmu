import {
  Button,
  Card,
  Col,
  Divider,
  Empty,
  Row,
  Select,
  Space,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { getUnSubmit, getSubmit } from "../../../service/detailList";
import { useLocation, useNavigate } from "react-router-dom";
import TermsSelect from "../../../components/terms-select";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store";

// 查看作业列表（展示作业某个作业里列表所有学生提交的列表，展示分数，批改状态）
// 吴振宇

export default function DetailList() {
  const location = useLocation();
  const lessonInfo = location.state?.lessonInfo;
  console.log(lessonInfo);

  const [unSubimtStudent, setUnSubimtStudent] = useState<any[]>([]);
  const [SubimtStudent1, setSubimtStudent1] = useState<any[]>([]);
  const [SubimtStudent2, setSubimtStudent2] = useState<any[]>([]);
  const termId = useSelector((state: RootState) => state.user.termId);

  useEffect(() => {
    getUnSubmit({
      homeworkId: lessonInfo?.homeworkId,
      termId: termId,
    }).then((ret) => {
      if (ret.data.success) {
        message.success(ret.data.errorMsg);

        setUnSubimtStudent(ret.data.data);

        //console.log(termId);
      }
    });
    getSubmit({
      homeworkId: lessonInfo?.homeworkId,
      termId: termId,
    }).then((ret) => {
      if (ret.data.success) {
        message.success(ret.data.errorMsg);
        //console.log(ret.data.data);
        setSubimtStudent1(ret.data.data[0]);
        setSubimtStudent2(ret.data.data[1]);
      }
    });
  }, [termId, lessonInfo]);
  return (
    <div className={styles.wrap}>
      <Row className={styles["top"]}>
        <div className={styles.allTitle}>批改作业</div>
        <div className={styles["topCenter"]}>
          <Space size={20}>
            <div className={styles.numTitle}>
              数量：
              <span className={styles.spanNum}>
                {SubimtStudent2.length}/
                {unSubimtStudent.length +
                  SubimtStudent1.length +
                  SubimtStudent2.length}
              </span>
            </div>
          </Space>
          <TermsSelect />
        </div>
      </Row>
      <Divider />
      <div style={{ width: "100%" }}>
        <div className={styles.title}>未批改</div>
        <Row gutter={24}>
          {SubimtStudent1.length > 0 ? (
            SubimtStudent1.map((item, index) => (
              <>
                <HomeworkCard key={index} item={item} type="未批改" />
              </>
            ))
          ) : (
            <Col span={24}>
              <Empty description="暂无未批改作业" />
            </Col>
          )}
        </Row>
      </div>
      <Divider />
      <div style={{ width: "100%" }}>
        <div className={styles.title}>未提交</div>

        <Row gutter={24}>
          {unSubimtStudent.length > 0 ? (
            unSubimtStudent.map((item, index) => {
              return <StuCard key={index} item={item} />;
            })
          ) : (
            <Col span={24}>
              <Empty description="暂无未提交作业" />
            </Col>
          )}
        </Row>
      </div>
      <Divider />
      <div style={{ width: "100%" }}>
        <div className={styles.title}>已批改</div>
        <Row gutter={24}>
          {SubimtStudent2.length > 0 ? (
            SubimtStudent2.map((item, index) => (
              <HomeworkCard key={index} item={item} type="已批改" />
            ))
          ) : (
            <Col span={24}>
              <Empty description="暂无已批改作业" />
            </Col>
          )}
        </Row>
      </div>
    </div>
  );
}

const HomeworkCard = (props: any) => {
  const { item, type } = props;
  console.log(item);

  const navigate = useNavigate();
  const goScoringTeacher = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: React.MouseEvent<HTMLButtonElement>,
    hid: React.MouseEvent<HTMLButtonElement>,
  ) => {
    navigate("/scoringTeacher", { state: { lessonId: e, submitId: id, homeworkId: hid } });
  };
  return (
    <Col span={4}>
      <div className={styles.homeworkItem}>
        {item?.user?.userName && (
          <div className={styles.stuName}>{item?.user?.userName}</div>
        )}
        {item?.score && item.score != -1 && (
          <div className={styles.score}>分数：{item?.score}分</div>
        )}
        {type === "已批改" && (
          <Button
            style={{ alignSelf: "flex-end" }}
            onClick={() => goScoringTeacher(item.lessonId, item.submitId, item.homeworkId)}
          >
            修改
          </Button>
        )}
        {type === "未批改" && (
          <Button
            style={{ alignSelf: "flex-end" }}
            onClick={() => goScoringTeacher(item.lessonId, item.submitId, item.homeworkId)}
          >
            批改
          </Button>
        )}
      </div>
    </Col>
  );
};

const StuCard = (props: any) => {
  const { item } = props;

  return (
    <Col span={4}>
      <div className={styles.homeworkItem}>
        {item?.userName && (
          <div className={styles.stuName}>{item?.userName}</div>
        )}
      </div>
    </Col>
  );
};
