export default function getFullName(obj) {
  let lname = obj?.lname?.trim() || obj?.lastname?.trim() || obj?.lastName?.trim();
  let fname = obj?.fname?.trim() || obj?.firstname?.trim() || obj?.firstName?.trim();
  let mname = obj?.mname?.trim() || obj?.middlename?.trim() || obj?.middleName?.trim();
  let name = obj?.name?.trim();

  if (lname || fname || mname) 
      return `${fname || ''} ${mname || ''} ${lname || ''}`.trim();
  else return name || '';
}
