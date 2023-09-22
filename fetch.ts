import fs from 'fs/promises';
import { Effect } from 'effect';

export enum ProblemCollection {
  Top145 = 'top145',
  Google1y = 'google1y',
  Google50 = 'google50',
  Google6m = 'google6m',
}

export enum Difficulty {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard',
}

export type Problem = {
  id: number;
  title: string;
  difficulty: Difficulty;
};

export type Problems = Array<Problem>;

export const fetchProblemsList = (name: string) =>
  Effect.tryPromise<Problems, Error>({
    try: () =>
      fs
        .readFile(`./data/json/${name}.json`, { encoding: 'utf8' })
        .then((data) => JSON.parse(data))
        .then(({ data }) => data as Problems),
    catch: () => new Error('load json error'),
  });
