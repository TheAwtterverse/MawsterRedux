import { Client, Events, GuildMember } from "discord.js";
import { catchRejoin } from "../mods/moderation";

export default (client: Client): void => {
  client.on(Events.GuildMemberAdd, async (member: GuildMember) => {
    await catchRejoin(member);
  });
};
