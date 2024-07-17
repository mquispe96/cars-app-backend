const formatBody = body => {
  const formattedBody = {...body};
  formattedBody.make = formattedBody.make
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
  formattedBody.model = formattedBody.model
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
  formattedBody.trim = formattedBody.trim
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
  formattedBody.color = formattedBody.color
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
  return formattedBody;
};

module.exports = {formatBody};
