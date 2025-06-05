
# 📚 Chapter Performance Dashboard API

A backend system built using **Node.js**, **Express.js**, **MongoDB**, and **Redis**, developed as part of the Backend Developer Task for MathonGo.

---

## 🚀 Features Implemented

✅ RESTful API with:
- `GET /api/v1/chapters`: Fetch all chapters with filters and pagination
- `GET /api/v1/chapters/:id`: Fetch a specific chapter by ID
- `POST /api/v1/chapters`: Upload chapters (admin-only)

✅ **Filtering Support**:
- Filter by: `class`, `unit`, `subject`, `status`, `weakChapters`

✅ **Pagination Support**:
- Query params: `page`, `limit`

✅ **Admin File Upload**:
- Upload `.json` files (with schema validation)
- Partial upload supported: success + failed entries returned
- Requires admin authentication

✅ **Redis Caching**:
- Cache for `GET /chapters` for 1 hour
- Cache invalidation on new upload

✅ **Rate Limiting (via Redis)**:
- Max 30 requests per minute per IP

✅ **Deployment**:
- Hosted on AWS EC2
- GitHub Actions CI/CD integration

---

## 🌐 Deployment Link

🔗 http://13.48.192.164/

---

## 🧪 API Endpoints & Usage

### 1. **GET /api/v1/chapters**

Fetch all chapters with optional filters & pagination.

**Query Parameters:**

| Param          | Type    | Example        |
|----------------|---------|----------------|
| `class`        | String  | `10th`         |
| `unit`         | String  | `Unit 3`       |
| `subject`      | String  | `Science`      |
| `status`       | String  | `Completed`    |
| `weakChapters` | Boolean | `true` or `false` |
| `page`         | Number  | `1`            |
| `limit`        | Number  | `10`           |

---

### 2. **GET /api/v1/chapters/:id**

Fetch a chapter using its MongoDB `_id`.

**Example:**

```
GET /api/v1/chapters/665ee6dd15d27f9f1fa0280e
```

---

### 3. **POST /api/v1/chapters** (Admin Only)

Upload a `.json` file of chapter data.

- Requires admin authentication via `x-admin-secret` header.
- Partial uploads supported (returns list of failed ones).
- Redis cache automatically invalidated.

**Headers:**

```
x-admin-secret: yash123
```

**Body (form-data):**

| Key   | Type | Description         |
|-------|------|---------------------|
| file  | File | Upload `.json` file |

**Example JSON:**

```json
[
  {
    "subject": "Math",
    "chapter": "Algebra",
    "class": "10th",
    "unit": "Unit 1",
    "yearWiseQuestionCount": { "2021": 10 },
    "questionSolved": 5,
    "status": "In Progress",
    "isWeakChapter": true
  }
]
```

---

## 🧪 Postman Collection

👉 **Click to Open Collection**:  
https://api.postman.com/collections/19647232-3d2c3775-6873-4335-a8c5-1c440852b39c?access_key=PMAT-01JWZW2FX3FG16BKNA4Y29CWXT

🔐 Use header: `x-admin-secret: yash123` for `POST` upload.

---

## ⚙️ Deployment

- Hosted on **AWS EC2 (Ubuntu)**
- **Auto-deploy** with GitHub Actions on every push to `main`

---


---
