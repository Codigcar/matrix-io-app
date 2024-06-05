import { scaleCrop } from './crop';

describe('Crop Image', () => {
  test('it should return crop params in portrait', () => {
    const crop = scaleCrop({
      originalHeight: 1280,
      originalWidth: 720,
      posX: 44,
      posY: 307,
      width: 290,
      height: 196,
    });
    expect(crop).toMatchObject({ offset: { x: 84, y: 484 }, size: { height: 309, width: 557 } });
  });
  test('it should return crop params in portrait', () => {
    const crop = scaleCrop({
      originalHeight: 720,
      originalWidth: 1280,
      posX: 44,
      posY: 307,
      width: 290,
      height: 196,
    });
    expect(crop).toMatchObject({ offset: { x: 84, y: 484 }, size: { height: 309, width: 557 } });
  });

  test('it should return crop params in portrait 2', () => {
    const crop = scaleCrop({
      height: 220,
      originalHeight: 1080,
      originalWidth: 1920,
      posX: 31,
      posY: 296,
      width: 312,
    });
    expect(crop).toMatchObject({ offset: { x: 89, y: 700 }, size: { height: 520, width: 899 } });
  });
  test('it should return crop params in portrait 3', () => {
    const crop = scaleCrop({
      originalHeight: 1280,
      originalWidth: 720,
      posX: 44,
      posY: 307,
      width: 290,
      height: 196,
    });
    expect(crop).toMatchObject({ offset: { x: 84, y: 484 }, size: { height: 309, width: 557 } });
  });
});
