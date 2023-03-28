/* eslint-disable @typescript-eslint/no-redeclare */
import React, { useRef, useState, useEffect } from "react";
import { Avatar, Button, Input, message, Tooltip } from "antd";
import { HeartOutlined, HeartFilled, CommentOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";
//评论卡片接口
interface CommentCardProps {
  //用户头像
  userAvatar: string;
  //用户昵称
  userName: string;
  //评论内容
  content: string;
  //点赞数
  likes: number;
  //回复数量
  replyCount: number;
}
// const testComment: CommentCardProps = {
//   userAvatar: "",
//   userName: "",
//   content: "",
//   likes: 0,
//   replyCount: 0,
// };
const testComment: CommentCardProps[] = [
  {
    userAvatar:
      "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png",
    userName: "曲丽丽",
    content: "希望是一个好东西，也许是最好的，好东西是不会消亡的",
    likes: 12,
    replyCount: 10,
  },
];

const CommentCard: React.FC<CommentCardProps> = ({
  userAvatar,
  userName,
  content,
  likes,
  replyCount,
}) => {
  //是否有评论逻辑
  const [isHaveComment, setIsHaveComment] = useState({
    //无评论
    isHaveComment: false,
  });
  const flag = useRef<HTMLDivElement>(null)!;
  const flag2 = useRef<HTMLDivElement>(null)!;
  //定义是否点赞，默认不点赞
  const [liked, setLiked] = useState(false);
  const [like, setLikes] = useState(0);
  //定义回复框是否可见，默认不可见
  const [replyInputVisible, setReplyInputVisible] = useState(false);
  //定义回复内柔，默认为空
  const [replyContent, setReplyContent] = useState<CommentCardProps[]>([
    {
      userAvatar:
        "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png",
      userName: "曲丽丽",
      content: "希望是一个好东西，也许是最好的，好东西是不会消亡的",
      likes: 12,
      replyCount: 0,
    },
  ]);

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
  const handleReplyContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReplyContent([
      {
        userAvatar: "",
        userName: "",
        content: e.target.value,
        likes: 0,
        replyCount: 0,
      },
    ]);
  };
  //点赞功能
  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikes(likes - 1);
      message.warning("取消点赞");
    } else {
      setLiked(true);
      setLikes(likes + 1);
      message.success("点赞成功");
    }
  };

  return (
    <div className={styles.discussion}>
      <h1>评论</h1>

      <div
        className={styles.discussionUser}
        style={{ display: testComment.length === 0 ? "inline" : "none" }}
      >
        <img src={testComment[0].userAvatar} alt="未登录时图片" />
        <span>暂无评论，留个言再走吧！</span>
      </div>

      <div style={{ display: testComment.length > 0 ? "inline" : "none" }}>
        <div className={styles.discussionHot}>
          <h1>热门评论</h1>
        </div>

        <div className={styles.commentCard}>
          <Avatar size={48} src={testComment[0].userAvatar} />
          <div>
            <div>
              <span>{testComment[0].userName}</span>
              <span>
                <Tooltip title={liked ? "取消点赞" : "点赞"}>
                  <Button
                    type="text"
                    icon={liked ? <HeartFilled /> : <HeartOutlined />}
                    onClick={handleLike}
                  />
                </Tooltip>
                <span>{testComment[0].likes}</span>
                <Tooltip title="回复">
                  <Button
                    type="text"
                    icon={<CommentOutlined />}
                    onClick={handleReply}
                  />
                </Tooltip>
                <span>{testComment[0].replyCount}</span>
              </span>
            </div>
            <div>{testComment[0].content}</div>
            <div>
              {replyInputVisible && (
                <div>
                  <Input.TextArea
                    value={[]}
                    // onChange={handleReplyContentChange}
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
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
