import React from 'react';
import styles from './index.module.scss';
import ShowEditor from '../../../components/show-editor';
import { useLocation } from 'react-router-dom';
import { Row, Col, Divider, Button } from 'antd';
import { InfoRow } from '../detail';
import { ContainerTwoTone } from '@ant-design/icons';

interface Link {
	id: number;
	url: string;
	name: string;
}
export default function ShowDetails() {
	const location = useLocation();
	const { myGoodHomework, showHomework } = location?.state || {};
	console.log('myGoodHomework :>> ', myGoodHomework.resoursBOList);
	const handleDownload = (url: string) => {
		fetch(url, { mode: 'no-cors' })
			.then((res) => res.blob())
			.then((blob) => {
				const url = window.URL.createObjectURL(blob);
				const a = document.createElement('a');
				a.href = url;
				a.download = url.split('/').pop()!;
				a.style.display = 'none';
				document.body.appendChild(a);
				a.click();
				document.body.removeChild(a);
				URL.revokeObjectURL(url);
			});
	};

	return (
		<div className={styles['show-all']}>
			<Row justify={'start'} className={styles.detailHeader}>
				<div className={styles.detailTitle}>优秀作业详情</div>
			</Row>

			<Row gutter={24}>
				<Col span={24}>
					<Row className={styles.head}>
						{showHomework.lessonName} | {showHomework.name}
					</Row>
					<InfoRow label="作答人：" value={myGoodHomework.user.userName} />
					<Divider />
					<Row className={styles.info}>
						<p className={styles['info-p']}>题目：{showHomework.info}</p>
					</Row>
					{/* <Row className={styles.info}>
						<p className={styles['info-p1']}>作答：</p>
					</Row> */}
					<ShowEditor content={myGoodHomework.content} />
				</Col>
			</Row>

			<Row gutter={24}>
				<div className={styles.outline}>
					<div>
						<div className={styles.resoursListTitle}>
							<div className={styles.downloadTitle}>优秀作业资源文件</div>
						</div>
						<div className={styles.outlineCardContent}>
							<div
								style={{
									display:
										myGoodHomework.resoursBOList.length === 0
											? 'inline'
											: 'none',
								}}
								className={styles.outlineCardContent_info}
							>
								暂无作业资源文件
							</div>
							<div className={styles.resoursList}>
								{myGoodHomework.resoursBOList.map(
									(item: Link, index: number) => (
										<>
											<div style={{ display: 'flex', padding: '5px' }}>
												<a
													href={item.url}
													download={item.name}
													className={styles.download}
													key={index}
													target="_blank"
													// onClick={() => handleDownload(item.url)}
												>
													<ContainerTwoTone className={styles.downloadIcon} />
													{item.name}
												</a>
												<Button
													onClick={() => handleDownload(item.url)}
													size="small"
													style={{ marginLeft: '20px' }}
												>
													下载
												</Button>
											</div>
										</>
									)
								)}
							</div>
						</div>
					</div>
				</div>
			</Row>
		</div>
	);
}
