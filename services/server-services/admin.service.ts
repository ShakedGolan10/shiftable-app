'use server'

import { IUpdateUserCredsPayload } from "@/app/api/auth/route";
import { admin } from "@/firebase-admin.config.mjs";
import { firestore } from "@/firebase.config.mjs";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { queryOneField } from "./db.service";
import { Employer } from "@/types/class.service";


export const saveEmployeeName = async (
    employeeId: string,
    name: string
  ) => {
    try {
      const employerRef = doc(firestore, 'users', employeeId);
        await updateDoc(employerRef, { name });
    } catch (error) {
      throw new Error(`Error updating employee name: ${error}`);
    }
  };
  
export const updateEmployeeEmail = async (
  userNewCred: IUpdateUserCredsPayload
  ) => {
    try {
      const filteredCreds = Object.fromEntries(
            Object.entries(userNewCred).filter(([_, value]) => value !== undefined)
        );
        const employerRef = doc(firestore, 'users', userNewCred.userId);
        // add transactions here : 
        admin.auth().updateUser(userNewCred.userId, {
          ...filteredCreds,
        })
        await updateDoc(employerRef, { email: userNewCred.newCreds.email });
    } catch (error) {
      throw new Error(`Error updating employee email: ${error}`);
    }
  };

  export const signupNewEmployee = async (email: string, password: string, name: string, employerId: string) => {
    try {
      // add transactions here : 
      const newUser = await admin.auth().createUser({
        email,
        password
      })
      const newUserObj = {
        id: newUser.uid,
        blockedShifts: [],
        name,
        email,
        employerId, 
        isApplied: false
      }
      const newUserRef = doc(firestore, 'users', newUser.uid)
      await setDoc(newUserRef, newUserObj)
      const employerUserRef = doc(firestore, 'users', employerId)
      const employeesArray = await queryOneField<string[]>(`users/${employerId}`, 'employees')
      await updateDoc(employerUserRef, {employees: [...employeesArray, newUser.uid] })
      return newUserObj
    } catch (error) {
      throw new Error(`Error creating new employee: ${error}`);
    }
  }
  export const signupNewEmployer = async (email: string, password: string, name: string) => {
    try {
      // add transactions here : 
      const newUser = await admin.auth().createUser({
        email,
        password
      })
      const newUserObj = {
        id: newUser.uid,
        employees: [],
        employerMsg: [], 
        applicationRules: {
          numOfCant: 2,
          optionalShifts: [{minChoices: 2, shiftsToChoose: {monday: '16:00-22:00', thursday: '16:00-22:00'}}],
          minDays: 5,
          mandatoryShifts: [{sunday: '12:00-19:00', friday: '08:00-13:00'}]
        },
        applicationTime: { day: 4, time: '1630' },
        name,
        email,
        onboardingStep: 'weeklyflow'
      }
      const newUserRef = doc(firestore, 'users', newUser.uid)
      await setDoc(newUserRef, newUserObj)
      return newUserObj as Employer
    } catch (error) {
      throw new Error(`Error creating new employee: ${error}`);
    }
  }