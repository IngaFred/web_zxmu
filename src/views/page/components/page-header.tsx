import React from 'react';
import classNames from 'classnames';
import styles from '../index.module.scss';
import { Dropdown, Badge, Space, Avatar } from 'antd';
import type { MenuProps } from 'antd';
import { BellOutlined } from '@ant-design/icons';
// infos
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store';
// token操作+同步方法
import { useAppDispatch } from '../../../store';
import { clearToken } from '../../../store/modules/user';
import { Link, useNavigate } from 'react-router-dom';
import HomeMenu from './page-menu';
import logo from '../../../assets/images/logo/myLogo.png';

export default function HomeHeader() {
  // infos,获取用户name,head
  const name = useSelector(
    (state: RootState) => state.user.infos.userName
  ) as string;
  const head = useSelector(
    (state: RootState) => state.user.infos.picUrl
  ) as string;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const headleMyself = () => {
    navigate('/personal');
  };
  const headleLogout = () => {
    // 清除token
    dispatch(clearToken());
    // 延时返回
    setTimeout(() => {
      // window.location.replace('/login')
      window.location.replace('/');
    });
  };
  const items1: MenuProps['items'] = [
    {
      key: '1',
      label: <div>信息提示</div>,
    },
  ];
  const items2: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div onClick={headleMyself} style={{ padding: '5px' }}>
          个人中心
        </div>
      ),
    },
    {
      key: '2',
      // 实现退出 清除token 到login
      label: (
        <div onClick={headleLogout} style={{ padding: '5px' }}>
          退出登录
        </div>
      ),
    },
  ];

  return (
    <div className={styles['home-header']}>
      {/* logo */}
      <span className={styles['home-header-logo']}>
        <img src={logo} className={styles['home-icon']} />
      </span>
      {/* name */}
      <span className={styles['home-header-title']}>最美护理社会实践课</span>
      {/* 菜单栏 */}
      <div className={styles['home-menu']}>
        <HomeMenu />
      </div>
      {/* Dropdown下拉菜单2  Avatar头像*/}
      <Dropdown menu={{ items: items2 }} arrow placement="bottom">
        {/* space 间距包住 */}
        <Space className={styles['home-header-space']}>
          {/* Avatar头像 */}
          <Avatar size="large" src={head} /> {name}
        </Space>
      </Dropdown>
    </div>
  );
}
