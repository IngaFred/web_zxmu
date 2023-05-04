import React, { useEffect, useState } from 'react';
import {
	AppstoreOutlined,
	MailOutlined,
	SettingOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import styles from '../index.module.scss';
import { routes } from '../../../router';
import { Link, RouteObject, matchRoutes, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../../store';
import { getPerm } from '../../../service/page';
import { updateMyPrem } from '../../../store/modules/user';

interface Perm {
	permName: string;
}
const permission = {
	stu: ['home', 'list', 'show', 'information'],
	tea: ['home', 'courseList', 'information'],
};
const filter = (menus: RouteObject[], p: string[]) => {
	const newMenu: RouteObject[] = [];
	menus.forEach((item) => {
		const myChildren = item.children ? filter(item.children, p) : undefined;
		if (p.includes(item.name)) {
			// @ts-ignore
			newMenu.push({
				...item,
				children: myChildren,
			});
		}
	});
	return newMenu;
};
const App: React.FC = () => {
	const dispatch = useAppDispatch();
	const [myItems, setMyItems] = useState<RouteObject[] | null>([]);
	useEffect(() => {
		getPerm().then((ret) => {
			const { success } = ret?.data || undefined;
			const perm = ret?.data?.data?.[0] || [];
			if (success) {
				dispatch(updateMyPrem(perm?.permName));
				if (perm?.permName === '学生权限') {
					const items = filter(routes, permission.stu);
					setMyItems(items);
				} else {
					const items = filter(routes, permission.tea);
					setMyItems(items);
				}
			}
		});
	}, []);
	const location = useLocation();
	const matchs = matchRoutes(routes, location);
	const subpath = matchs![0].pathnameBase || '';
	const path = matchs![1].pathnameBase || '';
	let menuItems: MenuProps['items'] | undefined = undefined;
	const items: MenuProps['items'] = myItems?.map((v1) => {
		menuItems = v1.children?.map((v2) => {
			return {
				key: v1.path! + v2.path!,
				label: <Link to={v1.path! + v2.path!}> {v2.meta?.title} </Link>,
				// icon: v2.meta?.icon,
			};
		});
		return {
			key: v1.path! as string,
			label: v1.meta?.title,
			// icon: v1.meta?.icon,
			menuItems,
		};
	});
	// const items: MenuProps['items'] = allItems[0] || undefined;
	console.log('items :>> ', items);
	return (
		<Menu
			selectedKeys={[path]}
			openKeys={[subpath]}
			mode="horizontal"
			items={menuItems}
		/>
	);
};

export default App;
