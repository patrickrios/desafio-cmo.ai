'use client'

import { useContext } from "react";
import { TextInput } from "../text-input/TextInput";
import { SearchIcon } from "../text-input/TextInputIcons";
import css from "./header.module.css";
import { MenuContext, PAGES } from "@/providers/MenuContext";
import { MenuItem, MenuItemProps } from "../menu-item/MenuItem";
import { TopicsContext } from "@/providers/TopicsContext";
import { v4 as uuid } from "uuid"

const items: MenuItemProps[] = [{
        title:'Em alta',
        pageKey: PAGES.general
    },
    {
        title: 'Meus interesses',
        pageKey: PAGES?.topics
    }
];

export const Header = () => {
    const { changePage } = useContext(MenuContext);
    const { markTopicAsCurrent} = useContext(TopicsContext);
    const handleOnSearch = (keyword : string) =>{
        if(keyword){
            changePage(PAGES.search);
            markTopicAsCurrent({
                id: uuid(),
                name: keyword
            });
            console.log('search page');
            console.log('new topic', keyword);
        }
    }
    return(
        <header className={`center-content ${css.header}`}>
            <div className={css.titleNavigation}>
                <h1 className={css.headerTitle}>
                    DESAFIO CMO.AI
                </h1>
                <nav className={css.headerMenu}>
                    <ul>
                        { items?.map( item => <MenuItem 
                                title={item?.title} 
                                pageKey={item?.pageKey}
                                key={`${item?.title}~${item?.pageKey}-item`}
                            />
                        )}
                    </ul>
                </nav>
            </div>
            <TextInput 
                placeholder='Buscar por palavra-chave'
                icon={<SearchIcon/>}
                onSubmit={handleOnSearch}
                placedInColor
            />
      </header>
    )
};