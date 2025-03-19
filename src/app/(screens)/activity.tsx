import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import ActivityListItem from '~/src/components/ActivityListItem';

const DUMMY_POST_IMAGE = 'https://via.placeholder.com/50';

const activities = [
  {
    id: '1',
    user: 'john_doe',
    action: 'liked your post',
    userProfile: 'https://randomuser.me/api/portraits/men/1.jpg',
    likedPostThumbnail: require('~/assets/images/background.jpg'),
  },
  {
    id: '2',
    action: 'A deepfake video was detected on your post',
    deepfakeDetectionThumbnail: require('~/assets/images/background.jpg'),
  },
  {
    id: '3',
    user: 'mike_jackson',
    action: 'followed you',
    userProfile: 'https://randomuser.me/api/portraits/men/3.jpg',
    postThumbnail: DUMMY_POST_IMAGE,
  },
];

export default function ActivityScreen() {
  const [activity, setActivity] = useState([]);
  
  useEffect(() => {
    fetchActivity();
  }, [])

  const fetchActivity = async () => {
    let data = /* TODO fetch user profile */
    setActivity([])
  }

  return (
    <FlatList
      data={activities}
      renderItem={({ item }) => <ActivityListItem item={item} />}
      keyExtractor={(item) => item.id}
      className="flex-1 bg-white "
    />
  );
}
