"use client";

import React from 'react';
import Image from "next/image";
import { motion } from "framer-motion";
import { AnimatedGridPatternDemo } from './uicomps/AnimatedGridPattern';
import { SignInButton as ClerkSignInButton } from "@clerk/nextjs";

export const SignInButton = () => {
  return (
    <ClerkSignInButton mode="modal" redirectUrl="/dashboard/user">
      <button 
        className="w-full md:w-60 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
      >
        Get Started
      </button>
    </ClerkSignInButton>
  );
};

export default function Hero() {
  return (
    <div className="relative min-h-screen w-full">
      {/* Animated Grid Background */}
      <AnimatedGridPatternDemo />

      {/* Main Hero Section - Text and Elements Above Grid */}
      <div className="absolute inset-0 mx-auto my-10 flex w-full flex-col items-center justify-center md:mt-80 mt-2 px-4 max-w-7xl">
        {/* Vertical Borders */}
        <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80 hidden md:block">
          <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
        </div>
        <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80 hidden md:block">
          <div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
        </div>

        <div className="py-10 md:py-20">
          <h1 className="relative z-10 mx-auto max-w-4xl text-center text-2xl md:text-4xl lg:text-7xl font-bold text-slate-700 dark:text-slate-300">
            {"Transforming Land Ownership with LandSure"
              .split(" ")
              .map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.1,
                    ease: "easeInOut",
                  }}
                  className="mr-2 inline-block"
                >
                  {word}
                </motion.span>
              ))}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.8 }}
            className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg md:text-xl font-normal text-neutral-600 dark:text-neutral-400"
          >
            Secure your land with verified eKYC, manage ownership transfers seamlessly, and access your records globally with LandSure.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 1 }}
            className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <SignInButton />
            <button className="w-full md:w-60 transform rounded-lg border border-gray-300 bg-white px-6 py-2 font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 dark:border-gray-700 dark:bg-black dark:text-white dark:hover:bg-gray-900">
              Learn More
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 1.2 }}
            className="relative z-10 mt-20 rounded-3xl border border-neutral-200 bg-neutral-100 p-4 shadow-md dark:border-neutral-800 dark:bg-neutral-900"
          >
            <div className="w-full overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700">
              <Image
                src="/images/1.png"
                alt="LandSure Platform Preview"
                className="aspect-[16/9] h-auto w-full object-cover pointer-events-none"
                width={1600}
                height={900}
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Border at the End of Page */}
      <div className="h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80 mt-20">
        <div className="mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      </div>
    </div>
  );
}