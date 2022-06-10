const isLevelUp = (xps: number[], points: string, pointAwarded: number, isNewUser = false): number => {
	const currentLevelIndex =
		xps.findIndex((xp, index) => parseInt(points) >= xp && parseInt(points) < xps[index + 1]) + 1;

	if (parseInt(!isNewUser ? points : "0") + pointAwarded >= xps[currentLevelIndex]) {
		return currentLevelIndex + 1;
	}
	return -1;
};

export default isLevelUp;
export { isLevelUp };
