import { Provider } from '@nestjs/common';
import { Articles } from './article.model';

export const articlesProvider: Provider[] = [
  {
    provide: 'ARTICLE_REPOSITORY',
    useValue: Articles,
  },
];
