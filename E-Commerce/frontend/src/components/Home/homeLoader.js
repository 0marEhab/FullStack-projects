import Fetch from "../../util/Fetch";

import summaryApi from "../../common";

export default async function homeLoader() {
  const data = async () => {
    const res1 = await Fetch(summaryApi.getNewArrival.url);
    const res2 = await Fetch(summaryApi.getHomeBanners.url);
    return {
      data: res1,
      banners: res2,
    };
  };

  return await data();
}
