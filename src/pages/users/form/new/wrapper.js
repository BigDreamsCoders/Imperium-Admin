import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { Button, Form } from 'antd';
import Icon from '@ant-design/icons';
import { BsCheck, BsChevronLeft, BsChevronRight } from 'react-icons/bs';

export function FormWrapper({
  title,
  form,
  children,
  hasNext,
  hasPrev,
  hasFinish,
  className,
}) {
  const nextBtn = useMemo(() => {
    const data = {};
    if (hasFinish) {
      data['callback'] = hasFinish;
      data['icon'] = BsCheck;
    } else {
      data['callback'] = hasNext;
      data['icon'] = BsChevronRight;
    }
    return data;
  }, [hasFinish, hasNext]);

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className='relative p-10 bg-white rounded shadow-md'>
        <Form
          name='login'
          className={
            className
              ? className
              : 'form flex flex-col sm:flex-row sm:gap-8 sm:w-full'
          }
          form={form}>
          {children}
        </Form>
      </div>
      {hasPrev && (
        <Button
          className='fixed flex justify-center items-center bottom-0 left-0 ml-5 mb-5 secundary-btn'
          shape='circle'
          size='large'
          icon={<Icon component={BsChevronLeft} />}
          onClick={hasPrev}
        />
      )}
      {(hasNext || hasFinish) && (
        <Button
          className='fixed flex justify-center items-center bottom-0 right-0 mr-2 mb-2 secundary-btn'
          shape='circle'
          size='large'
          icon={<Icon component={nextBtn.icon} />}
          onClick={nextBtn.callback}
        />
      )}
    </>
  );
}
