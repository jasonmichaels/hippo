import { createContext } from 'react';
import { AxiosError } from 'axios';

import { IPost } from './hooks/useAxios';

interface IContext {
  posts: IPost[] | null;
  error: AxiosError | null;
  isLoading: boolean;
}

const defaultState = {
  posts: [],
  error: null,
  isLoading: true
}

const PostsContext = createContext<IContext>(defaultState);

export default PostsContext;
