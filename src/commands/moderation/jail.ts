import {
  CommandInteraction,
  Client,
  ApplicationCommandType,
  PermissionFlagsBits,
  ApplicationCommandOptionType, ApplicationCommandOptionData
} from "discord.js";
import { Command } from "../../interfaces/command";

export = {
  name: "jail",
  description: "Returns a greeting",
  defaultMemberPermissions: PermissionFlagsBits.MuteMembers,
  type: ApplicationCommandType.ChatInput,
  cooldown: 0,
  options: [
    {
      name: 'user',
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
    const content = "Hello there!";

    await interaction.reply({
      ephemeral: true,
      content
    });
  }
} as Command;
