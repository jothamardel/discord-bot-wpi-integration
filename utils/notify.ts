import { SlashCommandBuilder, MessageFlags } from 'discord.js';
import { sendWhatsappMessage } from 'service';

export const notifyData = new SlashCommandBuilder();

const authorizedUsers = ['whimsical_kiwi_18392', 'perez_human'];

notifyData
  .setName('notify')
  .setDescription('Notify users')
  .addStringOption((option) =>
    option
      .setName('message')
      .setDescription('message to send with notification')
      .setRequired(true),
  );

export async function executeNotification(interaction: any) {
  if (!interaction.isChatInputCommand()) {
    return;
  }
  await interaction.deferReply({ flags: MessageFlags.Ephemeral });

  if (!authorizedUsers.includes(interaction.user.username)) {
    await interaction.editReply('You are unauthorized to use this command');
  }

  const message = interaction.options.getString('message');
  try {
    await sendWhatsappMessage({ message });
    await interaction.editReply('Message sent successfully');
  } catch (error) {
    console.error(error);
    await interaction.editReply('An error occured while notifying recipients');
  }
}
