import axios from "axios";

class Youtube {
  constructor(key) {
    this.youtube = axios.create({
      baseURL: "https://youtube.googleapis.com/youtube/v3",
      params: { key: key },
    });
  }

  async mostPopular() {
    const response = await this.youtube.get("videos", {
      params: {
        part: "snippet",
        chart: "mostPopular",
        maxResults: 16,
      },
    });
    return response.data;
  }

  async morePopular(nextPageToken = "") {
    const response = await this.youtube.get("videos", {
      params: {
        part: "snippet",
        chart: "mostPopular",
        maxResults: 16,
        pageToken: nextPageToken,
      },
    });
    return response.data;
  }

  async search(query) {
    const response = await this.youtube.get("search", {
      params: {
        part: "snippet",
        maxResults: 16,
        type: "video",
        q: query,
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
}

export default Youtube;
