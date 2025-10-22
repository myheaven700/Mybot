import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import MessageBubble from './MessageBubble';
import CharacterModal from './CharacterModal';
import { loadCharacterData, saveCharacterData, loadConversation, saveConversation } from '../utils/storage';

const ChatInterface = () => {
  const [character, setCharacter] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isCharacterModalOpen, setIsCharacterModalOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Load data on component mount
  useEffect(() => {
    const loadedCharacter = loadCharacterData();
    const loadedMessages = loadConversation();
    
    if (loadedCharacter) {
      setCharacter(loadedCharacter);
      
      // If no messages exist, add the greeting message
      if (loadedMessages.length === 0 && loadedCharacter.greeting) {
        const greetingMessage = {
          id: Date.now(),
          text: loadedCharacter.greeting,
          isUser: false,
          timestamp: new Date().toISOString()
        };
        setMessages([greetingMessage]);
        saveConversation([greetingMessage]);
      } else {
        setMessages(loadedMessages);
      }
    } else {
      // No character exists, show creation modal
      setIsCharacterModalOpen(true);
    }
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCharacterSave = (characterData) => {
    setCharacter(characterData);
    saveCharacterData(characterData);
    setIsCharacterModalOpen(false);
    
    // Add greeting message if this is a new character and no messages exist
    if (messages.length === 0 && characterData.greeting) {
      const greetingMessage = {
        id: Date.now(),
        text: characterData.greeting,
        isUser: false,
        timestamp: new Date().toISOString()
      };
      setMessages([greetingMessage]);
      saveConversation([greetingMessage]);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: inputMessage.trim(),
      isUser: true,
      timestamp: new Date().toISOString()
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot response (replace with actual AI integration)
    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage, character);
      const botMessage = {
        id: Date.now() + 1,
        text: botResponse,
        isUser: false,
        timestamp: new Date().toISOString()
      };

      const finalMessages = [...updatedMessages, botMessage];
      setMessages(finalMessages);
      saveConversation(finalMessages);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
  };

  // Simple bot response generator (replace with AI API)
  const generateBotResponse = (userInput, characterData) => {
    const responses = [
      `ขอบคุณที่พูดคุยกับฉันนะ! จากที่คุณพูดมา "${userInput}" ฉันคิดว่าน่าสนใจมาก`,
      `เข้าใจแล้ว คุณหมายถึง "${userInput}" ใช่ไหม? ฉันยินดีช่วยเหลือคุณเสมอ`,
      `น่าสนใจจัง! เรื่องที่คุณพูดถึง "${userInput}" ทำให้ฉันอยากรู้มากขึ้น`,
      `ขอบคุณที่แบ่งปันเรื่อง "${userInput}" กับฉัน ฉันรู้สึกดีใจที่ได้พูดคุยกับคุณ`,
      `ฉันเข้าใจความรู้สึกของคุณเกี่ยวกับ "${userInput}" ฉันพร้อมฟังคุณเสมอ`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleNewConversation = () => {
    if (character && character.greeting) {
      const greetingMessage = {
        id: Date.now(),
        text: character.greeting,
        isUser: false,
        timestamp: new Date().toISOString()
      };
      setMessages([greetingMessage]);
      saveConversation([greetingMessage]);
    } else {
      setMessages([]);
      saveConversation([]);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          {character && (
            <>
              <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                {character.image ? (
                  <img src={character.image} alt={character.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                    <span className="text-gray-600 text-sm font-medium">บอท</span>
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">{character.name}</h1>
                <p className="text-sm text-gray-500 max-w-md truncate">{character.personality}</p>
              </div>
            </>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={handleNewConversation}
            className="btn-luxury-outline text-sm"
            title="เริ่มการสนทนาใหม่"
          >
            สนทนาใหม่
          </button>
          <button
            onClick={() => setIsCharacterModalOpen(true)}
            className="btn-luxury-outline text-sm"
            title="แก้ไขบอท"
          >
            แก้ไขบอท
          </button>
        </div>
      </motion.header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="max-w-4xl mx-auto space-y-1">
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-gray-400 text-lg mb-4">
                {character ? 'เริ่มการสนทนากับ ' + character.name : 'ยังไม่มีบอท'}
              </div>
              {!character && (
                <button
                  onClick={() => setIsCharacterModalOpen(true)}
                  className="btn-luxury"
                >
                  สร้างบอทใหม่
                </button>
              )}
            </motion.div>
          ) : (
            messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message.text}
                isUser={message.isUser}
                avatar={message.isUser ? null : character?.image}
                timestamp={message.timestamp}
              />
            ))
          )}
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start mb-6"
            >
              <div className="flex items-end gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                  {character?.image ? (
                    <img src={character.image} alt={character.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                      <span className="text-gray-600 text-sm font-medium">บอท</span>
                    </div>
                  )}
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-lg px-6 py-4">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      {character && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border-t border-gray-200 px-6 py-4"
        >
          <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto">
            <div className="flex gap-3 items-end">
              <div className="flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="พิมพ์ข้อความของคุณ..."
                  className="input-luxury"
                  disabled={isTyping}
                />
              </div>
              <button
                type="submit"
                disabled={!inputMessage.trim() || isTyping}
                className="btn-luxury px-8 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ส่ง
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Character Modal */}
      <CharacterModal
        isOpen={isCharacterModalOpen}
        onClose={() => setIsCharacterModalOpen(false)}
        onSave={handleCharacterSave}
        initialData={character}
      />
    </div>
  );
};

export default ChatInterface;