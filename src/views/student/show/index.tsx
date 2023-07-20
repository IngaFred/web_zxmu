import { Button, Card, Col, Empty, Row, Tooltip, message } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import TermsSelect from "../../../components/terms-select";
import { getGoodHomeworks } from "../../../service/show";
import { RootState } from "../../../store";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Meta from "antd/es/card/Meta";
import type { ShowHomework } from "../detail";
// 优秀成果展示 （展示某个作业的具体内容）
// 邱致彬
interface User {
  userId: string;
  userName: string;
}
interface Term {
  termId: string;
  termName: string;
}
interface ResoursBOList {
  info: string;
  name: string;
  picUrl: string;
  url: string;
  resourceId: string;
}
interface GoodHomework {
  term: Term;
  user: User;
  resoursBOList: ResoursBOList[];
  score: string;
  content: string;
}
export default function Show() {
  const location = useLocation();
  const { termId, myHomeworkId, showHomework } = location?.state || {};
  const [limit, setLimit] = useState<string>("5");

  const [goodHomework, setGoodHomework] = useState<GoodHomework[] | undefined>(
    undefined
  );

  useEffect(() => {
    // 测试数据
    const testMyHomeworkId = "1642606856576876544";
    //console.log('数据 :>> ', testMyHomeworkId, termId, limit);

    // getGoodHomeworks(myHomeworkId, termId, limit).then((ret) => {
    getGoodHomeworks(testMyHomeworkId, termId, limit).then((ret) => {
      // //console.log('GoodRet :>> ', ret);
      const { success, data, errorMsg } = ret?.data || {};
      if (success) {
        message.success(errorMsg);
        //console.log('GoodData :>> ', data);
        setGoodHomework(data);
      }
    });
  }, []);
  //console.log('goodHomework :>> ', goodHomework);
  const navigate = useNavigate();
  const handleBtn = (
    myGoodHomework: GoodHomework,
    showHomework: ShowHomework
  ) => {
    navigate("/showDetail", {
      state: { myGoodHomework: myGoodHomework, showHomework: showHomework },
    });
  };

  return (
    <>
      <div className={styles["show-all"]}>
        <div className={styles.detailTitle}>优秀作业列表</div>
        <Row gutter={24}>
          {(goodHomework as GoodHomework[])?.length > 0 ? (
            <>
              {(goodHomework as GoodHomework[]).map(
                (item: GoodHomework, index: number) => {
                  return (
                    <>
                      <Col
                        span={6}
                        offset={2}
                        key={index}
                        className={styles.col}
                      >
                        <Card
                          key={index}
                          size="small"
                          className={styles.card}
                          actions={[
                            <Row justify={"start"}>
                              <Button
                                className={styles.rowBtn}
                                onClick={() => handleBtn(item, showHomework)}
                              >
                                查看优秀作业详情
                              </Button>
                            </Row>,
                          ]}
                        >
                          <Meta
                            title={item.user.userName}
                            // description={item.content}
                            style={{
                              height: "50px",
                              marginTop: "5px",
                              fontSize: "16px",
                            }}
                          />
                          <div>
                            分数：
                            <span className={styles.score}> {item.score} </span>
                          </div>
                        </Card>
                      </Col>
                    </>
                  );
                }
              )}
            </>
          ) : (
            <Col span={24} className={styles.empty}>
              <Empty description={"暂无优秀作业"} />
            </Col>
          )}
        </Row>
      </div>
    </>
  );
}

// const [user, setUser] = useState<User | undefined>(undefined);
// const [term, setTerm] = useState<Term | undefined>(undefined);
// const [resoursBOList, setResoursBOList] = useState<ResoursBOList[] | undefined>(
// 	undefined
// );
// //console.log('GoodUser :>> ', dataHomework?.user);
// //console.log('GoodTerm :>> ', dataHomework?.term);
// //console.log('GoodResoursBOList :>> ', dataHomework?.resoursBOList);
// setUser(dataHomework?.user);
// setTerm(dataHomework?.term);
// setResoursBOList(dataHomework?.resoursBOList);
// //console.log('user :>> ', user);
// //console.log('term :>> ', term);
// //console.log('resoursBOList :>> ', resoursBOList);
// const myTermId = useSelector((state: RootState) => state.user.termId);
// //console.log('myTermId :>> ', myTermId);
