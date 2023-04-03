//@ts-nocheck
import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import {
  Divider,
  Carousel,
  Card,
  Row,
  message,
  Col,
  Button,
  Empty,
} from "antd";
import { useNavigate } from "react-router-dom";
import Meta from "antd/es/card/Meta";
import { getModel, getModelLessons } from "../../service/home";

// 首页（公告，主题分类，课程列表，我的作业，个人信息）
// 洪浩然，章徐松

const contentStyle = {
  height: "200px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

export default function Home() {
  const [model, setModel] = useState([]);
  const [modelLessons1, setModelLessons1] = useState([]);
  const [modelLessons2, setModelLessons2] = useState([]);
  const [modelLessons3, setModelLessons3] = useState([]);
  const [modelLessons4, setModelLessons4] = useState([]);
  const [modelLessons5, setModelLessons5] = useState([]);
  const [modelLessons6, setModelLessons6] = useState([]);

  useEffect(() => {
    getModel().then((ret) => {
      if (ret.data.success) {
        // message.success(ret.data.errorMsg);
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

  const modelLessons = {
    模块一: modelLessons1.map((item, index) => (
      <Col key={index} span={8}>
        <Card
          key={index}
          size="small"
          className={styles.card}
          cover={
            <img
              src={item.picUrl}
              alt="课程图片"
              style={{
                width: "260px",
                height: "180px",
                padding: "10px",
              }}
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
                作业列表
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
    )),
    模块二: modelLessons2.map((item, index) => (
      <Col key={index} span={8}>
        <Card
          key={index}
          size="small"
          className={styles.card}
          cover={
            <img
              src={item.picUrl}
              alt="课程图片"
              style={{
                width: "260px",
                height: "180px",
                padding: "10px",
              }}
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
                作业列表
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
    )),
    模块三: modelLessons3.map((item, index) => (
      <Col key={index} span={8}>
        <Card
          key={index}
          size="small"
          className={styles.card}
          cover={
            <img
              src={item.picUrl}
              alt="课程图片"
              style={{
                width: "260px",
                height: "180px",
                padding: "10px",
              }}
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
                作业列表
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
    )),
    模块四: modelLessons4.map((item, index) => (
      <Col key={index} span={8}>
        <Card
          key={index}
          size="small"
          className={styles.card}
          cover={
            <img
              src={item.picUrl}
              alt="课程图片"
              style={{
                width: "260px",
                height: "180px",
                padding: "10px",
              }}
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
                作业列表
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
    )),
    模块五: modelLessons5.map((item, index) => (
      <Col key={index} span={8}>
        <Card
          key={index}
          size="small"
          className={styles.card}
          cover={
            <img
              src={item.picUrl}
              alt="课程图片"
              style={{
                width: "260px",
                height: "180px",
                padding: "10px",
              }}
            />
          }
          actions={[
            <Row justify={"space-between"}>
              <Button
                className={styles.rowBtn}
                onClick={(e) => handleMyCourse(item.lessonId, e)}
              >
                {toLog(item.lessonId)}
                课程详情
              </Button>
              <Button
                className={styles.rowBtn}
                onClick={(e) => handleMyDetail(item.lessonId, e)}
              >
                作业列表
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
    )),
    模块六: modelLessons6.map((item, index) => (
      <Col key={index} span={8}>
        <Card
          key={index}
          size="small"
          className={styles.card}
          cover={
            <img
              src={item.picUrl}
              alt="课程图片"
              style={{
                width: "260px",
                height: "180px",
                padding: "10px",
              }}
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
                作业列表
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
    )),
    default: <Empty description="暂无课程" />,
  };

  const navigate = useNavigate();
  const handleMyCourse = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e);
    navigate("/course", { state: { lessonId: { e } } });
  };
  const handleMyDetail = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e);

    navigate("/list", { state: { lessonId: { e } } });
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
      <Row gutter={24}>
        {model.map((item, index) => (
          <Col key={index} span={24}>
            <Card key={index} className={styles.card}>
              <Meta title={item.name} style={{ height: "40px" }} />
              <Row gutter={24}>
                {modelLessons[item.name] || modelLessons["default"]}
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

// }
//@ts-nocheck
// import React, { useEffect, useState } from 'react';
// import styles from './index.module.scss';
// import { Divider, Carousel, Card, Row, message, Col, Button } from 'antd';
// import { getCourses } from '../../service/home';
// import { useNavigate } from 'react-router-dom';
// import Meta from 'antd/es/card/Meta';

// // 首页（公告，主题分类，课程列表，我的作业，个人信息）
// // 洪浩然，章徐松

// const contentStyle = {
//   height: '200px',
//   color: '#fff',
//   lineHeight: '160px',
//   textAlign: 'center',
//   background: '#364d79',
// };

// const themeList = [
//   {
//     themeName: '主题一',
//     themeId: 1,
//     lessonList: [
//       {
//         lessonName: '课程一',
//         lessonId: 1,
//         teacherName: '老师一',
//         info: '课程简介',
//         picUrl: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
//         isSelected: true,
//       },
//       {
//         lessonName: '课程二',
//         lessonId: 2,
//         teacherName: '老师二',
//         info: '课程简介',
//         picUrl: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
//         status: 1,
//         isSelected: false,
//       },
//     ],
//   },
//   {
//     themeName: '主题二',
//     themeId: 2,
//     lessonList: [
//       {
//         lessonName: '课程一',
//         lessonId: 3,
//         teacherName: '老师一',
//         info: '课程简介',
//         picUrl: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
//         isSelected: true,
//       },
//       {
//         lessonName: '课程二',
//         lessonId: 4,
//         teacherName: '老师二',
//         info: '课程简介',
//         picUrl: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
//         status: 1,
//         isSelected: false,
//       },
//     ],
//   },
// ];

// export default function Home() {
//   const [courses, setCourse] = useState([]);

//   useEffect(() => {
//     getCourses().then((ret) => {
//       if (ret.data.success) {
//         message.success(ret.data.errorMsg);
//         setCourse(ret.data.data);
//         //显示回参
//         console.log(Courses);
//       } else {
//         message.error('获取课程失败');
//       }
//     });
//   }, []);

//   const navigate = useNavigate();
//   const handleMyCourse = (e: React.MouseEvent<HTMLButtonElement>) => {
//     navigate('/course', { state: { lessonId: { e } } });
//   };
//   const handleMyDetail = (e: React.MouseEvent<HTMLButtonElement>) => {
//     navigate('/list', { state: { lessonId: { e } } });
//   };

//   return (
//     <div className={styles.homeAll}>
//       {/* 公告栏 */}
//       <Carousel autoplay>
//         <div>
//           <h3 style={contentStyle}>公告1</h3>
//         </div>
//         <div>
//           <h3 style={contentStyle}>公告2</h3>
//         </div>
//         <div>
//           <h3 style={contentStyle}>公告3</h3>
//         </div>
//       </Carousel>

//       {/* 课程主题 */}
//       {themeList.map((item, index) => {
//         return (
//           <ThemeItem
//             themeName={item.themeName}
//             courses={item.lessonList}
//             handleMyCourse={handleMyCourse}
//             handleMyDetail={handleMyDetail}
//             key={index}
//           />
//         );
//       })}
//     </div>
//   );
// }

// const ThemeItem = ({ themeName, courses, handleMyCourse, handleMyDetail }) => {
//   return (
//     <>
//       <h1>{themeName}</h1>
//       <Divider />
//       <Row gutter={(24, 8)}>
//         {courses.map((item, index) => (
//           <Col span={6}>
//             <Card
//             style={{
//               width: 300,
//               margin: 10,
//               textAlign: 'center',
//             }}
//               key={index}
//               size="small"
//               className={styles.card}
//               cover={
//                 <img
//                   src={item.picUrl}
//                   alt="网络不好"
//                   style={{ width: '280px', height: '180px', padding: '10px' }}
//                 />
//               }
//               actions={[
//                 <Row justify={'space-between'}>
//                   <Button
//                     className={styles.rowBtn2}
//                     onClick={(e) => handleMyCourse(item.lessonId, e)}
//                   >
//                     课程详情
//                   </Button>
//                   <Button
//                     className={styles.rowBtn}
//                     onClick={(e) => handleMyDetail(item.lessonId, e)}
//                   >
//                     现在这是我的已选课程, 点击前往作业列表
//                   </Button>
//                 </Row>,
//               ]}
//             >
//               <Meta
//                 title={item.lessonName}
//                 description={item.info}
//                 style={{ height: '80px' }}
//               />
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </>
//   );
// };
