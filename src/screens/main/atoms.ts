import { useCallback, useMemo } from 'react';
import { atom, useAtom, useSetAtom, useAtomValue, WritableAtom } from 'jotai';
import {
  getArticlesBySection,
  NewsSection,
  NEWS_SECTIONS,
} from 'api/top-stories';
import { Article } from 'api/types';
import { setItem, getItem } from 'api/storage';
import { uniq } from 'lodash';

export const selectedSectionAtom = atom<NewsSection, NewsSection, void>(
  NEWS_SECTIONS[0],
  async (_, set, newSection) => {
    set(selectedSectionAtom, newSection);
    await setItem('section', newSection);
  }
);

selectedSectionAtom.onMount = set => {
  getItem('section', NEWS_SECTIONS[0]).then(set);
};

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
  const articles = get(allArticlesAtom)[selectedSection];

  return articles ?? [];
});

export const filteredArticlesBySectionAtom = atom(get => {
  const articles = get(articlesBySectionAtom);

  const locations = Object.entries(get(locationsFilterAtom))
    .filter(([_, value]) => value)
    .map(([key]) => key);
  const descriptions = Object.entries(get(descriptionsFilterAtom))
    .filter(([_, value]) => value)
    .map(([key]) => key);

  const filteredArticles = articles.filter(a => {
    let hasLocation = locations.length === 0;
    for (const location of locations) {
      if (a.geo_facet.includes(location)) {
        hasLocation = true;
        break;
      }
    }
    let hasDescription = descriptions.length === 0;
    for (const description of descriptions) {
      if (a.des_facet.includes(description)) {
        hasDescription = true;
        break;
      }
    }
    return hasLocation && hasDescription;
  });

  return filteredArticles;
});

export const useSelectSection = () => {
  const setArticles = useSetAtom(allArticlesAtom);
  const setLoadingArticles = useSetAtom(loadingSectionsAtom);
  const [selectedSection, setSelectedSection] = useAtom(selectedSectionAtom);
  const resetFilters = useResetFilters();
  const selectSection = useCallback(
    async (section: NewsSection) => {
      if (selectedSection === section) return;

      setSelectedSection(section);
      resetFilters();
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
    [
      selectedSection,
      setSelectedSection,
      resetFilters,
      setLoadingArticles,
      setArticles,
    ]
  );

  return [selectedSection, selectSection] as const;
};

const locationsFilterAtom = atom<Record<Article['geo_facet'][number], boolean>>(
  {}
);

const descriptionsFilterAtom = atom<
  Record<Article['des_facet'][number], boolean>
>({});

type FilterAtomType<Item extends string> = WritableAtom<
  Record<Item, boolean>,
  Record<Item, boolean>
>;

const useFilter = <Item extends string>(
  items: Item[],
  filterAtom: FilterAtomType<Item>
) => {
  const [selectedItems, setSelectedItems] = useAtom(filterAtom);

  const toggleItems = useCallback(
    (updatedItems: Record<Item, boolean>) =>
      // @ts-expect-error
      setSelectedItems({ ...selectedItems, ...updatedItems }),
    [selectedItems, setSelectedItems]
  );

  return { items, selectedItems, toggleItems } as const;
};

const useResetFilters = () => {
  const setLocationsFilter = useSetAtom(locationsFilterAtom);
  const setDescriptionsFilter = useSetAtom(descriptionsFilterAtom);

  return useCallback(() => {
    setLocationsFilter({});
    setDescriptionsFilter({});
  }, [setDescriptionsFilter, setLocationsFilter]);
};

export const useLocationsFilter = () => {
  const articles = useAtomValue(articlesBySectionAtom);
  const locations = useMemo(
    () =>
      uniq(
        articles.reduce<string[]>((acc, article) => {
          acc.push(...article.geo_facet);
          return acc;
        }, [])
      ),
    [articles]
  );
  return useFilter(locations, locationsFilterAtom);
};

export const useDescriptionsFilter = () => {
  const articles = useAtomValue(articlesBySectionAtom);
  const descriptions = useMemo(
    () =>
      uniq(
        articles.reduce<string[]>((acc, article) => {
          acc.push(...article.des_facet);
          return acc;
        }, [])
      ),
    [articles]
  );
  return useFilter(descriptions, descriptionsFilterAtom);
};
