// @ts-nocheck
import React from "react";
import styles from "./index.module.scss";
// 首页（公告，主题分类，课程列表，我的作业，个人信息）
// 洪浩然，章徐松
import { Divider, Carousel, Card, Row } from "antd";

const contentStyle = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

export default function Home() {
  const list1 = [
    {
      index: 0,
      src: "#",
      title: "高等数学1",
      teacher: "老师王老师1",
    },
    {
      index: 1,
      src: "#",
      title: "高等数学2",
      teacher: "老师王老师2",
    },
    {
      index: 2,
      src: "#",
      title: "高等数学3",
      teacher: "老师王老师3",
    },
  ];

  return (
    <div>
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
      <Row>
        {/* 课程主题 */}
        <div>
          <h2>主题一</h2>
        </div>
        <Divider />
        {list1.map((item, index) => (
          <div key={index}>
            <Card
              style={{ backgroundImage: item.picUrl }}
              size="small"
            >
              <img
                src={item.src}
                alt=""
                style={{ width: "200px", height: "100px" }}
              />
              <div>{item.title}</div>
              <div>{item.teacher}</div>
            </Card>
          </div>
        ))}
      </Row>
    </div>
  );
}

{
  /* map的for循环在react中的使用 */
}
{
  /* {list1.map((item) => {
        return (
          <HeaderItem
            img={item.src}
            teacher={item.teacher}
            title={item.title}
          />
        );
      })} */
}

// function HeaderItem(props) {
//   return (
//     <div className="w">
//       <div
//         style={{
//           width: "150px",
//           border: "1px solid #000",
//           height: "150px",
//           borderRadius: "8px",
//         }}
//         className={styles["headerItem"]}
//       >
//         <div className={styles["warp"]}>
//           <img className={styles["headerImg"]} src={props.img} alt="tipian" />
//           <div className={styles["name"]}>{props.name}</div>
//           <div className={styles["name"]}>{props.title} </div>
//           <div className={styles["name"]}>{props.teacher}</div>
//         </div>
//       </div>
//     </div>
//   );
// }
