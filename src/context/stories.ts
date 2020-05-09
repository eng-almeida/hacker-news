import React from 'react';

export type StoryType = "topstories" | "newstories";
type StoriesContextType = {
  storyType: StoryType;
  setStoryType: (s: StoryType) => void
}

export const StoriesContext = React.createContext<StoriesContextType>({ storyType: "topstories", setStoryType: () => { } });