import { Effect, pipe, Option, ReadonlyArray } from 'effect';
import { CommandInteraction, CacheType } from 'discord.js';
import { getCommandOptionString } from '../utils/command_option';
import { interactionReply } from '../utils/message';
import { fetchProblemsList, Problems, Problem } from '../fetch';

const selectProblem = (problems: Problems): Effect.Effect<never, Error, Problem> =>
  pipe(
    problems,
    ReadonlyArray.head<Problem>,
    Option.match({
      onSome: Effect.succeed,
      onNone: () => Effect.fail(new Error('problem not found')),
    })
  );

const replyProblem = (interaction: CommandInteraction<CacheType>) => (problem: Problem) =>
  interactionReply({
    content: [problem.id, problem.title, problem.difficulty].join('\n'),
    fetchReply: true,
  })(interaction);

export const selectProblemTask = (interaction: CommandInteraction<CacheType>) => {
  return pipe(
    interaction,
    getCommandOptionString('list'),
    fetchProblemsList,
    Effect.flatMap(selectProblem),
    Effect.flatMap(replyProblem(interaction))
  );
};
