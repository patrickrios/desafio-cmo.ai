'use client'

import { useContext } from "react";
import { SocialCard } from "../dashboard/SocialCard"
import css from "./google-trends.module.css";
import { TopicsContext } from "@/providers/TopicsContext";
import { getDailyTrendsUrl } from "@/controllers/GoogleTrendsController";
import { MenuContext, PAGES } from "@/providers/MenuContext";
import { EmptyTopicList, EmptyTopicListCard } from "../topic/TopicList";

interface SingleProps{
    keyword: string;
};

const CompareMultiTopicsWidget = () =>{
    const { topics } = useContext(TopicsContext);
    const fiveOne = topics?.slice(0,5);
    const keywords: string[] | undefined = fiveOne?.map( topic => topic?.name);
    const keywordList = keywords?.map(keyword => ({
        keyword,
        geo: 'BR',
        time: 'today 12-m'
      }));
    const urlMulti  = `https://trends.google.com:443/trends/embed/explore/TIMESERIES?req=${encodeURIComponent(JSON.stringify({ comparisonItem: keywordList, category: 0, property: '' }))}&tz=-480&eq=q=brexit&geo=US&date=today 12-m`;
    return (
        <>
            { topics && topics?.length > 0 ? 
                <iframe
                    id="trends-widget-multiple"
                    src={urlMulti}
                    className={css.googleKeywordsIframe}
                    width="100%"
                /> :
                <EmptyTopicListCard/>
            }
        </>
    )
};

const SingleKeywordWidget = ({ keyword } : SingleProps) => {
    const urlSingle = `https://trends.google.com:443/trends/embed/explore/TIMESERIES?req={"comparisonItem":[{"keyword":"${keyword}","geo":"BR","time":"today 12-m"}],"category":0,"property":""}&tz=-480&eq=q=brexit&geo=BR&date=today 12-m`;
    return (
        <iframe
            id="trends-widget-single"
            src={urlSingle}
            className={css.googleKeywordsIframe}
            width="100%"
        />
    )
}

const GeneralTrends = () => {
    return (
        <iframe
            id="dailytrends-widget"
            src={getDailyTrendsUrl({
                geo:'BR',
                hl:'pt-BR'
            })}
            className={css.googleDailyTrendsIframe}
            width="100%"
        />
    )
};

export const GoogleTrends = () => {
    const { currentTopic } = useContext(TopicsContext);
    const {page } = useContext(MenuContext);
    const hasTopicSelected = currentTopic !== undefined;
    
    return(
        <SocialCard title="Google trends">
            { page === PAGES.general && <GeneralTrends/>}

            { page === PAGES.topics && 
                !hasTopicSelected && 
                <CompareMultiTopicsWidget/>
            }

            {   page === PAGES.topics && 
                hasTopicSelected && 
                <SingleKeywordWidget 
                    keyword={ hasTopicSelected ? 
                            currentTopic?.name : 
                            ''
                    }
                />
            }
            {   page === PAGES.search && 
                hasTopicSelected && 
                <SingleKeywordWidget 
                    keyword={ hasTopicSelected ? 
                            currentTopic?.name : 
                            ''
                    }
                />
            }
        </SocialCard>
    )
}