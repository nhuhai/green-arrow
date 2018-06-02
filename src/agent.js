import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'https://conduit.productionready.io/api';

const encode = encodeURIComponent;
const responseBody = res => res.body;

let token = null;
const tokenPlugin = req => {
  if (token) {
    req.set('authorization', `Token ${token}`);
  }
}

const requests = {
  del: url =>
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  get: url =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  put: (url, body) =>
    superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody)
};

const Auth = {
  current: () =>
    requests.get('/user'),
  login: (email, password) =>
    requests.post('/users/login', { user: { email, password } }),
  register: (username, email, password) =>
    requests.post('/users', { user: { username, email, password } }),
  save: user =>
    requests.put('/user', { user })
};

const Tags = {
  getAll: () => requests.get('/tags')
};

const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;
const omitSlug = article => Object.assign({}, article, { slug: undefined });
const Articles = {
  all: page =>
    requests.get(`/articles?${limit(10, page)}`),
  byTag: (tag, page) =>
    requests.get(`/articles?tag=${encode(tag)}&${limit(10, page)}`),
  byAuthor: (author, page) =>
    requests.get(`/articles?author=${encode(author)}&${limit(5, page)}`),
  feed: (author) =>
    // requests.get(`/articles/feed?${limit(10)}`), // feed is broken
    requests.get(`/articles?author=${encode(author)}&${limit(10)}`),
  favorite: slug =>
    requests.post(`/articles/${slug}/favorite`),
  unfavorite: slug =>
    requests.del(`/articles/${slug}/favorite`),
  get: slug =>
    requests.get(`/articles/${slug}`),
  create: article =>
    requests.post('/articles', { article }),
  update: article =>
    requests.put(`/articles/${article.slug}`, { article: omitSlug(article) }),
  del: slug =>
    requests.del(`/articles/${slug}`)
};

const Comments = {
  forArticle: slug =>
    requests.get(`/articles/${slug}/comments`)
};

const Profile = {
  get: username =>
    requests.get(`/profiles/${username}`),
  follow: username =>
    requests.post(`/profiles/${username}/follow`),
  unfollow: username =>
    requests.del(`/profiles/${username}/follow`)
};

export default {
  Auth,
  Articles,
  Tags,
  Comments,
  Profile,
  setToken: _token => { token = _token; }
};
