import { AdvancedImage, AdvancedVideo } from "cloudinary-react-native";
import { thumbnail, scale } from "@cloudinary/url-gen/actions/resize";
import { useWindowDimensions } from "react-native";

import { cld } from "~/src/lib/cloudinary";

export default function PostContent({ post }){
    const { width } = useWindowDimensions();
    
    if(post.media_type === 'image'){
        const image = cld.image(post.media_url);
        image.resize(thumbnail().width(width).height(width));

        return(
            <AdvancedImage cldImg={image} className="w-full aspect-[4/3]"/>
        )
    }
    if(post.media_type === 'video'){
        const video = cld.video(post.media_url);
        video.resize(scale().width(400));
        return(
             <AdvancedVideo 
                cldVideo={video} 
                videoStyle={{ width: '100%', aspectRatio: 4 / 3}}
            />
        )
    }
}