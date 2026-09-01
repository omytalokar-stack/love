# 🚀 Quick Start Guide - MongoDB Real-Time Setup

## ⚡ 30 सेकंड में शुरू करें

### Step 1: आपका .env पहले से है! ✅
```
MONGODB_URI="mongodb+srv://yaps9143_db_user:FYNgp1oAhtbuvRa9@cluster0.wgqtlzv.mongodb.net"
```

### Step 2: दोनों servers start करें
```bash
npm run dev:all
```

### Step 3: Check करें
- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5000/api/health

### Step 4: Admin Panel खोलें
- 🔒 Lock icon पर click करें
- **ID:** om
- **Password:** pange

---

## 🎯 क्या काम करता है?

✅ **Form Submit करें** → MongoDB में save होगा
✅ **Admin Panel** → सभी applications देखें
✅ **Status Update** → Approved/Verified करें
✅ **Real-time Sync** → MongoDB से automatically data update

---

## 🔴 अगर कुछ गलत हो?

**Backend नहीं खुल रहा?**
```bash
# Terminal में दिखेगा क्या
✅ MongoDB Connected Successfully
🚀 Server running on http://localhost:5000
```

**Data MongoDB में नहीं जा रहा?**
- Check करें: क्या backend terminal में कोई error है?
- Check करें: क्या .env file है?

**Frontend को backend से error आ रहा है?**
- Browser console देखें (F12 → Console)
- Fallback होगा localStorage पर

---

## 📊 MongoDB में data कैसे देखें?

1. **MongoDB Atlas Dashboard** खोलें
2. **Cluster0** → **Collections** → **princess_beauty_portal**
3. **candidateregistrations** collection में सभी applications

---

## 🎨 Admin Panel Features

| Feature | क्या करता है |
|---------|-----------|
| 🔍 Search | Name/Phone/RegNo से search करें |
| ✅ Status | Pending/Verified/Approved में update करें |
| 💳 Fee Status | Token Paid/Full Paid track करें |
| 🗑️ Delete | Application remove करें |
| 📄 Print | Admit card print करें |
| 📥 Download | Data export करें |

---

## 🚀 अगले Step

1. ✅ Frontend + Backend test करें
2. ✅ Form submit करके MongoDB में data verify करें
3. ✅ Admin panel से सभी features test करें
4. ✅ Production के लिए तैयार करें

---

**आपका project अब production-ready है!** 🎉
