import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

interface User {
  id: string;
  username: string;
  image: string;
}

interface Props {
  isVisible: boolean;
  onClose: () => void;
  modalTitle: string;
}

const ListModal = ({ isVisible, onClose, modalTitle }: Props) => {
  const [userList, setUserList] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isVisible) {
      fetchUsers();
    }
  }, [isVisible]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      // Replace with your actual API call
      const res = await fetch('https://example.com/api/users');
      const data = await res.json();
      setUserList(data.users); // Adjust based on API response structure
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} style={{ justifyContent: 'flex-end', margin: 0 }}>
      <View className="bg-white px-5 pt-5 pb-10 rounded-t-xl max-h-[60%]">
        <Text className="text-lg font-bold text-center mb-4">{modalTitle}</Text>

        {loading ? (
          <Text className="text-center text-gray-500">Loading...</Text>
        ) : (
          <FlatList
            data={userList}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View className="flex-row items-center py-3 border-b border-gray-100">
                <Image source={{ uri: item.image }} className="w-10 h-10 rounded-full mr-3" />
                <Text className="text-base">{item.username}</Text>
              </View>
            )}
          />
        )}

        <TouchableOpacity onPress={onClose} className="mt-4 items-center">
          <Text className="text-red-500 font-semibold text-base">Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ListModal;
