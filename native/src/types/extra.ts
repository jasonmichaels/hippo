import { AxiosError } from 'axios';

import { IPostsHash } from './post';

export type THandleItemPress = (authorId: string, postId: string) => () => void;

export type THandleSelectPress = (value: string) => () => void;

export type TOption = { value: string; label: string };

export type TOptions = TOption[];

export type TUseAxiosReturn = {
  result: IPostsHash;
  error: AxiosError | null;
  isLoading: boolean;
};

export type TPostParams = {
  authorId: string;
  postId: string;
};

export type TNavigate = (route: string, params?: any) => void;
