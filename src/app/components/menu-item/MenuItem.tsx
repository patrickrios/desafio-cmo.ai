'use client'

import { MenuContext } from "@/providers/MenuContext";
import { useContext } from "react";
import css from "./menu-item.module.css";

export interface MenuItemProps{
    title: string;
    pageKey: string;
}

export const MenuItem = ( props : MenuItemProps) => {
    const { page, changePage } = useContext(MenuContext);

    const handleOnClick = () => {
        changePage(props?.pageKey); 
    };

    return <li 
        className={ page === props?.pageKey ? 
            css.selectedMenuItem : 
            css.menuItem
        }
        onClick={handleOnClick}
    >
        {props?.title}
    </li>
};