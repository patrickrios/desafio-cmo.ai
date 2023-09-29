'use client'

import { ReactNode, useContext } from "react";
import css from "./social-card.module.css";
import { TopicsContext } from "@/providers/TopicsContext";
import { MenuContext, PAGES } from "@/providers/MenuContext";

interface SocialProps{
    title: string;
    bordered?: boolean;
    children?: ReactNode;
}

const Subtitle = () =>{
    const { currentTopic} = useContext(TopicsContext);
    const { page } = useContext(MenuContext);
    const hasTopicSelected = currentTopic !== undefined;
    return<span 
        style={{
            fontSize:"1rem",
            color: (page === PAGES.topics || page === PAGES.search && hasTopicSelected) ? "var(--purple-1)" : "#999",
            fontWeight:"normal", 
            marginLeft:".5rem"
        }}
    >
        { page === PAGES.general && '#em alta'}
        { page === PAGES.topics && hasTopicSelected && `#${currentTopic?.name}`}
        { page === PAGES.search && hasTopicSelected && `#${currentTopic?.name}`}
        { page === PAGES.topics && !hasTopicSelected && `#meus interesses`}
    </span>
}

export const SocialCard = ( props : SocialProps) => {
    const { title, bordered, children }  = props;
    return(
        <div className={`${bordered ? css.bordered : ''} ${css.socialCard} card`}>
            <h2>
                {title}
                <Subtitle/>
            </h2>
            {children}
        </div>
    )
};