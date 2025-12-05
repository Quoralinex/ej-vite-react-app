export type VariantProps<T> = T extends (...args: any[]) => any
        ? { variant?: string; size?: string; className?: string } & Partial<Record<string, string | undefined>>
        : Record<string, never>;

export function cva(base?: string, _options?: { variants?: Record<string, Record<string, string>>; defaultVariants?: Record<string, string> }) {
        return (props: Record<string, unknown> = {}) => {
                        const className = props.className as string | undefined;
                        return [base, className].filter(Boolean).join(" ");
        };
}
