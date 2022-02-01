import React from 'react';
import axios, { AxiosError, Method } from 'axios';

import { IPostsHash } from '../types/post';
import PostUtils from '../utils/PostUtils';

interface IProps {
  method: Method;
  url: string;
}

interface IReturn {
  result: IPostsHash;
  error: AxiosError | null;
  isLoading: boolean;
}

const useAxios = ({ method, url }: IProps): IReturn => {
  const [result, setResult] = React.useState<IPostsHash>({});
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const handleFetch = React.useCallback(async () => {
    try {
      const response = await axios.request({
        method,
        url
      });

      if ([200].includes(response.status)) {
        setResult(PostUtils.keyByAuthorSort(response.data));
      }
    } catch (e: AxiosError | any) {
      setError(e);
    }
    setIsLoading(false);
  }, [url]);

  React.useEffect(() => {
    handleFetch();
  }, []);

  return { result, error, isLoading };
}

export default useAxios;
