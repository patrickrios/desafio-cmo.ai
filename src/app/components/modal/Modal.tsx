'use client'

import { ReactNode } from "react";
import css from "./modal.module.css";

interface ModalProps{
    children?: ReactNode;
    onEscape: () => void;
}

export const Modal = ( props  : ModalProps) => {

    const handleOnEscapePressed = (e: any) =>{
        if(e.key === 'Escape'){
            props.onEscape();
        }
    };

    return(
        <div 
            className={css.modal} 
            onKeyDown={handleOnEscapePressed}
            autoFocus={true}
        >
            {props?.children}
        </div>
    )
};