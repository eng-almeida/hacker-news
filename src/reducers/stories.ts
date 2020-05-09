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

export const initialState: State = { topstories: [], newstories: [] };

export const reducer = (state: State, action: any): State => {
  switch (action.type) {
    case 'FIRST_LOAD':
      return { ...state, [action.storyType]: action.stories };
    case 'LOAD_PAGE':
      const stories = action.storyType === "topstories" ? [...state.topstories] : [...state.newstories];
      stories[action.page] = action.stories;
      return { ...state, [action.storyType]: stories };
    default:
      throw new Error();
  }
}