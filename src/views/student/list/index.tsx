//@ts-nocheck
import React, { useEffect, useState } from 'react';
import { message, Card, Button, Row, Col, Tag } from 'antd';
import styles from './index.module.scss';
import { getLessons } from '../../../service/list';
import Meta from 'antd/es/card/Meta';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';

// 我的作业列表（作业标题，课程名字，老师名字，展示分数，批改状态）
// 娄竞楷

export default function ClassList() {
	const [lessonAll, setLessonAll] = useState([]);

	useEffect(() => {
		getLessons().then((ret) => {
			if (ret.data.success) {
				message.success(ret.data.errorMsg);
				setLessonAll(ret.data.data);
			}
		});
	}, []);

	const navigate = useNavigate();
	const handleMyDetail = (
		id: React.MouseEvent<HTMLButtonElement>,
		hId: React.MouseEvent<HTMLButtonElement>
	) => {
		navigate('/detail', { state: { lessonId: { id }, homeworkId: { hId } } });
	};
	const getStatus = (status: string) => {
		switch (status) {
			case 'SUBMIT_SCORED':
				return '已批改';
			case 'UN_SUBMIT':
				return '未批改';
		}
		return '未批改';
	};
	
	return (
		<div className={styles.all}>
			<div className={styles.title}>我的作业</div>
			<Row gutter={24}>
				{lessonAll.map((item, index) => {
					return (
						<>
							<Col span={6} key={index}>
								<Card
									size="small"
									className={styles.card}
									actions={[
										<Row justify={'space-between'}>
											<Button
												className={styles.rowBtn}
												onClick={(id, hId) =>
													handleMyDetail(
														item.lessonId,
														item.homeworkId,
														id,
														hId
													)
												}
											>
												作业详情
											</Button>
											<div>
												{getStatus(item.status) === '已批改' ? (
													<Tag color="green">已批改</Tag>
												) : (
													<Tag color="red">未批改</Tag>
												)}
											</div>
										</Row>,
									]}
								>
									<Meta
										title={item.lessonName}
										description={item.name}
										style={{ height: '80px' }}
									/>
									<div className={styles.row}>
										分数：<span className={styles.score}>{typeof item?.subHomework?.score === 'number' ? item?.subHomework?.score : '0'}</span>
									</div>
								</Card>
							</Col>
						</>
					);
				})}
			</Row>
		</div>
	);
}
