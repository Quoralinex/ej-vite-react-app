export type VariantProps<T> = T extends (...args: unknown[]) => unknown
  ? { variant?: string; size?: string; className?: string } &
      Partial<Record<string, string | undefined>>
  : Record<string, never>

export function cva(base?: string) {
  return (props: Record<string, unknown> = {}) => {
    const className = props.className as string | undefined
    return [base, className].filter(Boolean).join(" ")
  }
}
