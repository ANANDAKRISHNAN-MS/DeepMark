import { useEffect, useState } from "react"
import { FlatList } from "react-native"

import PostListItem from "~/src/components/PostListItem"
import { useAuth } from "~/src/providers/AuthProvider";

export default function FeedScreen() {
   const [posts, setPosts] = useState([]);
   const {token, username} = useAuth()

   useEffect(() => {
        fetchPosts();
   }, [])

   const fetchPosts = async () => {
        let data = /* TODO fetch user profile */
        setPosts([])
   }

   return(
    <FlatList
        data={posts}
        renderItem={({ item }) => <PostListItem post={ item }/>}
        contentContainerStyle={{gap: 10, maxWidth: 512, alignSelf: 'center' ,width: '100%'}}
        showsVerticalScrollIndicator={false}
    />
   )
}