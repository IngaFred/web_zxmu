import React, { useState, useEffect } from 'react';
import { Avatar, Button, Input, message, Tooltip } from 'antd';
import { HeartOutlined, HeartFilled, CommentOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
import {
  getCommentByTermIdAndLessonId,
  postCommentByTermIdAndLessonId,
} from '../../../../service/course';
import store from '../../../../store';

import { useSelector } from 'react-redux';
import type { RootState } from '../../../../store';

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

  const handleMoreComments = () => {
    setDisplayedComments(displayedComments + DISPLAY_COUNT);
  };
  useEffect(() => {
    //获取评论
    if (props.termId !== '') {
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
        <span>暂无评论，留个言再走吧！</span>
      </div>

      {/* 有评论时展示 */}
      <div style={{ display: commentList.length > 0 ? 'inline' : 'none' }}>
        {/* 评论内容 */}
        <div className={styles.commentList}>
          {/* 评论内容 */}
          {displayCommentList.map((comment, index) => (
            <DiscussionItem
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

const DiscussionItem = (props: {
  comment: any;
  lessonId: string;
  termId: string;
}) => {
  // const userId = store.getState().user.infos.userId;
  const userId = useSelector((state: RootState) => (state.user.infos.userId))

  // console.log('userId',userId);
  

  const { comment, lessonId, termId } = props;
  // //定义回复框是否可见，默认不可见
  const [replyInputVisible, setReplyInputVisible] = useState(false);
  //显示回复输入框
  const handleReply = () => {
    setReplyInputVisible((data) => {
      return !data;
    });
  };

  // 定义回复内柔，默认为空
  const [replyContent, setReplyContent] = useState('');
  // 是否展开其它评论？
  const [showOthers, setShowOthers] = useState(false);

  //取消回复时操作：输入框消失、回复内容为空
  const handleCancelReply = () => {
    setReplyInputVisible(false);
    setReplyContent('');
  };
  // 修改回复内容时调用
  const handleReplyContentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setReplyContent(e.target.value);
  };
  const reply = (commentId: string) => {
    postCommentByTermIdAndLessonId({
      lessonId: lessonId,
      termId: termId,
      clientType: 'string',
      content: replyContent,
      previousCommentId: commentId,
      // @ts-ignore
      masterId: userId || '',
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
  };
  return (
    <div className={styles.commentCard}>
      <Avatar size={24} src={comment.userInfo.picUrl} />
      <div className={styles.commentUser}>
        {/* 评论头部 */}
        <div className={styles.commentCardHeader}>
          <span>{comment.userInfo.userName}</span>
        </div>
        {/* 点赞回复 */}
        <div className={styles.comment}>
          <div>{comment.content}</div>
          <div className={styles.likedAndReplay}>
            <Tooltip title="回复">
              <Button
                type="text"
                icon={<CommentOutlined />}
                onClick={handleReply}
              />
            </Tooltip>
          </div>
        </div>
        {/* 回复框 */}
        {replyInputVisible && (
          <div>
            <Input.TextArea
              value={replyContent}
              onChange={handleReplyContentChange}
              rows={4}
            />
            <div className={styles.btns}>
              <Button onClick={handleCancelReply}>取消</Button>
              <Button
                style={{ marginLeft: '10px' }}
                type="primary"
                onClick={() => {
                  reply(comment.commentId);
                }}
              >
                发送
              </Button>
            </div>
          </div>
        )}
        {/* 其它评论 */}
        {comment?.commentBOList &&
          comment?.commentBOList.length > 0 &&
          (showOthers ? (
            <div className={styles.commentList}>
              <div
                className={styles.showOthers}
                onClick={() => {
                  setShowOthers(false);
                }}
              >
                收起回复⋀
              </div>
              {comment?.commentBOList.map((item: any, index: number) => (
                <DiscussionItem
                  comment={item}
                  lessonId={props?.lessonId}
                  termId={props?.termId}
                  key={index}
                />
              ))}
            </div>
          ) : (
            <div
              className={styles.showOthers}
              onClick={() => {
                setShowOthers(true);
              }}
            >
              展开回复⋁
            </div>
          ))}
      </div>
    </div>
  );
};

export default Discussion;
