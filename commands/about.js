//jshint esversion:8
const { SlashCommandBuilder, PermissionFlagsBits, ChannelType, PermissionsBitField } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('journey')
		.setDescription('Initializes a new journey channel.')
		.addUserOption(option =>
			option.setName('user')
				.setDescription('The user who will own the channel')
				.setRequired(true))
    .addStringOption(option =>
			option.setName('name')
				.setDescription('The name of the channel')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('category')
				.setDescription('The category of the channel')
				.setRequired(true)
				.addChoices(
					{ name: 'Daily', value: 'daily' },
					{ name: 'Weekly', value: 'weekly' },
					{ name: 'Bi-monthly', value: 'bi-monthly' },
					{ name: 'Monthly', value: 'monthly' },
				)
		)
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
	async execute(interaction) {

		const targetUser = interaction.options.getUser('user');
		const name = interaction.options.getString('name');
		const category = interaction.options.getString('category');

		interaction.guild.channels.create({
			name: name,
			type: ChannelType.GuildText,
			permissionOverwrites: [
				{
					id: targetUser,
					allow: [
						PermissionsBitField.Flags.ManageChannels,
						PermissionsBitField.Flags.ManageMessages,
						PermissionsBitField.Flags.ManageWebhooks,
						PermissionsBitField.Flags.ManageThreads,
						PermissionsBitField.Flags.CreatePublicThreads,
					],
				},
			],
		});

		await interaction.reply(`You asked to create a ${category} channel called "${name}" for the user ${targetUser}.`);
	},
};
