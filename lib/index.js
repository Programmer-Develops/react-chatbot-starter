import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';

const Chatbot = ({ endpoint, botkey, botmodel }) => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sendUserInputToAI = async (userInput) => {
    try {
      setIsTyping(true);

      const response = await axios.post(
        endpoint,
        {
          model: botmodel,
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: userInput },
          ],
        },
        {
          headers: {
            'Authorization': `Bearer ${botkey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setIsTyping(false);

      return response.data.choices[0].message.content;
    } catch (error) {
      setIsTyping(false);
      console.error('Error calling the AI service:', error.response ? error.response.data : error.message);
      return 'AI service error';
    }
  };

  const handleUserInput = async () => {
    if (!userInput.trim()) return;

    const aiResponse = await sendUserInputToAI(userInput);

    setMessages([...messages, { type: 'user', text: userInput }, { type: 'ai', text: aiResponse }]);
    setUserInput('');
  };

  const renderMessage = ({ item }) => {
    return (
      <View style={item.type === 'user' ? styles.userMessageContainer : styles.aiMessageContainer}>
        {item.type === 'ai' ? (
          <View style={styles.aiMessageContainer}>
            <Text style={styles.aiMessage}>{item.text}</Text>
          </View>
        ) : (
          <View style={styles.userMessageContainer}>
            <Text style={styles.userMessage}>{item.text}</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
      {isTyping && (
        <View style={styles.typingIndicator}>
          <ActivityIndicator size="small" color="#FFFFFF" />
          <Text style={{ color: '#FFFFFF', marginLeft: 8 }}>Typing...</Text>
        </View>
      )}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={userInput}
          onChangeText={(text) => setUserInput(text)}
          placeholder="Type a message..."
          placeholderTextColor="#B0B0B0"
        />
        <TouchableOpacity
          onPress={handleUserInput}
          style={[styles.sendButton, { opacity: userInput.trim() ? 1 : 0.2 }]}
          disabled={!userInput.trim()}
        >
          <Text style={styles.sendButtonText}>➔</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#1E1E1E' },
  userMessageContainer: { flexDirection: 'row', justifyContent: 'flex-end' },
  aiMessageContainer: { flexDirection: 'row', justifyContent: 'flex-start' },
  userMessage: { backgroundColor: '#3A3A3A', padding: 8, borderRadius: 8, marginBottom: 8, color: '#FFFFFF' },
  aiMessage: { backgroundColor: '#2C2C2C', padding: 8, borderRadius: 8, marginBottom: 8, color: '#FFFFFF' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  input: { flex: 1, borderWidth: 1, borderColor: '#555555', borderRadius: 8, padding: 8, marginRight: 8, color: '#FFFFFF' },
  sendButton: { backgroundColor: 'white', borderRadius: 8, paddingVertical: 8, paddingHorizontal: 16 },
  sendButtonText: { color: 'black', fontWeight: 'bold' },
  typingIndicator: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
});

export default Chatbot;
