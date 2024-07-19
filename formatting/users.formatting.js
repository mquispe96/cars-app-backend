const formatData = data => {
  const formattedBody = {...data};
  formattedBody.first_name =
    formattedBody.first_name.charAt(0).toUpperCase() +
    formattedBody.first_name.slice(1).toLowerCase();
  formattedBody.last_name =
    formattedBody.last_name.charAt(0).toUpperCase() +
    formattedBody.last_name.slice(1).toLowerCase();
  return formattedBody;
};

module.exports = {formatData};
