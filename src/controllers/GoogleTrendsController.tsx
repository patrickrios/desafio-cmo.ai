const BASE_URL = "https://trends.google.com:443/trends/embed/";

interface DailyTrendsOptions{
    geo: string;
    hl?: string;
}

export const getDailyTrendsUrl =  ({geo, hl} : DailyTrendsOptions) => {
    return `${BASE_URL}dailytrends?geo=${geo}${hl ? `&&hl=${hl}` : ''}`; 
}