import { Effect, Console, pipe } from 'effect';
import { loginClient, client } from './client';
import { fetchProblemsList, ProblemCollection } from './fetch';

const program = pipe(
  fetchProblemsList(ProblemCollection.Google6m),
  Effect.flatMap((data) => Console.log(data))
);

Effect.runPromise(loginClient(client));
