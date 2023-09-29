import { SavedTopic } from "@/model/Topic";
import axios from "axios";

const BASE_URL = "https://www.googleapis.com/youtube/v3/";
const KEY      = "AIzaSyDmxNy4w1kt-jPUjO9SLvtiSVwTtcwoiYo";//"AIzaSyDYxVRfzmvVYNzYiqgoJLvi76m3okRl0c0";

export const getMixedTopicVideos = async (topics : SavedTopic[]) => {
    let videos: any = [];

    let keywords = '';
    for(let i=0; i<topics?.length; i++){
        keywords = keywords.concat(topics[i]?.name);
        if( i +1 !== topics?.length){
            keywords = keywords.concat('%20')
        }
    }
    await axios.get(
        `${BASE_URL}search?q=${keywords}&part=snippet&type=video&order=viewCount&maxResults=16&key=${KEY}`
    ).then( response =>{
        if(response?.data){
            videos = response?.data?.items;
        }
    }).catch(error =>{
        console.error(error);
    })
    return videos;
}

export const getVideoById = async (videoId : string | any) => {
    let video: any = undefined;
    await axios.get(
        `${BASE_URL}videos?id=${videoId}&part=snippet&key=${KEY}`
    ).then( response =>{
        video = response?.data?.items[0];
    }).catch( error => {
        console.error(error)
    });
    return video;
}

export const getVideosByKeyWord = async ( keyword : string) => {
    let videos: any = [];
    await axios.get(
        `${BASE_URL}search?q=${keyword}&part=snippet&maxResults=16&type=video&key=${KEY}`
    ).then( response => {
        videos = response?.data?.items;
    }).catch( error =>{
        console.error(error);
    });
    return videos;
}

export const getRelevantVideosByLocation = async ( location : string) => {
    let videos: any = [];
    await axios.get(
        `${BASE_URL}videos?part=snippet&chart=mostPopular&maxResults=16&regionCode=${location}&key=${KEY}`
    ).then( response =>{
        videos = response?.data?.items;
    }).catch( error =>{
        console.error(error);
    })
    return videos;
}