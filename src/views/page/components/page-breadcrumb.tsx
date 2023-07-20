import React from "react";
import { Breadcrumb } from "antd";
import styles from "../index.module.scss";
// 获取matches
import { matchRoutes, useLocation, useNavigate } from "react-router-dom";
import { routes } from "../../../router";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";

export default function HomeBreadcrumb() {
  const location = useLocation();
  const navigate = useNavigate();

  const matches = matchRoutes(routes, location);
  // items内部值是key+title
  let items: ItemType[] = [];
  let i = 0;
  // 遍历matches
  (matches ?? []).forEach((v) => {
    if (v.route.meta?.propRouter) {
      v.route.meta.propRouter.forEach((v1) => {
        const key = i++;
        //console.log(i, key);
        items.push({
          ...v1,
          // @ts-ignore
          title: (
            <a
              onClick={() => {
                //console.log(i, key);
                navigate(key - i);
              }}
            >
              {/* @ts-ignore */}
              {v1?.title}
            </a>
          ),
        });
      });
      items = items.concat();
    }
    items.push({
      key: v.pathnameBase,
      title: v.route.meta?.title,
      href: "#" + v.pathnameBase,
    });
  });

  return (
    /* Breadcrumb面包屑 */
    <Breadcrumb className={styles["home-breadcrumb"]} items={items} />
  );
}
