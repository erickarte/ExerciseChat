import React, { useState, useEffect } from "react";
import { View, ScrollView } from "react-native";
import { TextInput, Button, List, Card } from "react-native-paper";
import { askGemini } from "../services/gemini";
import { questions } from "../utils/chatFlow";
import { saveChat, loadChat } from "../utils/storage";
import { fetchExercises } from '../services/exerciseDb';

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState({});
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const loadHistory = async () => {
      const savedMessages = await loadChat("user123");
      if (savedMessages.length > 0) {
        setMessages(savedMessages);
      }
    };
    loadHistory();
  }, []);

  const handleSend = async () => {
    if (!userInput.trim()) return;

    const currentQ = questions[currentStep];
    if (!currentQ.validate(userInput)) {
      const errorMessage = {
        id: Date.now().toString(),
        text: "Resposta inválida. " + currentQ.text,
        fromUser: false,
      };
      setMessages([...messages, errorMessage]);
      return;
    }

    // Atualiza dados do usuário
    const updatedData = { ...userData, [currentQ.id]: userInput };
    setUserData(updatedData);

    // Cria novas mensagens com IDs únicos
    const userMessage = {
      id: Date.now().toString(),
      text: userInput,
      fromUser: true,
    };

    const botConfirmation = {
      id: (Date.now() + 1).toString(),
      text: "✔️ Resposta salva. Próxima pergunta...",
      fromUser: false,
    };

    const newMessages = [...messages, userMessage, botConfirmation];
    setMessages(newMessages);
    setUserInput("");

    // Avança para a próxima pergunta ou finaliza
    if (currentStep < questions.length - 1) {
      const nextQuestion = {
        id: (Date.now() + 2).toString(),
        text: questions[currentStep + 1].text,
        fromUser: false,
      };

      setCurrentStep(currentStep + 1);
      setMessages([...newMessages, nextQuestion]);
    } else {
      const finalPrompt = `Crie um treino para: ${JSON.stringify(updatedData)}`;
      const geminiResponse = await askGemini(finalPrompt);

      const finalMessage = {
        id: (Date.now() + 3).toString(),
        text: geminiResponse,
        fromUser: false,
      };

      setMessages([...newMessages, finalMessage]);
    }

    await saveChat("user123", newMessages);
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <ScrollView>
        {messages.map((msg) => (
          <Card key={msg.id} style={{ marginBottom: 8 }}>
            <List.Item
              title={msg.text}
              left={() => <UserIcon isUser={msg.fromUser} />}
            />
          </Card>
        ))}
      </ScrollView>
      <TextInput
        value={userInput}
        onChangeText={setUserInput}
        placeholder="Digite sua resposta"
      />
      <Button mode="contained" onPress={handleSend}>
        Enviar
      </Button>
    </View>
  );
}
