import { CommandInteraction, Client, ApplicationCommandType, PermissionFlagsBits, ApplicationCommandOptionType } from "discord.js";
import { Command } from "../../interfaces/command";
import middleware from "../../utils/roleMiddleware";

const ModeratorRole = process.env.MODERATOR;
const CertifiedRole = process.env.CERTIFIED;

export = {
  name: "modping",
  description: "Ping the moderators.",
  type: ApplicationCommandType.ChatInput,
  cooldown: 10000,
  options: [],
  run: async (client: Client, interaction: CommandInteraction) => {

    if(!ModeratorRole) return;
    if(!CertifiedRole) return;
    if(!interaction.channel) return;

    if(!middleware(interaction, CertifiedRole)) {
      await interaction.reply({
        ephemeral: true,
        content: "You're not allowed to use this command."
      });
      return;
    }
    await interaction.reply({
      ephemeral: true,
      content: "Done :3"
    });
    await interaction.channel.send(`<@&${ModeratorRole}>`)
  }
} as Command;
