# GlobalResponse - Respuesta Estándar para APIs

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

Una colección completa de implementaciones de respuesta estándar para APIs REST en múltiples lenguajes y frameworks. Diseñado para proporcionar consistencia en las respuestas de tus servicios web.

---

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Estructura de la Respuesta](#-estructura-de-la-respuesta)
- [Implementaciones Disponibles](#-implementaciones-disponibles)
- [Instalación y Uso por Framework](#-instalación-y-uso-por-framework)
  - [C# / .NET](#1-c--net)
  - [Python / Flask](#2-python--flask)
  - [Python / FastAPI](#3-python--fastapi)
  - [JavaScript / Node.js (Express)](#4-javascript--nodejs-express)
  - [TypeScript / Express](#5-typescript--express)
  - [TypeScript / NestJS](#6-typescript--nestjs)
  - [Java / Spring Boot](#7-java--spring-boot)
  - [Go / Gin](#8-go--gin)
  - [PHP / Laravel](#9-php--laravel)
  - [Ruby / Rails](#10-ruby--rails)
- [Ejemplos de Uso](#-ejemplos-de-uso)
- [Códigos de Error Recomendados](#-códigos-de-error-recomendados)
- [Mejores Prácticas](#-mejores-prácticas)
- [Contribuir](#-contribuir)

---

## ✨ Características

- ✅ **Respuestas consistentes** en toda tu API
- ✅ **Soporte para paginación** incluido
- ✅ **Manejo de errores** estructurado
- ✅ **Tipado fuerte** (en lenguajes que lo soportan)
- ✅ **Genéricos** para flexibilidad de tipos de datos
- ✅ **Sin dependencias externas** (excepto frameworks base)
- ✅ **Fácil de integrar** en proyectos existentes

---

## 📦 Estructura de la Respuesta

Todas las implementaciones siguen la misma estructura JSON:

```json
{
  "success": true,
  "message": "Operación exitosa",
  "code": "SUCCESS",
  "data": {
    "id": 1,
    "name": "Ejemplo"
  },
  "totalRows": 100,
  "currentPage": 1,
  "totalPages": 10,
  "pageSize": 10
}
```

### Campos

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `success` | `boolean` | ✅ Sí | Indica si la operación fue exitosa |
| `message` | `string` | ❌ No | Mensaje descriptivo de la operación |
| `code` | `string` | ❌ No | Código personalizado de respuesta |
| `data` | `T` | ❌ No | Datos de la respuesta (genérico) |
| `totalRows` | `number` | ❌ No | Total de registros disponibles |
| `currentPage` | `number` | ❌ No | Página actual (paginación) |
| `totalPages` | `number` | ❌ No | Total de páginas (paginación) |
| `pageSize` | `number` | ❌ No | Tamaño de página (paginación) |

---

## 🚀 Implementaciones Disponibles

| Lenguaje/Framework | Archivo | Tipado | Genéricos |
|-------------------|---------|---------|-----------|
| C# / .NET | `GlobalResponse.cs` | ✅ Fuerte | ✅ Sí |
| Python / Flask | `global_response.py` | ⚠️ Dinámico | ✅ Sí |
| Python / FastAPI | `global_response.py` | ✅ Pydantic | ✅ Sí |
| JavaScript / Express | `GlobalResponse.js` | ❌ No | ❌ No |
| TypeScript / Express | `GlobalResponse.ts` | ✅ Fuerte | ✅ Sí |
| TypeScript / NestJS | `global-response.dto.ts` | ✅ Fuerte | ✅ Sí |
| Java / Spring Boot | `GlobalResponse.java` | ✅ Fuerte | ✅ Sí |
| Go / Gin | `global_response.go` | ✅ Fuerte | ✅ Sí |
| PHP / Laravel | `GlobalResponse.php` | ⚠️ Mixto | ❌ No |
| Ruby / Rails | `global_response.rb` | ❌ No | ❌ No |

---

## 📚 Instalación y Uso por Framework

### 1. C# / .NET

#### 📦 Dependencias

```xml
<!-- Archivo: YourProject.csproj -->
<Project Sdk="Microsoft.NET.Sdk.Web">
  <PropertyGroup>
    <TargetFramework>net6.0</TargetFramework>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.AspNetCore.Mvc.Core" Version="2.2.5" />
  </ItemGroup>
</Project>
```

#### 🔧 Instalación

```bash
# Crear proyecto ASP.NET Core Web API
dotnet new webapi -n MyApi
cd MyApi

# Crear carpeta para modelos comunes
mkdir -p Common/Models

# Copiar GlobalResponse.cs a Common/Models/
```

#### 📁 Estructura del Proyecto

```
MyApi/
├── Common/
│   └── Models/
│       └── GlobalResponse.cs
├── Controllers/
│   └── UsersController.cs
├── Program.cs
└── MyApi.csproj
```

#### 💻 Ejemplo de Uso

```csharp
using Microsoft.AspNetCore.Mvc;
using Common.Models;

namespace MyApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        // GET: api/users
        [HttpGet]
        public IActionResult GetUsers()
        {
            var users = new List<User>
            {
                new User { Id = 1, Name = "Juan" },
                new User { Id = 2, Name = "María" }
            };

            return Ok(GlobalResponse<List<User>>.Ok(
                users, 
                "Usuarios obtenidos exitosamente"
            ));
        }

        // GET: api/users/paginated
        [HttpGet("paginated")]
        public IActionResult GetUsersPaginated(
            [FromQuery] int page = 1, 
            [FromQuery] int pageSize = 10)
        {
            var users = GetUsersFromDatabase(); // Tu lógica aquí
            var totalRows = GetTotalUsersCount();

            return Ok(GlobalResponse<List<User>>.OkPaginated(
                users,
                totalRows,
                page,
                pageSize,
                "Usuarios obtenidos"
            ));
        }

        // POST: api/users
        [HttpPost]
        public IActionResult CreateUser([FromBody] User user)
        {
            if (user == null)
            {
                return BadRequest(GlobalResponse<User>.Error(
                    "Datos inválidos",
                    "VALIDATION_ERROR"
                ));
            }

            // Lógica de creación
            return Ok(GlobalResponse<User>.Ok(
                user,
                "Usuario creado exitosamente",
                "USER_CREATED"
            ));
        }
    }

    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
```

#### 🎯 Comandos de Ejecución

```bash
# Compilar
dotnet build

# Ejecutar
dotnet run

# Probar
curl http://localhost:5000/api/users
```

---

### 2. Python / Flask

#### 📦 Dependencias

```txt
# Archivo: requirements.txt
Flask==3.0.0
python-dotenv==1.0.0
```

#### 🔧 Instalación

```bash
# Crear entorno virtual
python -m venv venv

# Activar entorno virtual
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt

# Crear estructura de carpetas
mkdir -p app/models
mkdir -p app/controllers
```

#### 📁 Estructura del Proyecto

```
my-flask-api/
├── venv/
├── app/
│   ├── __init__.py
│   ├── models/
│   │   ├── __init__.py
│   │   └── global_response.py
│   └── controllers/
│       ├── __init__.py
│       └── users_controller.py
├── requirements.txt
└── run.py
```

#### 💻 Ejemplo de Uso

**Archivo: `app/__init__.py`**
```python
from flask import Flask

def create_app():
    app = Flask(__name__)
    
    from app.controllers.users_controller import users_bp
    app.register_blueprint(users_bp)
    
    return app
```

**Archivo: `app/controllers/users_controller.py`**
```python
from flask import Blueprint, jsonify, request
from app.models.global_response import GlobalResponse

users_bp = Blueprint('users', __name__, url_prefix='/api/users')

@users_bp.route('/', methods=['GET'])
def get_users():
    users = [
        {'id': 1, 'name': 'Juan'},
        {'id': 2, 'name': 'María'}
    ]
    
    response = GlobalResponse.ok_with_data(
        users,
        "Usuarios obtenidos exitosamente"
    )
    return jsonify(response.to_dict())

@users_bp.route('/paginated', methods=['GET'])
def get_users_paginated():
    page = int(request.args.get('page', 1))
    page_size = int(request.args.get('pageSize', 10))
    
    # Simular obtención de datos
    users = [{'id': i, 'name': f'User{i}'} for i in range(1, 11)]
    total_rows = 100
    
    response = GlobalResponse.ok_paginated(
        users,
        total_rows,
        page,
        page_size,
        "Usuarios obtenidos"
    )
    return jsonify(response.to_dict())

@users_bp.route('/', methods=['POST'])
def create_user():
    data = request.get_json()
    
    if not data or 'name' not in data:
        response = GlobalResponse.error(
            "Datos inválidos",
            "VALIDATION_ERROR"
        )
        return jsonify(response.to_dict()), 400
    
    user = {'id': 1, 'name': data['name']}
    response = GlobalResponse.ok_with_data(
        user,
        "Usuario creado exitosamente",
        "USER_CREATED"
    )
    return jsonify(response.to_dict()), 201
```

**Archivo: `run.py`**
```python
from app import create_app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True, port=5000)
```

#### 🎯 Comandos de Ejecución

```bash
# Ejecutar la aplicación
python run.py

# Probar
curl http://localhost:5000/api/users
```

---

### 3. Python / FastAPI

#### 📦 Dependencias

```txt
# Archivo: requirements.txt
fastapi==0.109.0
uvicorn[standard]==0.27.0
pydantic==2.5.0
```

#### 🔧 Instalación

```bash
# Crear entorno virtual
python -m venv venv
source venv/bin/activate  # Linux/Mac
# venv\Scripts\activate   # Windows

# Instalar dependencias
pip install -r requirements.txt

# Crear estructura
mkdir -p app/models app/routers
```

#### 📁 Estructura del Proyecto

```
my-fastapi/
├── venv/
├── app/
│   ├── __init__.py
│   ├── main.py
│   ├── models/
│   │   ├── __init__.py
│   │   ├── global_response.py
│   │   └── user.py
│   └── routers/
│       ├── __init__.py
│       └── users.py
└── requirements.txt
```

#### 💻 Ejemplo de Uso

**Archivo: `app/models/user.py`**
```python
from pydantic import BaseModel

class User(BaseModel):
    id: int
    name: str
    
class UserCreate(BaseModel):
    name: str
```

**Archivo: `app/routers/users.py`**
```python
from fastapi import APIRouter, HTTPException, Query
from typing import List
from app.models.global_response import GlobalResponse
from app.models.user import User, UserCreate

router = APIRouter(prefix="/api/users", tags=["users"])

@router.get("/", response_model=GlobalResponse[List[User]])
def get_users():
    users = [
        User(id=1, name="Juan"),
        User(id=2, name="María")
    ]
    
    return GlobalResponse.ok_with_data(
        users,
        "Usuarios obtenidos exitosamente"
    )

@router.get("/paginated", response_model=GlobalResponse[List[User]])
def get_users_paginated(
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=100)
):
    users = [User(id=i, name=f"User{i}") for i in range(1, 11)]
    total_rows = 100
    
    return GlobalResponse.ok_paginated(
        users,
        total_rows,
        page,
        page_size
    )

@router.post("/", response_model=GlobalResponse[User], status_code=201)
def create_user(user_data: UserCreate):
    user = User(id=1, name=user_data.name)
    
    return GlobalResponse.ok_with_data(
        user,
        "Usuario creado exitosamente",
        "USER_CREATED"
    )
```

**Archivo: `app/main.py`**
```python
from fastapi import FastAPI
from app.routers import users

app = FastAPI(
    title="Mi API con FastAPI",
    version="1.0.0"
)

app.include_router(users.router)

@app.get("/")
def root():
    return {"message": "API funcionando"}
```

#### 🎯 Comandos de Ejecución

```bash
# Ejecutar con recarga automática
uvicorn app.main:app --reload --port 8000

# Acceder a la documentación
# http://localhost:8000/docs

# Probar
curl http://localhost:8000/api/users
```

---

### 4. JavaScript / Node.js (Express)

#### 📦 Dependencias

```json
{
  "name": "my-express-api",
  "version": "1.0.0",
  "description": "API con Express y GlobalResponse",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.2"
  }
}
```

#### 🔧 Instalación

```bash
# Inicializar proyecto
npm init -y

# Instalar dependencias
npm install express cors dotenv

# Instalar dependencias de desarrollo
npm install --save-dev nodemon

# Crear estructura
mkdir -p src/models src/controllers src/routes
```

#### 📁 Estructura del Proyecto

```
my-express-api/
├── node_modules/
├── src/
│   ├── models/
│   │   └── GlobalResponse.js
│   ├── controllers/
│   │   └── usersController.js
│   ├── routes/
│   │   └── users.js
│   └── app.js
├── server.js
├── package.json
└── .env
```

#### 💻 Ejemplo de Uso

**Archivo: `src/controllers/usersController.js`**
```javascript
const GlobalResponse = require('../models/GlobalResponse');

class UsersController {
    static getUsers(req, res) {
        const users = [
            { id: 1, name: 'Juan' },
            { id: 2, name: 'María' }
        ];
        
        res.json(GlobalResponse.okWithData(
            users,
            'Usuarios obtenidos exitosamente'
        ));
    }
    
    static getUsersPaginated(req, res) {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        
        const users = Array.from({ length: 10 }, (_, i) => ({
            id: i + 1,
            name: `User${i + 1}`
        }));
        
        const totalRows = 100;
        
        res.json(GlobalResponse.okPaginated(
            users,
            totalRows,
            page,
            pageSize
        ));
    }
    
    static createUser(req, res) {
        const { name } = req.body;
        
        if (!name) {
            return res.status(400).json(GlobalResponse.error(
                'El nombre es requerido',
                'VALIDATION_ERROR'
            ));
        }
        
        const user = { id: 1, name };
        
        res.status(201).json(GlobalResponse.okWithData(
            user,
            'Usuario creado exitosamente',
            'USER_CREATED'
        ));
    }
}

module.exports = UsersController;
```

**Archivo: `src/routes/users.js`**
```javascript
const express = require('express');
const UsersController = require('../controllers/usersController');

const router = express.Router();

router.get('/', UsersController.getUsers);
router.get('/paginated', UsersController.getUsersPaginated);
router.post('/', UsersController.createUser);

module.exports = router;
```

**Archivo: `src/app.js`**
```javascript
const express = require('express');
const cors = require('cors');
const usersRoutes = require('./routes/users');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/users', usersRoutes);

// Ruta raíz
app.get('/', (req, res) => {
    res.json({ message: 'API funcionando' });
});

// Manejo de errores
app.use((err, req, res, next) => {
    const GlobalResponse = require('./models/GlobalResponse');
    res.status(500).json(GlobalResponse.error(
        err.message,
        'INTERNAL_ERROR'
    ));
});

module.exports = app;
```

**Archivo: `server.js`**
```javascript
require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
```

#### 🎯 Comandos de Ejecución

```bash
# Modo desarrollo (con nodemon)
npm run dev

# Modo producción
npm start

# Probar
curl http://localhost:3000/api/users
```

---

### 5. TypeScript / Express

#### 📦 Dependencias

```json
{
  "name": "my-typescript-api",
  "version": "1.0.0",
  "description": "API con Express y TypeScript",
  "main": "dist/server.js",
  "scripts": {
    "build": "tsc",
    "start": "node dist/server.js",
    "dev": "ts-node-dev --respawn src/server.ts",
    "watch": "tsc -w"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/cors": "^2.8.17",
    "@types/node": "^20.10.6",
    "typescript": "^5.3.3",
    "ts-node-dev": "^2.0.0"
  }
}
```

**Archivo: `tsconfig.json`**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

#### 🔧 Instalación

```bash
# Inicializar proyecto
npm init -y

# Instalar dependencias
npm install express cors dotenv
npm install --save-dev typescript @types/node @types/express @types/cors ts-node-dev

# Inicializar TypeScript
npx tsc --init

# Crear estructura
mkdir -p src/models src/controllers src/routes src/interfaces
```

#### 📁 Estructura del Proyecto

```
my-typescript-api/
├── node_modules/
├── dist/
├── src/
│   ├── interfaces/
│   │   └── User.ts
│   ├── models/
│   │   └── GlobalResponse.ts
│   ├── controllers/
│   │   └── UsersController.ts
│   ├── routes/
│   │   └── users.ts
│   ├── app.ts
│   └── server.ts
├── tsconfig.json
└── package.json
```

#### 💻 Ejemplo de Uso

**Archivo: `src/interfaces/User.ts`**
```typescript
export interface User {
    id: number;
    name: string;
    email?: string;
}

export interface CreateUserDto {
    name: string;
    email?: string;
}
```

**Archivo: `src/controllers/UsersController.ts`**
```typescript
import { Request, Response } from 'express';
import { GlobalResponse } from '../models/GlobalResponse';
import { User, CreateUserDto } from '../interfaces/User';

export class UsersController {
    static getUsers(req: Request, res: Response): void {
        const users: User[] = [
            { id: 1, name: 'Juan', email: 'juan@example.com' },
            { id: 2, name: 'María', email: 'maria@example.com' }
        ];
        
        res.json(GlobalResponse.okWithData<User[]>(
            users,
            'Usuarios obtenidos exitosamente'
        ));
    }
    
    static getUsersPaginated(req: Request, res: Response): void {
        const page = parseInt(req.query.page as string) || 1;
        const pageSize = parseInt(req.query.pageSize as string) || 10;
        
        const users: User[] = Array.from({ length: 10 }, (_, i) => ({
            id: i + 1,
            name: `User${i + 1}`,
            email: `user${i + 1}@example.com`
        }));
        
        const totalRows = 100;
        
        res.json(GlobalResponse.okPaginated<User[]>(
            users,
            totalRows,
            page,
            pageSize
        ));
    }
    
    static createUser(req: Request, res: Response): void {
        const userData: CreateUserDto = req.body;
        
        if (!userData.name) {
            res.status(400).json(GlobalResponse.error(
                'El nombre es requerido',
                'VALIDATION_ERROR'
            ));
            return;
        }
        
        const user: User = {
            id: 1,
            name: userData.name,
            email: userData.email
        };
        
        res.status(201).json(GlobalResponse.okWithData<User>(
            user,
            'Usuario creado exitosamente',
            'USER_CREATED'
        ));
    }
}
```

**Archivo: `src/routes/users.ts`**
```typescript
import { Router } from 'express';
import { UsersController } from '../controllers/UsersController';

const router = Router();

router.get('/', UsersController.getUsers);
router.get('/paginated', UsersController.getUsersPaginated);
router.post('/', UsersController.createUser);

export default router;
```

**Archivo: `src/app.ts`**
```typescript
import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import usersRoutes from './routes/users';
import { GlobalResponse } from './models/GlobalResponse';

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/users', usersRoutes);

app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'API funcionando con TypeScript' });
});

// Manejo de errores
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json(GlobalResponse.error(
        err.message,
        'INTERNAL_ERROR'
    ));
});

export default app;
```

**Archivo: `src/server.ts`**
```typescript
import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
```

#### 🎯 Comandos de Ejecución

```bash
# Compilar TypeScript
npm run build

# Modo desarrollo
npm run dev

# Modo producción
npm start

# Probar
curl http://localhost:3000/api/users
```

---

### 6. TypeScript / NestJS

#### 📦 Dependencias

```bash
# NestJS CLI global
npm i -g @nestjs/cli

# Crear proyecto
nest new my-nestjs-api
```

**Dependencias adicionales en `package.json`:**
```json
{
  "dependencies": {
    "@nestjs/common": "^10.0.0",
    "@nestjs/core": "^10.0.0",
    "@nestjs/platform-express": "^10.0.0",
    "@nestjs/swagger": "^7.1.17",
    "reflect-metadata": "^0.1.13",
    "rxjs": "^7.8.1"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.0.0",
    "@nestjs/schematics": "^10.0.0",
    "@types/node": "^20.3.1",
    "typescript": "^5.1.3"
  }
}
```

#### 🔧 Instalación

```bash
# Instalar NestJS CLI
npm i -g @nestjs/cli

# Crear proyecto
nest new my-nestjs-api
cd my-nestjs-api

# Instalar Swagger (opcional pero recomendado)
npm install @nestjs/swagger

# Generar módulos
nest g module users
nest g controller users
nest g service users

# Crear estructura para DTOs
mkdir -p src/common/dtos
```

#### 📁 Estructura del Proyecto

```
my-nestjs-api/
├── src/
│   ├── common/
│   │   └── dtos/
│   │       └── global-response.dto.ts
│   ├── users/
│   │   ├── dto/
│   │   │   ├── create-user.dto.ts
│   │   │   └── user.dto.ts
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   └── users.module.ts
│   ├── app.module.ts
│   └── main.ts
├── tsconfig.json
└── package.json
```

#### 💻 Ejemplo de Uso

**Archivo: `src/users/dto/user.dto.ts`**
```typescript
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 'Juan Pérez' })
    name: string;

    @ApiProperty({ example: 'juan@example.com', required: false })
    email?: string;
}
```

**Archivo: `src/users/dto/create-user.dto.ts`**
```typescript
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ example: 'Juan Pérez' })
    @IsString()
    name: string;

    @ApiProperty({ example: 'juan@example.com', required: false })
    @IsEmail()
    @IsOptional()
    email?: string;
}
```

**Archivo: `src/users/users.service.ts`**
```typescript
import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    private users: UserDto[] = [
        { id: 1, name: 'Juan', email: 'juan@example.com' },
        { id: 2, name: 'María', email: 'maria@example.com' }
    ];

    findAll(): UserDto[] {
        return this.users;
    }

    findPaginated(page: number, pageSize: number): { data: UserDto[], total: number } {
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        
        return {
            data: this.users.slice(start, end),
            total: this.users.length
        };
    }

    create(createUserDto: CreateUserDto): UserDto {
        const newUser: UserDto = {
            id: this.users.length + 1,
            ...createUserDto
        };
        
        this.users.push(newUser);
        return newUser;
    }
}
```

**Archivo: `src/users/users.controller.ts`**
```typescript
import { 
    Controller, 
    Get, 
    Post, 
    Body, 
    Query,
    HttpStatus,
    HttpCode 
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { GlobalResponseDto } from '../common/dtos/global-response.dto';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('users')
@Controller('api/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @ApiOperation({ summary: 'Obtener todos los usuarios' })
    @ApiResponse({ status: 200, description: 'Lista de usuarios obtenida' })
    findAll(): GlobalResponseDto<UserDto[]> {
        const users = this.usersService.findAll();
        
        return GlobalResponseDto.okWithData<UserDto[]>(
            users,
            'Usuarios obtenidos exitosamente'
        );
    }

    @Get('paginated')
    @ApiOperation({ summary: 'Obtener usuarios paginados' })
    @ApiQuery({ name: 'page', required: false, type: Number })
    @ApiQuery({ name: 'pageSize', required: false, type: Number })
    findPaginated(
        @Query('page') page: string = '1',
        @Query('pageSize') pageSize: string = '10'
    ): GlobalResponseDto<UserDto[]> {
        const pageNum = parseInt(page);
        const pageSizeNum = parseInt(pageSize);
        
        const result = this.usersService.findPaginated(pageNum, pageSizeNum);
        
        return GlobalResponseDto.okPaginated<UserDto[]>(
            result.data,
            result.total,
            pageNum,
            pageSizeNum
        );
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Crear un nuevo usuario' })
    @ApiResponse({ status: 201, description: 'Usuario creado exitosamente' })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })
    create(@Body() createUserDto: CreateUserDto): GlobalResponseDto<UserDto> {
        const user = this.usersService.create(createUserDto);
        
        return GlobalResponseDto.okWithData<UserDto>(
            user,
            'Usuario creado exitosamente',
            'USER_CREATED'
        );
    }
}
```

**Archivo: `src/main.ts`** (con Swagger configurado)
```typescript
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Habilitar validación global
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true
    }));

    // Configurar Swagger
    const config = new DocumentBuilder()
        .setTitle('Mi API con NestJS')
        .setDescription('API con GlobalResponse estándar')
        .setVersion('1.0')
        .addTag('users')
        .build();
    
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    await app.listen(3000);
    console.log('🚀 Aplicación corriendo en http://localhost:3000');
    console.log('📚 Documentación disponible en http://localhost:3000/api/docs');
}
bootstrap();
```

#### 🎯 Comandos de Ejecución

```bash
# Modo desarrollo
npm run start:dev

# Modo producción
npm run build
npm run start:prod

# Probar
curl http://localhost:3000/api/users

# Ver documentación Swagger
# Abrir http://localhost:3000/api/docs en el navegador
```

---

### 7. Java / Spring Boot

#### 📦 Dependencias

**Archivo: `pom.xml`** (Maven)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
         https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.0</version>
        <relativePath/>
    </parent>
    
    <groupId>com.example</groupId>
    <artifactId>my-spring-api</artifactId>
    <version>1.0.0</version>
    <name>my-spring-api</name>
    
    <properties>
        <java.version>17</java.version>
    </properties>
    
    <dependencies>
        <!-- Spring Boot Web -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        
        <!-- Lombok (opcional pero recomendado) -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        
        <!-- Validation -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>
    </dependencies>
    
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>
```

**O usando Gradle (`build.gradle`):**
```gradle
plugins {
    id 'java'
    id 'org.springframework.boot' version '3.2.0'
    id 'io.spring.dependency-management' version '1.1.4'
}

group = 'com.example'
version = '1.0.0'
sourceCompatibility = '17'

configurations {
    compileOnly {
        extendsFrom annotationProcessor
    }
}

repositories {
    mavenCentral()
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'org.springframework.boot:spring-boot-starter-validation'
    compileOnly 'org.projectlombok:lombok'
    annotationProcessor 'org.projectlombok:lombok'
}
```

#### 🔧 Instalación

```bash
# Usar Spring Initializr
# Visita: https://start.spring.io/
# O usa el CLI:
spring init --dependencies=web,lombok,validation my-spring-api
cd my-spring-api

# Con Maven
mvn clean install

# Con Gradle
./gradlew build
```

#### 📁 Estructura del Proyecto

```
my-spring-api/
├── src/
│   └── main/
│       ├── java/
│       │   └── com/
│       │       └── example/
│       │           └── api/
│       │               ├── common/
│       │               │   └── models/
│       │               │       └── GlobalResponse.java
│       │               ├── users/
│       │               │   ├── dto/
│       │               │   │   ├── UserDto.java
│       │               │   │   └── CreateUserDto.java
│       │               │   ├── UserController.java
│       │               │   └── UserService.java
│       │               └── Application.java
│       └── resources/
│           └── application.properties
├── pom.xml (o build.gradle)
└── mvnw (o gradlew)
```

#### 💻 Ejemplo de Uso

**Archivo: `src/main/java/com/example/api/users/dto/UserDto.java`**
```java
package com.example.api.users.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private Long id;
    private String name;
    private String email;
}
```

**Archivo: `src/main/java/com/example/api/users/dto/CreateUserDto.java`**
```java
package com.example.api.users.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateUserDto {
    @NotBlank(message = "El nombre es requerido")
    private String name;
    
    @Email(message = "Email inválido")
    private String email;
}
```

**Archivo: `src/main/java/com/example/api/users/UserService.java`**
```java
package com.example.api.users;

import com.example.api.users.dto.CreateUserDto;
import com.example.api.users.dto.UserDto;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    private final List<UserDto> users = new ArrayList<>();
    private Long currentId = 1L;

    public UserService() {
        users.add(new UserDto(currentId++, "Juan", "juan@example.com"));
        users.add(new UserDto(currentId++, "María", "maria@example.com"));
    }

    public List<UserDto> findAll() {
        return new ArrayList<>(users);
    }

    public List<UserDto> findPaginated(int page, int pageSize) {
        int start = (page - 1) * pageSize;
        int end = Math.min(start + pageSize, users.size());
        
        if (start >= users.size()) {
            return new ArrayList<>();
        }
        
        return users.subList(start, end);
    }

    public int getTotalCount() {
        return users.size();
    }

    public UserDto create(CreateUserDto createUserDto) {
        UserDto newUser = new UserDto(
            currentId++,
            createUserDto.getName(),
            createUserDto.getEmail()
        );
        users.add(newUser);
        return newUser;
    }
}
```

**Archivo: `src/main/java/com/example/api/users/UserController.java`**
```java
package com.example.api.users;

import com.example.api.common.models.GlobalResponse;
import com.example.api.users.dto.CreateUserDto;
import com.example.api.users.dto.UserDto;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<GlobalResponse<List<UserDto>>> getUsers() {
        List<UserDto> users = userService.findAll();
        
        return ResponseEntity.ok(
            GlobalResponse.okWithData(users, "Usuarios obtenidos exitosamente")
        );
    }

    @GetMapping("/paginated")
    public ResponseEntity<GlobalResponse<List<UserDto>>> getUsersPaginated(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int pageSize) {
        
        List<UserDto> users = userService.findPaginated(page, pageSize);
        int totalRows = userService.getTotalCount();
        
        return ResponseEntity.ok(
            GlobalResponse.okPaginated(
                users,
                totalRows,
                page,
                pageSize,
                "Usuarios obtenidos",
                null
            )
        );
    }

    @PostMapping
    public ResponseEntity<GlobalResponse<UserDto>> createUser(
            @Valid @RequestBody CreateUserDto createUserDto) {
        
        UserDto user = userService.create(createUserDto);
        
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(GlobalResponse.okWithData(
                user,
                "Usuario creado exitosamente",
                "USER_CREATED"
            ));
    }
}
```

**Archivo: `src/main/resources/application.properties`**
```properties
# Server configuration
server.port=8080

# Application name
spring.application.name=my-spring-api

# JSON configuration
spring.jackson.default-property-inclusion=non_null
```

#### 🎯 Comandos de Ejecución

```bash
# Con Maven
mvn spring-boot:run

# O compilar y ejecutar
mvn clean package
java -jar target/my-spring-api-1.0.0.jar

# Con Gradle
./gradlew bootRun

# O compilar y ejecutar
./gradlew build
java -jar build/libs/my-spring-api-1.0.0.jar

# Probar
curl http://localhost:8080/api/users
```

---

### 8. Go / Gin

#### 📦 Dependencias

**Archivo: `go.mod`**
```go
module my-gin-api

go 1.21

require (
    github.com/gin-gonic/gin v1.9.1
    github.com/gin-contrib/cors v1.5.0
)
```

#### 🔧 Instalación

```bash
# Inicializar módulo Go
go mod init my-gin-api

# Instalar Gin
go get -u github.com/gin-gonic/gin

# Instalar CORS (opcional)
go get -u github.com/gin-contrib/cors

# Descargar dependencias
go mod tidy
```

#### 📁 Estructura del Proyecto

```
my-gin-api/
├── cmd/
│   └── server/
│       └── main.go
├── internal/
│   ├── models/
│   │   ├── global_response.go
│   │   └── user.go
│   ├── handlers/
│   │   └── users_handler.go
│   └── services/
│       └── users_service.go
├── go.mod
└── go.sum
```

#### 💻 Ejemplo de Uso

**Archivo: `internal/models/user.go`**
```go
package models

type User struct {
    ID    int    `json:"id"`
    Name  string `json:"name"`
    Email string `json:"email,omitempty"`
}

type CreateUserDto struct {
    Name  string `json:"name" binding:"required"`
    Email string `json:"email" binding:"omitempty,email"`
}
```

**Archivo: `internal/services/users_service.go`**
```go
package services

import (
    "my-gin-api/internal/models"
)

type UsersService struct {
    users     []models.User
    currentID int
}

func NewUsersService() *UsersService {
    return &UsersService{
        users: []models.User{
            {ID: 1, Name: "Juan", Email: "juan@example.com"},
            {ID: 2, Name: "María", Email: "maria@example.com"},
        },
        currentID: 3,
    }
}

func (s *UsersService) GetAll() []models.User {
    return s.users
}

func (s *UsersService) GetPaginated(page, pageSize int) ([]models.User, int) {
    start := (page - 1) * pageSize
    end := start + pageSize

    if start >= len(s.users) {
        return []models.User{}, len(s.users)
    }

    if end > len(s.users) {
        end = len(s.users)
    }

    return s.users[start:end], len(s.users)
}

func (s *UsersService) Create(dto models.CreateUserDto) models.User {
    user := models.User{
        ID:    s.currentID,
        Name:  dto.Name,
        Email: dto.Email,
    }
    s.currentID++
    s.users = append(s.users, user)
    return user
}
```

**Archivo: `internal/handlers/users_handler.go`**
```go
package handlers

import (
    "net/http"
    "strconv"

    "my-gin-api/internal/models"
    "my-gin-api/internal/services"

    "github.com/gin-gonic/gin"
)

type UsersHandler struct {
    service *services.UsersService
}

func NewUsersHandler(service *services.UsersService) *UsersHandler {
    return &UsersHandler{service: service}
}

// GetUsers obtiene todos los usuarios
func (h *UsersHandler) GetUsers(c *gin.Context) {
    users := h.service.GetAll()
    
    response := models.OkWithData(
        users,
        "Usuarios obtenidos exitosamente",
        "",
    )
    
    c.JSON(http.StatusOK, response)
}

// GetUsersPaginated obtiene usuarios paginados
func (h *UsersHandler) GetUsersPaginated(c *gin.Context) {
    page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
    pageSize, _ := strconv.Atoi(c.DefaultQuery("pageSize", "10"))
    
    users, total := h.service.GetPaginated(page, pageSize)
    
    response := models.OkPaginated(
        users,
        total,
        page,
        pageSize,
        "Usuarios obtenidos",
        "",
    )
    
    c.JSON(http.StatusOK, response)
}

// CreateUser crea un nuevo usuario
func (h *UsersHandler) CreateUser(c *gin.Context) {
    var dto models.CreateUserDto
    
    if err := c.ShouldBindJSON(&dto); err != nil {
        response := models.Error[models.User](
            "Datos inválidos: "+err.Error(),
            "VALIDATION_ERROR",
        )
        c.JSON(http.StatusBadRequest, response)
        return
    }
    
    user := h.service.Create(dto)
    
    response := models.OkWithData(
        user,
        "Usuario creado exitosamente",
        "USER_CREATED",
    )
    
    c.JSON(http.StatusCreated, response)
}
```

**Archivo: `cmd/server/main.go`**
```go
package main

import (
    "log"

    "my-gin-api/internal/handlers"
    "my-gin-api/internal/services"

    "github.com/gin-gonic/gin"
    "github.com/gin-contrib/cors"
)

func main() {
    // Crear router
    router := gin.Default()

    // Configurar CORS
    router.Use(cors.Default())

    // Inicializar servicios
    usersService := services.NewUsersService()
    usersHandler := handlers.NewUsersHandler(usersService)

    // Rutas
    api := router.Group("/api")
    {
        users := api.Group("/users")
        {
            users.GET("", usersHandler.GetUsers)
            users.GET("/paginated", usersHandler.GetUsersPaginated)
            users.POST("", usersHandler.CreateUser)
        }
    }

    // Ruta raíz
    router.GET("/", func(c *gin.Context) {
        c.JSON(200, gin.H{
            "message": "API funcionando con Go y Gin",
        })
    })

    // Iniciar servidor
    log.Println("🚀 Servidor corriendo en http://localhost:8080")
    if err := router.Run(":8080"); err != nil {
        log.Fatal("Error al iniciar servidor:", err)
    }
}
```

#### 🎯 Comandos de Ejecución

```bash
# Descargar dependencias
go mod download

# Ejecutar en modo desarrollo
go run cmd/server/main.go

# Compilar
go build -o bin/server cmd/server/main.go

# Ejecutar binario compilado
./bin/server

# Probar
curl http://localhost:8080/api/users
```

---

### 9. PHP / Laravel

#### 📦 Dependencias

**Archivo: `composer.json`** (se genera automáticamente)
```json
{
    "require": {
        "php": "^8.1",
        "laravel/framework": "^10.0"
    }
}
```

#### 🔧 Instalación

```bash
# Instalar Laravel globalmente (opcional)
composer global require laravel/installer

# Crear proyecto Laravel
composer create-project laravel/laravel my-laravel-api
cd my-laravel-api

# O con Laravel installer
laravel new my-laravel-api

# Crear estructura
mkdir -p app/Http/Responses
mkdir -p app/Http/Controllers/Api
```

#### 📁 Estructura del Proyecto

```
my-laravel-api/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   └── Api/
│   │   │       └── UserController.php
│   │   └── Responses/
│   │       └── GlobalResponse.php
│   └── Models/
│       └── User.php
├── routes/
│   └── api.php
├── composer.json
└── artisan
```

#### 💻 Ejemplo de Uso

**Archivo: `app/Models/User.php`** (ya existe en Laravel)
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
    ];

    protected $hidden = [
        'password',
    ];
}
```

**Archivo: `app/Http/Controllers/Api/UserController.php`**
```php
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Responses\GlobalResponse;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Obtener todos los usuarios
     */
    public function index(): JsonResponse
    {
        $users = User::select('id', 'name', 'email')->get();
        
        return GlobalResponse::okWithData(
            $users,
            'Usuarios obtenidos exitosamente'
        )->toJsonResponse();
    }

    /**
     * Obtener usuarios paginados
     */
    public function paginated(Request $request): JsonResponse
    {
        $page = $request->input('page', 1);
        $pageSize = $request->input('pageSize', 10);
        
        $totalRows = User::count();
        $users = User::select('id', 'name', 'email')
            ->skip(($page - 1) * $pageSize)
            ->take($pageSize)
            ->get();
        
        return GlobalResponse::okPaginated(
            $users,
            $totalRows,
            (int)$page,
            (int)$pageSize
        )->toJsonResponse();
    }

    /**
     * Crear un nuevo usuario
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
        ]);

        if ($validator->fails()) {
            return GlobalResponse::error(
                $validator->errors()->first(),
                'VALIDATION_ERROR'
            )->toJsonResponse(400);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt('password') // Demo purposes
        ]);

        return GlobalResponse::okWithData(
            $user->only(['id', 'name', 'email']),
            'Usuario creado exitosamente',
            'USER_CREATED'
        )->toJsonResponse(201);
    }
}
```

**Archivo: `routes/api.php`**
```php
<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;

Route::prefix('users')->group(function () {
    Route::get('/', [UserController::class, 'index']);
    Route::get('/paginated', [UserController::class, 'paginated']);
    Route::post('/', [UserController::class, 'store']);
});
```

**Archivo: `app/Providers/RouteServiceProvider.php`** (verificar configuración)
```php
<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    public const HOME = '/home';

    public function boot(): void
    {
        $this->routes(function () {
            Route::middleware('api')
                ->prefix('api')
                ->group(base_path('routes/api.php'));

            Route::middleware('web')
                ->group(base_path('routes/web.php'));
        });
    }
}
```

#### 🎯 Comandos de Ejecución

```bash
# Iniciar servidor de desarrollo
php artisan serve

# Limpiar caché
php artisan cache:clear
php artisan config:clear

# Crear migración (si usas base de datos)
php artisan make:migration create_users_table
php artisan migrate

# Probar
curl http://localhost:8000/api/users
```

---

### 10. Ruby / Rails

#### 📦 Dependencias

**Archivo: `Gemfile`**
```ruby
source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '3.2.0'

# Bundle edge Rails instead
gem 'rails', '~> 7.1.0'

# Use sqlite3 as the database
gem 'sqlite3', '~> 1.4'

# Use Puma as the app server
gem 'puma', '~> 6.0'

# Build JSON APIs
gem 'jbuilder'

# Reduces boot times
gem 'bootsnap', require: false

# Use Rack CORS
gem 'rack-cors'

group :development, :test do
  gem 'debug'
end
```

#### 🔧 Instalación

```bash
# Verificar instalación de Ruby
ruby -v

# Instalar Rails
gem install rails

# Crear proyecto API-only
rails new my-rails-api --api
cd my-rails-api

# Instalar gemas
bundle install

# Crear estructura
mkdir -p app/lib/api
```

#### 📁 Estructura del Proyecto

```
my-rails-api/
├── app/
│   ├── controllers/
│   │   └── api/
│   │       └── users_controller.rb
│   ├── lib/
│   │   └── api/
│   │       └── global_response.rb
│   └── models/
│       └── user.rb
├── config/
│   └── routes.rb
├── Gemfile
└── db/
    └── migrate/
```

#### 💻 Ejemplo de Uso

**Archivo: `app/models/user.rb`**
```ruby
class User < ApplicationRecord
  validates :name, presence: true
  validates :email, presence: true, 
            format: { with: URI::MailTo::EMAIL_REGEXP },
            uniqueness: true
end
```

**Migración: `db/migrate/XXXXXX_create_users.rb`**
```ruby
class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
      t.string :name, null: false
      t.string :email, null: false

      t.timestamps
    end
    
    add_index :users, :email, unique: true
  end
end
```

**Archivo: `app/controllers/api/users_controller.rb`**
```ruby
module Api
  class UsersController < ApplicationController
    # GET /api/users
    def index
      users = User.select(:id, :name, :email)
      
      render json: GlobalResponse.ok_with_data(
        users,
        'Usuarios obtenidos exitosamente'
      )
    end

    # GET /api/users/paginated
    def paginated
      page = (params[:page] || 1).to_i
      page_size = (params[:pageSize] || 10).to_i
      
      total_rows = User.count
      users = User.select(:id, :name, :email)
                  .offset((page - 1) * page_size)
                  .limit(page_size)
      
      render json: GlobalResponse.ok_paginated(
        users,
        total_rows,
        page,
        page_size
      )
    end

    # POST /api/users
    def create
      user = User.new(user_params)
      
      if user.save
        render json: GlobalResponse.ok_with_data(
          user.as_json(only: [:id, :name, :email]),
          'Usuario creado exitosamente',
          'USER_CREATED'
        ), status: :created
      else
        render json: GlobalResponse.error(
          user.errors.full_messages.first,
          'VALIDATION_ERROR'
        ), status: :bad_request
      end
    end

    private

    def user_params
      params.require(:user).permit(:name, :email)
    end
  end
end
```

**Archivo: `config/routes.rb`**
```ruby
Rails.application.routes.draw do
  namespace :api do
    resources :users, only: [:index, :create] do
      collection do
        get :paginated
      end
    end
  end
end
```

**Archivo: `config/application.rb`** (configurar autoload)
```ruby
require_relative "boot"
require "rails/all"

Bundler.require(*Rails.groups)

module MyRailsApi
  class Application < Rails::Application
    config.load_defaults 7.1
    config.api_only = true
    
    # Autoload lib directory
    config.eager_load_paths << Rails.root.join('app', 'lib')
    
    # CORS configuration
    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins '*'
        resource '*',
          headers: :any,
          methods: [:get, :post, :put, :patch, :delete, :options, :head]
      end
    end
  end
end
```

**Seeds para testing: `db/seeds.rb`**
```ruby
# Crear usuarios de prueba
User.create([
  { name: 'Juan Pérez', email: 'juan@example.com' },
  { name: 'María García', email: 'maria@example.com' }
])

puts "✅ #{User.count} usuarios creados"
```

#### 🎯 Comandos de Ejecución

```bash
# Crear y migrar base de datos
rails db:create
rails db:migrate

# Poblar datos de prueba
rails db:seed

# Iniciar servidor
rails server

# O en puerto específico
rails server -p 3000

# Probar
curl http://localhost:3000/api/users

# Consola de Rails (para debugging)
rails console
```

---

## 📖 Ejemplos de Uso

### Respuesta Exitosa Simple

```json
{
  "success": true,
  "message": "Operación completada"
}
```

### Respuesta con Datos

```json
{
  "success": true,
  "message": "Usuario obtenido",
  "data": {
    "id": 1,
    "name": "Juan"
  }
}
```

### Respuesta Paginada

```json
{
  "success": true,
  "message": "Usuarios obtenidos",
  "data": [...],
  "totalRows": 100,
  "currentPage": 1,
  "totalPages": 10,
  "pageSize": 10
}
```

### Respuesta de Error

```json
{
  "success": false,
  "message": "Usuario no encontrado",
  "code": "NOT_FOUND"
}
```

---

## 🏷️ Códigos de Error Recomendados

```typescript
// Definir constantes para códigos
const ErrorCodes = {
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
    NOT_FOUND: 'NOT_FOUND',
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    UNAUTHORIZED: 'UNAUTHORIZED',
    FORBIDDEN: 'FORBIDDEN',
    CONFLICT: 'CONFLICT',
    INTERNAL_ERROR: 'INTERNAL_ERROR',
    BAD_REQUEST: 'BAD_REQUEST',
    TIMEOUT: 'TIMEOUT'
};
```

---

## ✅ Mejores Prácticas

### 1. Consistencia

- Usa siempre la misma estructura de respuesta
- Define códigos de error estándar
- Mantén mensajes claros y descriptivos

### 2. Validación

```typescript
// Siempre valida pageSize para evitar división por cero
if (pageSize <= 0) {
    return GlobalResponse.error(
        'El tamaño de página debe ser mayor a 0',
        'VALIDATION_ERROR'
    );
}
```

### 3. Logging

```csharp
// Registra errores antes de retornar
try {
    // operación
} catch (Exception ex) {
    _logger.LogError(ex, "Error al procesar solicitud");
    return GlobalResponse<T>.Error(
        "Error interno del servidor",
        "INTERNAL_ERROR"
    );
}
```

### 4. Códigos HTTP Apropiados

```python
# Usa códigos HTTP correctos junto con GlobalResponse
@app.route('/users/<int:user_id>')
def get_user(user_id):
    user = find_user(user_id)
    if not user:
        response = GlobalResponse.error("Usuario no encontrado", "NOT_FOUND")
        return jsonify(response.to_dict()), 404  # HTTP 404
    
    return jsonify(GlobalResponse.ok_with_data(user))
```

### 5. Documentación

- Documenta todos los endpoints
- Especifica posibles códigos de respuesta
- Incluye ejemplos de request/response

---

## 🤝 Contribuir

Si encuentras algún error o tienes sugerencias:

1. Abre un issue describiendo el problema o mejora
2. Haz un fork del repositorio
3. Crea una rama con tu feature (`git checkout -b feature/AmazingFeature`)
4. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
5. Push a la rama (`git push origin feature/AmazingFeature`)
6. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Siéntete libre de usar, modificar y distribuir este código.

---

## 🎓 Recursos Adicionales

- [REST API Best Practices](https://restfulapi.net/)
- [HTTP Status Codes](https://httpstatuses.com/)
- [API Design Patterns](https://swagger.io/resources/articles/best-practices-in-api-design/)

---

**¿Preguntas o problemas?** Abre un issue en el repositorio.

**¿Te resultó útil?** Dale una ⭐ al repositorio!