import { Rating, WorkedRating } from '../movie';

export function transformRatings(ratings: Rating[]): WorkedRating[] {
  return ratings.map((rating) => {
    const [value, maxValue] = rating.Value.includes('/')
      ? rating.Value.split('/')
      : [rating.Value, ''];
    let parsedValue = parseFloat(value.trim()) || 0;
    let parsedMaxValue =
      (parseFloat(maxValue.trim()) || 10) < 10
        ? 10
        : parseFloat(maxValue.trim());

    if (isNaN(parsedValue)) {
      parsedValue = 0;
    }

    if (isNaN(parsedMaxValue) || parsedMaxValue < 10) {
      parsedMaxValue = 10;
    }

    if (parsedValue > 10) {
      parsedValue = parsedValue / 10;
    }

    if (parsedMaxValue > 10) {
      parsedMaxValue = parsedMaxValue / 10;
    }

    const workedRating: WorkedRating = {
      source: rating.Source,
      value: parsedValue,
      maxValue: parsedMaxValue,
    };
    return workedRating;
  });
}
