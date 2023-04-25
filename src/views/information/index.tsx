import React from 'react';
import { Image, List } from 'antd';
import styles from './index.module.scss';
import VirtualList from 'rc-virtual-list';
import teacher_leader from '../../../src/assets/images/teachers/team_leader.png';
import teacher_member1 from '../../../src/assets/images/teachers/team_member1.png';
import teacher_member2 from '../../../src/assets/images/teachers/team_member2.png';
import teacher_member3 from '../../../src/assets/images/teachers/team_member3.png';
import teacher_member4 from '../../../src/assets/images/teachers/team_member4.png';
// 教师团队信息
// 吴振宇
export default function Information() {
	const teachers = [
		{
			name: '何桂娟',
			url: teacher_leader,
			description: '教授护理学院院长',
			content:
				'组织课程设计与理论授课,浙江省护理学会副理事长，省高等学校护理学类教指委秘书长，中华护理学会护理教育专业委员会委员等；为省一流专业建设点（助产学）负责人，省大学生校外实践教育示范基地负责人、省课程思政教研团队主要成员及校护理实践教学创新团队、助产课程思政教学创新团队、《助产人文关怀》慕课和校课程思政示范课负责人；获省教学成果二等奖1项（2/5），校教学成果一等奖2项、二等奖1项（1/5）；主持省虚拟仿真实验项目2项、省教改项目4项；主编教材4部、副主编6部。',
		},
		{
			name: '林觐民',
			url: teacher_member1,
			description: '副教授护理学院党委副书记',
			content: '课程方案设计考核标准制定',
		},
		{
			name: '汪国建',
			url: teacher_member2,
			description: '教副教授护理学院人文教研室主任',
			content: '教学内容及教学资源建设',
		},
		{
			name: '王晓梅',
			url: teacher_member3,
			description: '讲师,护理学院团委书记',
			content: '组织实践教学项目实施',
		},
		{
			name: '倪海滨',
			url: teacher_member4,
			description: '讲师',
			content: '实践教学、项目实施、课程平台维护',
		},
	];
	return (
		// <div >
		//   <h3>教师团队</h3>
		//   <div className={styles['inf']}>
		//     <div className={styles['picture']}>
		//       <Image src="https://img2.baidu.com/it/u=3334658145,4121633910&fm=253&fmt=auto&app=138&f=JPEG?w=467&h=500"/>
		//     </div>
		// <p style={{width:'70%'}}>教师，以教育为生的职业。这个职业是人类社会最古老的职业之一。按照法律法规和行业规范，在规定的时间节点内，
		//   根据学校设施条件和个人职称专业，安排学生入座、发放学习资料、备课授课、批改作业、引导辅导帮助学生学习、
		//   组织听课练习，组织考试、传授科学文化基本知识，开展主持学术交流、提高学生的观察学习、记忆认知、动手沟通、
		//   操作等综合实践能力，培养学生特长，促进德、智、体、美、劳全面发展，掌握经验技术</p>
		//   </div>
		// </div>
		<div>
			<h1 className={styles['h1style']}>教师团队</h1>
			<List
				className={styles['liststyle']}
				size="large"
				itemLayout="vertical"
				dataSource={teachers}
				renderItem={(item) => (
					<List.Item key={item.name}>
						{/* <List.Item.Meta 
            description={Item.description}/> */}
						<div className={styles['itemstyle']}>
							<div style={{ display: 'flex', alignItems: 'center' }}>
								<Image
									style={{ width: '160px', height: '200px' }}
									alt={item.name}
									src={item.url}
								/>
							</div>
							<div style={{ padding: '30px' }}>
								<div style={{ fontSize: '18px', fontWeight: 'bold' }}>
									{item.name}
								</div>
								<p className={styles['pstyle']}>{item.description}</p>
								<p style={{ marginTop: '10px' }}>{item.content}</p>
							</div>
						</div>
					</List.Item>
				)}
			/>
		</div>
	);
}
