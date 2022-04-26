import { atom, useAtom, useSetAtom } from 'jotai';
import {
  getArticlesBySection,
  NewsSection,
  NEWS_SECTIONS,
} from 'api/top-stories';
import { Article } from 'api/types';
import { setItem, getItem } from 'api/storage';

export const selectedSectionAtom = atom<NewsSection>(NEWS_SECTIONS[0]);

export type ArticlesMap = Record<NewsSection, Article[]>;

export const allArticlesAtom = atom<ArticlesMap, Partial<ArticlesMap>, void>(
  {} as ArticlesMap,
  (get, set, partition) => {
    const allArticles = get(allArticlesAtom);
    const updatedArticles: ArticlesMap = { ...allArticles, ...partition };
    set(allArticlesAtom, updatedArticles);
    setItem('articles', updatedArticles);
  }
);

allArticlesAtom.onMount = set => {
  getItem('articles', {}).then(set);
};

export const articlesBySectionAtom = atom<Article[]>(get => {
  const selectedSection = get(selectedSectionAtom);
  const articles = get(allArticlesAtom);
  return articles[selectedSection] ?? [];
});

export const useSelectSection = (): [
  NewsSection,
  (section: NewsSection) => Promise<void>
] => {
  const setArticles = useSetAtom(allArticlesAtom);
  const [selectedSection, setSelectedSection] = useAtom(selectedSectionAtom);
  const selectSection = async (section: NewsSection) => {
    setSelectedSection(section);
    const articlesBySection = await getArticlesBySection(section);
    setArticles({ [section]: articlesBySection });
  };

  return [selectedSection, selectSection];
};
