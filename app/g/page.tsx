"use client";

import Form from "@/components/form";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/breadcrumbs";
import { VARIANTS_CONTAINER, VARIANTS_SECTION, TRANSITION_SECTION } from "@/lib/constants";
import { motion } from "motion/react";

export default function GeneratePage() {
    return (
        <motion.main
            variants={VARIANTS_CONTAINER}
            initial="hidden"
            animate="visible"
            className="flex flex-1 flex-col overflow-hidden px-3"
        >
            <motion.div variants={VARIANTS_SECTION} transition={TRANSITION_SECTION}>
                <Breadcrumb className="mt-6">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">
                                <span className="text-sm text-muted">Home</span>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                            <span className="text-sm text-muted">/</span>
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbPage>
                                <span className="text-sm text-muted font-medium tracking-tighter">
                                    Generate
                                </span>
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </motion.div>
            <motion.div
                variants={VARIANTS_SECTION}
                transition={TRANSITION_SECTION}
                className="flex flex-1 flex-col items-center justify-center gap-4"
            >
                <h1 className="text-7xl sm:text-8xl font-semibold tracking-tighter text-center">
                    Generate
                </h1>
                <p className="text-[15px] text-muted text-center max-w-md leading-relaxed mx-auto">
                    Enter your project name, product name, or service name and we&apos;ll generate a clear Terms & Conditions for you.
                </p>
                <div className="flex flex-col mt-10 w-full">
                    <Form />
                </div>
            </motion.div>
        </motion.main>
    )
}