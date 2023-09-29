import { ReactNode } from "react"
import css from "./dashboard.module.css";

interface DashboardProps{
    children: ReactNode;
}

export const Dashboard = (props : DashboardProps) => {
    const { children } = props;
    return(
        <section className={css.dashboard}>
            {children}
        </section>
    )
};