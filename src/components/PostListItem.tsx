import { Text, View, Image, useWindowDimensions} from "react-native"
import { AntDesign} from "@expo/vector-icons"

import { AdvancedImage } from 'cloudinary-react-native';
import { cld } from "~/src/lib/cloudinary";

import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";

export default function PostListItem({ post } ) {
    const { width } = useWindowDimensions();

    const image = cld.image(post.image)
    image.resize(thumbnail().width(width).height(width));
    
    const avatar = cld.image(post.user.avatar_url)
    avatar.resize(thumbnail().width(48).height(48).gravity(focusOn(FocusOn.face())));

    return(
        <View className="bg-white">
            {/* Header*/}
            <View className="p-3 flex-row items-center gap-2">
                <AdvancedImage
                  cldImg={avatar}
                  className="w-12 aspect-square rounded-full" 
                />
                <Text className="font-semibold">{post.user.username}</Text>
            </View>
            <AdvancedImage cldImg={image} className="w-full aspect-[4/3]"/>
            <View className="flex-row gap-3 p-3">
                <AntDesign name="hearto" size={25} />
            </View>
        </View>
        
    )
}