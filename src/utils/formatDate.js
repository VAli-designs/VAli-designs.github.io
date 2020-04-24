const formatDate = (date) => {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

export default formatDate;
