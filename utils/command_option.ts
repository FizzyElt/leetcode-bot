import { ApplicationCommandOptionType, CacheType, CommandInteraction } from 'discord.js';
import { pipe, Option, ReadonlyArray, Function } from 'effect';
import * as R from 'remeda';

export const getCommandOptionOfType =
  (type: ApplicationCommandOptionType, optionName: string) =>
  (interaction: CommandInteraction<CacheType>) =>
    pipe(
      interaction.options.data,
      ReadonlyArray.findFirst((option) => R.equals(option.name, optionName)),
      Option.filter((option) => R.equals(option.type, type))
    );

export const getCommandOptionString =
  (optionName: string) =>
  (interaction: CommandInteraction<CacheType>): string => {
    return pipe(
      interaction,
      getCommandOptionOfType(ApplicationCommandOptionType.String, optionName),
      Option.map(R.prop('value')),
      Option.filter(R.isString),
      Option.getOrElse(Function.constant(''))
    );
  };
