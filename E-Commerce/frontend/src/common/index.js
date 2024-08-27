const urlDomain = "http://localhost:3000";

const summaryApi = {
  backend: {
    url: `${urlDomain}/`,
  },
  signup: {
    url: `${urlDomain}/api/signup`,
  },
  login: {
    url: `${urlDomain}/api/login`,
  },
  edit: {
    url: `${urlDomain}/api/editEmail`,
  },
  user: {
    url: `${urlDomain}/api/profile`,
  },
  allUsers: {
    url: `${urlDomain}/api/getAllUsers`,
  },
  delete: {
    url: `${urlDomain}/api/delete`,
  },
  addProducts: {
    url: `${urlDomain}/api/add-product`,
  },
  allProducts: {
    url: `${urlDomain}/api/getAllProducts`,
  },
  getCategories:{
     url: `${urlDomain}/api/getAllCategories`
  },
};

export default summaryApi;
