import React, { useState, useEffect } from "react";
import { Avatar, Button, Input, message, Tooltip } from "antd";
import { HeartOutlined, HeartFilled, CommentOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";
import {
  //提升热度
  putHot,
  //请求创建主题帖方法
  postThemeInvitation,
  //请求发表帖子评论的方法
  postInvitation,
  //删除一个主题帖
  deleteInvitation,
  //用户修改主题帖标题
  putThemeTitle,
  //用户获取自己发布的主题帖
  getMyTheme,
} from "../../../../service/course";

const CommentCard: React.FC = () => {
  //是否有评论逻辑
  const [isHaveComment, setIsHaveComment] = useState({
    //无评论
    isHaveComment: false,
  });
  //定义是否点赞，默认不点赞
  const [liked, setLiked] = useState(false);
  const [like, setLikes] = useState(0);
  //定义回复框是否可见，默认不可见
  const [replyInputVisible, setReplyInputVisible] = useState(false);
  //定义回复内柔，默认为空
  const [replyContent, setReplyContent] = useState<[]>([]);

  //显示回复输入框
  const handleReply = () => {
    setReplyInputVisible(true);
  };
  //取消回复时操作：输入框消失、回复内容为空
  const handleCancelReply = () => {
    setReplyInputVisible(false);
    setReplyContent([]);
  };
  //修改回复内容时调用
  const handleReplyContentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setReplyContent([]);
  };
  //点赞功能
  const handleLike = (commentId: string) => {
    if (liked) {
      setLiked(false);
      message.warning("取消点赞");
    } else {
      setCommentId(commentId);
      setLiked(true);
      setNewTheme(
        myTheme.map((item) => {
          if (commentId === item.comment.commentId) {
            const hots = item.hot + 1;
            item.hot = hots;
          }
          console.log(commentId);
          console.log(item.comment.commentId);

          return item;
        })
      );
      message.success("点赞成功");
    }
  };
  //控制点赞数
  const [commentId, setCommentId] = useState("");
  const [newTheme, setNewTheme] = useState<any[]>([]);
  //获取我自己创建的主题帖
  const [myTheme, setMyTheme] = useState<any[]>([]);
  useEffect(() => {
    getMyTheme().then((res) => {
      if (res.data.success) {
        setMyTheme(res.data.data);
      } else {
        message.error(res.data.errorMsg);
      }
    });
  }, []);
  useEffect(() => {
    setMyTheme(newTheme);
  }, [newTheme]);

  return (
    <div className={styles.discussion}>
      {/* 标题 */}
      <h1>评论</h1>

      {/* 无评论时展示 */}
      <div
        className={styles.discussionUser}
        style={{ display: myTheme.length === 0 ? "inline" : "none" }}
      >
        <span>暂无评论，留个言再走吧！</span>
      </div>

      {/* 有评论时展示 */}
      <div style={{ display: myTheme.length > 0 ? "inline" : "none" }}>
        {/* 热评标题 */}
        <div className={styles.discussionHot}>
          <h1>热门评论</h1>
        </div>

        {/* 评论内容 */}

        {myTheme.map((comment, index) => (
          <div key={index}>
            <div className={styles.commentCard}>
              {/* 评论头部 */}
              <div className={styles.commentCardHeader}>
                <Avatar size={48} src={comment.comment.userInfo.picUrl} />
                <span>{comment.comment.userInfo.userName}</span>
              </div>
              {/* 评论内容 */}
              <div className={styles.themeName}>主题：{comment.themeName}</div>
              <div className={styles.comment}>
                <div>{comment.comment.content}</div>
                <div className={styles.likedAndReplay}>
                  <Tooltip title={liked ? "取消点赞" : "点赞"}>
                    <Button
                      type="text"
                      icon={liked ? <HeartFilled /> : <HeartOutlined />}
                      value={comment.commentId}
                      onClick={() => handleLike(comment.comment.commentId)}
                    />
                  </Tooltip>
                  <span>{comment.hot}</span>
                  <Tooltip title="回复">
                    <Button
                      type="text"
                      icon={<CommentOutlined />}
                      onClick={handleReply}
                    />
                  </Tooltip>
                  <span>{comment.commentNum}</span>
                </div>
              </div>
            </div>
            {/* 点赞回复 */}

            <div>
              {/* {condition && expression} replyInputVisible为true执行 */}
              {replyInputVisible && (
                <div>
                  <Input.TextArea
                    // value={replyContent[0].content}
                    onChange={handleReplyContentChange}
                    rows={4}
                  />
                  <div>
                    <Button type="primary" onClick={handleCancelReply}>
                      取消
                    </Button>
                    <Button
                      type="primary"
                      onClick={() => message.success("评论成功")}
                    >
                      发送
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentCard;
