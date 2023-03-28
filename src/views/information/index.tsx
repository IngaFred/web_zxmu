import React from 'react'
import { Image ,List} from 'antd';
import styles from "./index.module.scss";
// 教师团队信息
// 吴振宇
export default function Information() {
  return (
    <div >
      <h3>教师团队</h3>
      <div className={styles['inf']}>
        <div className={styles['picture']}>
          <Image src="https://img2.baidu.com/it/u=3334658145,4121633910&fm=253&fmt=auto&app=138&f=JPEG?w=467&h=500"/>
        </div>
        <p style={{width:'70%'}}>教师，以教育为生的职业。这个职业是人类社会最古老的职业之一。按照法律法规和行业规范，在规定的时间节点内，
          根据学校设施条件和个人职称专业，安排学生入座、发放学习资料、备课授课、批改作业、引导辅导帮助学生学习、
          组织听课练习，组织考试、传授科学文化基本知识，开展主持学术交流、提高学生的观察学习、记忆认知、动手沟通、
          操作等综合实践能力，培养学生特长，促进德、智、体、美、劳全面发展，掌握经验技术</p>
      </div>
    </div>
    // <div>
    //     <h3>教师团队</h3>
    //   <List size='large'
    //         itemLayout="vertical">

    //   </List>
    // </div>
  )
}
