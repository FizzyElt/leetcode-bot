import {
  CacheType,
  CommandInteraction,
  InteractionReplyOptions,
  Message,
  InteractionResponse,
  MessagePayload,
} from 'discord.js';
import { Effect } from 'effect';

interface InteractionReply {
  (options: InteractionReplyOptions & { fetchReply: true }): (
    interaction: CommandInteraction<CacheType>
  ) => Effect.Effect<never, Error, Message<boolean>>;

  (options: string | MessagePayload | InteractionReplyOptions): (
    interaction: CommandInteraction<CacheType>
  ) => Effect.Effect<never, Error, InteractionResponse<boolean>>;
}
export const interactionReply = ((options) => (interaction) =>
  Effect.tryPromise({
    try: () => interaction.reply(options),
    catch: () => new Error('reply error'),
  })) as InteractionReply;
