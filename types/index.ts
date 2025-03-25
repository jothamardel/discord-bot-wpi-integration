import { Client, SlashCommandBuilder } from 'discord.js';

export interface DiscordConfig extends Client {
  commands?: {
    set?: any;
  };
}

export interface PingCommmandType {
  name: string;
  data: SlashCommandBuilder;
  execute: (client) => void;
}
