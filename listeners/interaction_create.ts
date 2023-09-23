import { Interaction, CacheType, Awaitable } from 'discord.js';
import { Effect, Random } from 'effect';
import { commandOperation } from '../tasks/command_operation';
import { RandomService } from '../utils/random';

export default function interaction(interaction: Interaction<CacheType>): Awaitable<void> {
  if (!interaction.isCommand()) return;

  const program = Effect.provideService(
    commandOperation(interaction),
    RandomService,
    RandomService.of({
      nextIntBetween: Random.nextIntBetween,
    })
  );

  Effect.runPromise(program);
}
