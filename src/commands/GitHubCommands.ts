import { GitHubService } from '../services/GitHubService';

export class GitHubCommands {
  private service: GitHubService;

  constructor() {
    this.service = new GitHubService();
  }

  async user(username: string): Promise<void> {
    try {
      const data = await this.service.getUser(username);
      console.log(`Name:       ${data.name || 'N/A'}`);
      console.log(`Login:      ${data.login}`);
      console.log(`Bio:        ${data.bio || 'N/A'}`);
      console.log(`Public Repos: ${data.public_repos}`);
      console.log(`Followers:  ${data.followers}`);
      console.log(`Following:  ${data.following}`);
      console.log(`Location:   ${data.location || 'N/A'}`);
    } catch (error: any) {
      console.error(`Error: ${error.message}`);
    }
  }

  async repos(username: string, sort: string = 'updated', limit: number = 10): Promise<void> {
    try {
      const data = await this.service.getRepos(username, sort, limit);
      data.forEach((repo: any, index: number) => {
        console.log(`${index + 1}. ${repo.name}  (${repo.stargazers_count} stars) | ${repo.language || 'N/A'}`);
      });
    } catch (error: any) {
      console.error(`Error: ${error.message}`);
    }
  }

  async repo(owner: string, repoName: string): Promise<void> {
    try {
      const data = await this.service.getRepo(owner, repoName);
      console.log(`Repo:        ${data.full_name}`);
      console.log(`Stars:       ${data.stargazers_count}`);
      console.log(`Forks:       ${data.forks_count}`);
      console.log(`Issues:      ${data.open_issues_count}`);
      console.log(`Language:    ${data.language || 'N/A'}`);
      console.log(`Description: ${data.description || 'N/A'}`);
    } catch (error: any) {
      console.error(`Error: ${error.message}`);
    }
  }

  async trending(language?: string, count: number = 10): Promise<void> {
    try {
      const data = await this.service.getTrending(language, count);
      data.forEach((repo: any, index: number) => {
        console.log(`${index + 1}. ${repo.full_name}  (${repo.stargazers_count} stars) | ${repo.language || 'N/A'}`);
        console.log(`   ${repo.description || 'No description'}`);
      });
    } catch (error: any) {
      console.error(`Error: ${error.message}`);
    }
  }
}
