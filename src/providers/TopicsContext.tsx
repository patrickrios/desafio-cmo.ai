'use client'

import { getTopicList } from "@/model/Topic";
import { createContext, ReactNode, useEffect, useState } from "react";

interface SavedTopic {
    id: string;
    name: string;
}

interface TopicsContextProps{
    topics: SavedTopic[] | undefined;
    currentTopic: SavedTopic | undefined;
    refreshList: () => void;
    markTopicAsCurrent: (topic:SavedTopic) => void;
}

export const TopicsContext = createContext<TopicsContextProps>({} as TopicsContextProps);

interface TopicsProps {
  children: ReactNode;
}

export const TopicsProvider = (props: TopicsProps) => {
  const [topics, setTopics] = useState<SavedTopic[] | undefined>();
  const [currentTopic, setCurrentTopic] = useState<SavedTopic | undefined>();

  const markTopicAsCurrent = (topic : SavedTopic | undefined) =>{
    if(topic?.id === "#tudo")
      setCurrentTopic(undefined);
    else if( topic?.id !== currentTopic?.id)
      setCurrentTopic(topic);
    else
      setCurrentTopic(undefined);
  }
  
  const refreshList = () =>{
    const list = getTopicList();
    setTopics(list);
  }
    
  useEffect(() => {
    refreshList();
  }, []);

  return (
    <TopicsContext.Provider 
      value={{ 
        topics,
        currentTopic, 
        markTopicAsCurrent,
        refreshList
      }}
    >
      {props.children}
    </TopicsContext.Provider>
  );
};