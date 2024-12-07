import React from 'react'
import { motion } from "motion/react";

export default function SetWeeklyFlow() {
    return (
        <motion.div
          animate={{ opacity: [0, 1], y: [-20, 0] }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
        hello
        </motion.div>
      );
}
