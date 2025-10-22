import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { convertImageToBase64 } from '../utils/storage';

const CharacterModal = ({ isOpen, onClose, onSave, initialData = {} }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    personality: initialData.personality || '',
    greeting: initialData.greeting || '',
    image: initialData.image || null
  });
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('ขนาดไฟล์รูปภาพต้องไม่เกิน 5MB');
        return;
      }

      try {
        setIsLoading(true);
        const base64Image = await convertImageToBase64(file);
        handleInputChange('image', base64Image);
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert('กรุณาใส่ชื่อของบอท');
      return;
    }
    
    if (!formData.personality.trim()) {
      alert('กรุณาอธิบายบุคลิกของบอท');
      return;
    }
    
    if (!formData.greeting.trim()) {
      alert('กรุณาใส่ข้อความทักทายเริ่มต้น');
      return;
    }

    onSave({
      ...formData,
      updatedAt: new Date().toISOString()
    });
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: { duration: 0.2, ease: "easeIn" }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="w-full max-w-md bg-white rounded-xl shadow-2xl border border-gray-200 max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              {initialData.name ? 'แก้ไขบอท' : 'สร้างบอทใหม่'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 luxury-transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Image Upload */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                รูปประจำตัวบอท
              </label>
              <div className="flex flex-col items-center space-y-4">
                <div className="w-24 h-24 bg-gray-100 rounded-full overflow-hidden border-2 border-gray-200">
                  {formData.image ? (
                    <img 
                      src={formData.image} 
                      alt="บอท" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isLoading}
                  className="btn-luxury-outline text-sm"
                >
                  {isLoading ? 'กำลังอัปโหลด...' : 'เลือกรูปภาพ'}
                </button>
              </div>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                ชื่อบอท
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="ใส่ชื่อที่คุณต้องการเรียกบอท"
                className="input-luxury"
                maxLength={50}
              />
            </div>

            {/* Personality */}
            <div className="space-y-2">
              <label htmlFor="personality" className="block text-sm font-medium text-gray-700">
                บุคลิกภาพ
              </label>
              <textarea
                id="personality"
                value={formData.personality}
                onChange={(e) => handleInputChange('personality', e.target.value)}
                placeholder="อธิบายบุคลิกภาพของบอท เช่น ใจดี เป็นมิตร ชอบพูดคุย หรือลักษณะพิเศษอื่นๆ"
                className="input-luxury resize-none"
                rows={4}
                maxLength={500}
              />
              <div className="text-xs text-gray-400 text-right">
                {formData.personality.length}/500
              </div>
            </div>

            {/* Greeting Message */}
            <div className="space-y-2">
              <label htmlFor="greeting" className="block text-sm font-medium text-gray-700">
                ข้อความทักทายเริ่มต้น
              </label>
              <textarea
                id="greeting"
                value={formData.greeting}
                onChange={(e) => handleInputChange('greeting', e.target.value)}
                placeholder="ข้อความที่บอทจะพูดทุกครั้งเมื่อเริ่มการสนทนาใหม่"
                className="input-luxury resize-none"
                rows={3}
                maxLength={300}
              />
              <div className="text-xs text-gray-400 text-right">
                {formData.greeting.length}/300
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="btn-luxury-outline flex-1"
              >
                ยกเลิก
              </button>
              <button
                type="submit"
                className="btn-luxury flex-1"
              >
                บันทึก
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CharacterModal;