import { Interaction, CacheType, Client, Awaitable } from 'discord.js';
import { Effect } from 'effect';
import { commandOperation } from '../tasks/command_operation';
export default function interaction(interaction: Interaction<CacheType>): Awaitable<void> {
  if (!interaction.isCommand()) return;

  const program = commandOperation(interaction);

  Effect.runPromise(program);
}
