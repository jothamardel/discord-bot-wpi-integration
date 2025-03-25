import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';

export const notifyData = new SlashCommandBuilder();
const embed = new EmbedBuilder()
  .setColor('Blue')
  .setDescription('Notification ');

notifyData.setName('notify').setDescription('Notify users');

export async function executeNotification(interaction: any) {
  await interaction.deferReply();

  try {
    embed.setTitle('Important Updates').setDescription('Unlock APIs');
    await interaction.editReply({
      embeds: [embed],
    });
  } catch (error) {
    console.error(error);
    await interaction.editReply(embed);
  }
}
