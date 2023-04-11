import { Client, ChatInputCommandInteraction, GuildMember, Guild } from "discord.js";
import jailModel, { IJail } from '../schemas/jail';
import { Logger } from '../core/logger';
import { audit } from './audit';

/**
 * LexBot Mod for the AwtterSpace Discord
 *
 * Extends the basic functionality with smol moderation tools.
 *
 * @author AlexOttr <alex@tailbyte.org>
 * @version 1.1
 */

const JailRole = process.env.JAIL || '';
const logger = Logger.register('Mods', true)
let guild: Guild | undefined = undefined;

export default async (client: Client) => {
  try {
    guild = await client.guilds.fetch(process.env.GUILD || '');
    // check if has mute permission
  }
  catch (error) {
    logger.error(error);
  }
};

export const catchRejoin = async (member: GuildMember) => {
  const jailed: IJail | null = await jailModel.findOne({ discordId: member.id });
  if (jailed === null) return;

  const success = await jailMember(member, 'You deserved it.');
  if (success) await audit(`Member ${member} has been jailed after he rejoined.`);
  else await audit(`Member ${member} found back to the server but I was not able to put him back to jail.`);
}

export const jail = async (interaction: ChatInputCommandInteraction) : Promise<boolean> => {

  const user = interaction.options.getUser('target');
  const reason = interaction.options.getString('reason') ?? 'No reason provided';
  if (!user) return false;
  if(!interaction.guild) return false;

  const member = await interaction.guild.members.fetch(user)

  const success = await jailMember(member, reason);
  if (!success) return false;

  await jailModel.findOneAndUpdate(
    { discordId: member.id },
    {
      discordId: member.id,
    },
    { upsert: true, new: true },
  );

  member.send(`You've been put into jail with the reason: ${reason}. Please open a ticket or wait.`).catch(logger.error);
  return true;
};

const jailMember = async (member: GuildMember, reason: string) : Promise<boolean> => {

  await member.timeout(72 * 60 * 60 * 1000, reason);

  const jailRole = await member.guild.roles.fetch(JailRole);

  if (jailRole) {
    await member.roles.add(jailRole);
    return true;
  }

  logger.error(`[Moderation] Jailer role ${JailRole} not found on server.`);
  return false;
};

const unjailMember = async (member: GuildMember, reason: string) : Promise<boolean> => {

  await member.timeout(null, reason);

  const jailRole = await member.guild.roles.fetch(JailRole);

  if (jailRole) {
    await member.roles.remove(jailRole);
    return true;
  }

  logger.error(`[Moderation] Jailer role ${JailRole} not found on server.`);
  return false;
};

export const unjail = async (member: GuildMember, reason: string) : Promise<boolean> => {

  jailModel.deleteOne({discordId: member.id});
  const success = await unjailMember(member, reason);
  if (!success) return false;

  member.send(`You've been taken out of the jail with the reason: ${reason}`).catch(logger.error);

  return true;
};
