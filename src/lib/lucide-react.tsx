import { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number | string };

const createIcon = (displayName: string) => {
        const Icon = ({ size, ...props }: IconProps) => (
                <svg
                        aria-hidden
                        focusable={false}
                        role="img"
                        viewBox="0 0 24 24"
                        width={size ?? "1em"}
                        height={size ?? "1em"}
                        {...props}
                >
                        <circle cx="12" cy="12" r="10" stroke="currentColor" fill="none" />
                        <text x="12" y="16" textAnchor="middle" fontSize="8" fill="currentColor">
                                {displayName[0] ?? ""}
                        </text>
                </svg>
        );
        Icon.displayName = displayName;
        return Icon;
};

export const Loader2 = createIcon("Loader2");
export const ExternalLink = createIcon("ExternalLink");
export const Copy = createIcon("Copy");
export const Menu = createIcon("Menu");
export const X = createIcon("X");
export const Lightbulb = createIcon("Lightbulb");
export const ChevronRight = createIcon("ChevronRight");
export const ChevronLeft = createIcon("ChevronLeft");
export const Route = createIcon("Route");
export const GraduationCap = createIcon("GraduationCap");
export const SearchIcon = createIcon("SearchIcon");
export const Filter = createIcon("Filter");
export const BookOpen = createIcon("BookOpen");
export const ChevronDown = createIcon("ChevronDown");
export const MoreHorizontal = createIcon("MoreHorizontal");
export const MapPin = createIcon("MapPin");
export const Phone = createIcon("Phone");
export const MessageSquare = createIcon("MessageSquare");
export const Send = createIcon("Send");
export const ArrowRight = createIcon("ArrowRight");
export const BarChart = createIcon("BarChart");
export const Dot = createIcon("Dot");
export const Check = createIcon("Check");
export const Circle = createIcon("Circle");
export const Heart = createIcon("Heart");
export const Globe = createIcon("Globe");
export const Building = createIcon("Building");
export const Users = createIcon("Users");
export const Mail = createIcon("Mail");
export const ChevronUp = createIcon("ChevronUp");
