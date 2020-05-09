import React, { useContext } from "react";
import { Table, Typography } from "antd";
import useStories from "../../hooks/useStories";
import { StoriesContext } from "../../context/stories";

const { Text } = Typography;

export const pageSize = 5;

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
    render: (text: string) => <Text type="secondary">{text}</Text>,
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
    return <Text>Loading stories...</Text>
  }

  if (error) {
    return <Text type="danger">Error loading</Text>
  }

  if (stories.length === 0) {
    return <Text type="warning">Error fetching stories</Text>;
  }

  return <Table columns={columns}
    dataSource={stories[page].map((s: any, i: number) => ({ ...s, key: i }))}
    pagination={{
      pageSize,
      total: stories.length,
      showSizeChanger: false,
      onChange: (page) => {
        fetchMore(page - 1);
      }
    }}
  />
}

export default Stories;