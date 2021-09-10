import axios from "axios";

class Youtube {
  constructor(key) {
    this.youtube = axios.create({
      baseURL: "https://youtube.googleapis.com/youtube/v3",
      params: { key: key },
    });
  }

  /* 한국에서 가장 인기있는 영상을 받아오는 함수 */
  async mostPopular() {
    const response = await this.youtube.get("videos", {
      params: {
        part: "snippet",
        chart: "mostPopular",
        regionCode: "kr",
        maxResults: 16,
      },
    });
    return response.data;
  }

  /* mostPopular()에서 받아오 data에있는 nextPageToken을 인자로하여 스크롤시 추가 영상을 받아오는 함수 */
  async morePopular(nextPageToken = "") {
    const response = await this.youtube.get("videos", {
      params: {
        part: "snippet",
        chart: "mostPopular",
        regionCode: "kr",
        maxResults: 16,
        pageToken: nextPageToken,
      },
    });
    return response.data;
  }

  /* 검색어 (query)를 받아 검색어에 해당하는 영상 데이터를 받아오는 함수 */
  async search(query) {
    const response = await this.youtube.get("search", {
      params: {
        part: "snippet",
        maxResults: 16,
        type: "video",
        q: query,
      },
    });

    // 검색 데이터의 경우 id요소가 객체로 이루어져있기 때문에
    // 사용하는데에 불편함이 있어 객체에 포함된 videoId로 재설정해줌
    const items = response.data.items.map((item) => ({
      ...item,
      id: item.id.videoId,
    }));

    const data = response.data;
    data.items = items;
    return data;
  }

  /* search함수에서 받은 nextPageToken을 인자로하여 스크롤시 추가 영상을 받아오는 함수 */
  async moreSearch(query, nextPageToken) {
    const response = await this.youtube.get("search", {
      params: {
        part: "snippet",
        maxResults: 16,
        type: "video",
        q: query,
        pageToken: nextPageToken,
      },
    });

    const items = response.data.items.map((item) => ({
      ...item,
      id: item.id.videoId,
    }));

    const data = response.data;
    data.items = items;
    return data;
  }

  // 기존에 video를 받아오면 description이 생략된채로 값이 넘어오는 문제가있는데,
  // id직접검색을 통해 description 전문을 받아올 때 사용하는 함수
  async getFullDescription(id) {
    const response = await this.youtube.get("videos", {
      params: {
        part: "snippet",
        id: id,
      },
    });

    return response.data.items[0].snippet.description;
  }
}

export default Youtube;
