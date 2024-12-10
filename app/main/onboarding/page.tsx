"use client";

import { Component, useEffect, useState } from "react";
import { motion } from "motion/react";
import { useAuth } from "@/providers/UserContextProvider";
import { Employer } from "@/types/class.service";
import GeneralTitle from "@/components/helpers/general-title";
import { Button } from "@nextui-org/react";
import SetWeeklyFlow from "@/lib/onboarding/workflow/set-weekly-workflow";
import SetApplicationRules from "@/lib/onboarding/rules/set-application-rules";
import SetApplicationTime from "@/lib/onboarding/time/set-application-time";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { saveOneField } from "@/services/server-services/db.service";
import StepComponent from "@/lib/onboarding/step-cmp";
import { useSystemActions } from "@/store/actions/system.actions";

export default function Onboarding() {
  const [ step, setStep ] = useState<string>('');
  const { user } = useAuth<Employer>()
  const { toggleModalAction } = useSystemActions()

  useEffect(() => {
  if (user) {
      setStep(user.onboardingStep);
    }
  }, [user]);

  const nextStep = async () => {
      switch (step) {
        case "weeklyflow":
          await saveOneField<string>(`users/${user.id}`, 'onboardingStep', 'rules')
          return setStep("rules")
          case "rules":
          await saveOneField<string>(`users/${user.id}`, 'onboardingStep', 'time')
          return setStep("time")
        case "time":
          await saveOneField<string>(`users/${user.id}`, 'onboardingStep', '')
          toggleModalAction('Youve finished the onboarding and now will redirected to the employees page!')
          setTimeout(()=>{
            toggleModalAction()
            window.location.assign('/main/employer/employees')
          },2500)
          return setStep('')
        default: 
          return null
      }
  }

  const prevStep = () => {
    setStep(prev => {
      return prev
    })
  }

  const renderStep = () => {
    switch (step) {
      case "weeklyflow":
        return (
          <StepComponent
            title="Weekly Workflow"
            description="Plan and visualize your weekly shifts with ease."
            Component={() => <SetWeeklyFlow user={user} />}
          />
        );
      case "rules":
        return (
          <StepComponent
            title="Application Rules"
            description="Define and customize the rules for managing shifts."
            Component={() => <SetApplicationRules user={user} />}
          />
        );
      case "time":
        return (
          <StepComponent
            title="Application Time"
            description="Select the perfect timing for your shifts and preferences."
            Component={() => <SetApplicationTime />}
          />
        );
      default:
        return null
    }
  };

  return ( step &&
    <>
      <motion.div
        animate={{ opacity: [0, 1], y: [-30, 0] }}
        transition={{ duration: 0.8 }}
        className="text-center mt-2"
      >
        <GeneralTitle title={`Welcome to Onboarding`} />
      </motion.div>

      <motion.section
        animate={{ scale: [0.95, 1], opacity: [0, 1] }}
        transition={{ duration: 0.5 }}
        className="w-full flex flex-col gap-5 text-center overflow-x-auto items-center justify-evenly flex-grow"
      >
        {renderStep()}
      </motion.section>

      <motion.div
        animate={{ opacity: [0, 1], y: [20, 0] }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="mt-2 flex space-x-4"
      >
        <Button
          onClick={() => nextStep()}
          color="secondary"
        >
          <span>Next step</span>
          <ArrowRightIcon  width={50} height={50} />
        </Button>
        
      </motion.div>
    </>
  );
};


