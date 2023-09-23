import { Context, Effect } from 'effect';

export interface RandomRange {
  nextIntBetween(min: number, max: number): Effect.Effect<never, never, number>;
}

export const RandomService = Context.Tag<RandomRange>();

export const getRandomIntBetween = (min: number, max: number) =>
  RandomService.pipe(Effect.flatMap((random) => random.nextIntBetween(min, max)));
