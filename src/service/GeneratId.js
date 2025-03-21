import { v4 as uuidv4 } from 'uuid';

export function generateSecureUserID() {
  const prefix = "PDC";
  const uniqueID = uuidv4().slice(0, 5).replace(/-/g, ''); 
  return `${prefix}${uniqueID}`; 
}

  

  
  