import { SlashCommandBuilder } from 'discord.js';

export enum CommandName {
  hello = 'hello',
}

export const commands = [
  new SlashCommandBuilder().setName(CommandName.hello).setDescription('hello'),
];
