import { useEffect, useState } from "react"
import { FlatList } from "react-native"

// import posts from "~/assets/data/posts.json"
import PostListItem from "~/src/components/PostListItem"


export default function FeedScreen() {
   const [posts, setPosts] = useState([]);

   useEffect(() => {
        fetchPosts();
   }, [])

   const fetchPosts = async () => {
        let data = /* data to be fetched */
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