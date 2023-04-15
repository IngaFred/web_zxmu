import React, { useState, useEffect, useCallback } from 'react';
import { Avatar, Button, Input, message, Tooltip } from 'antd';
import { CommentOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
import {
  getCommentByTermIdAndLessonId,
  postCommentByTermIdAndLessonId,
} from '../../../../service/course';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../../store';
import TermsSelect from '../../../../components/terms-select';
type LessonId = {
  lessonId: string;
};
const Discussion = (props: LessonId) => {
  //主题下的详细评论
  const DISPLAY_COUNT = 5;
  const [displayedComments, setDisplayedComments] = useState(DISPLAY_COUNT);
  const [commentList, setCommentList] = useState<any[]>([]);
  const [displayCommentList, setDisplayCommentList] = useState<any[]>([]);
  const termId = useSelector((state: RootState) => state.user.termId);

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
      termId: termId,
      clientType: 'web_client',
      content: replyContent,
    }).then((res) => {
      if (res.status === 200) {
        if (res.data.success) {
          message.success('回复成功');
          getCommentInfo();
        } else {
          message.error(res.data.errorMsg);
        }
      } else {
        message.error('请求失败');
      }
    });
    setReplyContent('');
  };

  const getCommentInfo = () => {
    //获取评论
    if (termId !== '') {
      getCommentByTermIdAndLessonId(props.lessonId, termId).then((res) => {
        if (res.status === 200) {
          if (res.data.success) {
            setCommentList(res.data.data);
          } else {
            message.error(res.data.errorMsg);
          }
        } else {
          message.error('请求失败');
        }
      });
    } else {
      return;
    }
  };

  useEffect(() => {
    console.log('getCommentInfo();');
    getCommentInfo();
  }, [termId]);

  useEffect(() => {
    setDisplayCommentList(commentList.slice(0, displayedComments));
  }, [displayedComments, commentList]);
  return (
    <div className={styles.discussion}>
      {/* 标题 */}
      <div className={styles.title}>
        评论
        <TermsSelect />
      </div>

      {/* 无评论时展示 */}
      {/* 有评论时展示 */}
      {commentList.length > 0 ? (
        <div>
          {/* 评论内容 */}
          <div className={styles.commentList}>
            {/* 评论内容 */}
            {displayCommentList.map((comment, index) => (
              <DiscussionItem
                getCommentInfo={getCommentInfo}
                comment={comment}
                lessonId={props?.lessonId}
                termId={termId}
                key={index}
              />
            ))}
            <div className={styles.moreReplay} onClick={handleMoreComments}>
              更多评论
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.discussionUser}>
          <span className={styles.discussionUserSpan}>
            暂无评论，留个言再走吧！
          </span>
        </div>
      )}

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
  );
};

export const DiscussionItem = (props: {
  comment: any;
  lessonId: string;
  termId: string;
  getCommentInfo: () => void;
}) => {
  const { comment, lessonId, termId, getCommentInfo } = props;
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
  const reply = (commentId: string, masterId: string) => {
    postCommentByTermIdAndLessonId({
      lessonId: lessonId,
      termId: termId,
      clientType: 'web_client',
      content: replyContent,
      previousCommentId: commentId,
      masterId: masterId === 'null' ? commentId : masterId,
    }).then((res) => {
      if (res.status === 200) {
        if (res.data.success) {
          message.success('回复成功');
          getCommentInfo();
        } else {
          message.error(res.data.errorMsg);
        }
      } else {
        message.error('请求失败');
      }
    });
    setReplyInputVisible(false);
    setReplyContent('');
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
            <div className={styles.cancelBt}>
              <Button onClick={handleCancelReply}>取消</Button>
              <Button
                style={{ marginLeft: '10px' }}
                type="primary"
                onClick={() => {
                  reply(comment.commentId, comment.masterId);
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
                  getCommentInfo={getCommentInfo}
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
