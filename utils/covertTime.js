import moment from "moment";

export const convertTime = (item) => {
  const dateString = item;
  const formattedDate = moment(dateString).format("Do MMMM YYYY, h:mm a");

  return formattedDate;
};
