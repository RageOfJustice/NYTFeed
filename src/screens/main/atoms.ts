import { useCallback } from 'react';
import { atom, useAtom, useSetAtom, useAtomValue } from 'jotai';
import { getArticlesBySection, NewsSection } from 'api/top-stories';
import { Article } from 'api/types';
import { setItem, getItem } from 'api/storage';

export const selectedSectionAtom = atom<NewsSection | undefined>(undefined);

export type ArticlesMap = Record<NewsSection, Article[]>;

type LoadingSectionsMap = Record<NewsSection, boolean>;
const loadingSectionsAtom = atom<
  LoadingSectionsMap,
  Partial<LoadingSectionsMap>
>({} as LoadingSectionsMap, (get, set, partition) => {
  const currentState = get(loadingSectionsAtom);
  const updatedState = { ...currentState, ...partition };
  set(loadingSectionsAtom, updatedState);
});

export const isSelectedSectionLoadingAtom = atom<boolean>(get => {
  const selectedSection = get(selectedSectionAtom);
  if (!selectedSection) return false;
  const loadingSections = get(loadingSectionsAtom);
  return loadingSections[selectedSection];
});

const refreshingSectionsAtom = atom<
  LoadingSectionsMap,
  Partial<LoadingSectionsMap>
>({} as LoadingSectionsMap, (get, set, partition) => {
  const currentState = get(refreshingSectionsAtom);
  const updatedState = { ...currentState, ...partition };
  set(refreshingSectionsAtom, updatedState);
});

export const isSelectedSectionRefreshingAtom = atom<boolean>(get => {
  const selectedSection = get(selectedSectionAtom);
  if (!selectedSection) return false;
  const refreshingSections = get(refreshingSectionsAtom);
  return refreshingSections[selectedSection];
});

export const useRefreshSectionArticles = () => {
  const [refreshingArticles, setRefreshingArticles] = useAtom(
    refreshingSectionsAtom
  );
  const setArticles = useSetAtom(allArticlesAtom);
  const section = useAtomValue(selectedSectionAtom);
  const refreshSection = useCallback(async () => {
    if (!section) return;

    try {
      setRefreshingArticles({ [section]: true });
      const articlesBySection = await getArticlesBySection(section);
      const validArticles = articlesBySection.filter(a => !!a.url);
      setArticles({ [section]: validArticles });
      setRefreshingArticles({ [section]: false });
    } catch {
      // TODO: show notification
    }
  }, [section, setArticles, setRefreshingArticles]);

  const refreshing = section ? !!refreshingArticles[section] : false;
  return [refreshing, refreshSection] as const;
};

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
  if (!selectedSection) return [];
  const articles = get(allArticlesAtom);
  return articles[selectedSection] ?? [];
});

export const useSelectSection = () => {
  const setArticles = useSetAtom(allArticlesAtom);
  const setLoadingArticles = useSetAtom(loadingSectionsAtom);
  const [selectedSection, setSelectedSection] = useAtom(selectedSectionAtom);
  const selectSection = useCallback(
    async (section: NewsSection) => {
      setSelectedSection(section);
      try {
        setLoadingArticles({ [section]: true });
        const articlesBySection = await getArticlesBySection(section);
        const validArticles = articlesBySection.filter(a => !!a.url);
        setArticles({ [section]: validArticles });
        setLoadingArticles({ [section]: false });
      } catch {
        // TODO: show notification
      }
    },
    [setArticles, setLoadingArticles, setSelectedSection]
  );

  return [selectedSection, selectSection] as const;
};
