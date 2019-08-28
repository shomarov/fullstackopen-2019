const blogs = [
  {
    title: 'My first blog',
    author: 'Superuser',
    url: 'localhost',
    likes: 21,
    user: {
      username: 'root',
      name: 'Superuser',
      id: '5d2b717c9e3248562ed6c631'
    },
    id: '5d2eb69b23924625b144e975'
  },
  {
    title: 'My second blog',
    author: 'Donald Trump',
    url: 'https://www.whitehouse.gov/',
    likes: 20,
    user: {
      username: 'root',
      name: 'Superuser',
      id: '5d2b717c9e3248562ed6c631'
    },
    id: '5d5d2b4ab69e3b56d00fc9f2'
  },
  {
    title: 'My third blog',
    author: 'Vladimir Putin',
    url: 'www.kremlin.ru',
    likes: 1,
    user: {
      username: 'root',
      name: 'Superuser',
      id: '5d2b717c9e3248562ed6c631'
    },
    id: '5d5e61cdce5ac5549a38cf4d'
  },
  {
    title: '123',
    author: '123',
    url: '123',
    likes: 28,
    user: {
      username: 'root',
      name: 'Superuser',
      id: '5d2b717c9e3248562ed6c631'
    },
    id: '5d5e8824ce5ac5549a38cf50'
  },
  {
    title: 'dsa',
    author: 'dsa',
    url: 'dsa',
    likes: 0,
    user: {
      username: 'root',
      name: 'Superuser',
      id: '5d2b717c9e3248562ed6c631'
    },
    id: '5d5e8971ce5ac5549a38cf51'
  },
  {
    title: '321',
    author: '321',
    url: '321',
    likes: 0,
    user: {
      username: 'root',
      name: 'Superuser',
      id: '5d2b717c9e3248562ed6c631'
    },
    id: '5d5e8df4ce5ac5549a38cf52'
  },
  {
    title: '1',
    author: '1',
    url: '1',
    likes: 44,
    user: {
      username: 'root',
      name: 'Superuser',
      id: '5d2b717c9e3248562ed6c631'
    },
    id: '5d5f8b1137610219f1b5f4b1'
  },
  {
    title: '321',
    author: '3211',
    url: '111',
    likes: 0,
    user: {
      username: 'root',
      name: 'Superuser',
      id: '5d2b717c9e3248562ed6c631'
    },
    id: '5d5f8bd137610219f1b5f4b2'
  },
  {
    title: '123',
    author: '123',
    url: '123',
    likes: 0,
    user: {
      username: 'root',
      name: 'Superuser',
      id: '5d2b717c9e3248562ed6c631'
    },
    id: '5d5f8c3b37610219f1b5f4b3'
  },
  {
    title: 'cc',
    author: 'cc',
    url: 'cc',
    likes: 0,
    user: {
      username: 'root',
      name: 'Superuser',
      id: '5d2b717c9e3248562ed6c631'
    },
    id: '5d5f8d5f7716e4248a5fa375'
  },
  {
    title: '55',
    author: '55',
    url: '55',
    likes: 1,
    user: {
      username: 'root',
      name: 'Superuser',
      id: '5d2b717c9e3248562ed6c631'
    },
    id: '5d5f8d7e7716e4248a5fa376'
  },
  {
    title: 'kk',
    author: 'kk',
    url: 'kk',
    likes: 37,
    user: {
      username: 'root',
      name: 'Superuser',
      id: '5d2b717c9e3248562ed6c631'
    },
    id: '5d5f8d937716e4248a5fa377'
  },
  {
    title: 'jjhg',
    author: 'hgj',
    url: 'ghj',
    likes: 0,
    user: {
      username: 'root',
      name: 'Superuser',
      id: '5d2b717c9e3248562ed6c631'
    },
    id: '5d5f8e017716e4248a5fa378'
  },
  {
    title: 'vbn',
    author: 'vbn',
    url: 'vbn',
    likes: 0,
    user: {
      username: 'root',
      name: 'Superuser',
      id: '5d2b717c9e3248562ed6c631'
    },
    id: '5d5f8e1b7716e4248a5fa379'
  },
  {
    title: '657657',
    author: '5675',
    url: '567',
    likes: 0,
    user: {
      username: 'root',
      name: 'Superuser',
      id: '5d2b717c9e3248562ed6c631'
    },
    id: '5d5f8e3e7716e4248a5fa37a'
  },
  {
    title: '51',
    author: '15',
    url: '15',
    likes: 0,
    user: {
      username: 'root',
      name: 'Superuser',
      id: '5d2b717c9e3248562ed6c631'
    },
    id: '5d5f8e7bcb13812623b4af58'
  },
  {
    title: 'gg',
    author: 'gg',
    url: 'gg',
    likes: 0,
    user: {
      username: 'root',
      name: 'Superuser',
      id: '5d2b717c9e3248562ed6c631'
    },
    id: '5d5f9033cb13812623b4af59'
  },
  {
    title: 'vcx',
    author: 'vcx',
    url: 'xc',
    likes: 0,
    user: {
      username: 'root',
      name: 'Superuser',
      id: '5d2b717c9e3248562ed6c631'
    },
    id: '5d5f903ecb13812623b4af5a'
  },
  {
    title: 'zxc',
    author: 'zxc',
    url: 'zxc',
    likes: 0,
    user: {
      username: 'root',
      name: 'Superuser',
      id: '5d2b717c9e3248562ed6c631'
    },
    id: '5d5f9047cb13812623b4af5b'
  },
  {
    title: 'hjk',
    author: 'hjk',
    url: 'hjk',
    likes: 0,
    user: {
      username: 'root',
      name: 'Superuser',
      id: '5d2b717c9e3248562ed6c631'
    },
    id: '5d5f9065cb13812623b4af5d'
  },
  {
    title: 'dd',
    author: 'dd',
    url: 'dd',
    likes: 0,
    user: {
      username: 'root',
      name: 'Superuser',
      id: '5d2b717c9e3248562ed6c631'
    },
    id: '5d5f911ecb13812623b4af5e'
  },
  {
    title: 'dsa',
    author: 'dsa',
    url: 'asd',
    likes: 0,
    user: {
      username: 'foo',
      name: 'Foo',
      id: '5d2e01a645e08f147aba0883'
    },
    id: '5d5fa7c60305c11f9263b524'
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

// eslint-disable-next-line no-unused-vars
const setToken = newToken => {
}

export default { getAll, setToken }