import { MenuContext, PAGES } from "@/providers/MenuContext"
import { useContext } from "react"
import { TopicHeaderList } from "../topic/TopicList";
import { ClearSearch } from "./ClearSearch";

export const HeaderSubContext = () => {
    const { page } = useContext(MenuContext);
    return(
        <div>
            { page?.includes( PAGES.topics) && <TopicHeaderList/>}
            { page?.includes(PAGES.search) && <ClearSearch/>}
        </div>
    )
    
}