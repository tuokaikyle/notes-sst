import React, { useContext, useState } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Input, Row, Select, Space } from 'antd';
import { MyContext } from './Demo2';

const Add2Values: React.FC = () => {
  const { names, selected, setSelected, setAllDoneNames } =
    useContext(MyContext);

  const onFinish = (values) => {
    const amounts = {
      iPayMoneyTo: values.iPayMoneyTo,
      othersPayMe: values.othersPayMe,
    };
    setSelected((prev) => ({
      ...prev,
      ...amounts,
      status: 'success',
    }));

    setAllDoneNames((prev) => [
      ...prev,
      { ...selected, ...amounts, status: 'success' },
    ]);
  };

  return (
    <Form name='dynamic_form_nest_item' onFinish={onFinish} autoComplete='off'>
      <Row gutter={16}>
        <Col span={12}>
          <Card title={selected.name + '应付款'} bordered={true}>
            {selected.name && (
              <Form.List name='iPayMoneyTo'>
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space
                        key={key}
                        style={{ display: 'flex', marginBottom: 8 }}
                        align='baseline'
                      >
                        <Form.Item
                          {...restField}
                          name={[name, 'name']}
                          rules={[{ required: true, message: 'Missing pay' }]}
                        >
                          <Select
                            placeholder='需要付给'
                            style={{ width: 120 }}
                            options={names.map((line) => ({
                              value: line,
                              label: line,
                            }))}
                          />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'amount']}
                          rules={[
                            { required: true, message: 'Missing amount' },
                          ]}
                        >
                          <Input placeholder='Amount' />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button
                        type='dashed'
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add field
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            )}
          </Card>
        </Col>
        <Col span={12}>
          <Card title={`${selected.name}需收款`} bordered={true}>
            {selected.name && (
              <Form.List name='othersPayMe'>
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space
                        key={key}
                        style={{ display: 'flex', marginBottom: 8 }}
                        align='baseline'
                      >
                        <Form.Item
                          {...restField}
                          name={[name, 'name']}
                          rules={[{ required: true, message: 'Missing pay' }]}
                        >
                          <Select
                            placeholder='需要付给'
                            style={{ width: 120 }}
                            options={names.map((line) => ({
                              value: line,
                              label: line,
                            }))}
                          />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'amount']}
                          rules={[
                            { required: true, message: 'Missing amount' },
                          ]}
                        >
                          <Input placeholder='Amount' />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button
                        type='dashed'
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add field
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            )}
          </Card>
        </Col>
      </Row>

      <Row style={{ marginTop: '24px' }}>
        <Col span={24}>
          <Form.Item>
            <Button block type='primary' htmlType='submit'>
              {`提交 ${selected.name} 的应收付款情况`}
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default Add2Values;
