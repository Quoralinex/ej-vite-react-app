import type { ReactNode } from "react"

type SubmitHandler = (...args: unknown[]) => unknown

export const useForm = () => ({
  register: () => ({}),
  handleSubmit: (fn: SubmitHandler) => fn,
  formState: { errors: {} as Record<string, unknown> },
  control: {},
  watch: () => undefined,
});

export const FormProvider = ({ children }: { children: ReactNode }) => children;

export const Controller = (props: {
  render?: (context: { field: Record<string, unknown> }) => ReactNode
}) => (props.render ? props.render({ field: {} }) : null)
