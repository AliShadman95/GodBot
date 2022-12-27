import discord from "@routes/api/discord";
import db from "@routes/api/database";
import differenceInMinutes from "date-fns/differenceInMinutes";

/**
 * command: !daily
 * =====================
 * Get the daily reward.
 *
 * @param ctx
 */

// Use this const for testing // daily = 1440
const miniumMinutesForReward = 1440;

const daily = async (ctx): Promise<void> => {
	const selectedUser = ctx.user;

	let user = await db.economy.get({ id: selectedUser.id });

	if (user.id !== "0" && differenceInMinutes(Date.now(), user.lastDailyReward) < miniumMinutesForReward) {
		discord.api.interactions.send(
			ctx,
			`Hai già ricevuto il tuo premio oggi, devi aspettare ancora ${`${Math.floor(
				(miniumMinutesForReward - differenceInMinutes(Date.now(), user.lastDailyReward)) / 60,
			)} ore e ${
				(miniumMinutesForReward - differenceInMinutes(Date.now(), user.lastDailyReward)) % 60
			}`} minuti.`,
			"",
		);
		return;
	}

	const { economy } = await db.settings.get({});

	const coinAwarded =
		Math.floor(Math.random() * (parseInt(economy.dailyRewardMax) - (parseInt(economy.dailyRewardMin) + 1))) +
		parseInt(economy.dailyRewardMin);

	if (user.id === "0") {
		await db.economy.add({
			...selectedUser,
			coins: "0",
			lastDailyReward: 0,
			lastWeeklyReward: 0,
		});
		user = await db.economy.get({ id: selectedUser.id });
	}

	await db.economy.update(
		{ id: selectedUser.id },
		{
			...user,
			lastDailyReward: Date.now(),
			coins: (parseInt(user.coins) + coinAwarded).toString(),
		},
	);

	discord.api.interactions.send(
		ctx,
		economy?.dailyRewardMessage
			.replace("{user}", `<@${user.id}>` || "")
			.replace("{coins}", `${coinAwarded.toString()} ${economy?.coinName}` || "")
			.replace("{coinsTotali}", `${(parseInt(user.coins) + coinAwarded).toString()} ${economy?.coinName}` || ""),
		"",
	);
};

export { daily };
export default daily;
