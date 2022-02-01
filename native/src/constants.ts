import { Method } from 'axios';

const METHODS: Record<string, Method> = {
  GET: 'GET'
}

const URLS = {
  POSTS: 'http://localhost:4000/posts'
}

export { METHODS, URLS };