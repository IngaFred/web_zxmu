import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
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
} from 'antd';
import { useNavigate } from 'react-router-dom';
import { getModel, getModelLessons, getMyLessons } from '../../service/home';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';
import Information from '../../components/information-teacher';

// 首页（公告，主题分类，课程列表，我的作业，个人信息）

const contentStyle: React.CSSProperties = {
	height: '420px',
	color: '#fff',
	lineHeight: '340px',
	textAlign: 'center',
	background: '#364d79',
};

/**
 * 模块组件
 * @returns
 */
const ModelCard = (props: any) => {
	const myPrem = useSelector((state: RootState) => state.user.myPrem);
	const termId = useSelector((state: RootState) => state.user.termId);
	console.log('myPrem :>> ', myPrem);
	const isStu = myPrem === '学生权限';
	const { data, modelLessons } = props;
	const navigate = useNavigate();
	// useEffect(() => {
	// 	if (myPrem === '教师权限') {
	// 		navigate('/courseList');
	// 	}
	// }, [myPrem]);
	const handleMyCourse = (e: string, termId?: string) => {
		navigate('/course', { state: { lessonId: { e }, termId: termId } });
	};
	const handleMyDetail = (id: React.MouseEvent<HTMLButtonElement>) => {
		navigate('/detail', { state: { lessonId: { id } } });
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
							<Col key={index} span={8}>
								<Card
									key={index}
									size="small"
									className={styles.card}
									actions={[
										<Row justify={'space-between'}>
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
															let flag = true; // 用于判断是否有课程被选中
															dataSource.map((item: any) => {
																if (item.choosed === true) {
																	flag = false;
																}
																return null;
															});

															if (!flag) {
																message.warning('一个主题只能选择一门课');
																return;
															}
															// @洪浩然 学生选课接口
															// 选课接口
															message.success('选课成功');
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
				console.log('model', ret.data);
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
				message.error('获取model失败');
			}
		});
	}, []);

	return (
		<div className={styles.homeAll}>
			{/* 公告栏 */}
			<div className={styles.infoTitle}>公告栏</div>
			<Carousel autoplay>
				<div>
					<div style={contentStyle}>
						<a
							href="https://hlxy.zcmu.edu.cn/info/1054/5763.htm"
							target="_blank"
							title="护理学院诚邀海内外英才加盟，共创学科辉煌！"
						>
							<img
								src="https://hlxy.zcmu.edu.cn/__local/7/6A/9F/58F0A63CBDB46EA662683B9290A_81AECD58_1FF9D.png"
								height={'100%'}
								width={'100%'}
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
						>
							<img
								src="https://hlxy.zcmu.edu.cn/__local/F/4F/BF/39E592CADD7B8E86109BA3D7626_07F801C4_20B5B.png"
								height={'100%'}
								width={'100%'}
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
						>
							<img
								src="https://hlxy.zcmu.edu.cn/__local/1/33/2E/2D34790319E566B0FD664DA9452_B4F8A987_69B1E.png"
								height={'100%'}
								width={'100%'}
							/>
						</a>
					</div>
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
			<Information />
		</div>
	);
}
