import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import {
  Carousel,
  Card,
  Row,
  message,
  Col,
  Button,
  Tag,
  Divider,
  Empty,
} from "antd";
import { useNavigate } from "react-router-dom";
import { getModel, getModelLessons, getMyLessons } from "../../service/home";

// 首页（公告，主题分类，课程列表，我的作业，个人信息）

const contentStyle: React.CSSProperties = {
  height: "200px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

/**
 * 模块组件
 * @returns
 */
const ModelCard = (props: any) => {
  const { data, modelLessons } = props;
  const navigate = useNavigate();
  const handleMyCourse = (e: string, termId?: string) => {
    navigate("/course", { state: { lessonId: { e }, termId: termId } });
  };
  const handleMyDetail = (id: React.MouseEvent<HTMLButtonElement>) => {
    navigate("/detail", { state: { lessonId: { id } } });
  };
  if (!modelLessons) {
    return null;
  }
  return (
    <Col span={24}>
      <div className={styles.model_card}>
        <div className={styles.model_title}>{data.name}</div>
        <Row gutter={24}>
          {modelLessons.length > 0 ? (
            modelLessons.map((item: any, index: number, dataSource: any) => (
              <Col key={index} span={8}>
                <Card
                  key={index}
                  size="small"
                  className={styles.card}
                  actions={[
                    <Row justify={"space-between"}>
                      <Button
                        className={styles.rowBtn}
                        onClick={() =>
                          //@ts-ignore
                          handleMyCourse(item.lessonId, item?.term?.termId)
                        }
                      >
                        课程详情
                      </Button>
                      {item.choosed ? (
                        <Button
                          className={styles.rowBtn}
                          onClick={() => handleMyDetail(item.lessonId)}
                        >
                          我的作业
                        </Button>
                      ) : (
                        <Button
                          className={styles.rowBtn}
                          onClick={() => {
                            let flag = true; // 用于判断是否有课程被选中
                            dataSource.map((item: any) => {
                              if (item.choosed === true) {
                                flag = false;
                              }
                              return null;
                            });

                            if (!flag) {
                              message.warning("一个主题只能选择一门课");
                              return;
                            }
                            // @洪浩然 学生选课接口
                            // 选课接口
                            message.success("选课成功");
                          }}
                        >
                          选择课程
                        </Button>
                      )}
                    </Row>,
                  ]}
                >
                  <img
                    src={item.picUrl}
                    alt="课程图片"
                    className={styles.lesson_img}
                  />
                  <div className={styles.lesson_top}>
                    <div className={styles.lesson_name}>{item.lessonName}</div>
                    <div>
                      {item.choosed ? (
                        <Tag color="success">已选</Tag>
                      ) : (
                        <Tag color="default">未选</Tag>
                      )}
                    </div>
                  </div>
                  <div className={styles.lesson_description}>{item.info}</div>
                </Card>
              </Col>
            ))
          ) : (
            <Col span={24}>
              <Empty description="暂无课程" />
            </Col>
          )}
        </Row>
      </div>
      <Divider className={styles.divider} />
    </Col>
  );
};

export default function Home() {
  const [model, setModel] = useState([]);
  const [modelLessons1, setModelLessons1] = useState([]);
  const [modelLessons2, setModelLessons2] = useState([]);
  const [modelLessons3, setModelLessons3] = useState([]);
  const [modelLessons4, setModelLessons4] = useState([]);
  const [modelLessons5, setModelLessons5] = useState([]);
  const [modelLessons6, setModelLessons6] = useState([]);
  const modelLessons = [
    modelLessons1,
    modelLessons2,
    modelLessons3,
    modelLessons4,
    modelLessons5,
    modelLessons6,
  ];

  useEffect(() => {
    getModel().then((ret) => {
      if (ret.data.success) {
        // message.success(ret.data.errorMsg);
        console.log("model", ret.data);
        setModel(ret.data.data);
        for (let i = 0; i < ret.data.data.length; i++) {
          const modelId = ret.data.data[i].modelId;
          switch (i) {
            case 0:
              getModelLessons(modelId).then((ret) => {
                if (ret.data.success) {
                  setModelLessons1(ret.data.data);
                }
              });
              break;
            case 1:
              getModelLessons(modelId).then((ret) => {
                if (ret.data.success) {
                  setModelLessons2(ret.data.data);
                }
              });
              break;
            case 2:
              getModelLessons(modelId).then((ret) => {
                if (ret.data.success) {
                  setModelLessons3(ret.data.data);
                }
              });
              break;
            case 3:
              getModelLessons(modelId).then((ret) => {
                if (ret.data.success) {
                  setModelLessons4(ret.data.data);
                }
              });
              break;
            case 4:
              getModelLessons(modelId).then((ret) => {
                if (ret.data.success) {
                  setModelLessons5(ret.data.data);
                }
              });
              break;
            case 5:
              getModelLessons(modelId).then((ret) => {
                if (ret.data.success) {
                  setModelLessons6(ret.data.data);
                }
              });
              break;
            default:
              break;
          }
        }
      } else {
        message.error("获取model失败");
      }
    });
  }, []);

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
      <Row gutter={24}>
        {model.map((item, index) => (
          <ModelCard
            data={item}
            modelLessons={modelLessons[index]}
            key={index}
          />
        ))}
      </Row>
    </div>
  );
}
