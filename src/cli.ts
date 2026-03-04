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
  .action(async (name: string) => {
    await basicCommands.greet(name);
  });

program
  .command('add <a> <b>')
  .description('Add two numbers')
  .action(async (a: string, b: string) => {
    await basicCommands.add(parseFloat(a), parseFloat(b));
  });

program
  .command('subtract <a> <b>')
  .description('Subtract two numbers')
  .action(async (a: string, b: string) => {
    await basicCommands.subtract(parseFloat(a), parseFloat(b));
  });

const gh = program.command('gh').description('GitHub commands');

gh.command('user <username>')
  .description('Get GitHub user info')
  .action(async (username: string) => {
    await githubCommands.user(username);
  });

gh.command('repos <username>')
  .description('List user repositories')
  .option('--sort <type>', 'Sort by: stars, updated, name', 'updated')
  .option('--limit <number>', 'Number of repos', '10')
  .action(async (username: string, options: any) => {
    await githubCommands.repos(username, options.sort, parseInt(options.limit));
  });

gh.command('repo <owner> <repo>')
  .description('Get repository details')
  .action(async (owner: string, repo: string) => {
    await githubCommands.repo(owner, repo);
  });

gh.command('trending')
  .description('Show trending repositories')
  .option('--lang <language>', 'Filter by language')
  .option('--count <number>', 'Number of repos', '10')
  .action(async (options: any) => {
    await githubCommands.trending(options.lang, parseInt(options.count));
  });

program
  .command('weather <city>')
  .description('Get weather information')
  .action(async (city: string) => {
    await utilityCommands.weather(city);
  });

program
  .command('joke')
  .description('Get a programming joke')
  .action(async () => {
    await utilityCommands.joke();
  });

program
  .command('ip')
  .description('Get your IP and location')
  .action(async () => {
    await utilityCommands.ip();
  });

program
  .command('quote')
  .description('Get Pikachu data')
  .action(async () => {
    await utilityCommands.quote();
  });

program
  .command('uuid')
  .description('Generate UUID')
  .option('-n <count>', 'Number of UUIDs', '1')
  .action(async (options: any) => {
    await utilityCommands.uuid(parseInt(options.n));
  });

program
  .command('password')
  .description('Generate secure password')
  .option('-l <length>', 'Password length', '16')
  .action(async (options: any) => {
    await utilityCommands.password(parseInt(options.l));
  });

program
  .command('hash <text>')
  .description('Hash text')
  .option('-a <algorithm>', 'Algorithm: md5, sha1, sha256', 'sha256')
  .action(async (text: string, options: any) => {
    await utilityCommands.hash(text, options.a);
  });

program.parse(process.argv);
