/* eslint-disable react-refresh/only-export-components */
import React from "react";

export const OTPInputContext = React.createContext<{ slots: Array<{ char?: string; hasFakeCaret?: boolean; isActive?: boolean }> }>(
        { slots: [] },
);

export const OTPInput = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
