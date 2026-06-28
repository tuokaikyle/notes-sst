import { Button, Form, Col, Row, Card, List, Typography } from 'antd';
import { useContext, useState } from 'react';
import { FinanceContext } from '../lib/financeContext';
import Add2Values from './Add2Values';

export const AddAmounts = ({ current, steps }) => {
  const { names, person, setPerson } = useContext(FinanceContext);

  console.log(names);

  const handleClick = (value, index) => {
    console.log(value, index);
    setPerson(value);
  };

  return (
    <div>
      <Row gutter={16}>
        <Col span={8}>
          <Card title='姓名' bordered={false}>
            <List
              dataSource={names}
              renderItem={(item, index) => (
                <List.Item
                  onClick={() => {
                    handleClick(item, index);
                  }}
                >
                  <Typography.Text>{index + 1}</Typography.Text> {item}
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title={person + '需要支付'} bordered={false}>
            <Add2Values names={names} />
          </Card>
        </Col>
        <Col span={8}>
          <Card title={`需要向${person}支付`} bordered={true}>
            Card content
          </Card>
        </Col>
      </Row>

      {current < steps.length - 1 && (
        <Button type='primary' htmlType='submit'>
          Next
        </Button>
      )}
    </div>
  );
};
