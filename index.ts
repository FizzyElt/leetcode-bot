import { Effect } from 'effect';
import { loginClient, client } from './client';

Effect.runPromise(loginClient(client));
