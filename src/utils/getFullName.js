import { getValFromObj } from "./formatObjectData";

export default function getFullName(obj) {
  let lname = getValFromObj(
    obj,
    ["lname", "lastName", "lastname", "userLName", "userLname"],
    ""
  );
  let fname = getValFromObj(
    obj,
    ["fname", "firstName", "firstname", "userFName", "userFname"],
    ""
  );
  let mname = getValFromObj(
    obj,
    ["mname", "middleName", "middlename", "userMName", "userMname"],
    ""
  );
  return (obj?.name || `${fname} ${lname} ${mname}`)?.trim();
}
