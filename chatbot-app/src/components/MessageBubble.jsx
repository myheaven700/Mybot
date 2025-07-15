import { motion } from 'framer-motion';

const MessageBubble = ({ message, isUser, avatar, timestamp }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6`}
    >
      <div className={`flex max-w-4xl ${isUser ? 'flex-row-reverse' : 'flex-row'} items-end gap-3`}>
        {/* Avatar */}
        <div className="flex-shrink-0">
          {isUser ? (
            <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">คุณ</span>
            </div>
          ) : (
            <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
              {avatar ? (
                <img src={avatar} alt="บอท" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-600 text-sm font-medium">บอท</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Message content */}
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
          <div
            className={`
              px-6 py-4 rounded-2xl luxury-transition max-w-xl
              ${isUser
                ? 'bg-gray-900 text-white rounded-br-lg'
                : 'bg-white border border-gray-200 text-gray-900 rounded-bl-lg'
              }
            `}
          >
            <p className="text-base leading-relaxed whitespace-pre-wrap break-words">
              {message}
            </p>
          </div>
          
          {/* Timestamp */}
          {timestamp && (
            <span className="text-xs text-gray-400 mt-2 px-2">
              {new Date(timestamp).toLocaleTimeString('th-TH', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;