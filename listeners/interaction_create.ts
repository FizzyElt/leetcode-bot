import { Interaction, CacheType, Client, Awaitable } from 'discord.js';

export default function interaction(interaction: Interaction<CacheType>): Awaitable<void> {
  if (!interaction.isCommand()) return;

  interaction.reply('我現在它媽只會說嗨');
}
