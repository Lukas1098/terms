import { cn } from "@/lib/utils"
import { InputHTMLAttributes } from "react"

type InputProps = InputHTMLAttributes<HTMLInputElement>

export default function Input({ className, disabled, ...props }: InputProps) {
  return (
    <input
      type="text"
      disabled={disabled}
      aria-disabled={disabled}
      autoFocus
      className={cn(
        "text-sm outline-none border border-zinc-100 text-zinc-950 focus:ring-2 focus:ring-zinc-200 bg-zinc-50 px-4 py-2.5 w-full rounded-md placeholder:truncate",
        className,
        disabled ? "opacity-50 cursor-not-allowed" : ""
      )}
      {...props}
    />
  )
}