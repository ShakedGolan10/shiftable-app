"use client";

import { Component, useEffect, useState } from "react";
import { motion } from "motion/react";
import { useAuth } from "@/providers/UserContextProvider";
import { Employer } from "@/types/class.service";
import GeneralTitle from "@/components/helpers/general-title";
import { Button } from "@nextui-org/react";
import SetWeeklyFlow from "./set-weekly-workflow";
import SetApplicationRules from "./set-application-rules";
import SetApplicationTime from "./set-application-time";

export default function Onboarding() {
  const [step, setStep] = useState<string>("weeklyflow");
  const { user } = useAuth<Employer>()

  useEffect(() => {
    if (user) {
      setStep(user.onboardingStep);
    }
  }, []);

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
            Component={() => <SetApplicationRules />}
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
        return null;
    }
  };

  return ( user &&
    <>
      <motion.div
        animate={{ opacity: [0, 1], y: [-30, 0] }}
        transition={{ duration: 0.8 }}
        className="text-center my-10"
      >
        <GeneralTitle title={`Welcome to Onboarding`} />
        <motion.p
        animate={{ scale: [0.95, 1] }}
        transition={{ duration: 0.3 }}
        >
        Let's get you started.
        </motion.p>
      </motion.div>

      <motion.section
        animate={{ scale: [0.95, 1], opacity: [0, 1] }}
        transition={{ duration: 0.5 }}
        className="w-full flex flex-col text-center overflow-x-auto items-center justify-evenly flex-grow"
      >
        {renderStep()}
      </motion.section>

      <motion.div
        animate={{ opacity: [0, 1], y: [20, 0] }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="mt-8 flex space-x-4"
      >
        <Button
          className="px-4 py-2"
          onClick={() => setStep("weeklyflow")}
          color="success"
        >
          Next step
        </Button>
        
      </motion.div>
    </>
  );
};

function StepComponent({ title, description, Component} : {
  title: string;
  description: string;
  Component: React.ComponentType
}) {
  return (
    <>
      <motion.h2
        animate={{ letterSpacing: ["0.2em", "0em"] }}
        transition={{ duration: 0.4 }}
        className="text-2xl font-bold mb-10 underline"
      >
        Onboarding step: {title}
      </motion.h2>
      <motion.p
        animate={{ scale: [0.95, 1] }}
        transition={{ duration: 0.3 }}
      >
        {description}
      </motion.p>
      <Component />
      </>
  );
};
