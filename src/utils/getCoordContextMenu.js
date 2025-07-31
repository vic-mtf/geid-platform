const getCoordContextMenu = (event) => {
  event?.preventDefault();
  const [Touch] = event?.changedTouches || [];
  const mouseX = (Touch?.clientX || event?.clientX) + 2;
  const mouseY = (Touch?.clientY || event?.clientY) - 6;
  return { mouseX, mouseY };
};

export default getCoordContextMenu;
