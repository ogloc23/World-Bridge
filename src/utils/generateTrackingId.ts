export const generateTrackingId = () => {
  const prefix = "WORLDBRIDGE";

  const randomPart = Math.random()
    .toString(36)
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 8);

  const timestamp = Date.now().toString().slice(-4);

  return `${prefix}-${randomPart}${timestamp}`;
};