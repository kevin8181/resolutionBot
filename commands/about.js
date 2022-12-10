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
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageServer), //this does not work, fix later
	async execute(interaction) {

		const targetUser = interaction.options.getUser('user');
		const name = interaction.options.getString('name');
		const category = interaction.options.getString('category');

		const flags = [
			PermissionsBitField.Flags.ManageChannel,
			PermissionsBitField.Flags.ManageMessages,
		];

		interaction.guild.channels.create({
			name: name,
			type: ChannelType.GuildText,
			permissionOverwrites: [
				{
					id: targetUser,
					allow: [new PermissionsBitField(flags)],
				},
			],
		});

		await interaction.reply(`You asked to create a ${category} channel called "${name}" for the user ${targetUser}.`);
	},
};
