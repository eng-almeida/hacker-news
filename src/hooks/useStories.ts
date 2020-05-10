import { useEffect, useReducer, useState, useCallback } from "react";
import { initialState, reducer } from "../reducers/stories";
import { StoryType } from "../context/stories";

export const pageSize = 5;

const BASE_URL = 'https://hacker-news.firebaseio.com';
const getStoriesUrl = (type: string) => `${BASE_URL}/v0/${type}.json?print=pretty`;
const getItemUrl = (id: string) => `${BASE_URL}/v0/item/${id}.json?print=pretty`;

const fetchItem = async (url: string) => {
  const result = await fetch(url);
  const json = await result.json();
  return json;
}

const splitInPages = <T>(list: Array<T>, chunckSize: number) =>
  new Array(Math.ceil(list.length / chunckSize))
    .fill(0).map(_ => list.splice(0, chunckSize));

const useStories = (type: StoryType) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const stories = type === "topstories" ? state.topstories : state.newstories;
  const saveInitialStories = useCallback((stories, storyType) => {
    dispatch({
      type: 'INITIAL_LOAD',
      stories,
      storyType
    });
  }, []);
  const saveStories = useCallback((stories, storyType, page) => {
    dispatch({
      type: 'LOAD_PAGE',
      stories,
      storyType,
      page
    });
  }, [])
  /**
   * Fetch stories details from page
   * @param page 
   */
  const fetchMore = async (page: number) => {
    const storiesFromPage = stories[page];
    if (storiesFromPage.every(p => typeof p === 'number')) {
      try {
        const results = await Promise.all(storiesFromPage.map((story: any) => fetchItem(getItemUrl(story))));
        saveStories(results, type, page);
        setPage(page);
        error && setError(false);
      } catch {
        setError(true);
      }
    }
  };

  useEffect(() => {
    /**
     * Fetch stories details from page
     * @param pageNumber 
     */
    const fetchFirstPage = async (json: Array<number>) => {
      const [firstPage, ...otherPages] = splitInPages<number>(json, pageSize);
      try {
        const results = await Promise.all(
          firstPage.map(story => fetchItem(getItemUrl(String(story))))
        );
        saveInitialStories([results, ...otherPages], type);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    /**
     * Fetch all items ids
     * @param type 
     */
    const fetchItemsList = async (type: string) => {
      try {
        const result = await fetchItem(getStoriesUrl(type))
        fetchFirstPage(result);
        // Go back to first page
        setPage(0);
        // Clear previous errors if exist
        error && setError(false);
      } catch {
        setError(true);
      }
    }

    fetchItemsList(type);
  }, [error, saveInitialStories, type])

  return {
    stories,
    page,
    error,
    loading,
    fetchMore
  }
}

export default useStories;