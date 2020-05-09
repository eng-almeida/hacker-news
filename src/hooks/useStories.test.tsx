import "whatwg-fetch";
import { renderHook, act } from '@testing-library/react-hooks';
import fetchMock from "fetch-mock";
import useStories, { pageSize } from './useStories';

const itemPayload = (id: number) => ({
  by: `by-mock${id}`,
  title: `title-mock${id}`,
  score: id,
  descendants: id,
  time: 1,
  url: `url-mock${id}`,
});

const numberPages = 3;
const numberItems = numberPages * pageSize;

const setup = () => {
  const ids = [...Array(numberItems).keys()];
  fetchMock.mock('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty', ids);
  ids.forEach(id => {
    fetchMock.mock(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`, itemPayload(id));
  })
};

describe("useStories", () => {
  beforeAll(() => {
    //@ts-ignore
    global.fetch = fetch;
  });
  afterAll(() => {
    fetchMock.restore();
  });

  beforeEach(() => {
    setup();
  })

  function testFirstPage(result) {
    const [firstPage, ...otherPages] = result.current.stories;
    expect(firstPage.every(p => typeof p === 'object')).toBe(true);
    otherPages.forEach(otherPage => {
      expect(otherPage.every(p => typeof p === 'number')).toBe(true);
    });
  }

  function testSecondPage(result) {
    const [firstPage, secondPage, ...otherPages] = result.current.stories;
    expect(firstPage.every(p => typeof p === 'object')).toBe(true);
    expect(secondPage.every(p => typeof p === 'object')).toBe(true);
    otherPages.forEach(otherPage => {
      expect(otherPage.every(p => typeof p === 'number')).toBe(true);
    });
  }

  function testThirdPage(result) {
    result.current.stories.forEach(storiesPage => {
      expect(storiesPage.every(p => typeof p === 'object')).toBe(true);
    })
  }

  it("should return paginated stories", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useStories("topstories"));
    await waitForNextUpdate()
    expect(result.current.stories.length).toBe(numberPages);
    testFirstPage(result);

    result.current.fetchMore(1);
    await waitForNextUpdate();
    testSecondPage(result);

    result.current.fetchMore(2);
    await waitForNextUpdate();
    testThirdPage(result);
  });
});