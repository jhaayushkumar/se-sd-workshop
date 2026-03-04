#!/usr/bin/env node

import { Command } from 'commander';
import { BasicCommands } from './commands/BasicCommands';
import { GitHubCommands } from './commands/GitHubCommands';
import { UtilityCommands } from './commands/UtilityCommands';

const program = new Command();
const basicCommands = new BasicCommands();
const githubCommands = new GitHubCommands();
const utilityCommands = new UtilityCommands();

program
  .name('mycli')
  .description('A multi-purpose CLI tool')
  .version('1.0.0');

program
  .command('greet <name>')
  .description('Greet a user')
  .action((name: string) => {
    basicCommands.greet(name);
  });

program
  .command('add <a> <b>')
  .description('Add two numbers')
  .action((a: string, b: string) => {
    basicCommands.add(parseFloat(a), parseFloat(b));
  });

program
  .command('subtract <a> <b>')
  .description('Subtract two numbers')
  .action((a: string, b: string) => {
    basicCommands.subtract(parseFloat(a), parseFloat(b));
  });

const gh = program.command('gh').description('GitHub commands');

gh.command('user <username>')
  .description('Get GitHub user info')
  .action((username: string) => {
    githubCommands.user(username);
  });

gh.command('repos <username>')
  .description('List user repositories')
  .option('--sort <type>', 'Sort by: stars, updated, name', 'updated')
  .option('--limit <number>', 'Number of repos', '10')
  .action((username: string, options: any) => {
    githubCommands.repos(username, options.sort, parseInt(options.limit));
  });

gh.command('repo <owner> <repo>')
  .description('Get repository details')
  .action((owner: string, repo: string) => {
    githubCommands.repo(owner, repo);
  });

gh.command('trending')
  .description('Show trending repositories')
  .option('--lang <language>', 'Filter by language')
  .option('--count <number>', 'Number of repos', '10')
  .action((options: any) => {
    githubCommands.trending(options.lang, parseInt(options.count));
  });

program
  .command('weather <city>')
  .description('Get weather information')
  .action((city: string) => {
    utilityCommands.weather(city);
  });

program
  .command('joke')
  .description('Get a programming joke')
  .action(() => {
    utilityCommands.joke();
  });

program
  .command('ip')
  .description('Get your IP and location')
  .action(() => {
    utilityCommands.ip();
  });

program
  .command('quote')
  .description('Get Pikachu data')
  .action(() => {
    utilityCommands.quote();
  });

program
  .command('uuid')
  .description('Generate UUID')
  .option('-n <count>', 'Number of UUIDs', '1')
  .action((options: any) => {
    utilityCommands.uuid(parseInt(options.n));
  });

program
  .command('password')
  .description('Generate secure password')
  .option('-l <length>', 'Password length', '16')
  .action((options: any) => {
    utilityCommands.password(parseInt(options.l));
  });

program
  .command('hash <text>')
  .description('Hash text')
  .option('-a <algorithm>', 'Algorithm: md5, sha1, sha256', 'sha256')
  .action((text: string, options: any) => {
    utilityCommands.hash(text, options.a);
  });

program.parse(process.argv);
