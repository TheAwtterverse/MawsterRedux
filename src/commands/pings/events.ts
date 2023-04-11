import { CommandInteraction, Client, ApplicationCommandType, PermissionFlagsBits, ApplicationCommandOptionType } from "discord.js";
import { Command } from "../../interfaces/command";
import middleware from "../../utils/roleMiddleware";

const EventsRole = process.env.EVENTS;

export = {
  name: "eventsping",
  description: "Ping the Events role.",
  type: ApplicationCommandType.ChatInput,
  cooldown: 10000,
  options: [],
  run: async (client: Client, interaction: CommandInteraction) => {

    if(!EventsRole) return;
    if(!interaction.channel) return;

    if(!middleware(interaction, 'Event Department', true)) {
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
    await interaction.channel.send(`<@&${EventsRole}>`)
  }
} as Command;
