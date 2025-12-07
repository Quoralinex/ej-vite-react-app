import React, { ReactNode } from "react";

type StubProps = { children?: ReactNode } & Record<string, unknown>;

const createPrimitive = (displayName?: string) => {
        const Component = React.forwardRef<HTMLDivElement, StubProps>((
                { children, ...props },
                ref,
        ) => (
                <div ref={ref} {...props}>
                        {children}
                </div>
        ));
        Component.displayName = displayName ?? "RadixStub";
        return Component;
};

type PrimitiveComponent = ReturnType<typeof createPrimitive>;

const primitiveProxy: Record<string, PrimitiveComponent> = new Proxy(
        {},
        {
                get: (_target, prop: string | symbol) => createPrimitive(String(prop)),
        },
);

export const Slot = createPrimitive("Slot");
export const Root = createPrimitive("Root");
export const Trigger = createPrimitive("Trigger");
export const Content = createPrimitive("Content");
export const Item = createPrimitive("Item");
export const Group = createPrimitive("Group");
export const Label = createPrimitive("Label");
export const Separator = createPrimitive("Separator");
export const Indicator = createPrimitive("Indicator");
export const Provider = createPrimitive("Provider");
export const Action = createPrimitive("Action");
export const Portal = ({ children }: { children?: ReactNode }) => <>{children}</>;
export const Viewport = createPrimitive("Viewport");
export const ScrollArea = createPrimitive("ScrollArea");
export const ScrollBar = createPrimitive("ScrollBar");
export const Thumb = createPrimitive("Thumb");
export const Range = createPrimitive("Range");
export const CheckboxIndicator = createPrimitive("CheckboxIndicator");
export const RadioGroup = createPrimitive("RadioGroup");
export const RadioGroupItem = createPrimitive("RadioGroupItem");
export const RadioItem = createPrimitive("RadioItem");
export const Text = createPrimitive("Text");
export const Title = createPrimitive("Title");
export const Description = createPrimitive("Description");
export const Overlay = createPrimitive("Overlay");
export const Close = createPrimitive("Close");
export const Anchor = createPrimitive("Anchor");
export const Menu = createPrimitive("Menu");
export const Sub = createPrimitive("Sub");
export const SubTrigger = createPrimitive("SubTrigger");
export const SubContent = createPrimitive("SubContent");
export const ItemIndicator = createPrimitive("ItemIndicator");
export const List = createPrimitive("List");
export const Value = createPrimitive("Value");
export const Icon = createPrimitive("Icon");
export const ScrollUpButton = createPrimitive("ScrollUpButton");
export const ScrollDownButton = createPrimitive("ScrollDownButton");
export const ItemText = createPrimitive("ItemText");

export default primitiveProxy;
