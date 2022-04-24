import { atom } from 'jotai';
import { NewsSection, NEWS_SECTIONS } from 'api/top-stories';
import { Article } from 'api/types';

export const selectedSectionAtom = atom<NewsSection>(NEWS_SECTIONS[0]);

export const allArticlesAtom = atom<
  { [key in NewsSection]?: Article[] },
  { section: NewsSection; articles: Article[] },
  void
>({}, (get, set, { articles, section }) => {
  const allArticles = get(allArticlesAtom);
  // @ts-expect-error
  set(allArticlesAtom, { ...allArticles, [section]: articles });
});

export const articlesBySectionAtom = atom<Article[]>(get => {
  const selectedSection = get(selectedSectionAtom);
  const articles = get(allArticlesAtom);
  return articles[selectedSection] ?? [];
});
