/* eslint-disable react-refresh/only-export-components */
import {
        Children,
        ReactElement,
        ReactNode,
        createContext,
        useContext,
        useEffect,
        useMemo,
        useState,
        AnchorHTMLAttributes,
} from "react";

export type Location = {
        pathname: string;
};

type RouterContextValue = {
        location: Location;
        navigate: (to: string) => void;
};

const RouterContext = createContext<RouterContextValue | null>(null);

const getInitialPath = () => (typeof window === "undefined" ? "/" : window.location.pathname || "/");

export const BrowserRouter = ({ children }: { children: ReactNode }) => {
        const [location, setLocation] = useState<Location>({ pathname: getInitialPath() });

        useEffect(() => {
                if (typeof window === "undefined") return;
                const onPopState = () => setLocation({ pathname: window.location.pathname });
                window.addEventListener("popstate", onPopState);
                return () => window.removeEventListener("popstate", onPopState);
        }, []);

        const navigate = (to: string) => {
                if (typeof window === "undefined") {
                        setLocation({ pathname: to });
                        return;
                }

                if (window.location.pathname !== to) {
                        window.history.pushState({}, "", to);
                        setLocation({ pathname: to });
                }
        };

        const value = useMemo(() => ({ location, navigate }), [location]);

        return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
};

export const Routes = ({ children }: { children: ReactNode }) => {
        const context = useContext(RouterContext);
        const location = context?.location ?? { pathname: getInitialPath() };

        const matched = Children.toArray(children).find((child) => {
                if (!child || typeof child !== "object") return false;
                const element = child as ReactElement<{ path?: string }>;
                return element.props?.path === location.pathname;
        }) as ReactElement | undefined;

        return matched && typeof matched === "object" ? (matched as ReactElement).props.element : null;
};

export const Route = ({ path, element }: { path: string; element: ReactElement }) => {
        void path;
        void element;
        return null;
};

export const Link = ({ to, children, ...props }: { to: string; children: ReactNode } & AnchorHTMLAttributes<HTMLAnchorElement>) => {
        const context = useContext(RouterContext);
        const onClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
                event.preventDefault();
                context?.navigate(to);
        };

        return (
                <a href={to} onClick={onClick} {...props}>
                        {children}
                </a>
        );
};

export const useLocation = () => {
        const context = useContext(RouterContext);
        return context?.location ?? { pathname: getInitialPath() };
};
