import css from "./video-skeleton.module.css";

interface SkeletonProps{
    width?: number | string;
    height?: number | string;
}
export const Skeleton = ({ height, width} : SkeletonProps) => {
    return(
        <div 
            className={css.videoSkeleton} 
            style={{
                height: height ? height : 'auto',
                width: width ? width : 'auto'
            }}>
        </div>
        )
}
export const SelectedVideoSkeleton = () =>{
    return <Skeleton width={'100%'} height={480}/>;
};

export const TrendingVideoSkeleton = () => {
    return(<>
        <div className={css.skeletonContainer}>
            {[1,2,3,4,5,6]?.map( el => <Skeleton 
                width={'100%'} 
                height={165}
                key={`${el}-skeleton-item`}
            />)}
        </div>
    </>)
}
