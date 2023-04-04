import React, { useState, useEffect } from "react";
import { Avatar, Button, Input, message, Tooltip } from "antd";
import { HeartOutlined, HeartFilled, CommentOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";

type LessonId = {
  lessonId: string;
};
const Discussion = (LessonId: LessonId, termId: string) => {
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
      message.success("点赞成功");
    }
  };
  //存在的主题
  const [themeList, setThemeList] = useState<any[]>([]);
  //主题下的详细评论
  const DISPLAY_COUNT = 5;
  const [displayedComments, setDisplayedComments] = useState(DISPLAY_COUNT);
  const [themeComment, setThemeComment] = useState<any>({});
  const [themeCommentList, setThemeCommentList] = useState<any[]>([]);
  const [displayCommentList, setDisplayCommentList] = useState<any[]>([]);
  const handleMoreComments = () => {
    setDisplayedComments(displayedComments + DISPLAY_COUNT);
  };
  //控制点赞数
  const [commentId, setCommentId] = useState("");
  const [newTheme, setNewTheme] = useState<any[]>([]);
  //获取我自己创建的主题帖
  // const [myTheme, setMyTheme] = useState<any[]>([]);
  useEffect(() => {
    //获取设置存在的主题
    // getThemeList().then((res) => {
    //   if (res.status === 200) {
    //     if (res.data.success) {
    //       setThemeList(res.data.data);
    //     } else {
    //       message.error(res.data.data.errorMsg);
    //     }
    //   } else {
    //     message.error("请求失败");
    //   }
    // });
    //主题下详细的评论
    interface themeId {
      themeId: string;
    }
    // const themeId = localStorage.getItem("themeId");
    const testThemeId: themeId = {
      themeId: "1635354389891915776",
    };
    // getThemeCommentList(testThemeId).then((res) => {
    //   if (res.status === 200) {
    //     if (res.data.success) {
    //       setThemeComment(res.data.data);
    //       setThemeCommentList(res.data.data.commentList);
    //       setDisplayCommentList(
    //         res.data.data.commentList.slice(0, DISPLAY_COUNT)
    //       );
    //     } else {
    //       message.error(res.data.data.errorMsg);
    //     }
    //   } else {
    //     message.error("请求失败");
    //   }
    // });
  }, []);
  useEffect(() => {
    setDisplayCommentList(themeCommentList.slice(0, displayedComments));
    // console.log(themeCommentList);
  }, [displayedComments, themeCommentList]);

  return (
    <div className={styles.discussion}>
      {/* 标题 */}
      <h1>评论</h1>

      {/* 无评论时展示 */}
      <div
        className={styles.discussionUser}
        style={{ display: themeCommentList.length === 0 ? "inline" : "none" }}
      >
        <span>暂无评论，留个言再走吧！</span>
      </div>

      {/* 有评论时展示 */}
      <div style={{ display: themeCommentList.length > 0 ? "inline" : "none" }}>
        {/* 热评标题 */}
        <div className={styles.discussionHot}>
          <h1>热门评论</h1>
        </div>

        {/* 评论内容 */}
        <div className={styles.commentCard}>
          {/* 评论内容 */}
          <div className={styles.themeName}>主题：{themeComment.themeName}</div>
          {displayCommentList.map((comment, index) => (
            <div key={index}>
              {/* 评论头部 */}
              <div className={styles.commentCardHeader}>
                <Avatar size={48} src={comment.userInfo.picUrl} />
                <span>{comment.userInfo.userName}</span>
              </div>
              {/* 点赞回复 */}
              <div className={styles.comment}>
                <div>{comment.content}</div>
                <div className={styles.likedAndReplay}>
                  <Tooltip title={liked ? "取消点赞" : "点赞"}>
                    <Button
                      type="text"
                      icon={liked ? <HeartFilled /> : <HeartOutlined />}
                      // value={item.commentId}
                      // onClick={() => handleLike(item.commentId)}
                    />
                  </Tooltip>
                  {/* <span>{item.hot}</span> */}
                  <Tooltip title="回复">
                    <Button
                      type="text"
                      icon={<CommentOutlined />}
                      onClick={handleReply}
                    />
                  </Tooltip>
                  {/* <span>{item.commentNum}</span> */}
                </div>
              </div>
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
          <div className={styles.moreReplay} onClick={handleMoreComments}>
            更多回复
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discussion;
