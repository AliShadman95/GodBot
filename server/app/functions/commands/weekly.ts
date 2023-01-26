import discord from "@routes/api/discord";
import db from "@routes/api/database";
import differenceInMinutes from "date-fns/differenceInMinutes";

/**
 * command: !weekly
 * =====================
 * Get the weekly reward.
 *
 * @param ctx
 */

// Use this const for testing // weekly = 10080
const miniumMinutesForReward = 10080;

const weekly = async (ctx): Promise<void> => {
	const selectedUser = ctx.user;

	let user = await db.economy.get({ id: selectedUser.id });

	if (user.id !== "0" && differenceInMinutes(Date.now(), user.lastWeeklyReward) < miniumMinutesForReward) {
		discord.api.interactions.send(
			ctx,
			`Hai già ricevuto il tuo premio questa settimana, devi aspettare ancora ${`${Math.floor(
				(miniumMinutesForReward - differenceInMinutes(Date.now(), user.lastWeeklyReward)) / 1440,
			)} giorni, ${Math.floor(
				((miniumMinutesForReward - differenceInMinutes(Date.now(), user.lastWeeklyReward)) % 1440) / 60,
			)} ore e ${
				(miniumMinutesForReward - differenceInMinutes(Date.now(), user.lastWeeklyReward)) % 60
			}`} minuti.`,
			"",
		);
		return;
	}

	const { economy } = await db.settings.get({});

	const coinAwarded =
		Math.floor(Math.random() * (parseInt(economy.weeklyRewardMax) - (parseInt(economy.weeklyRewardMin) + 1))) +
		parseInt(economy.weeklyRewardMin);

	if (user.id === "0") {
		await db.economy.add({
			...selectedUser,
			coins: "0",
			lastDailyReward: 0,
			lastWeeklyReward: 0,
			lastWorkTime: 0,
		});
		user = await db.economy.get({ id: selectedUser.id });
	}

	await db.economy.update(
		{ id: selectedUser.id },
		{
			...user,
			lastWeeklyReward: Date.now(),
			coins: (parseInt(user.coins) + coinAwarded).toString(),
		},
	);

	discord.api.interactions.send(
		ctx,
		economy?.weeklyRewardMessage
			.replace("{user}", `<@${user.id}>` || "")
			.replace("{coins}", `${coinAwarded.toString()} ${economy?.coinName}` || "")
			.replace("{coinsTotali}", `${(parseInt(user.coins) + coinAwarded).toString()} ${economy?.coinName}` || ""),
		"",
	);
};

export { weekly };
export default weekly;
