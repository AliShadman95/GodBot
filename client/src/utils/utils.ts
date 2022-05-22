export const SliderGestioneLivelliMapperToDb = value => {
  switch (value) {
    case 1:
      return 0.25;
    case 2:
      return 0.5;
    case 3:
      return 0.75;
    case 4:
      return 1;
    case 5:
      return 1.5;
    case 6:
      return 2;
    case 7:
      return 2.5;
    case 8:
      return 3;
    default:
      return value;
  }
};

export const SliderGestioneLivelliMapperToFe = value => {
  switch (value) {
    case 0.25:
      return 1;
    case 0.5:
      return 2;
    case 0.75:
      return 3;
    case 1:
      return 4;
    case 1.5:
      return 5;
    case 2:
      return 6;
    case 2.5:
      return 7;
    case 3:
      return 8;
    default:
      return value;
  }
};

// Level Generator

export const levelGenerator = rate => {
  const levels: number[] = [];

  for (let i = 1; i < 1001; i++) {
    const multiplier = Math.ceil(i * (i * rate * 10));
    levels.push(100 * i + (i === 1 ? 0 : multiplier));
  }

  return levels;
};
