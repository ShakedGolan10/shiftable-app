"use client";

import { useState } from "react";
import { useForm } from "@/hooks/useForm";
import GeneralTitle from "@/components/helpers/general-title";
import { Input, Button } from "@nextui-org/react";
import { motion } from "motion/react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;

export default function SignUpPage() {

  const [formValues, handleInputChange] = useForm({
    email: "",
    name: "",
    password: "",
  });
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = () => {
    if (!passwordRegex.test(formValues.password)) {
      setPasswordError(true);
      setTimeout(() => setPasswordError(false), 2000);
    } else {
      console.log("Submitted: ", formValues);
      // Proceed with the logic
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen p-4">
      <motion.div
        animate={{ opacity: [0, 1], y: [-20, 0] }}
        transition={{ duration: 2 }}
        className="mb-8 text-center"
      >
        <GeneralTitle title="Welcome to the onboarding journey as a new employer" />
      </motion.div>

      <motion.form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="w-full max-w-md p-6 space-y-6 rounded-lg shadow-md"
      >
        <motion.div
          animate={{ opacity: [0, 1], x: [-50, 0] }}
          transition={{ duration: 2 }}
        >
          <Input
            label="Email"
            name="email"
            variant="bordered"
            value={formValues.email}
            onChange={handleInputChange}
            className="w-full"
          />
        </motion.div>

        <motion.div
          animate={{ opacity: [0, 1], x: [50, 0] }}
          transition={{ duration: 2 }}
        >
          <Input
            label="Name"
            name="name"
            variant="bordered"
            value={formValues.name}
            onChange={handleInputChange}
            className="w-full"
          />
        </motion.div>

        <motion.div
          animate={{ opacity: [0, 1], y: [50, 0] }}
          transition={{ duration: 2 }}
        >
          <Input
            label="Password"
            name="password"
            type="password"
            variant="bordered"
            value={formValues.password}
            onChange={handleInputChange}
            className="w-full"
          />
          {passwordError && (
            <motion.p
            animate={{
              scale: [1, 1.2, 1], 
              y: [0, -10, 0],    
            }}
            transition={{
              duration: 0.5,
              ease: 'easeOut', 
            }}
          >
             Password must be at least 6 characters long, contain one uppercase
             letter, and one number.
          </motion.p>
          )}
        </motion.div>

        <motion.div
          animate={{ opacity: [0, 1], scale: [0.9, 1] }}
          transition={{ duration: 2 }}
          className="text-center"
        >
          <Button
            type="submit"
            color="primary"
            className="flex items-center justify-center w-full"
          >
            Sign Up <ArrowRightIcon className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </motion.form>
    </section>
  );
};

