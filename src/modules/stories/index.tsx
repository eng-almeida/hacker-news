import React, { useContext } from "react";
import { Table, Typography, Row, Col } from "antd";
import useStories, { pageSize } from "../../hooks/useStories";
import { StoriesContext } from "../../context/stories";

const { Text } = Typography;

const columns = [
  {
    title: 'Author',
    dataIndex: 'by',
    key: 'by',
    render: (text: string) => <Text type="secondary">{text}</Text>,
    ellipsis: true,
    width: 140
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    width: 300,
    ellipsis: true,
    render: (text: string) => <Text type="secondary">{text}</Text>,
  },
  {
    title: 'Score',
    dataIndex: 'score',
    key: 'score',
    width: 72,
    render: (text: string) => <Text type="secondary">{text}</Text>,
  },
  {
    title: 'Comments Count',
    key: 'descendants',
    dataIndex: 'descendants',
    width: 144,
    render: (text: string) => <Text type="secondary">{text}</Text>,
  },
  {
    title: 'Time',
    key: 'time',
    dataIndex: 'time',
    width: 136,
    render: (time: number) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const date = new Intl.DateTimeFormat('en-UK', options).format(new Date(time * 1000));
      return <Text type="secondary">{date}</Text>
    },
  },
  {
    title: 'Url',
    key: 'url',
    dataIndex: 'url',
    ellipsis: true,
    render: (url: string) => <a href={url} target="__blank">{url}</a>,
  },
];


const Stories = () => {
  const { storyType } = useContext(StoriesContext);
  const { stories, page, fetchMore, error, loading } = useStories(storyType);

  if (loading) {
    return <Row justify="center" style={{ paddingTop: "16px" }}>
      <Col><Text>Loading stories...</Text></Col>
    </Row>
  }

  if (error) {
    return <Text type="danger">Error loading</Text>
  }

  if (stories.length === 0) {
    return null;
  }

  return <Table columns={columns}
    dataSource={stories[page].map((story, key) => ({ ...story, key }))}
    pagination={{
      pageSize,
      total: stories.length,
      showSizeChanger: false,
      onChange: (page) => fetchMore(page - 1)
    }}
  />
}

export default Stories;