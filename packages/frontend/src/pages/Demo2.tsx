import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Flex,
  Form,
  Input,
  Row,
  Steps,
  Tag,
  Timeline,
} from 'antd';
import { createContext } from 'react';
import { CheckCircleOutlined, SyncOutlined } from '@ant-design/icons';
import Add2Values from './Add2Values';
import { optimizeDebts, testData } from '../lib/helpers';

export const MyContext = createContext();
type NameStatus = 'success' | 'processing' | 'default';
export type Selected = {
  name: string;
  status: NameStatus;
  iPayMoneyTo?: { name: string; amount: number }[];
  othersPayMe?: { name: string; amount: number }[];
};

const Demo2: React.FC = () => {
  const [step, setStep] = useState(0);
  const [names, setNames] = useState<string[]>([]);
  const [selected, setSelected] = useState<Selected>({
    name: '',
    status: 'default',
  });
  const [allDoneNames, setAllDoneNames] = useState<Selected[]>(testData);
  const [solution, setSolution] = useState<string[]>([]);

  const AddInfo: React.FC = () => {
    const { names, selected, allDoneNames } = useContext(MyContext);

    const handleTagClick = (name: string) => {
      const isAlreadyDone = allDoneNames.some(
        (ad) => ad.name === name && ad.status === 'success'
      );
      if (isAlreadyDone) {
        return;
      }

      setSelected((prev) => ({
        name,
        status: prev.name === name ? 'default' : 'processing',
      }));
    };

    console.log(allDoneNames);
    return (
      <Row gutter={16}>
        <Col span={8}>
          <Card title='涉及人群' bordered={false}>
            <Flex gap='4px 0' wrap>
              {names.map((name) => {
                const isSelected = name === selected.name;
                const isDone = allDoneNames.some(
                  (ad) => ad.name === name && ad.status === 'success'
                );
                let color = 'default';
                let icon = null;
                if (isSelected) {
                  color = 'processing';
                  icon = <SyncOutlined />;
                }
                if (isDone) {
                  color = 'success';
                  icon = <CheckCircleOutlined />;
                }

                return (
                  <Tag
                    key={name}
                    icon={icon}
                    color={color}
                    onClick={() => handleTagClick(name)}
                  >
                    {name}
                  </Tag>
                );
              })}
            </Flex>
          </Card>
        </Col>

        <Col span={16}>
          <Add2Values />
        </Col>
      </Row>
    );
  };

  const GetNames: React.FC = () => {
    const { setStep, setNames } = useContext(MyContext);
    const onFinish = (values: any) => {
      setNames(values.names.split(','));
      setStep(1);
    };

    return (
      <div>
        <Form onFinish={onFinish}>
          <Form.Item label='Names' name='names' initialValue='haha,hehe,how'>
            <Input.TextArea placeholder='haha,hehe,how' />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Next step
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  };

  useEffect(() => {
    const transactions = optimizeDebts(allDoneNames);
    setSolution(transactions);
  }, [step]);

  const Solution: React.FC = () => {
    return (
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '48px',
          }}
        >
          <Timeline items={solution.map((s) => ({ children: s }))} />
        </div>
        {JSON.stringify(allDoneNames)}
      </div>
    );
  };

  const Sections: React.FC = () => {
    const { step } = useContext(MyContext);

    switch (step) {
      case 0:
        return <GetNames />;
      case 1:
        return <AddInfo />;
      case 2:
      default:
        return <Solution />;
    }
  };

  return (
    <MyContext.Provider
      value={{
        step,
        setStep,
        names,
        setNames,
        selected,
        setSelected,
        allDoneNames,
        setAllDoneNames,
        setSolution,
      }}
    >
      <Steps
        current={step}
        items={[
          { title: 'Get Names' },
          { title: 'Add information' },
          { title: 'Solution' },
        ]}
        onChange={(value: number) => {
          setStep(value);
        }}
        style={{ marginBlock: '24px' }}
      />
      <Sections />
    </MyContext.Provider>
  );
};

export default Demo2;
