import {
	ApplicationCommandOptionType,
	CacheType,
	CommandInteraction,
} from "discord.js";
import { pipe, Option, ReadonlyArray } from "effect";
import * as Function from "effect/Function";
import * as String from "effect/String";
import { equals } from "effect/Equal";

export const getCommandOptionOfType =
	(type: ApplicationCommandOptionType, optionName: string) =>
	(interaction: CommandInteraction<CacheType>) =>
		pipe(
			interaction.options.data,
			ReadonlyArray.findFirst((option) => equals(option.name, optionName)),
			Option.filter((option) => equals(option.type, type)),
		);

export const getCommandOptionString =
	(optionName: string) =>
	(interaction: CommandInteraction<CacheType>): string => {
		return pipe(
			interaction,
			getCommandOptionOfType(ApplicationCommandOptionType.String, optionName),
			Option.map((option) => option.value),
			Option.filter(String.isString),
			Option.getOrElse(Function.constant("")),
		);
	};
