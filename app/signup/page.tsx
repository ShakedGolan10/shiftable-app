"use client";

import { useState } from "react";
import { useForm } from "@/hooks/useForm";
import GeneralTitle from "@/components/helpers/general-title";
import { Input, Button } from "@nextui-org/react";
import { motion, MotionConfig } from "motion/react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { createNewEmployer } from "@/services/admin.service";
import { useAuth } from "@/providers/UserContextProvider";
import { Employer } from "@/types/class.service";
import { useAsyncAuth } from "@/hooks/useAsyncAuth";

const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


export default function SignUpPage() {

  const [formValues, handleInputChange] = useForm({
    email: "",
    name: "",
    password: "",
  });
  const [ passwordError, setPasswordError ] = useState(false);
  const [ executeAsyncAuthFunc ] = useAsyncAuth()
  const { login } = useAuth<Employer>()
  const handleSubmit = async () => {
    if (!passwordRegex.test(formValues.password)) {
      setPasswordError(true);
      setTimeout(() => setPasswordError(false), 2000);
    } else {
        await executeAsyncAuthFunc({
            asyncOperation: ()=> createNewEmployer(formValues.name, formValues.email, formValues.password),
            errorMsg: 'Coudlnt signup new user, please try again later',
            successMsg: 'New employer user created, next stage - Define weekly scheduale'
        })
        setTimeout(async () => await login({email: formValues.email, password: formValues.password}), 1500) 
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen p-4">
      <MotionConfig
          transition={{ duration: 2 }}
          >
      <motion.div
        animate={{ opacity: [0, 1], y: [-20, 0] }}
        className="mb-8 text-center"
      >
        <GeneralTitle title="Welcome to the onboarding journey as a new employer" />
      </motion.div>

      <motion.form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="w-full max-w-md p-6 space-y-6 rounded-lg"
      >
        

        <motion.p className="text-subHeader underline">Signup form</motion.p>
        <motion.div
          animate={{ opacity: [0, 1], x: [-50, 0] }}
        >
          <Input
            placeholder="Email"
            name="email"
            value={formValues.email}
            onChange={handleInputChange}
            className="h-12 w-full"
          />
        </motion.div>

        <motion.div
          animate={{ opacity: [0, 1], x: [50, 0] }}
        >
          <Input
            placeholder="Name"
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
            className="h-12 w-full"
          />
        </motion.div>

        <motion.div
          animate={{ opacity: [0, 1], y: [50, 0] }}
        >
          <Input
            placeholder="Password"
            name="password"
            type="password"
            value={formValues.password}
            onChange={handleInputChange}
            className="h-12 w-full"
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
          className="text-center"
        >
          <Button
            type="submit"
            color="primary"
            isDisabled={!emailRegex.test(formValues.email) || (formValues.name.length < 2)}
            className="flex items-center justify-center w-full"
          >
            Sign Up <ArrowRightIcon className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </motion.form>
    </MotionConfig>

    </section>
  );
};

