import { sendWhatsappMessage } from 'service';

export async function interactionCreate(interaction: any) {
  if (!interaction.isChatInputCommand()) return;
  const command = interaction.client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
    console.log(
      `Command: ${interaction.commandName} executed by user: ${interaction.user.username}`,
    );
    await sendWhatsappMessage({
      message: `Command: ${interaction.commandName} executed by user: ${interaction.user.username}`,
    });
  } catch (error) {
    console.error(error);
    if (interaction.deferred || interaction.replied) {
      await interaction.followUp({
        content: 'There was an error while executing this command!',
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: 'There was an error while executing this command!',
        ephemeral: true,
      });
    }
  }
}
