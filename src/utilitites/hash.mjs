import crypto from "crypto";
export const createHash = (...data) => {
  //console.log(data);
  //console.log(data.join(" "));
  const hash = crypto.createHash("sha256");
  hash.update(data.sort().join(" "));
  const hexDigest = hash.digest("hex");
  return hexDigest;
};
