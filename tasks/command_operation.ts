import { CacheType, CommandInteraction } from 'discord.js';
import { Match, pipe } from 'effect';
import { CommandName } from '../slash_command/command';
import { selectProblemTask } from './select_problem';
import { interactionReply } from '../utils/message';

const matchCommand = pipe(
  Match.type<CommandInteraction<CacheType>>(),
  Match.when({ commandName: CommandName.random }, (interaction) =>
    selectProblemTask(interaction as CommandInteraction<CacheType>)
  ),
  Match.orElse(interactionReply({ content: 'no match command', fetchReply: true }))
);

export const commandOperation = (interaction: CommandInteraction<CacheType>) => {
  return matchCommand(interaction);
};
