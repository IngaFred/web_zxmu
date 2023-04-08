import { ContainerTwoTone } from '@ant-design/icons';
import { Select, Input } from 'antd';
import {
	Button,
	Card,
	Col,
	Empty,
	message,
	Row,
	Space,
	Tooltip,
	UploadFile,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getDetails } from '../../../service/detail';
import MyEditor from './components/myEditor';
import MyUpload from './components/myUpload';
import styles from './index.module.scss';
import { putCourse } from '../../../service/scoring';
// 作业批改（查看作业，提交作业，成果展示列表，批改作业）
// 娄竞楷
interface Homework {
	homeworkId: string;
	lessonId: string;
	lessonName: string;
	creatorName: string;
	info: string;
	name: string;
	start: string;
	end: string;
	status: string;
	resoursBOList: Resource[];
}
interface Resource {
	resourceId: string;
	belongId: string;
	userId: string;
	url: string;
	info: string;
}

export default function Detail() {
	const location = useLocation();
	const { lessonId: myLesson, homeworkId: myHomework } = location?.state || {}; // 解构赋值

	const [homeworkBOList, setHomeworkBOList] = useState<Homework | null>();
	const [myResoursBOList, setMyResoursBOList] = useState([]);

	// 使用useState创建一个本地状态fileList，用来存放文件列表
	const [fileList, setFileList] = useState<UploadFile[]>([]);
	// 定义一个handleChange函数，用来更新fileList状态
	const handleChange = (info: { fileList: UploadFile[] }) => {
		setFileList(info.fileList);
	};
	// 定义一个handleRemove函数，用来从fileList中移除文件
	const handleRemove = (file: UploadFile) => {
		setFileList(fileList.filter((f) => f.uid !== file.uid));
	};

	type scoreParams = {
		submitHomeworkId: string;
		score: string;
	};

    const [scoreParam,setScoreParam] = useState<scoreParams>()
    const handleSend = (scores: string) =>{
      console.log('location?.state',location?.state)
      if(!scores){
        message.warning('所打数不能为空')
        return null;
      }
      const score:scoreParams={
        submitHomeworkId:myHomework,
        score:scores
      }
      // console.log(score);
      
      setScoreParam(score)
      handleInputScore(score);
    }
    
    const handleInputScore = (scoreParam:scoreParams) =>{
      
      putCourse(scoreParam).then((ret)=>{
        if(ret.status === 200){
          console.log(ret);
          
            if(ret.data.success){
              console.log(scoreParam.score);
              
              message.info(ret.data.errorMsg)
            }else{              
              console.log(scoreParam.score);

					message.warning(ret.data.errorMsg);
				}
			} else {
				message.error('请求失败！');
			}
		});
	};

	const [scores, setScores] = useState('');
	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFen(e.target.value);
		setScores(e.target.value);
	};
	const [fen, setFen] = useState('');

	// 使用es6的解构赋值，来简化你对homeworkBOList对象的访问
	const { lessonName, name, creatorName, start, end, info } =
		homeworkBOList || {};

	return (
		<div className={styles.detailALL}>
			<Row justify={'space-between'} className={styles.detailHeader}>
				<h2>作业详情</h2>
			</Row>

			<Row gutter={24}>
				<Col span={20}>
					<Row className={styles.head}>
						<h1>
							{name}
						</h1>
					</Row>
          <br />
					{/* InfoRow 封装组件 */}
					<InfoRow
						label="发布日期："
						value={new Date(homeworkBOList?.start || '').toLocaleString(
							'zh-CN',
							{
								year: 'numeric',
								month: '2-digit',
								day: '2-digit',
								hour: '2-digit',
								minute: '2-digit',
							}
						)}
					/>
					<InfoRow
						label="截止日期："
						value={new Date(homeworkBOList?.end || '').toLocaleString('zh-CN', {
							year: 'numeric',
							month: '2-digit',
							day: '2-digit',
							hour: '2-digit',
							minute: '2-digit',
						})}
					/>
					<Row className={styles.info}>
						<p className={styles['info-p']}>{info}</p>
					</Row>
          <br/>
					<div className={styles.detailALL}>
						<h2>作业批改</h2>
						<br></br>
						<Space.Compact style={{ width: '10%' }}>
							<Input value={fen} onChange={(e) => handleInput(e)} />
							<Button type="primary" onClick={() => handleSend(scores)}>
								提交
							</Button>
						</Space.Compact>
					</div>
				</Col>
				{/* 资源下载控件 */}
				<Col span={4}>
					<Card size="small" title="学生作业资源">
						<Space direction={'vertical'} align={'center'}>
							<Row>
								{myResoursBOList?.length > 0 ? (
									myResoursBOList?.map((item: Resource, index) => (
										<Tooltip key={index} title={'下载'} color="grey">
											<a href={item?.url} className={styles.download}>
												<ContainerTwoTone style={{ fontSize: '40px' }} />
											</a>
										</Tooltip>
									))
								) : (
									<Empty description="暂无可下载资源" />
								)}
							</Row>
						</Space>
					</Card>
				
				</Col>
			</Row>
			<br></br>
		</div>
	);
}
// 自定义组件，来封装一些重复的逻辑和样式
function InfoRow(props: { label: string; value: string | undefined }) {
	return (
		<Row className={styles.infoHead}>
			<span>{props.label}</span>
			<p>{props.value}</p>
		</Row>
	);
}
