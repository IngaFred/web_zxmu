import { Button, Col, Empty, Row, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import TermsSelect from '../../../components/terms-select';
// 优秀成果展示 （展示某个作业的具体内容）
// 邱致彬
export default function index() {
	return (
		<>
			<div className={styles['show-all']}>
				<Row>
					<h1>优秀作业展示</h1>
					<Col span={24} className={styles.col}>
						<Empty description={'暂无优秀作业'} />
					</Col>
				</Row>
			</div>
		</>
	);
}

// 	const fun1 = (maxNum: number, deep: number) => {
// 		if (deep === 0) {
// 			return [];
// 		}
// 		const list = [];
// 		const num = Math.random() * maxNum;
// 		const isExpand = Math.random() * 10 > 5;
// 		for (let i = 0; i < num; i++) {
// 			list[i] = {
// 				title: deep + ' - ' + i,
// 				label: '测试文案',
// 				expand: isExpand,
// 			};
// 			// @ts-ignore
// 			list[i].children = fun1(maxNum, deep - 1);
// 		}
// 		return list;
// 	};

// 	return (
// 		<>
// 			<TreeComponent
// 				title={'Test'}
// 				label={'测试'}
// 				state={true}
// 				children={fun1(3, 3)}
// 			/>

// 			<TermsSelect />
// 		</>
// 	);
// }

// const TreeComponent = (props: any) => {
// 	const { title, label, children, expand } = props;
// 	// const flag = typeof expand === 'undefined';
// 	// const [state, setState] = useState(flag ? expand: true);
// 	const [state, setState] = useState(expand ?? true);
// 	// ?? 如果expand类型是undefined或null 默认是转换成 false 改成？？就是true

// 	const headleBtn = () => {
// 		setState(!state);
// 	};
// 	return (
// 		<>
// 			<div>
// 				{title}|{label}
// 				{children.length > 0 && (
// 					<Button onClick={headleBtn} size="small" style={{ marginLeft: 5 }}>
// 						{state ? '收起' : '展开'}
// 					</Button>
// 				)}
// 			</div>
// 			<br></br>
// 			{state && (
// 				<div style={{ marginLeft: 20 }}>
// 					{children?.map((item: any, index: number) => {
// 						return <TreeComponent {...item} key={index} />;
// 					})}
// 				</div>
// 			)}
// 		</>
// 	);
// };
