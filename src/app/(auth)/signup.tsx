import { View, Text, Image, TextInput, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity } from 'react-native';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import { useRouter } from "expo-router";

export default function Signus() {
  type FieldKey = 'username' | 'name' | 'email' | 'password' | 'confirmPassword';

  const [formData, setFormData] = useState<Record<FieldKey, string>>({
    username: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const fields = [
    { key: 'username', label: 'Username' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'password', label: 'Password' },
    { key: 'confirmPassword', label: 'Confirm Password' },
  ] as const;

  const [bio, setBio] = useState('');

  const router = useRouter();

  return (
    <View className="bg-[#0a192f] h-full w-full">
      <StatusBar style="light" />
      <Image className="h-full w-full absolute" source={require('~/assets/images/background.jpg')} />

      {/* Lights Positioned Behind */}
      <View className="absolute top-0 left-0 w-full h-full opacity-40">
        <Animated.Image 
          entering={FadeInUp.delay(200).duration(1000).springify()} 
          className="h-[225] w-[90] absolute left-2 top-10" 
          source={require('~/assets/images/light.png')} 
        />
        <Animated.Image 
          entering={FadeInUp.delay(400).duration(1000).springify()} 
          className="h-[160] w-[65] absolute right-2 top-20" 
          source={require('~/assets/images/light.png')} 
        />
      </View>

      {/* Make Page Scrollable */}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="h-full w-full flex justify-around pt-24 pb-10">
          
          {/* SignUp Title */}
          <View className="flex items-center mb-6">
            <Animated.Text entering={FadeInUp.duration(1000).springify()} className="text-white font-bold tracking-wider text-5xl">
              SignUp
            </Animated.Text>
          </View>

          {/* Form Fields with reduced height */}
          <View className="flex items-center mx-4 space-y-4 mt-16">
            {fields.map(({ key, label }, index) => (
              <Animated.View
                key={key}
                entering={FadeInDown.delay(index * 200).duration(1000).springify()}
                className="bg-white/20 rounded-2xl w-full h-12 justify-center px-5"
              >
              <TextInput 
                  placeholder={label}
                  placeholderTextColor="#d1d5db" 
                  style={{ color: 'white' }} 
                  secureTextEntry={label.toLowerCase().includes("password")}
                  keyboardType={label === "Email" ? "email-address" : "default"}
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={formData[key]}
                  onChangeText={(text) =>
                    setFormData((prev) => ({ ...prev, [key]: text }))
                  }
                />
              </Animated.View>
            ))}

            {/* Larger Text Box for Bio */}
            <Animated.View entering={FadeInDown.delay(1000).duration(1000).springify()} className="bg-white/20 p-5 rounded-2xl w-full h-20">
              <TextInput
                placeholder="Bio"
                placeholderTextColor="#d1d5db"
                multiline
                numberOfLines={4}
                style={{ color: 'white', height: 80 }}
                onChangeText={(newValue) => setBio(newValue)}
              />
            </Animated.View>

            {/* Signup Button */}
            <Animated.View entering={FadeInDown.delay(1200).duration(1000).springify()} className="w-full mt-4">
              <TouchableOpacity className="w-full bg-sky-400 p-3 rounded-2xl mb-3">
                <Text className="text-xl font-bold text-white text-center">Signup</Text>
              </TouchableOpacity>
            </Animated.View>

            {/* Already have an account? */}
            <Animated.View entering={FadeInDown.delay(1400).duration(1000).springify()} className="flex-row justify-center pb-10">
              <Text className="text-gray-300">Already have an account?</Text>
              <TouchableOpacity onPress={() => router.replace("/(auth)/login")}>
                <Text className="text-sky-400 font-semibold ml-1">Login</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
