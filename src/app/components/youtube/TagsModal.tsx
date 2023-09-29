import { Modal } from "../modal/Modal";
import css from "./youtube.module.css";

interface TagsModalProps{
    tagList: string[];
    onEscape: ()=>void;
}

export const TagsModal = ( props : TagsModalProps) => {
    const { tagList, onEscape} = props;
    return<Modal onEscape={onEscape}>
        <div className="card" style={{margin:'0 4rem', padding:'1rem 2rem'}}>
            <span onClick={onEscape}>X</span>
            <div className={`${css.youtubeTags} ${css.youtubeTagsOpen}`}>
                <h4 className={css.youtubeTagsTitle}>
                    Tags ({tagList?.length}):
                </h4>
                { tagList?.map( (tag, index) => 
                    <span className={css.youtubeTag} key={`${tag}-${index}~item`}>
                        {`${tag}${ index !== tagList?.length-1 ? ', ': ''}`}
                    </span>
                )}
            </div>
        </div>
    </Modal>
};