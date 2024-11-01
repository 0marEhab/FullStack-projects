const urlDomain = "http://localhost:3000/";

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
  deleteUser: {
    url: `${urlDomain}/api/delete`,
  },
  addProducts: {
    url: `${urlDomain}/api/add-product`,
  },
  allProducts: {
    url: `${urlDomain}/api/getAllProducts`,
  },
  products: {
    url: `${urlDomain}/api/getProducts`,
  },
  editProducts: {
    url: `${urlDomain}/api/update-product`,
  },
  editCategory: {
    url: `${urlDomain}/api/update-category`,
  },
  detailedProduct: {
    url: `${urlDomain}/api/products`,
  },
  deleteProduct: {
    url: `${urlDomain}/api/deleteProduct`,
  },
  deleteCategory: {
    url: `${urlDomain}/api/deleteCategory`,
  },

  getCategories: {
    url: `${urlDomain}/api/getAllCategories`,
  },
  AddCategory: {
    url: `${urlDomain}/api/add-category`,
  },
  getNewArrival: {
    url: `${urlDomain}/api/getNewArrival`,
  },
  getHomeBanners: {
    url: `${urlDomain}/api/getBanner`,
  },
  addBanners: {
    url: `${urlDomain}/api/storeBanner`,
  },
  editBanners: {
    url: `${urlDomain}/api/editBanners`,
  },
  getCart: {
    url: `${urlDomain}/api/cart`,
  },
  addToCart: {
    url: `${urlDomain}/api/cart`,
  },
  removeFromCart: {
    url: `${urlDomain}/api/deleteFromCart`,
  },
  decrementCart: {
    url: `${urlDomain}/api/decrementCart`,
  },
};

export default summaryApi;
