import { getIdDiscord } from 'utils/api';

const generateBackground = (
  ctx,
  gradientColor1,
  gradientColor2,
  isGradientField,
): void => {
  // Add gradient - we use createLinearGradient to do this
  ctx.restore();

  const grd = ctx.createLinearGradient(0, 853, 1352, 0);
  grd.addColorStop(0, gradientColor1);
  isGradientField && grd.addColorStop(1, gradientColor2 || '#0a0a0a');
  ctx.fillStyle = grd;
  // Fill our gradient
  ctx.fillRect(0, 0, 1342, 853);
};

const generateText = (
  ctx,
  color1,
  color2,
  color3,
  rankInfo,
  currentLevelIndex,
  rank,
  settings,
): void => {
  ctx.restore();
  // Add our title text
  ctx.font = '70px Inter';
  ctx.fillStyle = color1;

  const numberLevelWidth = ctx.measureText(currentLevelIndex).width;

  ctx.fillText(currentLevelIndex, 1270 - numberLevelWidth, 110);

  // Add our title text
  ctx.font = '40px Inter';
  ctx.fillStyle = color1;

  const levelLabelWidth = ctx.measureText('LEVEL').width;

  ctx.fillText('LEVEL', 1270 - numberLevelWidth - levelLabelWidth - 10, 110);

  // Add our title text
  ctx.font = '70px Inter';
  ctx.fillStyle = color2;

  const numberRankWidth = ctx.measureText(`#${rank}`).width;

  ctx.fillText(
    `#${rank}`,
    1270 - numberLevelWidth - levelLabelWidth - numberRankWidth - 40,
    110,
  );

  // Add our title text
  ctx.font = '40px Inter';
  ctx.fillStyle = color2;

  const rankLabelWidth = ctx.measureText('RANK').width;

  ctx.fillText(
    'RANK',
    1270 -
      numberLevelWidth -
      levelLabelWidth -
      numberRankWidth -
      rankLabelWidth -
      60,
    110,
  );

  // /////////// /////////

  // Add our title text
  ctx.font = '58px Inter';
  ctx.fillStyle = color2;
  ctx.fillText(rankInfo?.username, 385, 250);

  const usernameWidth = ctx.measureText(rankInfo?.username).width;

  ctx.font = '38px Inter';
  ctx.fillStyle = color3;

  ctx.fillText(
    `#${rankInfo?.discriminator || '000'}`,
    385 + usernameWidth + 12,
    250,
  );

  // Xp To New Level
  ctx.font = '38px Inter';
  ctx.fillStyle = color3;

  const xpNeededWidth = ctx.measureText(
    `/ ${settings?.rank?.xps[currentLevelIndex]} XP`,
  ).width;

  ctx.fillText(
    `/ ${settings?.rank?.xps[currentLevelIndex]} XP`,
    1260 - xpNeededWidth,
    250,
  );

  ctx.font = '38px Inter';
  ctx.fillStyle = color2;

  const currentXpWidth = ctx.measureText(rankInfo.points).width;

  ctx.fillText(
    rankInfo.points,
    1260 - xpNeededWidth - currentXpWidth - 20,
    250,
  );
};

const generateProgressBar = (
  ctx,
  color1,
  color2,
  settings,
  rankInfo,
  currentLevelIndex,
): void => {
  const percentage = Math.floor(
    (parseInt(rankInfo?.points) -
      (settings?.rank?.xps[currentLevelIndex - 1] || 0)) /
      ((settings?.rank?.xps[currentLevelIndex] -
        (settings?.rank?.xps[currentLevelIndex - 1] || 0)) /
        100),
  );

  // Background level bar
  for (let i = 0; i < 100; i++) {
    ctx.beginPath();
    ctx.lineWidth = 42;
    ctx.strokeStyle = color2;
    ctx.fillStyle = color2;
    ctx.arc(400 + i * 8.65, 300, 8, 0, Math.PI * 2, true);
    ctx.stroke();
    ctx.fill();
  }
  // Progress bar
  for (let i = 0; i < percentage; i++) {
    ctx.beginPath();
    ctx.lineWidth = 42;
    ctx.strokeStyle = color1;
    ctx.fillStyle = color1;
    ctx.arc(400 + i * 8.65, 300, 8, 0, Math.PI * 2, true);
    ctx.stroke();
    ctx.fill();
  }
};

const generateAvatar = (ctx, c, rankInfo, avatarImage): void => {
  const circle = {
    x: c.width / 7,
    y: c.height / 2,
    radius: 140,
  };

  ctx.save();
  ctx.beginPath();
  ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();

  avatarImage.onload = () => {
    const aspect = avatarImage.height / avatarImage.width;
    // Math.max is ued to have cover effect use Math.min for contain
    const hsx = circle.radius * Math.max(1.0 / aspect, 1.0);
    const hsy = circle.radius * Math.max(aspect, 1.0);
    // x - hsl and y - hsy centers the image
    ctx.drawImage(
      avatarImage,
      circle.x - hsx,
      circle.y - hsy,
      hsx * 2,
      hsy * 2,
    );
  };

  // Compute aspectration
};

export const generateCard = (
  ctx,
  canvas,
  color1,
  color2,
  color3,
  gradientColor1,
  gradientColor2,
  isGradientField,
  rankInfo,
  settings,
  allRanks,
): void => {
  const currentLevelIndex =
    settings?.rank?.xps?.findIndex(
      (xp, index) =>
        parseInt(rankInfo?.points) >= xp &&
        parseInt(rankInfo.points) < settings?.rank?.xps[index + 1],
    ) + 1;

  const avatarImage = new Image();
  avatarImage.src =
    `https://cdn.discordapp.com/avatars/${getIdDiscord()}/${
      rankInfo?.avatar
    }.jpg` || 'https://i.pravatar.cc/300?img=8';

  const rank =
    [...allRanks]
      .sort((a, b) => parseInt(b.points) - parseInt(a.points))
      .findIndex(u => u.id === rankInfo?.id) + 1;

  generateBackground(ctx, gradientColor1, gradientColor2, isGradientField);
  generateText(
    ctx,
    color1,
    color2,
    color3,
    rankInfo,
    currentLevelIndex,
    rank,
    settings,
  );
  generateProgressBar(
    ctx,
    color1,
    color2,
    settings,
    rankInfo,
    currentLevelIndex,
  );
  generateAvatar(ctx, canvas, rankInfo, avatarImage);
};
