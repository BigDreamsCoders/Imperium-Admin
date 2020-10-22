import Icon, { LoadingOutlined } from '@ant-design/icons';
import { Button, Spin, Table } from 'antd';
import React, { useCallback, useState } from 'react';
import { GrAdd } from 'react-icons/gr';
import { usePaginatedQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import { roles } from 'services/api/api';
import { columns } from './utils/tableColumns';

export function RoleTable() {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  const history = useHistory();

  const fetchRoles = useCallback(() => {
    return roles(page, limit);
  }, [page, limit]);

  const { resolvedData, isFetching } = usePaginatedQuery('roles', fetchRoles);

  return (
    <div className='relative min-h-full w-full flex flex-col justify-center items-center self-stretch'>
      {isFetching && (
        <div className='absolute right-0 top-0 mr-1 mt-1'>
          <Spin indicator={() => <LoadingOutlined spin />} />
        </div>
      )}
      <h1 style={{ fontSize: '48px' }} className='justify-self-start mb-3'>
        Roles
      </h1>
      <Table
        className='px-5'
        loading={isFetching}
        columns={columns()}
        scroll={{ x: 700 }}
        dataSource={resolvedData}
        bordered
        rowKey='id'
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
          history.push('/users/roles/new');
        }}
      />
    </div>
  );
}
