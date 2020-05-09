import { StoryType } from "../context/stories";

type Story = {
  by: string;
  title: string;
  score: number;
  descendants: number;
  time: number;
  url: string;
}

type State = {
  topstories: Array<Array<Story>>;
  newstories: Array<Array<Story>>;
}

type InitialLoadAction = {
  type: 'INITIAL_LOAD';
  storyType: StoryType;
  stories: Array<Array<Story>>;
}

type LoadPageAction = {
  type: 'LOAD_PAGE';
  storyType: StoryType;
  stories: Array<Story>;
  page: number;
}

export type Action = InitialLoadAction | LoadPageAction;

export const initialState: State = { topstories: [], newstories: [] };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'INITIAL_LOAD':
      return { ...state, [action.storyType]: action.stories };
    case 'LOAD_PAGE':
      const stories = action.storyType === 'topstories' ? [...state.topstories] : [...state.newstories];
      stories[action.page] = action.stories;
      return { ...state, [action.storyType]: stories };
    default:
      throw new Error();
  }
}