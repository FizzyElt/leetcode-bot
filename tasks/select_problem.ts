import { Effect, pipe, ReadonlyArray, Cause } from 'effect';

import { fetchProblemsList, Problems, Problem } from '../fetch';

import { CommandInteraction, CacheType } from 'discord.js';
import { getCommandOptionString } from '../utils/command_option';
import { interactionReply } from '../utils/message';
import { getRandomIntBetween, RandomRange } from '../utils/random';

const getReplyProblemString = (problem: Problem): string => {
  const title = `**${problem.id}** ${problem.difficulty}`;
  const name = problem.title;
  const link = `https://leetcode.com/problems/${problem.title.split(' ').join('-')}`;

  return [title, name, link].join('\n');
};

const selectProblem = (
  problems: Problems
): Effect.Effect<RandomRange, Cause.NoSuchElementException, Problem> =>
  pipe(
    getRandomIntBetween(0, problems.length - 1),
    Effect.flatMap((index) => ReadonlyArray.get(problems, index))
  );
const replyProblem = (interaction: CommandInteraction<CacheType>) => (problem: Problem) =>
  interactionReply({
    content: getReplyProblemString(problem),
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
