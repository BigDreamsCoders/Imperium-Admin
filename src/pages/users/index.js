import React, { useState, useCallback } from 'react';
import { Button, Spin, Table } from 'antd';
import { usePaginatedQuery } from 'react-query';
import Icon, { LoadingOutlined } from '@ant-design/icons';
import { GrAdd } from 'react-icons/gr';
import { getUsers } from '../../services/api';
import { columns } from './tableColumns';
import { useHistory } from 'react-router-dom';

export const UserIdex = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const history = useHistory();
  const fetchUsers = useCallback(() => getUsers(page, limit), [page, limit]);

  const { resolvedData, isFetching } = usePaginatedQuery(
    ['fetchUsers', page, limit],
    fetchUsers
  );
  return (
    <div className='relative min-h-full w-full flex justify-center items-center self-stretch'>
      {isFetching && (
        <div className='absolute right-0 top-0 mr-1 mt-1'>
          <Spin indicator={() => <LoadingOutlined spin />} />
        </div>
      )}
      <Table
        className='px-10'
        loading={isFetching}
        columns={columns}
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
        className='absolute bottom-0 right-0 mr-10 mb-10 secundary-btn'
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
