import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, Collection, Events, GatewayIntentBits } from 'discord.js';
import { DiscordConfig } from 'types';
import {
  clientReadyHandler,
  data,
  execute,
  interactionCreate,
  executeNotification,
  notifyData,
} from 'utils';

@Injectable()
export class DiscordService implements OnModuleInit {
  private client: DiscordConfig;
  private pingCommand = data;
  private readonly discordChannelId = process.env.DISCORD_CHANNEL_ID;
  constructor() {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.GuildMessageTyping,
      ],
    });

    this.client.commands = new Collection();
    this.client.commands.set(this.pingCommand.name, { data, execute });
    this.client.commands.set(notifyData.name, {
      data: notifyData,
      execute: executeNotification,
    });
  }
  async onModuleInit() {
    this.client.once(Events.ClientReady, clientReadyHandler);
    this.client.on(Events.InteractionCreate, interactionCreate);
    // this.client.on(Events.MessageCreate, async (message) => {
    //   console.log('Message: ', message);

    //   if (message.content.toLowerCase() === '!ping') {
    //     await message.reply('Pong!');
    //   }
    // });
    this.client.login();
  }
}
