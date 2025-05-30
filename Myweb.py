import streamlit as st

PASSWORD = "mypassword123"

if "logged_in" not in st.session_state:
    st.session_state["logged_in"] = False

def login_page():
    st.title("🔒 Login to Tonnam’s Private Bot")

    pwd = st.text_input("Enter Password", type="password")

    if st.button("Enter"):
        if pwd == PASSWORD:
            st.session_state["logged_in"] = True
        else:
            st.error("❌ Incorrect password, please try again.")

def dashboard():
    st.title("🌌 Welcome, Tonnam!")
    st.image("https://i.imgur.com/5QfZ6Ey.png", width=150)
    st.markdown("This is your private space. Create your own bot below.")

    if st.button("Create New Bot"):
        st.success("Coming soon: Bot creation!")

    if st.button("Logout"):
        st.session_state["logged_in"] = False

# ✅ แสดงหน้าที่เหมาะสม
if st.session_state["logged_in"]:
    dashboard()
else:
    login_page()
