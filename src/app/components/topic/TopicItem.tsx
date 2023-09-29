'use client'

import { removeTopic } from "@/model/Topic";
import { DeleteTopicIcon } from "./TopicIcons";
import css from "./topic-item.module.css";
import { useContext } from "react";
import { TopicsContext } from "@/providers/TopicsContext";

interface TopicProps{
    id: string,
    name: string
    selectOnly?: boolean;
    isDefault?: boolean;
}

const DeleteButton = (topic : TopicProps) => {
    const { currentTopic, markTopicAsCurrent, refreshList } = useContext(TopicsContext);
    const handleOnDelete = () =>{
        if( currentTopic?.id === topic?.id)
            markTopicAsCurrent(topic);
        removeTopic(topic);
        refreshList();
    };
    return (
        <button 
            className={css.topicDeletButton} 
            title={`remover ${topic?.name}`}
            onClick={handleOnDelete}
        >
            <DeleteTopicIcon/>
        </button>
    )
};

export const DefaultItem = () =>{
    const { currentTopic } = useContext(TopicsContext);
    return <TopicItem 
        name={'Tudo'} 
        id={'#tudo'}
        selectOnly
        key={'tudo~key'}
        isDefault={ currentTopic === undefined}
    />
};

export const TopicItem = ({ name, id, selectOnly, isDefault } : TopicProps) => {
        const { 
            currentTopic, 
            markTopicAsCurrent 
        } = useContext(TopicsContext);
        
        const style = isDefault ? 
            css.topicSelected : 
                currentTopic?.id === id ? 
                    css.topicSelected : 
                    css.topic;

        const handleOnSelect = () => {
            markTopicAsCurrent({ name, id}); 
        }

        return(
            <span 
                className={style} 
                onClick={selectOnly ? handleOnSelect : ()=>{}}
            >
                {name}
                { !selectOnly && 
                    <DeleteButton 
                        name={name} 
                        id={id}
                    />}
            </span>
        )
};