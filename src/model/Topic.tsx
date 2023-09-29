import { v4 as uuid} from "uuid";

interface NewTopic{
    name: string;
}

export interface SavedTopic{
    id: string;
    name: string;
}

export function getTopicList(){
    const topicList = localStorage.getItem('topics');
    return topicList ? JSON.parse(topicList) : [];
}

export function findTopic( topic : NewTopic){
    const list : SavedTopic[] = getTopicList();
    const found = list?.find(({ name } : SavedTopic) => name === topic.name)
    return {
        found,
        list
    };
}

function checkIfExist( topic : NewTopic){
    const find = findTopic(topic);
    return !!find?.found;
}

function saveList(list: SavedTopic[]){
    localStorage.setItem('topics', JSON.stringify(list));
}

export function addTopic( topic : NewTopic){
    if(checkIfExist(topic)){
        throw new Error('Already exist');
    }else{
        const list: SavedTopic[] = getTopicList();
        const newTopic = {
            id: uuid(),
            name: topic?.name
        };
        list.push(newTopic);
        saveList(list);
        return newTopic;
    }
}

export function removeTopic( topic : SavedTopic){
    const find = findTopic(topic);
    if(find?.found){
        const index = find?.list.indexOf(find?.found);
        if(index > -1){
            find?.list.splice(index,1);
            saveList(find?.list);
        }
    }else{
        throw new Error('do not exist');
    }
}