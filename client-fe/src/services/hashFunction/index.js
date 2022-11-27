import sha256 from "crypto-js/sha256";
import Base64 from "crypto-js/enc-base64";
import hmacSHA256 from "crypto-js/hmac-sha256";

const PRIVATE_KEY = "VuDinhHieu_LeHaHung_NguyenDucTien";

// export function tenantCodeGenerator(companyName) {
//   const hashDigest = sha256(companyName);
//   console.log(companyName);
//   console.log(hashDigest);
//   return Base64.stringify(hmacSHA256(hashDigest, PRIVATE_KEY));
// }

export function codeGenerator(input) {
  const inputString = input.join(" ");
  console.log(inputString);
  const hashDigest = sha256(inputString);
  return Base64.stringify(hmacSHA256(hashDigest, PRIVATE_KEY));
}

export function eventCodeGenerator(input) {
  const originalCode = codeGenerator(input);
  return originalCode.substring(0, 5);
}

export function tenantCodeGenerator(input) {
  const originalCode = codeGenerator(input);
  return originalCode.substring(0, 4);
}
