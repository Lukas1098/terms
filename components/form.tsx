"use client";

import { useActionState, startTransition, useState } from "react";
import Input from "./input";
import { generateTerms } from "@/app/actions/terms";
import { BarsLoader } from "./loader";
import { downloadAsText } from "@/lib/file";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export type ActionResponse = {
  success: boolean;
  message: string;
  data?: { message?: string } | null;
  errors?: Record<string, string[]>;
  error?: string;
};

const initialState: ActionResponse = {
  success: false,
  message: "",
  errors: undefined,
};

export default function Form() {
  const [value, setValue] = useState("");

  const [state, formAction, isPending] = useActionState<
    ActionResponse,
    FormData
  >(async (_, formData) => {
    const data = {
      projectDetails: formData.get("projectDetails") as string,
    };

    if (!data.projectDetails) {
      return {
        success: false,
        message: "Invalid data",
        errors: {
          projectDetails: ["Project details are required"],
        },
      };
    }

    const result = await generateTerms(data);
    return result;
  }, initialState);

  const isDisabled =
    isPending || state.success || value.trim().length === 0;

  return (
    <form className="flex flex-col gap-4 min-w-0" action={formAction}>
      <Input
        name="projectDetails"
        placeholder="Enter your project name, product name, or service name"
        disabled={isPending || state.success}
        aria-disabled={isPending || state.success}
        onChange={(e) => setValue(e.target.value)}
      />

      {state.error && (
        <p className="text-red-500 text-sm mt-2 mb-2">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={isDisabled}
        aria-disabled={isDisabled}
        className={cn(
          "text-sm px-4 py-2 uppercase bg-zinc-100 text-primary rounded-md w-fit",
          isDisabled
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer"
        )}
        style={{ fontFamily: "var(--font-geist-mono)" }}
      >
        {isPending ? (
          <BarsLoader size="sm" className="mx-auto" />
        ) : (
          "Generate"
        )}
      </button>

      {state.success && state.data?.message && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-center gap-2 mt-6"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() =>
              downloadAsText(
                state.data?.message ?? "",
                "terms-and-conditions.md"
              )
            }
            className="text-sm px-4 py-2 uppercase bg-zinc-100 text-primary rounded-md w-fit cursor-pointer"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            Download .md
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => {
              setValue("");
              startTransition(() => formAction(new FormData()));
            }}
            className="text-sm px-4 py-2 uppercase bg-zinc-100 text-primary rounded-md w-fit cursor-pointer"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            Clear Input
          </motion.button>
        </motion.div>
      )}
    </form>
  );
}