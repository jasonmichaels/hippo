import { createContext } from 'react';
import { AxiosError } from 'axios';

import { IPostsHash } from './types/post';

interface IContext {
  posts: IPostsHash;
  error: AxiosError | null;
  isLoading: boolean;
}

const defaultState = {
  posts: {},
  error: null,
  isLoading: true,
};

const PostsContext = createContext<IContext>(defaultState);

export default PostsContext;
