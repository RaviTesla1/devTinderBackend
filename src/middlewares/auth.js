 const adminAuth = (req, res, next) => {
  console.log("!Admin got checked");
  const token = "abc";
  const isAdminAuthorized = token === "abc";
  if (!isAdminAuthorized) {
    res.status(401).send("Admin is not authorized");
  } else next();
};


 const userAuth = (req, res, next) => {
  console.log("!User got checked");
  const token = "abc";
  const isUserAuthorized = token === "abc";
  if (!isUserAuthorized) {
    res.status(401).send("User is not authorized");
  } else next();
};

module.exports = {adminAuth,userAuth}