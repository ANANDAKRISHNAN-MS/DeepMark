import { Text, View, Image, TextInput, Pressable } from "react-native"
import { useEffect, useState } from "react"
import * as ImagePicker from 'expo-image-picker';
import { useVideoPlayer, VideoView } from "expo-video";

import Button from "~/src/components/Button";

export default function  CreatePost() {
    const[caption, setCaption] = useState('');
    const [media, setMedia] = useState<string | null>(null);
    const [mediaType, setMediaType] = useState<'image' | 'video' | null>(null);

    useEffect(()=>{
        if(!media){
            pickMedia();
        }
    },[media]);

    const player = useVideoPlayer(media, player => {
        player.loop = true;
        player.play();
      });

    const pickMedia = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images', 'videos'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        });

        if (!result.canceled) {
            if(result.assets[0].type ==='image'){
                setMediaType('image')
            } else{
                setMediaType('video')
            }
            setMedia(result.assets[0].uri)
        }
    };

    const uploadPost = async () => {
         /* TODO upload user post*/

    }

    return(
        <View className="p-3 items-center flex-1">
            {/* Media Picker */}
            { !media ?(
                    <View  className="w-52 aspect-[3/4] rounded-lg bg-slate-300"/>
            ) : mediaType === 'image' ? (
                <Image 
                source={{ uri: media}}
                className="w-52 aspect-[3/4] rounded-lg bg-slate-300"
                />
            ) : (
                <VideoView 
                className="w-52 aspect-[3/4] rounded-lg bg-slate-300"
                style={{ width: 200, aspectRatio: 1}}
                player={player} 
                allowsFullscreen 
                allowsPictureInPicture 
                />
            )}

            <Text onPress={pickMedia}  className="text-blue-500 font-semibold m-5 bg-slate-300">
                Change
            </Text>

            {/* Caption for Media */}
            <TextInput 
                value={caption}
                onChangeText={(newValue) => setCaption(newValue)} 
                placeholder="What's on your mind" 
                className="w-full p-3" 
            />

            {/* Button */}
            <View className="mt-auto w-full">
                <Button onPress={uploadPost} title="Share" />
            </View>
        </View>
    )
}