import { View, Text, Image } from "react-native";

export default function ActivityListItem({ item }: any){

    const getImageSource = (image: any) => {
        return typeof image === 'string' ? { uri: image } : image;
      };
      
    const postImage =
      item.likedPostThumbnail ||
      item.deepfakeDetectionThumbnail ||
      item.postThumbnail;

    return (
      <View className="flex-row items-center px-4 py-3 border-b border-gray-300 bg-white">
        {item.userProfile && (
          <Image
            source={{ uri: item.userProfile }}
            className="w-12 h-12 rounded-full mr-3"
          />
        )}
        <View className="flex-1 flex-row items-center">
          <Text className="text-base">
            {item.user && <Text className="font-bold">{item.user} </Text>}
            {item.action}
          </Text>
        </View>
        {postImage && (
          <Image
            source={getImageSource(postImage)}
            className="w-12 h-12 ml-3"
          />
        )}
      </View>
    );
}