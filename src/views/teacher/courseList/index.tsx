import React from 'react';
import { Select } from 'antd';
import styles from './index.module.scss';
import { Divider, Carousel, Card, Row, message, Col, Button } from 'antd';
// 我的课程列表
// 洪浩然

const Meta = Card.Meta;

export default function List() {
	return (
		<div className={styles['big']}>
			<div className={styles['header-xxx']}>
				<h1>我的课程</h1>
				<Select
					className={styles['st']}
					showSearch
					mode='multiple'
					placeholder='请选择年份'
					optionFilterProp='children'
					filterOption={(input, option) =>
						(option?.label ?? '').includes(input)
					}
					filterSort={(optionA, optionB) =>
						(optionA?.label ?? '')
							.toLowerCase()
							.localeCompare((optionB?.label ?? '').toLowerCase())
					}
					options={[
						{
							value: '1',
							label: '2022',
						},
						{
							value: '2',
							label: '2021',
						},
						{
							value: '3',
							label: '2020',
						},
						{
							value: '4',
							label: '2019',
						},
						{
							value: '5',
							label: '2018',
						},
						{
							value: '6',
							label: '2023',
						},
					]}
				/>
			</div>
			<Row
				className={styles['row-big']}
				gutter={[16, 24]}
			>
				<Col span={8}>
					<Card
						size='small'
						className={styles.card}
						cover={
							<img
								src={'xx'}
								alt=''
								style={{ width: '100%', height: '180px', padding: '10px' }}
							/>
						}
						actions={[
							<Row justify={'space-between'}>
								<Button
									className={styles.rowBtn}
									onClick={(e) => {}}
								>
									课程详情
								</Button>
								<Button
									className={styles.rowBtn}
									onClick={(e) => {}}
								>
									现在这是我的已选课程, 点击前往作业列表
								</Button>
							</Row>,
						]}
					>
						<Meta
							title={'标题'}
							description={'课程信息'}
							style={{ height: '80px' }}
						/>
					</Card>
				</Col>
				<Col span={8}>
					<Card
						size='small'
						className={styles.card}
						cover={
							<img
								src={'xx'}
								alt=''
								style={{ width: '100%', height: '180px', padding: '10px' }}
							/>
						}
						actions={[
							<Row justify={'space-between'}>
								<Button
									className={styles.rowBtn}
									onClick={(e) => {}}
								>
									课程详情
								</Button>
								<Button
									className={styles.rowBtn}
									onClick={(e) => {}}
								>
									现在这是我的已选课程, 点击前往作业列表
								</Button>
							</Row>,
						]}
					>
						<Meta
							title={'biaoti'}
							description={'kecheng xinxi'}
							style={{ height: '80px' }}
						/>
					</Card>
				</Col>
				<Col span={8}>
					<Card
						size='small'
						className={styles.card}
						cover={
							<img
								src={'xx'}
								alt=''
								style={{ width: '100%', height: '180px', padding: '10px' }}
							/>
						}
						actions={[
							<Row justify={'space-between'}>
								<Button
									className={styles.rowBtn}
									onClick={(e) => {}}
								>
									课程详情
								</Button>
								<Button
									className={styles.rowBtn}
									onClick={(e) => {}}
								>
									现在这是我的已选课程, 点击前往作业列表
								</Button>
							</Row>,
						]}
					>
						<Meta
							title={'biaoti'}
							description={'kecheng xinxi'}
							style={{ height: '80px' }}
						/>
					</Card>
				</Col>
				<Col span={8}>
					<Card
						size='small'
						className={styles.card}
						cover={
							<img
								src={'xx'}
								alt=''
								style={{ width: '100%', height: '180px', padding: '10px' }}
							/>
						}
						actions={[
							<Row justify={'space-between'}>
								<Button
									className={styles.rowBtn}
									onClick={(e) => {}}
								>
									课程详情
								</Button>
								<Button
									className={styles.rowBtn}
									onClick={(e) => {}}
								>
									现在这是我的已选课程, 点击前往作业列表
								</Button>
							</Row>,
						]}
					>
						<Meta
							title={'biaoti'}
							description={'kecheng xinxi'}
							style={{ height: '80px' }}
						/>
					</Card>
				</Col>
				<Col span={8}>
					<Card
						size='small'
						className={styles.card}
						cover={
							<img
								src={'xx'}
								alt=''
								style={{ width: '100%', height: '180px', padding: '10px' }}
							/>
						}
						actions={[
							<Row justify={'space-between'}>
								<Button
									className={styles.rowBtn}
									onClick={(e) => {}}
								>
									课程详情
								</Button>
								<Button
									className={styles.rowBtn}
									onClick={(e) => {}}
								>
									现在这是我的已选课程, 点击前往作业列表
								</Button>
							</Row>,
						]}
					>
						<Meta
							title={'biaoti'}
							description={'kecheng xinxi'}
							style={{ height: '80px' }}
						/>
					</Card>
				</Col>
				<Col span={8}>
					<Card
						size='small'
						className={styles.card}
						cover={
							<img
								src={'xx'}
								alt=''
								style={{ width: '100%', height: '180px', padding: '10px' }}
							/>
						}
						actions={[
							<Row justify={'space-between'}>
								<Button
									className={styles.rowBtn}
									onClick={(e) => {}}
								>
									课程详情
								</Button>
								<Button
									className={styles.rowBtn}
									onClick={(e) => {}}
								>
									现在这是我的已选课程, 点击前往作业列表
								</Button>
							</Row>,
						]}
					>
						<Meta
							title={'biaoti'}
							description={'kecheng xinxi'}
							style={{ height: '80px' }}
						/>
					</Card>
				</Col>
			</Row>
		</div>
	);
}
