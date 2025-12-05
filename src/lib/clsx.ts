export type ClassValue = string | number | null | undefined | Record<string, boolean>;
export const clsx = (...values: ClassValue[]) =>
        values
                .map((value) => {
                        if (typeof value === "string" || typeof value === "number") return String(value);
                        if (value && typeof value === "object") {
                                return Object.entries(value)
                                        .filter(([, enabled]) => Boolean(enabled))
                                        .map(([key]) => key)
                                        .join(" ");
                        }
                        return "";
                })
                .filter(Boolean)
                .join(" ");
