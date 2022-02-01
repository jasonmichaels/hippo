import React from 'react';
import axios, { AxiosError, Method } from 'axios';

interface IPost {
  id: string;
  title: string;
  body: string;
  publishedAt: string;
  author: {
    id: string;
    name: string;
  }
}

interface IProps {
  method: Method;
  url: string;
}

interface IReturn {
  result: null | IPost[];
  error: AxiosError | any;
  isLoading: boolean;
}

const useAxios = ({ method, url }: IProps): IReturn => {
  const [result, setResult] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const handleFetch = React.useCallback(async () => {
    try {
      const response = await axios.request({
        method,
        url
      });

      if ([200].includes(response.status)) {
        setResult(response.data);
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
