import { REST } from '@discordjs/rest';
import { SlashCommandBuilder } from '@discordjs/builders';

import dotenv from 'dotenv';
import { Effect } from 'effect';
import { Routes } from 'discord.js';

import { commands } from './command';

dotenv.config();

const token = process.env.TOKEN || '';
const clientId = process.env.CLIENT_ID || '';
const serverId = process.env.SERVER_ID || '';

const rest = new REST({ version: '10' }).setToken(token);

function pushCommands(params: {
  clientId: string;
  serverId: string;
  commands: Array<Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>>;
}) {
  return Effect.tryPromise(() =>
    rest.put(Routes.applicationGuildCommands(params.clientId, params.serverId), {
      body: params.commands.map((command) => command.toJSON()),
    })
  );
}

Effect.runPromise(pushCommands({ clientId, serverId, commands }));
