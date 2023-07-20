import React, { useEffect, useRef, useState } from "react";
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
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import Information, { InformationGun } from "../information";
import { chooseLesson } from "../../service/home";

// 首页（公告，主题分类，课程列表，我的作业，个人信息）

const contentStyle: React.CSSProperties = {
  height: "380px",
  color: "#fff",
  lineHeight: "340px",
  textAlign: "center",
  background: "#364d79",
  marginTop: "-20px",
};

/**
 * 模块组件
 * @returns
 */
const ModelCard = (props: any) => {
  const myPrem = useSelector((state: RootState) => state.user.myPrem);
  const termId = useSelector((state: RootState) => state.user.termId);
  //console.log("myPrem :>> ", myPrem);
  const isStu = myPrem === "学生权限";
  const { data, modelLessons } = props;
  const navigate = useNavigate();

  const handleMyCourse = (e: string, termId?: string) => {
    if (isStu) {
      navigate("/course", { state: { lessonId: { e }, termId: termId } });
    } else {
      navigate("/courseTeacher", { state: { lessonId: { e } } });
    }
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
        <div className={styles.model_title_all}>{data.name}</div>
        <Row gutter={[8, 16]}>
          {modelLessons.length > 0 ? (
            modelLessons.map((item: any, index: number, dataSource: any) => (
              <Col key={index} span={4.8}>
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
                          handleMyCourse(
                            item.lessonId,
                            item.term === null ? termId : item.term.termId
                          )
                        }
                      >
                        课程详情
                      </Button>
                      {isStu &&
                        (item.choosed ? (
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
                              chooseLesson(item.lessonId).then((res) => {
                                if (res.data.success) {
                                  message.success(res.data.errorMsg);
                                }
                              });
                            }}
                          >
                            选择课程
                          </Button>
                        ))}
                    </Row>,
                  ]}
                >
                  <div className={styles.lesson_img}>
                    <img
                      src={item.picUrl}
                      alt="课程图片"
                      className={styles.lesson_img}
                    />
                  </div>

                  <div className={styles.lesson_top}>
                    <div className={styles.lesson_name}>{item.lessonName}</div>
                    {isStu && (
                      <div className={styles.tag}>
                        {item.choosed ? (
                          <Tag color="success">已选</Tag>
                        ) : (
                          <Tag color="default">未选</Tag>
                        )}
                      </div>
                    )}
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
  const myRef1 = useRef(null);
  const myRef2 = useRef(null);
  const myRef3 = useRef(null);
  const myRef4 = useRef(null);
  const myRef5 = useRef(null);
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
  const { Meta } = Card;

  useEffect(() => {
    getModel().then((ret) => {
      if (ret.data.success) {
        // message.success(ret.data.errorMsg);
        //console.log("model", ret.data);
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
  }, [model]);

  return (
    <div className={styles.home_wrap}>
      {/* 公告栏 */}
      <Carousel autoplay>
        <div>
          <div style={contentStyle}>
            <a
              href="https://hlxy.zcmu.edu.cn/info/1054/5763.htm"
              target="_blank"
              title="护理学院诚邀海内外英才加盟，共创学科辉煌！"
              rel="noreferrer"
            >
              <img
                src="http://hlxy.zcmu.edu.cn/__local/7/6A/9F/58F0A63CBDB46EA662683B9290A_81AECD58_1FF9D.png"
                height={"100%"}
                width={"100%"}
              />
            </a>
          </div>
        </div>
        <div>
          <div style={contentStyle}>
            <a
              href="https://hlxy.zcmu.edu.cn/info/1054/6735.htm"
              target="_blank"
              title="最美护理·“浙”里等你——浙江中医药大学护理学院诚聘天下英才"
              rel="noreferrer"
            >
              <img
                src="http://hlxy.zcmu.edu.cn/__local/F/4F/BF/39E592CADD7B8E86109BA3D7626_07F801C4_20B5B.png"
                height={"100%"}
                width={"100%"}
              />
            </a>
          </div>
        </div>
        <div>
          <div style={contentStyle}>
            <a
              href="https://hlxy.zcmu.edu.cn/info/1054/5763.htm"
              target="_blank"
              title="浙江省新一届护理学类教学指导委员会工作会议顺利召开"
              rel="noreferrer"
            >
              <img
                src="http://hlxy.zcmu.edu.cn/__local/1/33/2E/2D34790319E566B0FD664DA9452_B4F8A987_69B1E.png"
                height={"100%"}
                width={"100%"}
              />
            </a>
          </div>
        </div>
      </Carousel>
      <div className={styles.homeAll}>
        <Row gutter={24}>
          <div className={styles.model_card}>
            <div className={styles.model_title_big} ref={myRef1}>
              一、课程介绍
            </div>
            <div className={styles.model_text}>
              依托国家一流专业建设点，在《护理美育》社会实践省一流课程的基础上进一步深化，有机融入思政教育元素和劳动教育要求，培养学生在社会实践中认知美、理解美、传播美、创造美的能力，进一步提升学生的职业素养和劳动能力，培养学生的社会责任和护理使命，不断丰富“最美护理”的品牌内涵。
            </div>
          </div>
        </Row>
        {/* <Row gutter={24}>
          <div className={styles.model_card}>
            <div className={styles.model_title_big} ref={myRef2}>
              二、课程公告
            </div>
            <iframe
              style={{
                border: 'none',
                width: '100%',
                height: '600px',
              }}
              src={'./教学大纲.html'}
            />
          </div>
        </Row> */}
        <Row gutter={24}>
          <div className={styles.model_card}>
            <div className={styles.model_title_big} ref={myRef3}>
              二、课程资源
              {/* <Empty description="暂无资源" /> */}
            </div>
            <Row gutter={16}>
              <Col span={5}>
                <Card
                  hoverable
                  cover={
                    <img
                      alt="example"
                      src="https://zcmu-resours-1305805121.cos.ap-shanghai.myqcloud.com/dev/zcmu/default/d196416f-af2e-48b3-8cee-eac01895d006.png"
                    />
                  }
                >
                  <a
                    href="https://zcmu-resours-1305805121.cos.ap-shanghai.myqcloud.com/dev/zcmu/default/c186a19b-b11a-4211-afce-e331a33763e8.mp4"
                    target="_blank"
                  >
                    <Meta title="红色引领绿色发展探寻乡村振兴共富之路2.mp4" />
                  </a>
                </Card>
              </Col>
              <Col span={5}>
                <Card
                  hoverable
                  cover={
                    <img
                      alt="example"
                      src="https://zcmu-resours-1305805121.cos.ap-shanghai.myqcloud.com/dev/zcmu/default/85414126-6f25-4499-a8eb-1b02280811df.png"
                    />
                  }
                >
                  <a
                    href="https://zcmu-resours-1305805121.cos.ap-shanghai.myqcloud.com/dev/zcmu/default/f49712e8-abf8-43b3-bfaa-f6eb32b69b87.mp4"
                    target="_blank"
                  >
                    <Meta title="坚定初心永不忘最美护理守健康高航.mp4" />
                  </a>
                </Card>
              </Col>
              <Col span={5}>
                <Card
                  hoverable
                  cover={
                    <img
                      alt="example"
                      src="https://zcmu-resours-1305805121.cos.ap-shanghai.myqcloud.com/dev/zcmu/default/1044e1db-1f0a-421d-baf5-fedee06ec869.png"
                    />
                  }
                >
                  <a
                    href="https://zcmu-resours-1305805121.cos.ap-shanghai.myqcloud.com/dev/zcmu/default/af577955-53c6-433b-b868-9522bbf78078.mp4"
                    target="_blank"
                  >
                    <Meta title="“最美护理”社会实践课程.mp4" />
                  </a>
                </Card>
              </Col>
            </Row>
          </div>
        </Row>
        <Row gutter={24}>
          <div className={styles.model_card}>
            <div className={styles.model_title_big} ref={myRef4}>
              三、主要课程
            </div>
            {model.map((item, index) => (
              <ModelCard
                data={item}
                modelLessons={modelLessons[index]}
                key={index}
              />
            ))}
          </div>
        </Row>
        <Row gutter={24}>
          <div className={styles.model_card}>
            <div className={styles.model_title_big} ref={myRef5}>
              四、教师团队
            </div>

            <InformationGun showTitle={false} />
          </div>
        </Row>
        {/* 课程主题 */}
        <Row gutter={24}></Row>
        {/* <Information /> */}
        <div className={styles.fixed_pop}>
          {/* 跳转到一、课程介绍 */}
          <a
            onClick={() => {
              // @ts-ignore
              myRef1?.current?.scrollIntoView?.({
                behavior: "smooth",
                block: "start",
              });
            }}
          >
            <div className={styles.fixed_pop_item}>1</div>
          </a>
          <a
            onClick={() => {
              // @ts-ignore
              myRef3?.current?.scrollIntoView?.({
                behavior: "smooth",
                block: "start",
              });
            }}
          >
            <div className={styles.fixed_pop_item}>2</div>
          </a>
          <a
            onClick={() => {
              // @ts-ignore
              myRef4?.current?.scrollIntoView?.({
                behavior: "smooth",
                block: "start",
              });
            }}
          >
            <div className={styles.fixed_pop_item}>3</div>
          </a>
          <a
            onClick={() => {
              // @ts-ignore
              myRef5?.current?.scrollIntoView?.({
                behavior: "smooth",
                block: "start",
              });
            }}
          >
            <div className={styles.fixed_pop_item}>4</div>
          </a>
        </div>
      </div>
    </div>
  );
}
