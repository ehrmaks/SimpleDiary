import React, { useState } from "react";
import Container from "../components/Container";
import Contents from "../components/Contents";
import Button from "../components/Button";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Label = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 12px;
`;

const Input = styled.TextInput`
  width: 100%;
  border: 1px solid #666666;
  padding: 4px;
  font-size: 20px;
  margin-bottom: 12px;
`;

const initialContentState = {
  date: "",
  text: "",
};

export default function Form({ navigation }) {
  const [content, setContent] = useState(initialContentState);

  function handleChangeContent(value, { name }) {
    setContent({
      ...content,
      [name]: value,
    });
  }

  async function saveDiary() {
    if (validationCheck()) {
      try {
        const diaryList = await AsyncStorage.getItem("diaryList");
        let saveList = [];

        if (JSON.parse(diaryList).length > 0) {
          const list = JSON.parse(diaryList);
          const { id } = list[list.length - 1];

          saveList = [...list, { ...content, id: id + 1 }];
        } else {
          saveList = [{ ...content, id: 1 }];
        }

        try {
          await AsyncStorage.setItem("diaryList", JSON.stringify(saveList));
          alert("저장이 완료 되었습니다.");
          navigation.navigate("List");
        } catch (err) {
          alert(2, err);
        }
      } catch (err) {
        alert(err.message);
      }
    }
  }

  function validationCheck() {
    if (!content.date) {
      alert("날짜를 입력해 주세요.");
      return false;
    }

    if (!content.text) {
      alert("내용을 입력해 주세요.");
      return false;
    }
    return true;
  }

  return (
    <Container>
      <Contents>
        <Label>날짜</Label>
        <Input
          value={content.date}
          placeholder={"YYYY-MM-DD 형식으로 입력하세요."}
          onChangeText={(value) => handleChangeContent(value, { name: "date" })}
        />
        <Label>내용</Label>
        <Input
          value={content.text}
          multiline={true}
          style={{ height: 200 }}
          onChangeText={(value) => handleChangeContent(value, { name: "text" })}
        />
      </Contents>
      <Button onPress={() => saveDiary()}>저장</Button>
    </Container>
  );
}
