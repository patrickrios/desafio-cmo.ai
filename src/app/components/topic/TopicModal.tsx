'user client'

import { addTopic } from "@/model/Topic";
import { Modal } from "../modal/Modal";
import { TextInput } from "../text-input/TextInput";
import { PlusIcon } from "../text-input/TextInputIcons";
import css from "./topic-modal.module.css";
import { TopicModalList } from "./TopicList";
import { useContext } from "react";
import { TopicsContext } from "@/providers/TopicsContext";
import { motion } from "framer-motion";

interface TopicModalProps{
    handleOnEscape: () =>void;
}

export const TopicModal = (props : TopicModalProps) => {
    const { handleOnEscape } = props;
    const { refreshList, topics } = useContext(TopicsContext);

    const addNewTopic = (name : string) =>{
        try {
            addTopic({ name });
            refreshList();
        } catch (error) {
            console.error(error);
        }
    };

    return(
        <Modal onEscape={handleOnEscape}>
            <motion.div 
                className={css.topicModal}
                initial={{scale:0.8,opacity:0.8}}
                animate={{scale:1,opacity:1}}
                transition={{duration:0.075}}

            >
                <header>
                    <h2>Interesses ({topics?.length})</h2>
                    <TextInput 
                        placeholder="Digite para adicionar" 
                        icon={<PlusIcon/>}
                        onSubmit={addNewTopic}
                    />
                </header>
                <div className={css.list}>
                    <TopicModalList/>
                </div>
                <button className={css.okButton} onClick={handleOnEscape}>
                    OK
                </button>
            </motion.div>
        </Modal>
    )
};