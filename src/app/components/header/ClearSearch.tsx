import { useContext, useState } from "react";
import css from "./clear-search.module.css";
import { MenuContext, PAGES } from "@/providers/MenuContext";
import { TopicsContext } from "@/providers/TopicsContext";
import { DeleteTopicIcon } from "../topic/TopicIcons";
import { addTopic } from "@/model/Topic";

export const ClearSearch = () => {
    const { changePage } = useContext(MenuContext);
    const { markTopicAsCurrent, refreshList, currentTopic } = useContext(TopicsContext);
    const[isSaved, setSaved] = useState(false);

    const handleOnClear = () => {
        if(currentTopic)
            markTopicAsCurrent(currentTopic);
        changePage(PAGES.general);
    };

    const handleSaveTopic = () =>{
        try {
            addTopic({name:  currentTopic?.name || ''});
            setSaved(true);
            refreshList();
            changePage(PAGES.topics);
        } catch (error) {
            setSaved(false);
        }
    };

    return (
        <div className={css.searchBar}>
            <span className={css.searchBarTitle}>
                {currentTopic ? currentTopic?.name : ''}
            </span>
            <button 
                className={`${css.saveTopic} ${css.clearSearch}`} 
                onClick={handleSaveTopic}
            >
                { isSaved ? 'salvo' : 'salvar topico'}
            </button>
            <button 
                className={css.clearSearch} 
                onClick={handleOnClear}
            >
                limpar pesquisa
                <DeleteTopicIcon/>
            </button>
        </div>
    )
}