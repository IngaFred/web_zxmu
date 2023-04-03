//@ts-nocheck
import React, { useEffect, useState } from 'react';
import { message, Card, Button, Row, Col, Empty } from 'antd';
import styles from './index.module.scss';
import { getLessons } from '../../../service/list';
import Meta from 'antd/es/card/Meta';
import { useLocation, useNavigate } from 'react-router-dom';
import _ from 'lodash';

// 我的作业列表（作业标题，课程名字，老师名字，展示分数，批改状态）
// 娄竞楷

type LessonId = {
	e: string;
};

export default function ClassList() {
	const location = useLocation();

	const lessonId: LessonId = location.state?.lessonId;

	const [lessonAll, setLessonAll] = useState([]);

	useEffect(() => {
		getLessons(lessonId).then((ret) => {
			if (ret.data.success) {
				message.success(ret.data.errorMsg);
				setLessonAll(ret.data.data);
			} else {
				message.error('获取作业列表失败');
			}
		});
	}, []);

	console.log(lessonAll);
	console.log(_.isEmpty(lessonAll));

	const navigate = useNavigate();
	const handleMyDetail = (
		id: React.MouseEvent<HTMLButtonElement>,
		hId: React.MouseEvent<HTMLButtonElement>
	) => {
		navigate('/detail', { state: { lessonId: { id }, homeworkId: { hId } } });
	};

	return (
		<div className={styles.all}>
			<Row gutter={24}>
				{_.isEmpty(lessonAll) ? (
					<Col span={24}>
						<Empty description="没有对应的课程，暂无作业列表" />
					</Col>
				) : (
					<Col span={6}>
						<Card
							size="small"
							className={styles.card}
							actions={[
								<Row justify={'space-between'}>
									<Button
										className={styles.rowBtn}
										onClick={(id, hId) =>
											handleMyDetail(
												lessonAll.lessonId,
												lessonAll.homeworkId,
												id,
												hId
											)
										}
									>
										我的作业详情
									</Button>
								</Row>,
							]}
						>
							<Meta
								title={lessonAll.lessonName}
								description={lessonAll.name}
								style={{ height: '80px' }}
							/>
							<p>{lessonAll.info}</p>
						</Card>
					</Col>
				)}
			</Row>
		</div>
	);
}
