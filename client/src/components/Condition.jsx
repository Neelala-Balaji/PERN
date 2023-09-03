export const Condition = ({ show = true, children }) => {
  if (show) {
    return children;
  }
  return null;
};
