module.exports = {
  isSameRequest: (request, cachedRequest) => {
    if (cachedRequest == null) return false;
    return (
      request.get("sensorId") == cachedRequest.id &&
      request.get("fields") == cachedRequest.fields
    );
  },
};
