import React from 'react';
import axios, { AxiosError, Method } from 'axios';

import { IPostsHash } from '../types/post';
import PostUtils from '../utils/PostUtils';
import { TUseAxiosReturn } from '../types/extra';

interface IProps {
  method: Method;
  url: string;
}

/**
 * @hook
 * @description Used for the initial fetch of posts. In the future,
 * if `url` changes, a new request will fire and set state anew.
 * Note that this is setupffor very simple requests but may
 * be extended w/ axios-compliant options, etc.
 */
const useAxios = ({ method, url }: IProps): TUseAxiosReturn => {
  const [result, setResult] = React.useState<IPostsHash>({});
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  /**
   * @description Whenver `url` changes, fire off `handleFetch`,
   * which stores either the result or an error, and sets
   * the loading state value upon completion.
   */
  const handleFetch = React.useCallback(async () => {
    setIsLoading(true);

    try {
      const { status, data } = await axios.request({
        method,
        url,
      });

      if ([200].includes(status)) {
        setResult(PostUtils.keyByAuthorSort(data));
      }
    } catch (e: AxiosError | any) {
      setError(e);
    }
    setIsLoading(false);
  }, [method, url]);

  React.useEffect(() => {
    handleFetch();
  }, [url]);

  return { result, error, isLoading };
};

export default useAxios;
