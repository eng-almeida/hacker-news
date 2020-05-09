import React, { useState } from "react";
import { Tag } from "antd";
import styled from '@emotion/styled';

const { CheckableTag } = Tag;

const CustomTag = styled(CheckableTag)`
  border-radius: 4px;
  background: ${props => props.checked ? "#fff" : "transparent"};
  color: ${props => props.checked ? "#020202" : "#aeacb9"};
  font-size: 10px;
  box-shadow: ${props => props.checked ? "0px 0px 20px 4px rgba(0,0,0,0.05);" : "none"};
  padding: 2px 10px;
`

const tags = ['Today', 'Yesterday', 'Week', 'Month'];

const TimeTags = () => {
  const [selectedTags, setSelectedTags] = useState<Array<string>>([tags[0]]);

  const handleChange = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
    setSelectedTags(nextSelectedTags);
  }

  return <>
    {tags.map(tag => (
      <CustomTag
        key={tag}
        checked={selectedTags.includes(tag)}
        onChange={checked => handleChange(tag, checked)}
      >
        {tag}
      </CustomTag>
    ))}
  </>
}

export default TimeTags;