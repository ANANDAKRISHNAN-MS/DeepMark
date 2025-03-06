import { Text, View, Image} from "react-native"
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from "react";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";

import Button from "~/src/components/Button";
import { useAuth } from "~/src/providers/AuthProvider";
import CustomTextComponent from "~/src/components/CustomTextComponent";
import { cld } from "~/src/lib/cloudinary";
import { AdvancedImage } from "cloudinary-react-native";


export default function ProfileScreen() {
    const [image, setImage] = useState<string | null>(null);
    const [remoteImage, setRemoteImage] = useState<string | null>(null);
    const [name, setName] = useState('');
    const [bio, setBio] = useState(' ');

    const { token, username } = useAuth();


    useEffect(() => {
         getProfile()
    },[])

    const getProfile = async () => {
        if(!username){
            return;
        }

        /* TODO fetch user profile */
    }

    const updateProfile = async () => {
         /* TODO update user profile */
        //  if(image){

        //  }
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images', 'videos'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        });

        if (!result.canceled) {
        setImage(result.assets[0].uri);
        }
    };
    
    let remoteCldImage
    if (remoteImage){
        remoteCldImage = cld.image(remoteImage)
        remoteCldImage.resize(thumbnail().width(300).height(300))
    }
    return(
        <View className="p-3 flex-1">
            {/* Avatar Picker */}
            {image ?(
                <Image 
                    source={{ uri: image}}
                    className="w-52 aspect-square self-center rounded-full bg-slate-300"
                />
            ) : remoteCldImage ? (
                    <AdvancedImage cldImg={remoteCldImage} />
            ) : (
                <View  className="w-52 aspect-square self-center rounded-full  bg-slate-300" />
            )}

            <Text 
                onPress={pickImage} 
                className="text-blue-500 font-semibold m-5 self-center bg-slate-300"
            >
                Change
            </Text>
            <View className="gap-5">
                <CustomTextComponent 
                    label="Name"
                    placeholder="username"
                    value={name}
                    onChangeText={setName} 
                /> 
                <CustomTextComponent 
                    label="Bio"
                    placeholder="username"
                    value={bio}
                    onChangeText={setBio}
                    multiline
                    numberOfLines={3} 
                />
            </View>
            <View className="gap-2 mt-auto">
                <Button onPress = {updateProfile} title="Update"/>
                <Button title="Sign Out"/>
            </View>
        
        </View>
    )
}