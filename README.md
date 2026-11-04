# Glow Guide

Glow Guide עוזרת לגלות מוצרי טיפוח, לבדוק את הרכיבים שלהם ולשמור מוצרים בשגרה אישית.

## עמודים

- **כל המוצרים (`/`)** — צפייה במוצרים וחיפוש לפי שם.
- **פרטי מוצר (`/items/:id`)** — צפייה בתמונה, בשם, במותג וברשימת הרכיבים.
- **השגרה שלי (`/routine`)** — צפייה במוצרים שסומנו בלב ונשמרו בדפדפן.
- **בודקת רכיבים (`/ingredients`)** — חיפוש מוצרים לפי רכיב.
- **עמוד 404** — מוצג בכניסה לכתובת שאינה קיימת, עם קישור לדף הבית.

## התקנה והרצה

```bash
npm install
npm run dev
```

## בדיקות

```bash
npm test
npm run test:ui
```

`npm run test:ui` מציג בטרמינל כתובת עם token; יש לפתוח את הכתובת הזו בדפדפן כדי להשתמש בממשק הבדיקות.

## מקור הנתונים

המוצרים מגיעים מ־[Open Beauty Facts API](https://world.openbeautyfacts.org/api/v2/search?categories_tags_en=face-creams&fields=code,product_name,brands,image_front_url,ingredients_text&page_size=100). מוצגים רק מוצרים עם שם, תמונה ורשימת רכיבים.

## טכנולוגיות

React, TypeScript, Vite, React Router, Vitest ו־`localStorage`.
