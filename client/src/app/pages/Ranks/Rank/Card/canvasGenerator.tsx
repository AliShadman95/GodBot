import { getIdDiscord } from 'utils/api';
import { loadImages } from 'utils/api';

const generateWithGradient = (
  ctx,
  colors,
  isGradientField,
  currentLevelIndex,
  rankInfo,
  rank,
  settings,
  c,
  avatarImage,
) => {
  const { color1, color2, color3, gradientColor1, gradientColor2 } = colors;

  // GRADIENT BACKGROUND GENERATOR
  const grd = ctx.createLinearGradient(0, 853, 1352, 0);
  grd.addColorStop(0, gradientColor1);
  isGradientField && grd.addColorStop(1, gradientColor2 || '#0a0a0a');
  ctx.fillStyle = grd;
  // Fill our gradient
  ctx.fillRect(0, 0, 1342, 853);

  // TEXT BAR GENERATOR

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

  // PROGRESS BAR GENERATOR

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

  const aspect = avatarImage.height / avatarImage.width;
  // Math.max is ued to have cover effect use Math.min for contain
  const hsx = circle.radius * Math.max(1.0 / aspect, 1.0);
  const hsy = circle.radius * Math.max(aspect, 1.0);
  // x - hsl and y - hsy centers the image
  ctx.drawImage(avatarImage, circle.x - hsx, circle.y - hsy, hsx * 2, hsy * 2);

  ctx.restore();
};

const generateWithImage = (
  ctx,
  canvas,
  colors,
  rankInfo,
  currentLevelIndex,
  rank,
  settings,
  images,
  imagePosition,
) => {
  const { color1, color2, color3 } = colors;
  const { sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight } = imagePosition;

  ctx.drawImage(images[1], sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

  // AVATAR GENERATOR

  const circle = {
    x: canvas.width / 7,
    y: canvas.height / 2,
    radius: 140,
  };

  ctx.save();
  ctx.beginPath();
  ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();

  const aspect = images[0].height / images[0].width;
  // Math.max is ued to have cover effect use Math.min for contain
  const hsx = circle.radius * Math.max(1.0 / aspect, 1.0);
  const hsy = circle.radius * Math.max(aspect, 1.0);
  // x - hsl and y - hsy centers the image
  ctx.drawImage(images[0], circle.x - hsx, circle.y - hsy, hsx * 2, hsy * 2);

  // TEXT BAR GENERATOR
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

  // PROGRESS BAR GENERATOR
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

  ctx.restore();
};

export const generateCard = async (
  ctx,
  canvas,
  colors,
  imagePosition,
  isGradientField,
  rankInfo,
  settings,
  allRanks,
  isImageField,
  image,
  defaultValues,
  resetImagePosition,
): Promise<void> => {
  ctx.restore();

  const { sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight } = imagePosition;

  const currentLevelIndex =
    settings?.rank?.xps?.findIndex(
      (xp, index) =>
        parseInt(rankInfo?.points) >= xp &&
        parseInt(rankInfo.points) < settings?.rank?.xps[index + 1],
    ) + 1;

  const rank =
    [...allRanks]
      .sort((a, b) => parseInt(b.points) - parseInt(a.points))
      .findIndex(u => u.id === rankInfo?.id) + 1;

  if (isImageField && image !== '') {
    const images: any = await loadImages([
      `https://cdn.discordapp.com/avatars/${getIdDiscord()}/${
        rankInfo?.avatar || 0
      }.jpg`,
      image,
    ]);

    const isNewImage =
      images &&
      images.length > 0 &&
      sWidth !== images[1].width &&
      sHeight !== images[1].height;

    if (
      defaultValues.sx !== sx ||
      defaultValues.sy !== sy ||
      defaultValues.sWidth !== sWidth ||
      defaultValues.sHeight !== sHeight ||
      defaultValues.dx !== dx ||
      defaultValues.dy !== dy ||
      defaultValues.dWidth !== dWidth ||
      defaultValues.dHeight !== dHeight
    ) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    if (isNewImage) {
      resetImagePosition(
        0,
        0,
        images[1].width,
        images[1].height,
        0,
        0,
        1342,
        853,
      );
    }

    generateWithImage(
      ctx,
      canvas,
      colors,
      rankInfo,
      currentLevelIndex,
      rank,
      settings,
      images,
      imagePosition,
    );
  } else {
    const avatarImage = await loadImages([
      `https://cdn.discordapp.com/avatars/${getIdDiscord()}/${
        rankInfo?.avatar !== undefined ? rankInfo?.avatar : 0
      }.jpg`,
    ]);

    generateWithGradient(
      ctx,
      colors,
      isGradientField,
      currentLevelIndex,
      rankInfo,
      rank,
      settings,
      canvas,
      avatarImage[0],
    );
  }
};
