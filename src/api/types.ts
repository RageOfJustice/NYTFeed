interface Multimedia {
  url: string;
}

export interface Article {
  section: string;
  title: string;
  url: string;
  uri: string;
  published_date: string;
  byline: string;
  des_facet: string[];
  geo_facet: string[];
  multimedia: Multimedia[] | null;
}
