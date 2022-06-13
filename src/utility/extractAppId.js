const extractAppId = (appLink) => {
  const packageId = appLink.substring(appLink.indexOf("=") + 1);
  // console.log(packageId);
  return packageId;
};

export default extractAppId;
