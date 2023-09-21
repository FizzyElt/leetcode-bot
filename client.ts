import { Effect } from 'effect';
import dotenv from 'dotenv';
import { Client, GatewayIntentBits } from 'discord.js';
import readyListener from './listeners/readyListener';
import interaction from './listeners/interaction_create';

dotenv.config();

export const client = new Client({
  intents: [GatewayIntentBits.GuildMessages],
});

client.on('ready', readyListener);
client.on('interactionCreate', interaction);

export const loginClient = (client: Client) =>
  Effect.tryPromise(() => client.login(process.env.TOKEN));
