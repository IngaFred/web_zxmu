import React, { useState, useEffect, useCallback } from 'react';
import { Avatar, Button, Input, message, Tooltip } from 'antd';
import { HeartOutlined, HeartFilled, CommentOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
import {
	getCommentByTermIdAndLessonId,
	postCommentByTermIdAndLessonId,
} from '../../../../service/course';

import { useSelector } from 'react-redux';
import type { RootState } from '../../../../store';
import { DiscussionItem } from '../../../teacher/course/discussion';

type LessonId = {
	lessonId: string;
	termId: any;
};
const Discussion = (props: LessonId) => {
	//主题下的详细评论
	const DISPLAY_COUNT = 5;
	const [displayedComments, setDisplayedComments] = useState(DISPLAY_COUNT);
	const [commentList, setCommentList] = useState<any[]>([]);
	const [displayCommentList, setDisplayCommentList] = useState<any[]>([]);
	console.log(props);
	// 定义回复内柔，默认为空
	const [replyContent, setReplyContent] = useState('');
	//取消回复时操作：输入框消失、回复内容为空
	const handleCancelReply = () => {
		setReplyContent('');
	};
	const handleMoreComments = () => {
		setDisplayedComments(displayedComments + DISPLAY_COUNT);
	};
	//评论业务
	const handleReplyContentChange = (
		e: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setReplyContent(e.target.value);
	};
	const reply = () => {
		postCommentByTermIdAndLessonId({
			lessonId: props.lessonId,
			termId: props.termId,
			clientType: 'web_client',
			content: replyContent,
		}).then((res) => {
			if (res.status === 200) {
				if (res.data.success) {
					message.success('回复成功');
				} else {
					message.error(res.data.errorMsg);
				}
			} else {
				message.error('请求失败');
			}
		});
		setReplyContent('');
	};
	const getCommentInfo = useCallback(() => {
		//获取评论
		if (props.termId !== '' && props.termId !== undefined) {
			getCommentByTermIdAndLessonId(props.lessonId, props.termId).then(
				(res) => {
					if (res.status === 200) {
						if (res.data.success) {
							setCommentList(res.data.data);
						} else {
							message.error(res.data.errorMsg);
						}
					} else {
						message.error('请求失败');
					}
				}
			);
		} else {
			return;
		}
	}, [props]);
	useEffect(() => {
		getCommentInfo();
	}, [props]);

	useEffect(() => {
		setDisplayCommentList(commentList.slice(0, displayedComments));
	}, [displayedComments, commentList]);

	return (
		<div className={styles.discussion}>
			{/* 标题 */}
			<h1>评论</h1>

			{/* 无评论时展示 */}
			<div
				className={styles.discussionUser}
				style={{ display: commentList.length === 0 ? 'inline' : 'none' }}
			>
				<span className={styles.discussionUserSpan}>
					暂无评论，留个言再走吧！
				</span>
				<div className={styles.firstCommentInput}>
					<Input.TextArea
						value={replyContent}
						onChange={handleReplyContentChange}
						rows={4}
						style={{ width: '1198px' }}
					/>
					<div className={styles.cancelBt}>
						<Button onClick={handleCancelReply}>取消</Button>
						<Button
							style={{ marginLeft: '10px' }}
							type="primary"
							onClick={() => {
								reply();
							}}
						>
							发送
						</Button>
					</div>
				</div>
			</div>

			{/* 有评论时展示 */}
			<div style={{ display: commentList.length > 0 ? 'inline' : 'none' }}>
				{/* 评论内容 */}
				<div className={styles.commentList}>
					{/* 评论内容 */}
					{displayCommentList.map((comment, index) => (
						<DiscussionItem
							getCommentInfo={getCommentInfo}
							comment={comment}
							lessonId={props?.lessonId}
							termId={props?.termId}
							key={index}
						/>
					))}
					<div className={styles.moreReplay} onClick={handleMoreComments}>
						更多评论
					</div>
				</div>
			</div>
		</div>
	);
};

export default Discussion;
