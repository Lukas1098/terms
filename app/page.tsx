"use client";

import { APP_DESCRIPTION, APP_NAME, VARIANTS_CONTAINER, VARIANTS_SECTION, TRANSITION_SECTION } from "@/lib/constants";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <motion.main
      variants={VARIANTS_CONTAINER}
      initial="hidden"
      animate="visible"
      className="flex flex-1 flex-col items-center justify-center gap-4"
    >
      <motion.div variants={VARIANTS_SECTION} transition={TRANSITION_SECTION}>
        <h1 className="text-7xl sm:text-8xl font-semibold tracking-tighter text-center">
          {APP_NAME}
        </h1>
        <p className="mt-5 text-[15px] text-muted text-center max-w-md leading-relaxed">
          {APP_DESCRIPTION}
        </p>
        <div className="flex flex-col items-center justify-center">
          <button className="text-sm px-4 py-2 uppercase bg-zinc-100 text-primary rounded-md w-fit mt-6 cursor-pointer" style={{ fontFamily: 'var(--font-geist-mono)' }} 
          onClick={() => {
            router.push("/g");
          }}>
            Get Started
          </button>
        </div>
      </motion.div>
    </motion.main>
  );
}
