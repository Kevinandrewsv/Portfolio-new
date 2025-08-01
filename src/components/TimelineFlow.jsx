// src/components/TimelineFlow.jsx

import React from "react";
import { motion } from "framer-motion";
import { FaCode, FaVial, FaRocket } from "react-icons/fa";

const phases = [
  { title: "Build", icon: FaCode },
  { title: "Test", icon: FaVial },
  { title: "Deploy", icon: FaRocket },
];

const TimelineFlow = () => (
  <div className="w-full mt-16 flex justify-center">
    <div className="flex items-center">
      {phases.map(({ title, icon: Icon }, idx) => {
        const isLast = idx === phases.length - 1;
        return (
          <React.Fragment key={title}>
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: idx * 0.3, type: "spring", stiffness: 300 }}
              className="flex flex-col items-center"
            >
              <div className="p-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-2xl">
                <Icon />
              </div>
              <span className="mt-2 text-white font-medium">{title}</span>
            </motion.div>

            {!isLast && (
              <div
                key={`sep-${idx}`}
                className="flex-1 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-6"
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  </div>
);

export default TimelineFlow;
