// GET CURRENT TMESTAMP
const getTimeStamp = () => {
  const currentDate = new Date();
  const timestamp = currentDate.getTime();
  return timestamp;
};

export { getTimeStamp };
