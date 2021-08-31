/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Button, Descriptions, Result, Space, Statistic } from 'antd';
import { LikeOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { useTranslation } from 'react-i18next';

const content = (
  <Descriptions size="small" column={2}>
    <Descriptions.Item label="创建人">张三</Descriptions.Item>
    <Descriptions.Item label="联系方式">
      <a>421421</a>
    </Descriptions.Item>
    <Descriptions.Item label="创建时间">2017-01-10</Descriptions.Item>
    <Descriptions.Item label="更新时间">2017-10-10</Descriptions.Item>
    <Descriptions.Item label="备注">中国浙江省杭州市西湖区古翠路</Descriptions.Item>
  </Descriptions>
);

export default function Layout() {
  const { t, i18n } = useTranslation();
  const handleSwitch = async () => {
    await i18n.changeLanguage(i18n.language === 'zh-CN' ? 'en-US' : 'zh-CN');
  };
  return (
    <PageContainer
      content={content}
      tabList={[
        {
          tab: '基本信息',
          key: 'base',
        },
        {
          tab: '详细信息',
          key: 'info',
        },
      ]}
      extraContent={
        <Space size={24}>
          <Statistic title="Feedback" value={1128} prefix={<LikeOutlined />} />
          <Statistic title="Unmerged" value={93} suffix="/ 100" />
        </Space>
      }
      extra={[
        <Button key="3">操作</Button>,
        <Button key="2">操作</Button>,
        <Button key="1" type="primary">
          主操作
        </Button>,
      ]}
      footer={[
        <Button key="3">重置</Button>,
        <Button key="2" type="primary">
          提交
        </Button>,
      ]}
    >
      <div
        style={{
          height: '120vh',
        }}
      >
        <p onClick={handleSwitch}>{t('home.title')}</p>
        <Result
          status="404"
          style={{
            height: '100%',
            background: '#fff',
          }}
          title="Hello World"
          subTitle="Sorry, you are not authorized to access this page."
          extra={<Button type="primary">Back Home</Button>}
        />
      </div>
    </PageContainer>
  );
}
