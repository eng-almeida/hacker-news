import { useEffect, useReducer, useState } from "react";
import { pageSize } from "../modules/stories";
import { initialState, reducer } from "../reducers/stories";

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

const useStories = (type: string) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const stories = type === "topstories" ? state.topstories : state.newstories;
  /**
   * Fetch stories details from page
   * @param pageNumber 
   */
  const fetchMore = async (pageNumber: number) => {
    const storiesFromPage = stories[pageNumber];
    if (typeof storiesFromPage[0] === 'number') {
      const results = await Promise.all(storiesFromPage.map((story: any) => fetchItem(getItemUrl(story))));
      dispatch({
        type: 'LOAD_PAGE',
        stories: results,
        page: pageNumber,
        storyType: type
      });
    }
    setPage(pageNumber);
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
        dispatch({
          type: 'FIRST_LOAD',
          stories: [results, ...otherPages],
          storyType: type
        })
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
      const result = await fetchItem(getStoriesUrl(type))
      fetchFirstPage(result);
    }

    fetchItemsList(type);
    setPage(0);
  }, [dispatch, type])

  return {
    stories,
    page,
    error,
    loading,
    fetchMore
  }
}

export default useStories;