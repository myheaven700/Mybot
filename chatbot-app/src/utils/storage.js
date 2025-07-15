// localStorage utilities for chatbot persistence

const STORAGE_KEYS = {
  CHARACTER: 'chatbot_character',
  CONVERSATIONS: 'chatbot_conversations',
  SETTINGS: 'chatbot_settings'
};

// Character data operations
export const saveCharacterData = (characterData) => {
  try {
    localStorage.setItem(STORAGE_KEYS.CHARACTER, JSON.stringify(characterData));
    return true;
  } catch (error) {
    console.error('Error saving character data:', error);
    return false;
  }
};

export const loadCharacterData = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CHARACTER);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading character data:', error);
    return null;
  }
};

// Conversation operations
export const saveConversation = (messages) => {
  try {
    localStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(messages));
    return true;
  } catch (error) {
    console.error('Error saving conversation:', error);
    return false;
  }
};

export const loadConversation = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CONVERSATIONS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading conversation:', error);
    return [];
  }
};

// Clear all data
export const clearAllData = () => {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    return true;
  } catch (error) {
    console.error('Error clearing data:', error);
    return false;
  }
};

// Image handling utilities
export const convertImageToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// Default character template
export const getDefaultCharacter = () => ({
  name: '',
  personality: '',
  greeting: '',
  image: null,
  createdAt: new Date().toISOString()
});