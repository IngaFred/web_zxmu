//@ts-nocheck
import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { Divider, Carousel, Card, Row, message, Col, Button } from "antd";
import { getCourses } from "../../service/home";
import { useNavigate } from "react-router-dom";
import Meta from "antd/es/card/Meta";

// 首页（公告，主题分类，课程列表，我的作业，个人信息）
// 洪浩然，章徐松

const contentStyle = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

export default function Home() {
  const [Courses, setCourse] = useState([]);

  useEffect(() => {
    getCourses().then((ret) => {
      if (ret.data.success) {
        message.success(ret.data.errorMsg);
        setCourse(ret.data.data);
      } else {
        message.error("获取课程失败");
      }
    });
  }, []);

  const navigate = useNavigate();
  const handleMyCourse = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e);
    navigate("/course");
  };
  const handleMyDetail = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e);
    navigate("/list");
  };

  return (
    <div className={styles.homeAll}>
      {/* 公告栏 */}
      <Carousel autoplay>
        <div>
          <h3 style={contentStyle}>公告1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>公告2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>公告3</h3>
        </div>
      </Carousel>

      {/* 课程主题 */}
      <h1>某主题下所有课程</h1>
      <Divider />

      <Row gutter={24}>
        {Courses.map((item, index) => (
          <Col span={8}>
            <Card
              key={index}
              size="small"
              className={styles.card}
              cover={
                <img
                  src={item.picUrl}
                  alt=""
                  style={{ width: "300px", height: "180px", padding: "10px" }}
                />
              }
              actions={[
                <Row justify={"space-between"}>
                  <Button
                    className={styles.rowBtn}
                    onClick={(e) => handleMyCourse(item.lessonId, e)}
                  >
                    课程详情
                  </Button>
                  <Button
                    className={styles.rowBtn}
                    onClick={(e) => handleMyDetail(item.lessonId, e)}
                  >
                    是不是我的已选课程
                  </Button>
                </Row>,
              ]}
            >
              <Meta
                title={item.lessonName}
                description={item.info}
                style={{ height: "80px" }}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}