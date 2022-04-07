import { ReactNode } from "react";

export type GenericProps<P = {}> = P & { children?: ReactNode}; 