"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useAuth } from "@/providers/UserContextProvider";
import { Employer } from "@/types/class.service";
import GeneralTitle from "@/components/helpers/general-title";
import { Button } from "@nextui-org/react";

const Onboarding = () => {
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
            title="Weekly Flow"
            description="Plan and visualize your weekly shifts with ease."
          />
        );
      case "rules":
        return (
          <StepComponent
            title="Rules"
            description="Define and customize the rules for managing shifts."
          />
        );
      case "time":
        return (
          <StepComponent
            title="Time"
            description="Select the perfect timing for your shifts and preferences."
          />
        );
      default:
        return null;
    }
  };

  return ( user &&
    <section className="flex flex-col items-center justify-center">
      <motion.div
        animate={{ opacity: [0, 1], y: [-30, 0] }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8"
      >
        <GeneralTitle title={`Onboarding step: ${step}`} />
        <motion.p
        animate={{ scale: [0.95, 1] }}
        transition={{ duration: 0.3 }}
      >
        Let's get you started.
      </motion.p>
      </motion.div>

      <motion.div
        animate={{ scale: [0.95, 1], opacity: [0, 1] }}
        transition={{ duration: 0.5 }}
        className="w-full shadow-xl rounded-lg p-8"
      >
        {renderStep()}
      </motion.div>

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
    </section>
  );
};

const StepComponent = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <motion.div
      animate={{ opacity: [0, 1], y: [-20, 0] }}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <motion.h2
        animate={{ letterSpacing: ["0.2em", "0em"] }}
        transition={{ duration: 0.4 }}
        className="text-2xl font-bold mb-2"
      >
        {title}
      </motion.h2>
      <motion.p
        animate={{ scale: [0.95, 1] }}
        transition={{ duration: 0.3 }}
      >
        {description}
      </motion.p>
    </motion.div>
  );
};

export default Onboarding;
