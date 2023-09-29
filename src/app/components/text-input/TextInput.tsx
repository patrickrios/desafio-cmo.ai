'use client'

import { ReactNode, useState } from "react";
import css from "./text-input.module.css";

interface InputTextProps{
    placeholder?: string,
    text?: string,
    icon?: ReactNode,
    onSubmit?: ( value: string)=> void;
    placedInColor?: boolean;
};

export const TextInput = (props : InputTextProps) => {
    const { 
        text, 
        placeholder, 
        icon, 
        onSubmit,
        placedInColor
    } = props;

    const [value, setValue] = useState( text ? text : '');

    const handleOnChange = (e: any) => {
        setValue(e.target.value)
    };

    const handleKeyPress = (e: any) => {
        if (e.key === 'Enter'){
            handleOnSubmit();
            setValue('');
        }
      };

    const handleOnSubmit = () => {
        if(onSubmit){
            onSubmit(value);
        }
        console.log(value)
    }

    return(
        <div className={`${css.textInput} ${placedInColor ? css.placedColor : css.placedWhite}`}>
            <input 
                type="text"
                placeholder={placeholder}
                value={value}
                className={`${icon ? css.inputHasIcon : css.inputWithNoIcon}`}
                onChange={handleOnChange}
                onKeyDown={handleKeyPress}
            />
            { icon && 
                <div className={css.icon}>
                    {icon}
                </div>
            }
        </div>
    )
}