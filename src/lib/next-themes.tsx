/* eslint-disable react-refresh/only-export-components */
import React from "react";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const useTheme = () => ({ theme: "light", setTheme: () => {} });
