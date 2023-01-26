import discord from "@routes/api/discord";
import db from "@routes/api/database";
import differenceInMinutes from "date-fns/differenceInMinutes";

/**
 * command: /work
 * =====================
 * Work to get coins
 *
 * @param ctx
 */

// Use this const for testing // daily = 1440
const miniumMinutesForReward = 60;

const work = async (ctx): Promise<void> => {
	const selectedUser = ctx.user;

	let user = await db.economy.get({ id: selectedUser.id });

	// If still working
	if (user.id !== "0" && differenceInMinutes(Date.now(), user.lastWorkTime) < miniumMinutesForReward) {
		discord.api.interactions.send(
			ctx,
			`Stai ancora lavorando, devi aspettare ancora ${
				(miniumMinutesForReward - differenceInMinutes(Date.now(), user.lastWorkTime)) % 60
			} minuto/i.`,
			"",
		);
		return;
	}

	const { economy } = await db.settings.get({});

	const coinAwarded =
		Math.floor(Math.random() * (parseInt(economy.workRewardMin) - (parseInt(economy.workRewardMax) + 1))) +
		parseInt(economy.workRewardMin);

	// If working is done
	if (
		user.id !== "0" &&
		differenceInMinutes(Date.now(), user.lastWorkTime) >= miniumMinutesForReward &&
		user.lastWorkTime > 0
	) {
		await db.economy.update(
			{ id: selectedUser.id },
			{
				...user,
				lastWorkTime: 0,
				coins: (parseInt(user.coins) + coinAwarded).toString(),
			},
		);

		discord.api.interactions.send(
			ctx,
			economy?.workDoneMessage
				.replace("{user}", `<@${user.id}>` || "")
				.replace("{coins}", `${coinAwarded.toString()} ${economy?.coinName}` || "")
				.replace(
					"{coinsTotali}",
					`${(parseInt(user.coins) + coinAwarded).toString()} ${economy?.coinName}` || "",
				),
			"",
		);

		return;
	}

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
			lastWorkTime: Date.now(),
		},
	);

	discord.api.interactions.send(
		ctx,
		economy?.workInProgressMessage.replace("{user}", `<@${user.id}>` || "").replace("{hours}", "1"),
		"",
	);
};

export { work };
export default work;
