// @ts-nocheck
import React from 'react';
import styles from './index.module.scss';
// 首页（公告，主题分类，课程列表，我的作业，个人信息）
// 洪浩然，章徐松
import { Divider } from 'antd';
import { Carousel } from 'antd'


const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const App: React.FC = () => (
  <>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
      probare, quae sunt a te dicta? Refert tamen, quo modo.
    </p>
    </>
);

export default function Home() {
  const list1 = [
    {
      src: '#',
      title: '高等数学',
      teacher: '老师王老师',
    },
    {
      src: '#',
      title: '高等数学',
      teacher: '老师王老师',
    },
    {
      src: '#',
      title: '高等数学',
      teacher: '老师王 老师',
    },
    {
      src: '#',
      title: '高等数学',
      teacher: '老师王老师',
    },
    {
      src: '#',
      title: '高等数学',
      teacher: '老师王老师',
    },
    {
      src: '#',
      title: '高等数学',
      teacher: '老师王老师',
    },
  ];

  for (let i = 0; i < list1.length; i++) {
    console.log(list1[i]);
  }
  list1.map((item) => {
    console.log(item);
  });
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
        <div>
          <h3 style={contentStyle}>公告4</h3>
        </div>
      </Carousel>
      {/* 课程主题 */}
      <div>
      <>
    <h2>
     主题一
    </h2>
    <Divider />
  </>
      </div>
      {/* map的for循环在react中的使用 */}
      {list1.map((item) => {
        return (
          <HeaderItem
            img={item.src}
            teacher={item.teacher}
            title={item.title}
          />
        );
      })}
    </div>
  );
}
function HeaderItem(props) {
  return (
    <div className="w">
 <div
      style={{
        width: '150px',
        border: '1px solid #000',
        height: '150px',
        borderRadius: '8px',
      }}
      className="headerItem"
    >
      <div className="wrap">
         <img className="headerImg" src={props.img} alt="tipian" />
        <div className="name">{props.name}</div>
        <div className="name">{props.title} </div>
        <div className='name'>{props.teacher}</div>
      </div>
      </div>
    </div>
    
   
  );
}
