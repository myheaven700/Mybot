# แชทบอทส่วนตัว

แอปพลิเคชันแชทบอทส่วนตัวที่สามารถปรับแต่งบุคลิกภาพและความทรงจำได้ สร้างด้วย React และ Tailwind CSS

## คุณสมบัติหลัก

### 🎨 การออกแบบที่สวยงาม
- ดีไซน์มินิมอลสีเทาโมโนโครม
- ฟอนต์ภาษาไทย Noto Sans Thai
- เอฟเฟกต์การเคลื่อนไหวที่นุ่มนวล
- เลย์เอาต์เต็มหน้าจอแบบหรูหรา

### 🤖 การสร้างบอท
- อัปโหลดรูปประจำตัวบอท
- ตั้งชื่อบอท
- กำหนดบุคลิกภาพและพฤติกรรม
- เขียนข้อความทักทายเริ่มต้น

### 💾 ความทรงจำแบบถาวร
- บันทึกข้อมูลบอทใน localStorage
- จดจำบุคลิกภาพตลอดไป
- เก็บประวัติการสนทนา
- ไม่มีการรีเซ็ตข้อมูล

### 💬 ระบบแชท
- ส่งข้อความแบบเรียลไทม์
- แสดงสถานะกำลังพิมพ์
- รองรับข้อความยาว
- เลื่อนอัตโนมัติไปยังข้อความล่าสุด

## การติดตั้งและใช้งาน

### ข้อกำหนดเบื้องต้น
```bash
Node.js 18+ และ npm
```

### ติดตั้ง Dependencies
```bash
npm install
```

### เริ่มต้นการพัฒนา
```bash
npm run dev
```

### สร้าง Build สำหรับ Production
```bash
npm run build
```

## เทคโนโลยีที่ใช้

- **React 18** - ไลบรารี UI
- **Vite** - Build tool รวดเร็ว
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **localStorage** - จัดเก็บข้อมูลในเครื่อง

## การใช้งาน

1. **สร้างบอทใหม่**: เมื่อเปิดแอปครั้งแรก จะมีหน้าต่างให้สร้างบอท
2. **อัปโหลดรูป**: เลือกรูปประจำตัวบอทจากอุปกรณ์ของคุณ
3. **ตั้งค่าบุคลิก**: เขียนบรรยายบุคลิกภาพที่ต้องการ
4. **ข้อความทักทาย**: เขียนข้อความที่บอทจะพูดเมื่อเริ่มสนทนา
5. **เริ่มแชท**: พิมพ์ข้อความเพื่อเริ่มการสนทนา

## การเชื่อมต่อ AI

ปัจจุบันแอปใช้ระบบตอบกลับแบบง่าย ๆ แต่สามารถเชื่อมต่อกับ:
- OpenAI API
- Google Gemini API
- Anthropic Claude API
- AI Service อื่น ๆ

### ตัวอย่างการเชื่อมต่อ OpenAI API

```javascript
// ใน ChatInterface.jsx
const generateBotResponse = async (userInput, characterData) => {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `คุณคือ ${characterData.name} ${characterData.personality}`
        },
        {
          role: 'user',
          content: userInput
        }
      ],
    }),
  });
  
  const data = await response.json();
  return data.choices[0].message.content;
};
```

## โครงสร้างไฟล์

```
chatbot-app/
├── src/
│   ├── components/
│   │   ├── ChatInterface.jsx     # หน้าแชทหลัก
│   │   ├── CharacterModal.jsx    # หน้าต่างสร้าง/แก้ไขบอท
│   │   └── MessageBubble.jsx     # แสดงข้อความแต่ละบับเบิล
│   ├── utils/
│   │   └── storage.js            # จัดการ localStorage
│   ├── App.jsx                   # คอมโพเนนต์หลัก
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Tailwind CSS และสไตล์เพิ่มเติม
├── public/
├── package.json
└── README.md
```

## ลิขสิทธิ์

โครงการนี้ใช้สำหรับการศึกษาและใช้งานส่วนตัว
