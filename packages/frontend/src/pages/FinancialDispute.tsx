import React, { useState } from 'react';
import { Button, Form, message, Steps, theme, Input, FormProps } from 'antd';
import { AddAmounts } from './AddAmounts';
import { FinanceContext } from '../lib/financeContext';

const steps = [
  {
    title: '输入人名，每行一个',
    content: 'First-content',
  },
  {
    title: '添加金额',
    content: 'Second-content',
  },
  {
    title: 'Last',
    content: 'Last-content',
  },
];

const FinancialDispute: React.FC = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const { TextArea } = Input;
  const [names, setNames] = useState([]);
  const [persons, setPersons] = useState();
  const [person, setPerson] = useState('');

  const contextValues = {
    names,
    persons,
    person,
    setPerson,
  };

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const onNameInputFinish: FormProps['onFinish'] = (values) => {
    console.log('Success:', values);
    next(), setNames(values.names.split(/[,，]/));
  };
  const onAddAmountsFinish: FormProps['onFinish'] = (values) => {
    console.log('Success:', values);
    next();
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    borderRadius: token.borderRadiusLG,
    marginTop: 16,
  };

  const NamesInput = () => {
    return (
      <Form onFinish={onNameInputFinish}>
        <Form.Item
          name='names' // Name the form field (important for handling submission data)
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          {current < steps.length - 1 && (
            <Button type='primary' htmlType='submit'>
              Next
            </Button>
          )}
        </Form.Item>
      </Form>
    );
  };

  const Display = (props) => {
    switch (props.current) {
      case 0:
        return <NamesInput />;
      case 1:
        return <AddAmounts names={names} current={current} steps={steps} />;
      case 2:
        return <div>2</div>;
      default:
        return <div>2</div>;
    }
  };

  return (
    <FinanceContext.Provider value={contextValues}>
      <h4>糊涂账计算器</h4>
      <h5>张，王，李，赵</h5>
      <Steps current={current} items={items} />
      <div style={contentStyle}>
        <Display current={current} />
      </div>
      <div style={{ marginTop: 24 }}>
        {current === steps.length - 1 && (
          <Button
            type='primary'
            onClick={() => message.success('Processing complete!')}
          >
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </FinanceContext.Provider>
  );
};

export default FinancialDispute;
