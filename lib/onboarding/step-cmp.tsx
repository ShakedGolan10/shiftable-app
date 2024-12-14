import React from "react";
import { motion } from "motion/react";

export default function StepComponent({ title, description, Component} : {
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