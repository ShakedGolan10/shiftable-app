'use server'

import { firestore } from "@/firebase.config.mjs";
import { doc, updateDoc } from "firebase/firestore";


export const saveEmployeeName = async (
    employeeId: string,
    name: string
  ) => {
    try {
      const employerRef = doc(firestore, 'users', employeeId);
        await updateDoc(employerRef, { name });
    } catch (error) {
      throw new Error(`Error updating employer msgs: ${error}`);
    }
  };
  
export const saveEmployeeEmail = async (
    employeeId: string,
    email: string
  ) => {
    try {
      const employerRef = doc(firestore, 'users', employeeId);
        await updateDoc(employerRef, { email });
    } catch (error) {
      throw new Error(`Error updating employer msgs: ${error}`);
    }
  };