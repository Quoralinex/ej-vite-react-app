export const useForm = () => ({
        register: () => ({}),
        handleSubmit: (fn: (...args: any[]) => any) => fn,
        formState: { errors: {} },
        control: {},
        watch: () => undefined,
});

export const FormProvider = ({ children }: { children: any }) => children;

export const Controller = (props: any) => (props.render ? props.render({ field: {} }) : null);
