import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import Container from "../components/Container";
import Contents from "../components/Contents";
import Button from "../components/Button";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import _ from "lodash";

const ListItem = styled.TouchableOpacity`
  width: 100%;
  padding: 12px 0;
  border-bottom-color: #aaaaaa;
  border-bottom-width: 1px;
`;

const Label = styled.Text`
  font-size: 20px;
`;

// 구조 분해 할당, Destructuring Assignment
export default function List({ navigation }) {
  const [diaryList, setDiaryList] = useState([]);

  useEffect(() => {
    getDiaryList();
  }, [navigation]);

  function getDiaryList() {
    const unsubscribe = navigation.addListener("focus", async () => {
      loadData();
    });

    loadData();

    return unsubscribe;
  }

  async function loadData() {
    try {
      const data = await AsyncStorage.getItem("diaryList");
      if (JSON.parse(data)) {
        setDiaryList(JSON.parse(data));
      }
    } catch (err) {
      alert(err.message);
    }
  }

  async function handlePressDeleteDiary(item) {
    try {
      const data = await AsyncStorage.getItem("diaryList");
      if (JSON.parse(data)) {
        const filterData = JSON.parse(data).filter((d) => d.id !== item.id);
        await AsyncStorage.setItem("diaryList", JSON.stringify(filterData));

        alert(`${item.date} 일기가 삭제 되었습니다.`);

        getDiaryList();
      }
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <Container>
      <Contents>
        {diaryList.length > 0 ? (
          _.sortBy(diaryList, "date").map((d) => (
            <ListItem
              key={d.id}
              onPress={() => navigation.navigate("Detail", { id: d.id })}
            >
              <Label>{d.date}</Label>
              <Button onPress={() => handlePressDeleteDiary(d)}>삭제</Button>
            </ListItem>
          ))
        ) : (
          <ListItem>
            <Label>데이터가 없습니다.</Label>
          </ListItem>
        )}
      </Contents>
      <Button onPress={() => navigation.navigate("Form")}>새 일기 작성</Button>
    </Container>
  );
}
