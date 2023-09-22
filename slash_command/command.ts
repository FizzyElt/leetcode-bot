import { SlashCommandBuilder, SlashCommandStringOption } from 'discord.js';
import fs from 'fs';

export enum CommandName {
  random = 'random',
}

const createProblemChoices = () => {
  const fileList = fs.readdirSync('./data/json').map((path) => {
    const [name = ''] = path.split('.');
    return name;
  });

  return fileList;
};

export const commands = [
  new SlashCommandBuilder()
    .setName(CommandName.random)
    .setDescription('random problem')
    .addStringOption(
      new SlashCommandStringOption()
        .setName('list')
        .setDescription('list')
        .addChoices(...createProblemChoices().map((name) => ({ name: name, value: name })))
        .setRequired(true)
    ),
];
