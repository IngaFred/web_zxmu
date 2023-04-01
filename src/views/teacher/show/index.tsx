import React from 'react';
import { Col, Empty, Row } from 'antd';
import styles from './index.module.scss';
// 成果展示（展示某个作业的具体内容）
// 章徐松
export default function Show() {
	return (
		<div className={styles['show-all']}>
			<Row>
				<h1>优秀成果展示</h1>
				<Col span={24} className={styles.col}>
					<Empty description={'暂无优秀作业'} />
				</Col>
			</Row>
		</div>
	);
}
