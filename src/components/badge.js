import React from 'react';
import { Avatar, Dropdown, Menu } from 'antd';
import Icon, { UserOutlined } from '@ant-design/icons';
import { IoIosArrowDown } from 'react-icons/io';
import { Link } from 'react-router-dom';
import constants from '../utils/constants';
import { logout } from '../services/localstorage';

const AdminNavMenu = () => {
  return (
    <Menu>
      <Menu.Item>
        <Link to='/reset-psw'>Editar contraseña</Link>
      </Menu.Item>
      <Menu.Item danger onClick={logout}>
        <Link to='/login'>Logout</Link>
      </Menu.Item>
    </Menu>
  );
};

export const AdminMenu = () => {
  return (
    <div>
      <span className='mr-1 text-white hidden sm:inline'>
        {localStorage.getItem(constants.EMAIL)}
      </span>
      <span className='mr-1 text-white inline sm:hidden'>
        {localStorage.getItem(constants.EMAIL).split('@')[0]}
      </span>
      <Avatar shape='circle' icon={<UserOutlined />} className='mx-1' />
      <Dropdown
        overlay={AdminNavMenu}
        className='ml-1'
        overlayStyle={{ width: 150 }}>
        <Icon component={IoIosArrowDown} className='text-white' />
      </Dropdown>
    </div>
  );
};
