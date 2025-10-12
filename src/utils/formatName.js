export const formatName = (name) => {
  if (!name) return "bạn";
  const firstName = name.split(" ").slice(-1)[0];
  return firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
};
