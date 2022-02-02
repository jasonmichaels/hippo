import { Method } from 'axios';

const NAVIGATION = {
  POSTS: 'posts',
  POST: 'post',
};

const METHODS: Record<string, Method> = {
  GET: 'GET',
};

const URLS = {
  POSTS: 'http://192.168.4.73:4000/posts',
};

const DATETIME_FORMAT = 'M/D/YY [at] h:mm A';

export { METHODS, URLS, NAVIGATION, DATETIME_FORMAT };
