// @ts-nocheck
import styles from './index.module.scss';
import React, { useEffect, useState } from 'react';
import { Card, Row, message, Col, Button, Select } from 'antd';
import { getCourseList } from '../../../service/courseList';
import { useNavigate } from 'react-router-dom';
import Meta from 'antd/es/card/Meta';

// 我的课程列表
// 洪浩然
const date = new Date();

export default function List() {
	const [year, setFullYear] = useState(date.getFullYear());

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
	const handleMyDetail = (e: React.MouseEvent<HTMLButtonElement>) => {
		navigate('/detailListTeacher', { state: { lessonId: { e } } });
	};

	const yearOptions = [];
	const putYear = () => {
		for (let i = 2013; i < 11; i++) {
			console.log(i);
			yearOptions.push(
				<Select.Option key={i} value={i}>
					{i + 1}年
				</Select.Option>
			);
		}
	};

	return (
		<div className={styles['big']}>
			<div className={styles['header-xxx']}>
				<h1>我的课程</h1>
				<Select
					// 实时更改
					value={year}
					onChange={(newYear) => {
						const now = value.clone().getFullYear(year);
						setFullYear(newYear);
						onChange(now);
					}}
				>
					{putYear()}
					{yearOptions}
				</Select>

				{/* <Select
          className={styles["st"]}
          showSearch
          mode="multiple"
          placeholder="请选择年份"
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").includes(input)
          }
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase())
          }
          options={[
            {
              value: "1",
              label: "2022",
            },
            {
              value: "2",
              label: "2021",
            },
            {
              value: "3",
              label: "2020",
            },
            {
              value: "4",
              label: "2019",
            },
            {
              value: "5",
              label: "2018",
            },
            {
              value: "6",
              label: "2023",
            },
          ]}
        /> */}
			</div>
			<Row gutter={(24, 8)} className={styles['row-big']}>
				{lesson.map((item, index) => (
					<Col span={8} key={index}>
						<Card
							size="small"
							className={styles.card}
							cover={
								<img
									src={item?.picUrl}
									alt=""
									style={{ width: '300px', height: '180px', padding: '10px' }}
								/>
							}
							actions={[
								<Row justify={'space-between'}>
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
								title={item?.lessonName}
								description={item?.info}
								style={{ height: '80px' }}
							/>
						</Card>
					</Col>
				))}
			</Row>
		</div>
	);
}
