import axios from 'axios';

export class GitHubService {
  private baseURL = 'https://api.github.com';

  async getUser(username: string) {
    const response = await axios.get(`${this.baseURL}/users/${encodeURIComponent(username)}`);
    return response.data;
  }

  async getRepos(username: string, sort: string = 'updated', limit: number = 10) {
    const response = await axios.get(`${this.baseURL}/users/${encodeURIComponent(username)}/repos`, {
      params: { sort, per_page: limit }
    });
    return response.data;
  }

  async getRepo(owner: string, repo: string) {
    const response = await axios.get(`${this.baseURL}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`);
    return response.data;
  }

  async getTrending(language?: string, count: number = 10) {
    const date = new Date();
    date.setDate(date.getDate() - 7);
    const dateStr = date.toISOString().split('T')[0];
    
    let query = `created:>${dateStr}`;
    if (language) query += ` language:${language}`;
    
    const response = await axios.get(`${this.baseURL}/search/repositories`, {
      params: { q: query, sort: 'stars', order: 'desc', per_page: count }
    });
    return response.data.items;
  }
}
