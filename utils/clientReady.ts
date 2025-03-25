import { REST, Routes } from 'discord.js';
import * as dotenv from 'dotenv';
dotenv.config();

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

export async function clientReadyHandler(client) {
  console.log(`Logged in as: ${client.user.tag}`);
  try {
    console.log(`Started refreshing ${client.commands.size} commands.`);
    console.log(`Started refreshing ${client.commands} commands.`);
    console.log(client.commands.map((cmd) => cmd.data));

    const data: any = await rest.put(
      Routes.applicationGuildCommands(process.env.APP_ID, process.env.GUILD_ID),
      { body: client.commands.map((cmd) => cmd.data) },
    );
    console.log(`Successfully reloaded ${data.length} commands.`);
  } catch (error) {
    console.error(error);
  }
}
