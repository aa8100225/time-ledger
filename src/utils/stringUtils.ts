function isStringEmpty(value: string | undefined | null): boolean {
  if (value === undefined || value === null) {
    return true;
  }
  return value.trim() === "";
}

function toSafeString(value: any): string {
  return typeof value === "string" ? value : "";
}

export { isStringEmpty, toSafeString };
