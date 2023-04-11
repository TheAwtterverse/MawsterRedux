import { Client, Guild, TextChannel } from 'discord.js';
import settingsModel from '../schemas/settings';
import { Logger } from '../core/logger';

const logger = Logger.register('Audit', true)

let guild: Guild | undefined = undefined;

export default async (client: Client) => {
  try {
    guild = await client.guilds.fetch(process.env.GUILD || '');
  }
  catch (error) {
    logger.error(error);
  }
};

export const audit = async (text: string) : Promise<boolean> => {

  if (!guild) return false;

  const channelId = await settingsModel.findOne({ name: 'audit-channel' });
  if (!channelId) return false;

  // send audit text to channel
  const channel = guild.channels.cache.get(channelId.value as string);
  if (!channel || !(channel instanceof TextChannel)) return false;
  await channel.send(text);
  return true;
};

export const setChannel = async (channelId: string) : Promise<boolean> => {

  await settingsModel.findOneAndUpdate(
    { name: 'audit-channel' },
    { name: 'audit-channel', value: channelId },
    { upsert: true },
  );
  return true;
};
