import {
  CommandInteraction,
  Client,
  ApplicationCommandType,
  ChatInputCommandInteraction,
  PermissionFlagsBits,
  ApplicationCommandOptionType, ApplicationCommandOptionData
} from "discord.js";
import { Command } from "../../interfaces/command";
import { jail } from "../../mods/moderation";

export = {
  name: "jail",
  description: "Returns a greeting",
  defaultMemberPermissions: PermissionFlagsBits.MuteMembers,
  type: ApplicationCommandType.ChatInput,
  cooldown: 0,
  options: [
    {
      name: 'target',
      description: 'User to jail',
      required: true,
      type: ApplicationCommandOptionType.User,
    } as ApplicationCommandOptionData,
    {
      name: 'reason',
      description: 'Reason for jailing',
      required: true,
      type: ApplicationCommandOptionType.String,
    } as ApplicationCommandOptionData,
  ],
  run: async (client: Client, interaction: CommandInteraction) => {

    let content = "There was an error executing the jai.";
    if (interaction instanceof ChatInputCommandInteraction) {
      if(await jail(interaction))
        content = "User has been jailed.";
    } else content = "There was an error executing the jail.";

    await interaction.reply({
      ephemeral: true,
      content
    });
  }
} as Command;
