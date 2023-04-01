import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import styles from '../index.module.scss';
// 得到路由
import { routes } from '../../../router';
import { RouteObject } from 'react-router-dom';
// 克隆过滤路由
import _ from 'lodash';
import { useLocation, matchRoutes, Link } from 'react-router-dom';
// 拿到对应用户权限
import { getPerm } from '../../../service/page';
// 定义一个接口，表示HomeAside组件的props类型
interface HomeAsideProps {}
// 定义一个接口，表示getPerm函数的返回值类型
interface Perm {
	permName: string;
}
// 定义常量对象，表示路由权限数组
const permission = {
	stu: ['home', 'personal', 'course', 'list', 'detail', 'show'],
	tea: [
		'home',
		'personal',
		'courseList',
		'courseTeacher',
		'detailTeacher',
		'listTeacher',
		'scoringTeacher',
		'showTeacher',
		'newTeacher',
		'information',
	],
};
// 定义过滤函数
const filter = (menus: RouteObject[], p: string[]) => {
	const newMenu: RouteObject[] = [];
	menus.forEach((item) => {
		const childrens = item.children ? filter(item.children, p) : undefined;
		// console.log('p,item', p, item.name);
		if (p.includes(item.name)) {
			// console.log(true);
			// @ts-ignore
			newMenu.push({
				...item,
				children: childrens,
			});
		}
	});
	// console.log('newMenu', newMenu);
	return newMenu;
};
// 定义一个组件，使用HomeAsideProps接口作为props类型
const HomeAside: React.FC<HomeAsideProps> = () => {
	// console.log('000');
	// 定义一个状态变量，表示权限数据
	const [myPerm, setMyPerm] = useState<Perm | null>(null);
	// 定义一个状态变量，表示菜单项数据
	const [myItems, setMyItems] = useState<RouteObject[] | null>([]);
	// 使用useEffect钩子函数，在组件挂载后，获取权限数据和菜单项数据
	useEffect(() => {
		// console.log(111);
		// 获取权限数据，并存储在myPerm状态变量中
		getPerm().then((ret) => {
			// console.log('2222', ret);

			const { success } = ret?.data || undefined;
			const perm = ret?.data?.data?.[0] || [];
			if (success) {
				// console.log(perm?.permName);
				setMyPerm(perm?.permName);
				// 根据权限数据，使用过滤函数的对象映射，过滤菜单项，并存储在items状态变量中
				if (perm?.permName === '学生权限') {
					const items = filter(routes, permission.stu);
					// console.log('item', items);

					setMyItems(items);
				} else {
					const items = filter(routes, permission.tea);
					setMyItems(items);
				}
			}
		});
	}, []);
	// 克隆路由数组，并存储在menus变量中
	// const menus: RouteObject[] = _.cloneDeep(routes);

	// 获取当前的路由位置，并存储在location变量中
	const location = useLocation();
	// 变成具备动态菜单渲染的路由menu 转换成菜单栏
	const items: MenuProps['items'] = myItems?.map((v1) => {
		const children = v1.children?.map((v2) => {
			return {
				key: v1.path! + v2.path!,
				// 实现路由跳转 标签
				label: <Link to={v1.path! + v2.path!}> {v2.meta?.title} </Link>,
				icon: v2.meta?.icon,
			};
		});
		return {
			// 不能将类型 key: string | undefined; 进行非空断言
			key: v1.path! as string,
			label: v1.meta?.title,
			icon: v1.meta?.icon,
			children,
		};
	});
	const matchs = matchRoutes(routes, location);
	const subpath = matchs![0].pathnameBase || '';
	const path = matchs![1].pathnameBase || '';
	// console.log('myitems', myItems);

	return (
		<Menu
			selectedKeys={[path]}
			openKeys={[subpath]}
			mode='inline'
			items={myItems?.map((v1) => {
				const children = v1.children?.map((v2) => {
					return {
						key: v1.path! + v2.path!,
						// 实现路由跳转 标签
						label: <Link to={v1.path! + v2.path!}> {v2.meta?.title} </Link>,
						icon: v2.meta?.icon,
					};
				});
				return {
					// 不能将类型 key: string | undefined; 进行非空断言
					key: v1.path! as string,
					label: v1.meta?.title,
					icon: v1.meta?.icon,
					children,
				};
			})}
			className={styles['home-aside']}
		/>
	);
};
export default HomeAside;

// import React, { useEffect, useState } from "react";
// import { Menu } from "antd";
// import type { MenuProps } from "antd";
// import styles from "../index.module.scss";

// // 得到路由
// import { routes } from "../../../router";
// import { RouteObject } from "react-router-dom";
// // 克隆过滤路由
// import _ from "lodash";
// import { useLocation, matchRoutes, Link } from "react-router-dom";

// export default function HomeAside() {
//   const location = useLocation();

//   const menus = _.cloneDeep(routes).filter((v) => {
//     v.children = v.children?.filter((v) => {
//       return v.name !== "/";
//           });
//     return v.name !== "/";
//   });

//   // 变成具备动态菜单渲染的路由menu 转圜成菜单栏
//   const items: MenuProps["items"] = menus.map((v1) => {
//     const children = v1.children?.map((v2) => {
//       return {
//         key: v1.path! + v2.path!,
//         // 实现路由跳转 标签
//         label: <Link to={v1.path! + v2.path!}> {v2.meta?.title} </Link>,
//         icon: v2.meta?.icon,
//       };
//     });
//     return {
//       // 不能将类型 key: string | undefined; 进行非空断言
//       key: v1.path! as string,
//       label: v1.meta?.title,
//       icon: v1.meta?.icon,
//       children,
//     };
//   });
//   const matchs = matchRoutes(routes, location);
//   const subpath = matchs![0].pathnameBase || "";
//   const path = matchs![1].pathnameBase || "";

//   return (
//     <Menu
//       selectedKeys={[path]}
//       openKeys={[subpath]}
//       mode="inline"
//       items={items}
//       className={styles["home-aside"]}
//     />
//   );
// }
