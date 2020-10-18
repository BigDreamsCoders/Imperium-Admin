import React, { useState, useCallback } from 'react';
import { Button, Modal, notification, Spin, Table } from 'antd';
import { usePaginatedQuery } from 'react-query';
import Icon, { LoadingOutlined } from '@ant-design/icons';
import { GrAdd } from 'react-icons/gr';
import { useHistory } from 'react-router-dom';
import { deleteUser, getUsers } from '../../services/api';
import { columns } from './tableColumns';

export const UserIdex = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [userToDelete, setUserToDelete] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const history = useHistory();
  const fetchUsers = useCallback(() => {
    return getUsers(page, limit);
  }, [page, limit]);

  const { resolvedData, isFetching, refetch } = usePaginatedQuery(
    ['fetchUsers', page, limit],
    fetchUsers
  );

  console.log(resolvedData);

  const onShowModal = (user) => {
    console.log(user);
    setUserToDelete(user);
    setShowModal(true);
  };

  const onDelete = async () => {
    setShowLoadingModal(true);
    try {
      await deleteUser(userToDelete.id);
      refetch();
    } catch (e) {
      notification.error({ message: 'Algo ocurrio' });
    } finally {
      setUserToDelete({});
      setShowModal(false);
    }
  };

  const onCancel = () => {
    setUserToDelete({});
    setShowModal(false);
  };

  return (
    <div className='relative min-h-full w-full flex flex-col justify-center items-center self-stretch'>
      {isFetching && (
        <div className='absolute right-0 top-0 mr-1 mt-1'>
          <Spin indicator={() => <LoadingOutlined spin />} />
        </div>
      )}
      <h1 style={{ fontSize: '48px' }} className='justify-self-start mb-3'>
        Usuarios
      </h1>
      <Modal
        visible={showModal}
        onOk={onDelete}
        onCancel={onCancel}
        okText='Sí'
        cancelText='Cancelar'
        confirmLoading={showLoadingModal}>
        <p>¿Desea a eliminar a {userToDelete?.name}?</p>
      </Modal>
      <Table
        className='px-5'
        loading={isFetching}
        columns={columns(onShowModal)}
        scroll={{ x: 1300 }}
        dataSource={resolvedData?.data}
        bordered
        pagination={{
          position: ['bottomCenter'],
          total: resolvedData?.count,
          current: page + 1,
          pageSize: limit,
          showSizeChanger: true,
          showQuickJumper: true,
          onChange: (e) => {
            setPage(e - 1);
          },
          onShowSizeChange: (e, limit) => {
            setLimit(limit);
          },
        }}
      />
      <Button
        className='fixed flex justify-center items-center bottom-0 right-0 mr-2 mb-2 secundary-btn'
        shape='circle'
        size='large'
        icon={<Icon component={GrAdd} />}
        onClick={() => {
          history.push('/users/new');
        }}
      />
    </div>
  );
};
