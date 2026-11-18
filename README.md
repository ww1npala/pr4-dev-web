# Практична робота №4

## Розроблення REST-ендпоінтів засобами NestJS

Виконав студент групи КН-41 Тарновський Артур (Варіант 10 — Зоотовари)

**Тема:** Архітектура NestJS, контролери, сервіси (Dependency Injection), DTO та обробка HTTP-виключень.

**Мета роботи:** Опанувати модульно-сервісну архітектуру фреймворку NestJS, навчитися створювати REST-контролери з декораторами маршрутизації (`@Get`, `@Post`, `@Patch`, `@Delete`), формувати типізовані DTO, реалізувати інкапсуляцію бізнес-логіки в in-memory сервісі та налаштувати коректні HTTP-статуси й виключення (`NotFoundException`).

## 1. Використані технології

* TypeScript

* NestJS (`@nestjs/common`, `@nestjs/core`, `@nestjs/platform-express`, `@nestjs/cli`)

* Node.js

* npm

* Git та GitHub

## 2. Структура проєкту

```
pr4-pet-supplies/
├── src/
│   ├── pet-supplies/
│   │   ├── dto/
│   │   │   ├── create-pet-supply.dto.ts
│   │   │   └── update-pet-supply.dto.ts
│   │   ├── entities/
│   │   │   └── pet-supply.entity.ts
│   │   ├── pet-supplies.controller.ts
│   │   └── pet-supplies.service.ts
│   ├── app.module.ts
│   └── main.ts
├── package.json
├── README.md
└── tsconfig.json

```

## 3. Реалізація завдання
<img width="765" height="177" alt="image" src="https://github.com/user-attachments/assets/9e29c970-ec64-4391-8c8e-5df78c8a73d7" />

### 3.1. Базовий рівень та контракти DTO (Рівень 1)

Ініціалізовано проєкт NestJS із точкою входу `src/main.ts` (запуск HTTP-сервера на порту `3000`) та кореневим модулем `AppModule`.

Для предметної області **«Зоотовари»** (префікс маршруту `/pet-supplies`) створено сутність `PetSupply` (`src/pet-supplies/entities/pet-supply.entity.ts`) та класи DTO у каталозі `src/pet-supplies/dto/`:

* `CreatePetSupplyDto` — контракт для створення нового зоотовару з обов'язковими полями:

  * `title` — назва товару;

  * `price` — ціна;

  * `petCategory` — категорія тварини (наприклад, «Собаки», «Коти», «Птахи»);

  * `packageWeightKg` — вага упаковки в кілограмах;

  * `brand` — виробник / бренд.
<img width="313" height="135" alt="image" src="https://github.com/user-attachments/assets/9bc28b6f-c9f1-4939-9e61-f5d877969173" />

  **UpdatePetSupplyDto** — контракт для часткового оновлення, де всі перелічені поля оголошені опціональними.
<img width="330" height="144" alt="image" src="https://github.com/user-attachments/assets/a5fc6c1b-95ba-4877-a0ef-91c337a2974a" />


### 3.2. Сервісний провайдер з In-Memory сховищем (Рівень 2)

У файлі `src/pet-supplies/pet-supplies.service.ts` створено клас `PetSuppliesService`, позначений декоратором `@Injectable()`. Усередині сервісу оголошено приватне сховище `private items: PetSupply[]`, попередньо заповнене трьома тестовими записами зоотоварів.

Реалізовано методи бізнес-логіки:

* `findAll()` — повертає повний перелік зоотоварів зі сховища;

* `findOne(id: string)` — здійснює пошук товару за ідентифікатором; якщо запис відсутній, генерує стандартне виключення `NotFoundException` (HTTP `404 Not Found`);

* `create(dto: CreatePetSupplyDto)` — генерує унікальний `id` на основі `Date.now().toString()`, додає новий зоотовар до масиву та повертає його;

* `update(id: string, dto: UpdatePetSupplyDto)` — перевіряє наявність запису через `findOne(id)`, частково оновлює передані поля та повертає оновлений об'єкт;

* `remove(id: string)` — видаляє зоотовар зі сховища за `id` або викидає `NotFoundException`, якщо елемент не знайдено.

### 3.3. REST-контролер та Dependency Injection

У файлі `src/pet-supplies/pet-supplies.controller.ts` реалізовано `PetSuppliesController` із базовим маршрутом `@Controller('pet-supplies')`. Екземпляр `PetSuppliesService` впроваджується через конструктор (Constructor Injection).

