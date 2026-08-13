import React from "react";
import { View, Text } from "react-native";
import { FlashList } from "@shopify/flash-list";

const DATA = [
  {
    title: "First Item",
  },
  {
    title: "Second Item",
  },
  {
    title: "3 Item",
  },
  {
    title: "4 Item",
  },
  {
    title: "5 Item",
  },
  {
    title: "6 Item",
  },
  {
    title: "7 Item",
  },
  {
    title: "8 Item",
  },
  {
    title: "9 Item",
  },
  {
    title: "10 Item",
  },
];

export default MyList = () => {
    console.log("chy MyList render");
  return (
        <FlashList
            data={DATA}
            renderItem={({ item }) => <Text>{item.title}</Text>}
            style={{ top: 100 }}
        />
  );
};
