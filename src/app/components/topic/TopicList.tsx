'use client'

import { useContext, useState } from "react";
import { EmptyTopicsIcon, GearSixIcon } from "./TopicIcons";
import { DefaultItem, TopicItem } from "./TopicItem";
import css from "./topic-item.module.css";
import { TopicModal } from "./TopicModal";
import { TopicsContext } from "@/providers/TopicsContext";

export const EmptyTopicList = () => {
    return (
        <div className={css.emptyTopicList}>
            <EmptyTopicsIcon/>
            <p className={css.emptyTopicTitle}>
                Nenhum interesse salvo
            </p>
        </div>
    )
}

export const EmptyTopicListCard = () => {
    return(
        <div className={`card ${css.emptyTopicListCard}`}>
            <EmptyTopicList/>
        </div>
    )
}

export const TopicHeaderList = () => {
    const [showModal, setModal] = useState(false);
    const toggleModal = () => setModal(!showModal);
    const { topics } = useContext(TopicsContext);
    const hasTopics = (
        topics?.length && 
        topics?.length > 0
    );
    return(
        <>
            <div className={`${css.topicHeaderList} ${css.bordered}`}>
                <div className={css.topics}>
                    {
                    hasTopics ? 
                        <>
                            <DefaultItem/>
                            {topics.map( item => 
                                <TopicItem 
                                    name={item?.name} 
                                    id={item?.id}
                                    selectOnly
                                    key={item?.id}
                                />
                            )}
                        </> : 
                        <span className={css.emptyTopicTitle}>
                            Nehum interesse salvo
                        </span>
                    }
                </div>
                <button 
                    onClick={toggleModal} 
                    className={css.topicSettingsButton}
                    title="Configurar interesses"
                >
                    <GearSixIcon/>
                </button>
            </div>
            { showModal && <TopicModal handleOnEscape={toggleModal}/>}
        </>
    )
}

export const TopicModalList = () => {
    const { topics } = useContext(TopicsContext);
    const hasTopics = (
        topics?.length && 
        topics?.length > 0
    );
    return(
        <div className={`${css.topicList}`}>
             { hasTopics ? 
                topics.map( item => 
                    <TopicItem 
                        name={item?.name} 
                        id={item?.id}
                        key={item?.id}
                    />
                ) : 
                <EmptyTopicList/>
            }
        </div>
    )
}