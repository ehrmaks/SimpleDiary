import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import styled from "styled-components/native";
import Contents from "../components/Contents";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Text = styled.Text`
  font-size: 20px;
  line-height: 28px;
`;

const initialState = {
  id: 0,
  date: "",
  text: "",
};

export default function Detail({ navigation, route }) {
  const [content, setContent] = useState(initialState);

  useEffect(() => {
    getDiaryDetail();
  }, []);

  async function getDiaryDetail() {
    if (route.params.id) {
      try {
        const response = await AsyncStorage.getItem("diaryList");
        if (JSON.parse(response).length > 0) {
          const { id, date, text } = JSON.parse(response).filter(
            (d) => Number(d.id) === Number(route.params.id)
          )[0];
          navigation.setOptions({ title: date });
          setContent({ id, date, text });
        }
      } catch (err) {
        alert(err.message);
      }
    } else {
      alert("아이디가 존재하지 않습니다.");
      navigation.navigate("List");
    }
  }
  return (
    <Container>
      <Contents>
        <Text>{content.text}</Text>
      </Contents>
    </Container>
  );
}
