import { ReactNode } from "react";

export interface ITask {
    status?: string;
    timeline?: string;
    text: ReactNode;
    id: string;
    title: string;
    description?: string;
}
