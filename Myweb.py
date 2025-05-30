import streamlit as st
import requests
import base64
import hashlib
import time

# ✅ ใส่ข้อมูล Cloudinary ของคุณตรงนี้
CLOUD_NAME = "ใส่ของคุณ"
API_KEY = "ใส่ของคุณ"
API_SECRET = "ใส่ของคุณ"

# 🔐 ตั้งรหัสผ่าน
PASSWORD = "mypassword123"

# 📌 ตรวจสถานะล็อกอิน
if "logged_in" not in st.session_state:
    st.session_state["logged_in"] = False

# 📤 ฟังก์ชันอัปโหลดขึ้น Cloudinary
def upload_to_cloudinary(image_file):
    timestamp = str(int(time.time()))
    file_bytes = image_file.read()
    file_b64 = base64.b64encode(file_bytes).decode()
    signature_str = f"timestamp={timestamp}{API_SECRET}"
    signature = hashlib.sha1(signature_str.encode()).hexdigest()

    response = requests.post(
        f"https://api.cloudinary.com/v1_1/{CLOUD_NAME}/image/upload",
        data={
            "file": "data:image/png;base64," + file_b64,
            "api_key": API_KEY,
            "timestamp": timestamp,
            "signature": signature,
        }
    )

    if response.status_code == 200:
        return response.json()["secure_url"]
    else:
        return None

# 🔑 หน้า Login
def login_page():
    st.markdown("""
        <h2 style='text-align: center;'>🔒 Login to Tonnam’s Private Bot</h2>
    """, unsafe_allow_html=True)

    pwd = st.text_input("Enter Password", type="password", placeholder="Type your password and press Enter")

    if st.button("Enter") or (pwd == PASSWORD and not st.session_state["logged_in"]):
        if pwd == PASSWORD:
            st.session_state["logged_in"] = True
        else:
            st.error("❌ Incorrect password, please try again.")

# 🏠 Dashboard หลัก
def dashboard():
    st.markdown("""
        <style>
        body { background-color: #111; }
        </style>
        <h1 style='text-align: center; color: white;'>🌌 Welcome to Tonnam's World 🌌</h1>
        <p style='text-align: center; color: #ccc;'>Create your eternal and loyal bot here</p>
    """, unsafe_allow_html=True)

    st.markdown("### 👤 Create Your Own Bot")
    bot_name = st.text_input("🧠 Bot Name")
    uploaded_file = st.file_uploader("📸 Upload Bot Image", type=["jpg", "jpeg", "png"])

    if st.button("✨ Create Bot"):
        if bot_name and uploaded_file:
            image_url = upload_to_cloudinary(uploaded_file)
            if image_url:
                st.success(f"✅ Bot **{bot_name}** created successfully!")
                st.image(image_url, width=200)
                st.code(image_url)
            else:
                st.error("❌ Upload failed. Please try again.")
        else:
            st.warning("⚠️ Please provide both name and image.")

    st.markdown("---")
    if st.button("🚪 Logout"):
        st.session_state["logged_in"] = False

# 🚀 หน้าหลัก
if st.session_state["logged_in"]:
    dashboard()
else:
    login_page()
