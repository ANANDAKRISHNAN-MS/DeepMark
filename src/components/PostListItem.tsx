import { useEffect, useState } from "react";
import { Text, View} from "react-native"
import { AntDesign} from "@expo/vector-icons"

import { AdvancedImage } from 'cloudinary-react-native';
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";

import { cld } from "~/src/lib/cloudinary";
import PostContent from "~/src/components/PostContent";


export default function PostListItem({ post } ) {
    const [isLiked, setIsLiked] = useState(false);
    const [likedRecord, setLikedRecord] = useState(null);

    useEffect(() => {
        fetchLike();
    },[]);

    useEffect(()=>{
        if(isLiked){
            saveLike()
        } else{
            deleteLike() 
        }
    },[isLiked])

    const saveLike = async () => {
        /*TODO like api */
    }

    const fetchLike = async () => {
        /*TODO user like api */
    }

    const deleteLike = async () => {
        /*TODO unlike api */
    }

    const avatar = cld.image(post.user_profile_picture)
    avatar.resize(thumbnail().width(48).height(48).gravity(focusOn(FocusOn.face())));

    return(
        <View className="bg-white">
            {/* Header*/}
            <View className="p-3 flex-row items-center gap-2">
                <AdvancedImage
                  cldImg={post.user.avatar_url}
                  className="w-12 aspect-square rounded-full" 
                />
                <Text className="font-semibold">{post.user.username}</Text>
            </View>

            <PostContent post={post} />

            <View className="flex-row gap-3 p-3">
                <AntDesign 
                onPress={() => {setIsLiked(!isLiked)}}
                name={ isLiked ? "heart" : "hearto"} 
                color={isLiked ? 'crimson' : 'black'}
                size={25} 
                />
            </View>
        </View>
        
    )
}