// @ts-nocheck
import styles from './index.module.scss';
import React, { useEffect, useState } from 'react';
import { Card, Row, message, Col, Button, Select } from 'antd';
import { getCourseList } from '../../../service/courseList';
import { useNavigate } from 'react-router-dom';

// 我的课程列表
// 洪浩然

export default function List() {
	const [lesson, setLesson] = useState([]);

	useEffect(() => {
		getCourseList().then((ret) => {
			if (ret.data.success) {
				message.success(ret.data.errorMsg);
				setLesson(ret.data.data);
				//显示回参
				//console.log(Courses);
			} else {
				message.error('获取课程失败');
			}
		});
	}, []);

	const navigate = useNavigate();
	const handleMyCourse = (e: React.MouseEvent<HTMLButtonElement>) => {
		navigate('/courseTeacher', { state: { lessonId: { e } } });
	};

	return (
		<div className={styles['big']}>
			<div className={styles['header-xxx']}>
				<div style={{ fontSize: '24px', fontWeight: 'bold' }}>我的教学课程</div>
				<Button
					type="primary"
					onClick={() => {
						navigate('/createLesson');
					}}
				>
					新建教学课程
				</Button>
			</div>
			<Row gutter={[8, 16]} className={styles['row-big']}>
				{lesson.map((item, index) => (
					<Col span={8} key={index}>
						<Card
							size="small"
							className={styles.card}
							actions={[
								<Row justify={'space-between'} style={{ padding: '0 10px' }}>
									<Button
										className={styles.rowBtn}
										onClick={(e) => handleMyCourse(item.lessonId, e)}
									>
										课程详情
									</Button>
								</Row>,
							]}
						>
							<div className={styles.lesson_img}>
								<img
									src={item?.picUrl}
									alt="课程图片"
									className={styles.lesson_img}
								/>
							</div>
							<div className={styles.lesson_top}>
								<div className={styles.lesson_name}> {item.lessonName} </div>
							</div>
							<div className={styles.lesson_description}>{item.info}</div>
						</Card>
					</Col>
				))}
			</Row>
		</div>
	);
}
