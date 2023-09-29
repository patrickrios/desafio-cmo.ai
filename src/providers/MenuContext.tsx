'use client'

import { ReactNode, createContext, useContext, useState } from "react";
import { TopicsContext } from "./TopicsContext";

export const PAGES = {
    general: "GENERAL",
    topics: "TOPICS",
    search: "SEARCH"
};

interface MenuProviderProps{
    children: ReactNode;
}
interface MenuContextProps{
   page: string;
   changePage: (newPage : string) => void;
}

export const MenuContext = createContext<MenuContextProps>({} as MenuContextProps);

export const MenuProvider = (props : MenuProviderProps) => {
    const[page, setPage] = useState<string>(PAGES.general);
    const { markTopicAsCurrent } = useContext(TopicsContext);

    const changePage = (newPage : string) => {
        if(page === PAGES.search)
            markTopicAsCurrent({ 
                id: '#tudo',
                name:''
            });
        if(newPage){
            setPage(newPage);
        }
    };

    return <MenuContext.Provider 
        value={{
            page,
            changePage
        }}
    >
        {props?.children}
    </MenuContext.Provider>
}