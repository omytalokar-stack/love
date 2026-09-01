# 🚀 MongoDB Real-Time Database Setup Guide

## Overview
यह project अब **MongoDB** के साथ real-time database support करता है। सभी admission form data directly MongoDB Atlas में save होता है।

---

## ✅ Setup Steps

### 1. **MongoDB Atlas Account** 
आपके पास पहले से ही MongoDB Atlas account है:
- **Username:** `yaps9143_db_user`
- **Password:** `FYNgp1oAhtbuvRa9`
- **Database:** `princess_beauty_portal`
- **Cluster:** `cluster0.wgqtlzv.mongodb.net`

### 2. **Environment Variables** ✨
`.env` file पहले से ही add है आपके project में:

```
MONGODB_USERNAME="yaps9143_db_user"
MONGODB_PASSWORD="FYNgp1oAhtbuvRa9"
MONGODB_URI="mongodb+srv://yaps9143_db_user:FYNgp1oAhtbuvRa9@cluster0.wgqtlzv.mongodb.net"
PORT=5000
NODE_ENV="development"
```

### 3. **Frontend Environment**
`.env.local` file:
```
VITE_API_URL=http://localhost:5000/api
```

---

## 🎯 Running the Application

### **Option 1: Frontend + Backend Together** (Recommended)
```bash
npm run dev:all
```
यह command एक साथ:
- ✅ Frontend server (Port 3000) start करेगा
- ✅ Backend server (Port 5000) start करेगा

### **Option 2: Individually**

**Backend Server चलाएं:**
```bash
npm run dev:server
```
Backend: `http://localhost:5000`

**Frontend Server (दूसरे terminal में):**
```bash
npm run dev
```
Frontend: `http://localhost:3000`

---

## 📊 API Endpoints

Backend API के सभी endpoints:

### **Candidates Management**

| Method | Endpoint | Purpose |
|--------|----------|---------|
| `GET` | `/api/candidates` | सभी applications fetch करें |
| `GET` | `/api/candidates/:id` | एक candidate की details |
| `POST` | `/api/candidates` | नया application save करें |
| `PUT` | `/api/candidates/:id` | Application update करें |
| `DELETE` | `/api/candidates/:id` | Application delete करें |
| `GET` | `/api/stats/dashboard` | Dashboard statistics |
| `GET` | `/api/health` | Server health check |

### **Example API Calls**

**सभी applications fetch करें:**
```bash
curl http://localhost:5000/api/candidates
```

**New application save करें:**
```bash
curl -X POST http://localhost:5000/api/candidates \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Pooja",
    "lastName": "Sharma",
    "mobileNumber": "9876543210",
    "courseId": "saundarya-shastra-certificate",
    ...
  }'
```

**Status update करें:**
```bash
curl -X PUT http://localhost:5000/api/candidates/cand-123 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "Approved",
    "feePaidStatus": "Full Paid"
  }'
```

---

## 🔄 How Data Flows

```
┌──────────────┐
│  User Form   │
└──────┬───────┘
       │ (Submit)
       ▼
┌──────────────────────────┐
│  Frontend (React)        │
│  /src/utils/storage.ts   │
└──────┬───────────────────┘
       │ (Async API Call)
       ▼
┌──────────────────────────┐
│  Backend Server          │
│  /server/index.ts        │
│  Port 5000               │
└──────┬───────────────────┘
       │ (MongoDB Query)
       ▼
┌──────────────────────────┐
│  MongoDB Atlas           │
│  Database: princess_     │
│  beauty_portal           │
│  Collection:             │
│  candidateregistrations  │
└──────────────────────────┘
```

---

## 🔐 Data Storage

### **Fallback Logic:**
अगर MongoDB server down हो तो:
1. ✅ Frontend automatically localStorage का use करेगा
2. ✅ Data local browser storage में save होगा
3. ✅ जैसे ही server वापस आएगा, data sync हो जाएगा

---

## 📱 Admin Panel Login

Admin देखने के लिए:
1. **Lock Icon 🔒** पर click करें (header में)
2. **ID:** `om`
3. **Password:** `pange`
4. सभी submitted applications देख सकते हो

---

## 🛠️ Project Structure

```
princess-beauty-parlour-admission-portal/
│
├── server/
│   ├── index.ts           # Express Server
│   ├── db.ts              # MongoDB Connection
│   ├── models/
│   │   └── Candidate.ts   # MongoDB Schema
│   └── routes/
│       └── candidates.ts  # API Routes
│
├── src/
│   ├── utils/
│   │   └── storage.ts     # Storage Logic (API + localStorage)
│   ├── components/
│   ├── App.tsx
│   └── main.tsx
│
├── .env                   # MongoDB Credentials
├── .env.local             # Frontend API URL
├── .env.example           # Template
└── package.json           # Scripts & Dependencies
```

---

## 📦 Dependencies Added

```json
{
  "mongoose": "^7.x",      // MongoDB ODM
  "cors": "^2.8.x",        // Cross-Origin Support
  "uuid": "^9.x",          // Unique ID Generation
  "concurrently": "^8.x"   // Run multiple servers
}
```

---

## ✨ Features

✅ **Real-time Data Sync** - MongoDB के साथ direct integration
✅ **Automatic Fallback** - localStorage fallback if API down
✅ **Advanced Search** - Name, Phone, Registration number से search
✅ **Filters** - By status, course, date
✅ **Dashboard Stats** - Total, Approved, Verified, Pending, Rejected
✅ **Admin Portal** - सभी applications manage करें
✅ **Secure Login** - Admin portal के लिए ID/Password auth

---

## 🚀 Performance Tips

1. **Production के लिए:** Environment को `production` set करें
2. **Caching:** Redis add कर सकते हो (optional)
3. **Database Indexing:** Indexes पहले से ही MongoDB में add हैं
4. **API Response Optimization:** Data limit 1000 तक है

---

## 📞 Troubleshooting

### Backend नहीं खुल रहा?
```bash
# Check if port 5000 is in use
netstat -ano | findstr :5000

# Kill process
taskkill /PID <PID> /F
```

### MongoDB Connection Error?
```
❌ Error: Failed to authenticate
✅ Solution: Check MONGODB_URI, username, password in .env
```

### Frontend से API नहीं connect हो रहा?
```
Check: .env.local में VITE_API_URL सही है?
Check: Backend server running है?
Check: CORS enabled है? (पहले से है)
```

---

## 🎓 Next Steps

1. ✅ Backend + Frontend दोनों start करें
2. ✅ Admin panel test करें (Lock icon से)
3. ✅ Form submit करें और MongoDB में data देखें
4. ✅ Dashboard stats check करें
5. ✅ Production deployment के लिए तैयारी करें

---

**Happy Coding! 🎉**
