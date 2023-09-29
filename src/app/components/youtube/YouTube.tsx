'use client'

import { useContext, useEffect, useState } from "react"
import { SocialCard } from "../dashboard/SocialCard"
import { 
    getMixedTopicVideos, 
    getRelevantVideosByLocation, 
    getVideoById, 
    getVideosByKeyWord
 } from "@/controllers/YouTubeController"
import { TopicsContext } from "@/providers/TopicsContext";
import { VideoCard } from "./VideoCard";
import css from "./youtube.module.css";
import { MenuContext, PAGES } from "@/providers/MenuContext";
import { TagsModal } from "./TagsModal";
import { EmptyTopicListCard } from "../topic/TopicList";
import { SelectedVideoSkeleton, TrendingVideoSkeleton } from "./VideoSkeleton";


const RelevantVideos = ({ list }: any) => {
    let tagList: any = [];
    const[tags, setTags] = useState<string[]>([]);
    const[isTagCollapsed, setTagCollapsed] = useState(true);
    const[showTagModal, setTagModal] = useState(false);
    const [selectVideo, setSelectedVideo] = useState('');
    
    const toggleTagCollapse = () => setTagCollapsed(!isTagCollapsed);

    const setVideoAsSelected = (videoId : string) => {
        setSelectedVideo(videoId); 
    };
    
    useEffect(()=>{
        if(list !== undefined){
            list?.forEach((video: any) => {
                tagList = tagList.concat(video?.snippet?.tags);
            });
            setTags(tagList);
            setSelectedVideo(list[0]?.id)
        }
    },[list]);

    return (
        <section className={`${css.youtubeVideos} card`}>
            <div className={css.youtubeSlider}>
                { list === undefined ? 
                        <SelectedVideoSkeleton/> :
                        <iframe
                            title={''}
                            src={`https://www.youtube.com/embed/${selectVideo}`}
                            allowFullScreen
                            className={css.embeedVideo}
                        />
                        
                }
                <div className={css.trending}>
                    <h4 className={css.trendingTitle}>
                        Videos em alta
                    </h4>
                    <div className={css.trendVideosContainer}>
                        { list === undefined ? 
                            <TrendingVideoSkeleton/> :
                            <div className={css.trendVideosPlayList}>
                                { list?.map(( video: any ) => <VideoCard
                                    title={video?.snippet?.title}
                                    thumbUrl={video?.snippet?.thumbnails?.medium?.url}
                                    thumbWidth={video?.snippet?.thumbnails?.medium?.width}
                                    thumberHeight={video?.snippet?.thumbnails?.medium?.height}
                                    videoId={video?.id}
                                    isSelected={video?.id === selectVideo}
                                    onSelect={setVideoAsSelected}
                                />)}
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className={`${css.youtubeTagsContainer}`}>
                <div className={`${css.youtubeTags} ${ isTagCollapsed ? css.youtubeTagsCollapsed : css.youtubeTagsOpen}`}>
                    <h4 className={css.youtubeTagsTitle}>
                        Tags ({tags?.length}):
                    </h4>
                    { tags?.map( (tag, index) => 
                        <span className={css.youtubeTag} key={`${tag}-${index}~item`}>
                            {`${tag}`}
                        </span>
                    )}
                </div>
                <button className={css.collapaseButton} onClick={toggleTagCollapse}>
                    { isTagCollapsed ? 'ver mais' : 'esconder'}
                </button>
            </div>
            {   showTagModal && 
                <TagsModal 
                    tagList={tags} 
                    onEscape={toggleTagCollapse}
                />
            }
        </section>
    )
};

const GeneralVideos = () =>{
    const [general, setGeneralVideos] = useState<[] | undefined>();

    const fetchVideos = async () => {
        const videos = await getRelevantVideosByLocation('BR');
        setGeneralVideos(videos);
    };

    useEffect(()=>{
        if( general === undefined)
            fetchVideos();
    },[general]);

    return <>
        <RelevantVideos list={general}/>
    </>
}

const SelectedTopicVideos = () =>{
    const { currentTopic } = useContext(TopicsContext);
    const[videos, setVideos] = useState();

    const getVideosOf = async () => {
        const videoList = await getVideosByKeyWord( currentTopic ? currentTopic?.name : '');
        if(videoList?.length > 0){
            let list: any = [];
            for( let i=0; i<videoList?.length; i++){
                const videoData = await getVideoById(videoList[i]?.id?.videoId);
                list.push(videoData);
            }
            setVideos(list);
        }
    }

    useEffect(()=>{
        if( currentTopic !== undefined){
            getVideosOf();
        }
    },[currentTopic]);

    return <>
        <RelevantVideos list={videos}/>
    </>
}

const MixedTopicVideos = () =>{
    const { topics } = useContext(TopicsContext);
    const [videos, setVideos] = useState();

    const getVideos = async () => {
        if(topics && topics?.length > 0){
            const mixed = await getMixedTopicVideos(topics);
            if(mixed){
                let list: any = [];
                for( let i=0; i<mixed?.length; i++){
                    const videoData = await getVideoById(mixed[i]?.id?.videoId);
                    list.push(videoData);
                }
                setVideos(list);
            }
        }
    }

    useEffect(()=>{
        if(videos === undefined)
            getVideos();
    },[videos]);

    return <>
        { topics && topics?.length > 0 ? 
            <RelevantVideos list={videos}/>: 
            <EmptyTopicListCard/>
        }
    </>
}

export const YouTube = () => {
    const { currentTopic } = useContext(TopicsContext);
    const { page } = useContext(MenuContext);
    const hasTopicSelected = currentTopic !== undefined;
    return (
        <SocialCard title="YouTube">
            { page === PAGES.general && <GeneralVideos/>}
            { page === PAGES.topics && hasTopicSelected && <SelectedTopicVideos/>}
            { page === PAGES.topics && !hasTopicSelected && <MixedTopicVideos/>}
            { page === PAGES.search && hasTopicSelected && <SelectedTopicVideos/>}
        </SocialCard>
    )
}