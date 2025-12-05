import { ReactNode } from "react";

export class QueryClient {}

export const QueryClientProvider = ({ children }: { client: QueryClient; children: ReactNode }) => {
        return <>{children}</>;
};
