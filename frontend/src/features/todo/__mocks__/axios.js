// https://github.com/ctimmerm/axios-mock-adapter/issues/58
const axios = {
  get: jest.fn(() => Promise.resolve({ data: {} })),
  create: () => axios,
  defaults: {
    adapter: {},
  },
};

export default axios;