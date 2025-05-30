import streamlit as st

# 🔐 ตั้งรหัสผ่าน
PASSWORD = "mypassword123"

# 📌 ตรวจสถานะล็อกอิน
if "logged_in" not in st.session_state:
    st.session_state["logged_in"] = False

# 🔑 หน้าล็อกอิน
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

# 🏠 หน้าหลักหลังล็อกอิน
def dashboard():
    st.markdown("""
        <style>
        body { background-color: #111; }
        </style>
        <h1 style='text-align: center; color: white;'>🌌 Welcome to Tonnam's World 🌌</h1>
        <p style='text-align: center; color: #ccc;'>Your personal universe begins here</p>
    """, unsafe_allow_html=True)

    st.image("https://i.imgur.com/5QfZ6Ey.png", width=200)

    st.markdown("### 👤 Create Your Own Bot")
    st.markdown("Customize your bot with a name and image:")

    name = st.text_input("🧠 Bot Name")
    img = st.text_input("🖼️ Bot Image URL")

    if st.button("✨ Create Bot"):
        if name and img:
            st.success(f"✅ Bot **{name}** created successfully!")
            st.image(img, width=120)
        else:
            st.warning("⚠️ Please enter both a name and an image URL.")

    st.markdown("---")
    if st.button("🚪 Logout"):
        st.session_state["logged_in"] = False

# 🚀 เลือกแสดงหน้า
if st.session_state["logged_in"]:
    dashboard()
else:
    login_page()
