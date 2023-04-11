import { CommandInteraction } from "discord.js";
export default (interaction: CommandInteraction, roleIdentifier: string, isName = false) => {
  if (!interaction.member) return false;
  if (Array.isArray(interaction.member.roles)) return false;

  if(isName)
    return interaction.member.roles.cache.some(role => role.name === roleIdentifier)
  else
    return interaction.member.roles.cache.has(roleIdentifier)
}
