function isIntegerWithinRange(
  value: number,
  options: { min?: number; max?: number } = {}
): boolean {
  const isInteger = Number.isInteger(value);

  if (options.min === undefined && options.max === undefined) {
    return isInteger;
  }

  const withinMin = options.min !== undefined ? value >= options.min : true;
  const withinMax = options.max !== undefined ? value <= options.max : true;

  return isInteger && withinMin && withinMax;
}

function numberToStringWithPrecision(
  value: number | undefined | null,
  options: { precision?: number } = {}
): string {
  if (value === null || value === undefined) {
    return "";
  }

  if (options.precision !== undefined) {
    return value.toFixed(options.precision);
  }

  return value.toString();
}

export { isIntegerWithinRange, numberToStringWithPrecision };
