import Image from "next/image"
import css from "./video-card.module.css";

interface VideoCardProps{
    videoId: string;
    title: string;
    thumbUrl: string;
    thumbWidth: number;
    thumberHeight: number;
    description?: string;
    isSelected: boolean;
    onSelect?: (videoId : string) => void;
}

function formattTitle(title: string){
    const newTitle = title?.length > 48 ? 
        title?.substring(0,45) + "..." : 
        title;
    return newTitle?.toUpperCase();
}

export const VideoCard = (props : VideoCardProps) => {
    const handleOnSelect = () => {
        if(props?.onSelect)
            props?.onSelect(props?.videoId) 
    }
    return(
        <div 
            className={`${css.videoCard} ${props?.isSelected && css.videoSelected}`} 
            onClick={handleOnSelect}
        >
            <Image 
                src={props?.thumbUrl} 
                alt="anytime" 
                width={props.thumbWidth} 
                height={props.thumberHeight}
                style={{width:'100%',height:'auto'}}
            />
            <h3 className={css.videoTitle}>
                {formattTitle(props?.title)}
            </h3>
            {   props?.isSelected && 
                <span className={css.playing}>
                    Reproduzindo
                </span>
            }
        </div>
    )
}