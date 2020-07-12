import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, ActivityIndicator } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Axios from "axios";
import Item from "../../components/Item";
export default function Home({ navigation }) {
  const [pageCount, setPageCount] = useState(0);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const fetchURL =
      "https://hn.algolia.com/api/v1/search_by_date?tags=story&page=0";
    Axios.get(fetchURL).then((resp) => {
      setPosts(resp.data.hits);
    });

    const interval = setInterval(() => {
      setPageCount((pageCount) => pageCount + 1);
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    console.log(pageCount);
    if (pageCount > 0) {
      Axios.get(
        `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${pageCount}`
      ).then((resp) => {
        const newStories = resp.data.hits.filter(
          (hit) =>
            posts.findIndex((post) => post.objectID === hit.objectID) === -1
        );

        setPosts([...posts, ...newStories]);
      });
    }
  }, [pageCount]);

  const getUpdatedData = () => {
    setPageCount(pageCount + 1);
  };

  if (!posts)
    return (
      <ActivityIndicator
        color="#0000ff"
        size="large"
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      />
    );

  return (
    <SafeAreaView>
      <FlatList
        data={posts}
        renderItem={({ item, index, separators }) => (
          <Item
            title={item.title}
            URL={item.url}
            created_at={item.created_at}
            author={item.author}
            navigation={navigation}
            data={item}
            removeClippedSubviews={false}
          />
        )}
        keyExtractor={(item) => item.objectID}
        onEndReached={getUpdatedData}
      />
    </SafeAreaView>
  );
}
