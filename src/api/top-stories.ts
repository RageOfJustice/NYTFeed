import { API_KEY } from 'react-native-dotenv';
import { client } from './client';
import { Article } from './types';

export const getArticlesBySection = async (
  section: NewsSection
): Promise<Article[]> =>
  client
    .get(`${section}.json?api-key=${API_KEY}`)
    .then(res => res.data.results ?? []);

export const NEWS_SECTIONS = [
  'arts',
  'automobiles',
  'books',
  'business',
  'fashion',
  'food',
  'health',
  'home',
  'insider',
  'magazine',
  'movies',
  'nyregion',
  'obituaries',
  'opinion',
  'politics',
  'realestate',
  'science',
  'sports',
  'sundayreview',
  'technology',
  'theater',
  't-magazine',
  'travel',
  'upshot',
  'us',
  'world',
] as const;

export type NewsSection = typeof NEWS_SECTIONS[number];