Налаштовано ендпоінти та HTTP-статуси відповідей:

| HTTP-метод | Маршрут | Декоратор статусу | Опис операції | 
| ----- | ----- | ----- | ----- | 
| `GET` | `/pet-supplies` | `200 OK` | Отримання списку всіх зоотоварів | 
| `GET` | `/pet-supplies/:id` | `200 OK` / `404 Not Found` | Отримання конкретного товару за `id` | 
| `POST` | `/pet-supplies` | `@HttpCode(HttpStatus.CREATED)` (`201`) | Створення нового зоотовару | 
| `PATCH` | `/pet-supplies/:id` | `200 OK` / `404 Not Found` | Часткове оновлення даних товару | 
| `DELETE` | `/pet-supplies/:id` | `@HttpCode(HttpStatus.NO_CONTENT)` (`204`) | Видалення товару без тіла у відповіді | 

## 4. Встановлення та запуск

Клонування репозиторію:

```
git clone https://github.com/ww1npala/pr4-pet-supplies.git

```

Перехід до каталогу:

```
cd pr4-pet-supplies

```

Встановлення залежностей:

```
npm install

```

Запуск сервера у режимі розробки:

```
npm run start:dev

```

Перевірка збірки TypeScript:

```
npm run build

```
<img width="765" height="177" alt="image" src="https://github.com/user-attachments/assets/b8e54d8c-88ad-4bf0-873d-a3bd20bf00f4" />

## 5. Приклади HTTP-запитів для перевірки

1. **Отримання всіх зоотоварів:**

   ```
   GET http://localhost:3000/pet-supplies
   
   ```
<img width="1313" height="597" alt="image" src="https://github.com/user-attachments/assets/ef76e43b-40d5-4785-ae60-01de3d9b2c4c" />

2. **Отримання товару за ID (`200 OK`):**

   ```
   GET http://localhost:3000/pet-supplies/1
   
   ```
<img width="1300" height="276" alt="image" src="https://github.com/user-attachments/assets/5f63d96b-5989-4da8-9f83-17cf50b322ab" />

3. **Запит неіснуючого ID (`404 Not Found`):**

   ```
   GET http://localhost:3000/pet-supplies/11
   
   ```
<img width="1302" height="202" alt="image" src="https://github.com/user-attachments/assets/723afb98-ff1d-45d2-9a32-1f182e43f096" />

4. **Створення нового зоотовару (`201 Created`):**

   ```
   POST http://localhost:3000/pet-supplies
   Content-Type: application/json
   
   {
     "title": "Вологий корм із лососем у соусі",
     "price": 45,
     "petCategory": "Коти",
     "packageWeightKg": 0.085,
     "brand": "Purina Pro Plan"
   }
   
   ```
<img width="1304" height="349" alt="image" src="https://github.com/user-attachments/assets/414cd877-19d3-4c44-8ae8-d3ebbd5ca024" />

5. **Часткове оновлення ціни товару (`200 OK`):**

   ```
   PATCH http://localhost:3000/pet-supplies/1
   Content-Type: application/json
   
   {
     "price": 1520
   }
   
   ```
<img width="1299" height="269" alt="image" src="https://github.com/user-attachments/assets/43dc92b1-d9da-4668-95d7-b9043338b836" />

6. **Видалення зоотовару (`204 No Content`):**

   ```
   DELETE http://localhost:3000/pet-supplies/2
   
   ```
<img width="1303" height="226" alt="image" src="https://github.com/user-attachments/assets/66ba3ab3-24a7-43e9-ac04-1decf0f3936f" />
<img width="1307" height="681" alt="image" src="https://github.com/user-attachments/assets/a44cadd0-db66-466d-973c-6ec87e65c712" />

## 6. Результати виконання

У результаті виконання роботи створено серверний застосунок на базі NestJS, реалізовано REST-контролер `PetSuppliesController`, типізовані DTO (`CreatePetSupplyDto`, `UpdatePetSupplyDto`) та сервісний провайдер `PetSuppliesService` з in-memory сховищем. Забезпечено повний набір CRUD-операцій, коректні HTTP-статуси (`200`, `201`, `204`) та обробку помилок `404 Not Found`.

## 7. Висновок

Під час виконання практичної роботи було опановано базові принципи архітектури NestJS, механізм ін'єкції залежностей (Dependency Injection), побудову RESTful-маршрутів і типізовану передачу даних через DTO.
