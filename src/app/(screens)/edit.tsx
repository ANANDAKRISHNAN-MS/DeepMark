import { router, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

export default function EditProfileScreen() {
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');

  const router = useRouter();

  const handleSubmit = () => {
    console.log('Updated Username:', username);
    console.log('Updated Bio:', bio);
    router.back(); 
  };

  return (
    <View className="flex-1 bg-white p-5 justify-center">
      <Text className="text-xl font-bold text-center mb-5">Edit Profile</Text>

      <TextInput
        className="h-12 border border-gray-300 rounded-lg px-3 text-base mb-4"
        placeholder="Enter Username"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        className="h-12 border border-gray-300 rounded-lg px-3 text-base mb-6"
        placeholder="Enter Bio"
        value={bio}
        onChangeText={setBio}
      />

      <TouchableOpacity
        className="bg-blue-500 py-3 rounded-lg items-center"
        onPress={handleSubmit}
      >
        <Text className="text-white font-bold text-base">Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
}
