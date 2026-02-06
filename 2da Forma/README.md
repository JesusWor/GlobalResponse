# Global Response - Respuestas Estandarizadas Multi-Framework

## 📋 Tabla de Contenidos

- [Descripción](#descripción)
- [Arquitecturas Disponibles](#arquitecturas-disponibles)
- [Instalación por Framework](#instalación-por-framework)
- [Estructura de Respuesta](#estructura-de-respuesta)
- [Ejemplos de Uso](#ejemplos-de-uso)
- [Salidas JSON](#salidas-json)
- [Casos de Uso Comunes](#casos-de-uso-comunes)
- [Mejores Prácticas](#mejores-prácticas)

---

## 📖 Descripción

Este repositorio contiene implementaciones de un sistema de respuestas estandarizadas para APIs REST en múltiples lenguajes y frameworks. Proporciona una estructura consistente para manejar respuestas exitosas, errores, validaciones y paginación.

### Características Principales

✅ Respuestas consistentes entre diferentes tecnologías  
✅ Manejo de paginación integrado  
✅ Gestión de errores estructurada  
✅ Validaciones con detalles granulares  
✅ Type-safe (cuando el lenguaje lo soporta)  
✅ Fácil integración

---

## 🗂️ Arquitecturas Disponibles

| Lenguaje/Framework | Archivo | Versión Mínima | Estado |
|-------------------|---------|----------------|--------|
| **.NET (C#)** | `ServiceResponse.cs` | .NET 6+ | ✅ Listo |
| **Go** | `global_response.go` | Go 1.18+ | ✅ Listo |
| **Rust** | `global_response.rs` | Rust 1.56+ | ✅ Listo |
| **Ruby on Rails** | `global_response.rb` | Ruby 2.7+, Rails 6+ | ✅ Listo |
| **Python - FastAPI** | `global_response.py` (FastAPI) | Python 3.8+, FastAPI 0.68+ | ✅ Listo |
| **Python - Flask** | `global_response.py` (Flask) | Python 3.7+, Flask 2.0+ | ✅ Listo |
| **TypeScript - NestJS** | `global-response.dto.ts` | Node 16+, NestJS 8+ | ✅ Listo |
| **TypeScript - Next.js** | `global-response.ts` | Node 16+, Next.js 12+ | ✅ Listo |
| **Java - Spring Boot** | `GlobalResponse.java` | Java 11+, Spring Boot 2.5+ | ✅ Listo |
| **JavaScript - Express** | `global-response.js` | Node 14+ | ✅ Listo |
| **PHP - Laravel** | `GlobalResponse.php` | PHP 8.0+, Laravel 8+ | ✅ Listo |

---

## 📦 Instalación por Framework

### .NET (C#)

**Frameworks compatibles:** ASP.NET Core, Minimal APIs, Web API
```bash
# Crear estructura de carpetas
mkdir -p Common/Models
```

**Ubicación del archivo:**
```
YourProject/
├── Common/
│   └── Models/
│       └── ServiceResponse.cs
```

**Uso en controlador:**
```csharp
using Common.Models;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    [HttpGet("{id}")]
    public IActionResult GetUser(int id)
    {
        var user = _service.GetById(id);
        
        if (user == null)
            return NotFound(ServiceResponse<User>.CreateError(
                "Usuario no encontrado", 
                "USER_NOT_FOUND"
            ));
        
        return Ok(ServiceResponse<User>.CreateSuccess(user));
    }

    [HttpGet]
    public IActionResult GetUsers(int page = 1)
    {
        var (users, total) = _service.GetPaginated(page, 100);
        
        return Ok(ServiceResponse<List<User>>.CreateSuccessWithPagination(
            users, 
            total, 
            page
        ));
    }
}
```

---

### Go

**Frameworks compatibles:** Gin, Echo, Chi, Fiber, net/http
```bash
# Crear estructura de módulos
mkdir -p internal/responses
```

**Ubicación del archivo:**
```
your-project/
├── internal/
│   └── responses/
│       └── global_response.go
```

**go.mod mínimo:**
```go
module github.com/yourusername/yourproject

go 1.18
```

**Uso con Gin:**
```go
package main

import (
    "github.com/gin-gonic/gin"
    "yourproject/internal/responses"
)

type User struct {
    ID    int    `json:"id"`
    Name  string `json:"name"`
    Email string `json:"email"`
}

func getUser(c *gin.Context) {
    id := c.Param("id")
    
    user, err := userService.GetByID(id)
    if err != nil {
        c.JSON(404, responses.NotFound[User]("Usuario no encontrado"))
        return
    }
    
    c.JSON(200, responses.OkWithData(user, "Usuario encontrado"))
}

func getUsers(c *gin.Context) {
    page := c.DefaultQuery("page", "1")
    
    users, total, _ := userService.GetPaginated(page, 100)
    
    c.JSON(200, responses.OkPaginated(users, total, 1, 100, ""))
}
```

---

### Rust

**Frameworks compatibles:** Actix-web, Rocket, Axum, Warp
```bash
# Agregar dependencias a Cargo.toml
```

**Cargo.toml:**
```toml
[dependencies]
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
actix-web = "4.0"  # O el framework que uses
```

**Ubicación del archivo:**
```
your-project/
├── src/
│   ├── responses/
│   │   └── global_response.rs
│   └── main.rs
```

**src/responses/mod.rs:**
```rust
pub mod global_response;
```

**Uso con Actix-web:**
```rust
use actix_web::{web, HttpResponse, Result};
use crate::responses::global_response::GlobalResponse;

#[derive(Serialize)]
struct User {
    id: i32,
    name: String,
    email: String,
}

async fn get_user(id: web::Path<i32>) -> Result<HttpResponse> {
    match user_service::get_by_id(*id).await {
        Some(user) => Ok(HttpResponse::Ok().json(
            GlobalResponse::ok_with_data(user, "Usuario encontrado")
        )),
        None => Ok(HttpResponse::NotFound().json(
            GlobalResponse::<User>::not_found("Usuario no encontrado")
        )),
    }
}

async fn get_users(query: web::Query<PaginationQuery>) -> Result<HttpResponse> {
    let (users, total) = user_service::get_paginated(query.page, 100).await;
    
    Ok(HttpResponse::Ok().json(
        GlobalResponse::ok_paginated(users, total, query.page, 100, "Usuarios obtenidos")
    ))
}
```

---

### Ruby on Rails

**Versión mínima:** Ruby 2.7+, Rails 6+

**Ubicación del archivo:**
```
your-rails-app/
├── app/
│   └── responses/
│       └── global_response.rb
```

**Autoload en config/application.rb:**
```ruby
config.autoload_paths += %W(#{config.root}/app/responses)
```

**Uso en controlador:**
```ruby
class UsersController < ApplicationController
  def show
    user = User.find_by(id: params[:id])
    
    if user
      render json: Responses::GlobalResponse.ok_with_data(user, 'Usuario encontrado')
    else
      render json: Responses::GlobalResponse.not_found('Usuario no encontrado'), status: :not_found
    end
  end

  def index
    page = params[:page]&.to_i || 1
    per_page = 20
    
    users = User.page(page).per(per_page)
    total = User.count
    
    render json: Responses::GlobalResponse.ok_paginated(
      users.as_json,
      total_items: total,
      current_page: page,
      page_size: per_page
    )
  end

  def create
    user = User.new(user_params)
    
    if user.save
      render json: Responses::GlobalResponse.ok_with_data(user, 'Usuario creado')
    else
      errors = user.errors.messages.transform_values { |v| v.map(&:to_s) }
      render json: Responses::GlobalResponse.validation_error('Errores de validación', errors),
             status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password)
  end
end
```

---

### Python - FastAPI

**Versión mínima:** Python 3.8+, FastAPI 0.68+

**Instalación:**
```bash
pip install fastapi pydantic
```

**Ubicación del archivo:**
```
your-fastapi-project/
├── app/
│   ├── responses/
│   │   ├── __init__.py
│   │   └── global_response.py
│   └── main.py
```

**Uso:**
```python
from fastapi import FastAPI, HTTPException, status
from app.responses.global_response import GlobalResponse, PaginationInfo
from pydantic import BaseModel
from typing import List

app = FastAPI()

class User(BaseModel):
    id: int
    name: str
    email: str

class UserCreate(BaseModel):
    name: str
    email: str

@app.get("/users/{user_id}", response_model=GlobalResponse[User])
async def get_user(user_id: int):
    user = await user_service.get_by_id(user_id)
    
    if not user:
        return GlobalResponse[User].not_found(f"Usuario {user_id} no encontrado")
    
    return GlobalResponse[User].ok_with_data(user, "Usuario encontrado")

@app.get("/users", response_model=GlobalResponse[List[User]])
async def get_users(page: int = 1, size: int = 20):
    users, total = await user_service.get_paginated(page, size)
    
    return GlobalResponse[List[User]].ok_paginated(
        users,
        total_items=total,
        current_page=page,
        page_size=size
    )

@app.post("/users", response_model=GlobalResponse[User], status_code=status.HTTP_201_CREATED)
async def create_user(user_data: UserCreate):
    try:
        user = await user_service.create(user_data)
        return GlobalResponse[User].ok_with_data(user, "Usuario creado exitosamente")
    except ValidationError as e:
        return GlobalResponse[User].validation_error(
            "Errores de validación",
            e.errors()
        )
```

---

### Python - Flask

**Versión mínima:** Python 3.7+, Flask 2.0+

**Instalación:**
```bash
pip install flask
```

**Ubicación del archivo:**
```
your-flask-project/
├── app/
│   ├── responses/
│   │   ├── __init__.py
│   │   └── global_response.py
│   └── routes.py
```

**Uso:**
```python
from flask import Flask, jsonify, request
from app.responses.global_response import GlobalResponse
from dataclasses import dataclass

app = Flask(__name__)

@dataclass
class User:
    id: int
    name: str
    email: str

@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = user_service.get_by_id(user_id)
    
    if not user:
        response = GlobalResponse.not_found(f"Usuario {user_id} no encontrado")
        return jsonify(response.to_dict()), 404
    
    response = GlobalResponse.ok_with_data(user.__dict__, "Usuario encontrado")
    return jsonify(response.to_dict())

@app.route('/users', methods=['GET'])
def get_users():
    page = request.args.get('page', 1, type=int)
    size = request.args.get('size', 20, type=int)
    
    users, total = user_service.get_paginated(page, size)
    users_dict = [user.__dict__ for user in users]
    
    response = GlobalResponse.ok_paginated(
        users_dict,
        total_items=total,
        current_page=page,
        page_size=size
    )
    return jsonify(response.to_dict())

@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    
    # Validación simple
    errors = {}
    if not data.get('name'):
        errors['name'] = ['El nombre es requerido']
    if not data.get('email'):
        errors['email'] = ['El email es requerido']
    
    if errors:
        response = GlobalResponse.validation_error(
            "Errores de validación",
            errors
        )
        return jsonify(response.to_dict()), 400
    
    user = user_service.create(data)
    response = GlobalResponse.ok_with_data(user.__dict__, "Usuario creado")
    return jsonify(response.to_dict()), 201
```

---

### TypeScript - NestJS

**Versión mínima:** Node 16+, NestJS 8+

**Instalación:**
```bash
npm install @nestjs/common @nestjs/core reflect-metadata rxjs
```

**Ubicación del archivo:**
```
your-nestjs-project/
├── src/
│   ├── common/
│   │   └── dto/
│   │       └── global-response.dto.ts
│   └── users/
│       └── users.controller.ts
```

**Uso:**
```typescript
import { Controller, Get, Post, Body, Param, HttpStatus, HttpException } from '@nestjs/common';
import { GlobalResponse } from '../common/dto/global-response.dto';

interface User {
  id: number;
  name: string;
  email: string;
}

interface CreateUserDto {
  name: string;
  email: string;
}

@Controller('users')
export class UsersController {
  
  @Get(':id')
  async getUser(@Param('id') id: string): Promise<GlobalResponse<User>> {
    const user = await this.usersService.findById(+id);
    
    if (!user) {
      throw new HttpException(
        GlobalResponse.notFound<User>(`Usuario ${id} no encontrado`),
        HttpStatus.NOT_FOUND
      );
    }
    
    return GlobalResponse.okWithData(user, 'Usuario encontrado');
  }

  @Get()
  async getUsers(
    @Query('page') page: number = 1,
    @Query('size') size: number = 20
  ): Promise<GlobalResponse<User[]>> {
    const [users, total] = await this.usersService.findPaginated(page, size);
    
    return GlobalResponse.okPaginated(users, total, page, size);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<GlobalResponse<User>> {
    try {
      const user = await this.usersService.create(createUserDto);
      return GlobalResponse.okWithData(user, 'Usuario creado exitosamente');
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw new HttpException(
          GlobalResponse.validationError<User>('Errores de validación', error.errors),
          HttpStatus.BAD_REQUEST
        );
      }
      throw error;
    }
  }
}
```

---

### TypeScript - Next.js

**Versión mínima:** Node 16+, Next.js 12+

**Ubicación del archivo:**
```
your-nextjs-project/
├── lib/
│   └── global-response.ts
├── pages/
│   └── api/
│       └── users/
│           ├── [id].ts
│           └── index.ts
```

**Uso en API Routes:**
```typescript
// pages/api/users/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { GlobalResponse } from '../../../lib/global-response';

interface User {
  id: number;
  name: string;
  email: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GlobalResponse<User>>
) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const user = await getUserById(Number(id));
    
    if (!user) {
      return res.status(404).json(
        GlobalResponse.notFound<User>(`Usuario ${id} no encontrado`)
      );
    }
    
    return res.status(200).json(
      GlobalResponse.okWithData(user, 'Usuario encontrado')
    );
  }

  return res.status(405).json(
    GlobalResponse.fail<User>('Método no permitido')
  );
}

// pages/api/users/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { GlobalResponse } from '../../../lib/global-response';

interface User {
  id: number;
  name: string;
  email: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GlobalResponse<User[] | User>>
) {
  if (req.method === 'GET') {
    const page = Number(req.query.page) || 1;
    const size = Number(req.query.size) || 20;
    
    const { users, total } = await getUsersPaginated(page, size);
    
    return res.status(200).json(
      GlobalResponse.okPaginated(users, total, page, size)
    );
  }

  if (req.method === 'POST') {
    const { name, email } = req.body;
    
    if (!name || !email) {
      return res.status(400).json(
        GlobalResponse.validationError<User>('Datos inválidos', {
          name: !name ? ['El nombre es requerido'] : [],
          email: !email ? ['El email es requerido'] : [],
        })
      );
    }
    
    const user = await createUser({ name, email });
    
    return res.status(201).json(
      GlobalResponse.okWithData(user, 'Usuario creado')
    );
  }

  return res.status(405).json(
    GlobalResponse.fail<User>('Método no permitido')
  );
}
```

**Uso en el cliente (React):**
```typescript
// components/UsersList.tsx
import { useState, useEffect } from 'react';
import { GlobalResponse } from '../lib/global-response';

interface User {
  id: number;
  name: string;
  email: string;
}

export default function UsersList() {
  const [response, setResponse] = useState<GlobalResponse<User[]> | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(`/api/users?page=${page}&size=20`)
      .then(res => res.json())
      .then((data: GlobalResponse<User[]>) => setResponse(data));
  }, [page]);

  if (!response) return <div>Cargando...</div>;

  if (!response.success) {
    return <div>Error: {response.message}</div>;
  }

  return (
    <div>
      <h1>{response.message}</h1>
      <ul>
        {response.data?.map(user => (
          <li key={user.id}>{user.name} - {user.email}</li>
        ))}
      </ul>
      
      {response.pagination && (
        <div>
          <button 
            disabled={!response.pagination.hasPrevious}
            onClick={() => setPage(page - 1)}
          >
            Anterior
          </button>
          <span>Página {response.pagination.currentPage} de {response.pagination.totalPages}</span>
          <button 
            disabled={!response.pagination.hasNext}
            onClick={() => setPage(page + 1)}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}
```

---

### Java - Spring Boot

**Versión mínima:** Java 11+, Spring Boot 2.5+

**Dependencias Maven (pom.xml):**
```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <optional>true</optional>
    </dependency>
    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-databind</artifactId>
    </dependency>
</dependencies>
```

**Dependencias Gradle (build.gradle):**
```gradle
dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
    compileOnly 'org.projectlombok:lombok'
    annotationProcessor 'org.projectlombok:lombok'
}
```

**Ubicación del archivo:**
```
your-spring-project/
├── src/
│   └── main/
│       └── java/
│           └── com/
│               └── example/
│                   ├── common/
│                   │   └── responses/
│                   │       └── GlobalResponse.java
│                   └── controllers/
│                       └── UserController.java
```

**Uso:**
```java
package com.example.controllers;

import com.example.common.responses.GlobalResponse;
import com.example.models.User;
import com.example.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<GlobalResponse<User>> getUser(@PathVariable Long id) {
        User user = userService.findById(id);
        
        if (user == null) {
            return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(GlobalResponse.notFound("Usuario no encontrado"));
        }
        
        return ResponseEntity.ok(
            GlobalResponse.okWithData(user, "Usuario encontrado")
        );
    }

    @GetMapping
    public ResponseEntity<GlobalResponse<List<User>>> getUsers(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "20") int size) {
        
        List<User> users = userService.findPaginated(page, size);
        int total = userService.count();
        
        return ResponseEntity.ok(
            GlobalResponse.okPaginated(users, total, page, size)
        );
    }

    @PostMapping
    public ResponseEntity<GlobalResponse<User>> createUser(
            @Valid @RequestBody User user,
            BindingResult result) {
        
        if (result.hasErrors()) {
            Map<String, List<String>> errors = new HashMap<>();
            result.getFieldErrors().forEach(error -> {
                String field = error.getField();
                String message = error.getDefaultMessage();
                errors.computeIfAbsent(field, k -> new ArrayList<>()).add(message);
            });
            
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(GlobalResponse.validationError("Errores de validación", errors));
        }
        
        User savedUser = userService.save(user);
        
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(GlobalResponse.okWithData(savedUser, "Usuario creado exitosamente"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<GlobalResponse<Void>> deleteUser(@PathVariable Long id) {
        boolean deleted = userService.delete(id);
        
        if (!deleted) {
            return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(GlobalResponse.notFound("Usuario no encontrado"));
        }
        
        return ResponseEntity.ok(
            GlobalResponse.ok("Usuario eliminado exitosamente")
        );
    }
}
```

---

### JavaScript - Express.js

**Versión mínima:** Node 14+

**Instalación:**
```bash
npm install express
```

**Ubicación del archivo:**
```
your-express-project/
├── src/
│   ├── responses/
│   │   └── global-response.js
│   ├── routes/
│   │   └── users.js
│   └── app.js
```

**Uso:**
```javascript
// src/routes/users.js
const express = require('express');
const { GlobalResponse } = require('../responses/global-response');
const router = express.Router();

// GET /users/:id
router.get('/:id', async (req, res) => {
  try {
    const user = await userService.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json(
        GlobalResponse.notFound(`Usuario ${req.params.id} no encontrado`)
      );
    }
    
    res.json(GlobalResponse.okWithData(user, 'Usuario encontrado'));
  } catch (error) {
    res.status(500).json(
      GlobalResponse.serverError('Error al obtener usuario')
    );
  }
});

// GET /users
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 20;
    
    const { users, total } = await userService.findPaginated(page, size);
    
    res.json(GlobalResponse.okPaginated(users, total, page, size));
  } catch (error) {
    res.status(500).json(
      GlobalResponse.serverError('Error al obtener usuarios')
    );
  }
});

// POST /users
router.post('/', async (req, res) => {
  try {
    const { name, email } = req.body;
    
    // Validación simple
    const errors = {};
    if (!name) errors.name = ['El nombre es requerido'];
    if (!email) errors.email = ['El email es requerido'];
    
    if (Object.keys(errors).length > 0) {
      return res.status(400).json(
        GlobalResponse.validationError('Errores de validación', errors)
      );
    }
    
    const user = await userService.create({ name, email });
    
    res.status(201).json(
      GlobalResponse.okWithData(user, 'Usuario creado exitosamente')
    );
  } catch (error) {
    res.status(500).json(
      GlobalResponse.serverError('Error al crear usuario')
    );
  }
});

// DELETE /users/:id
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await userService.delete(req.params.id);
    
    if (!deleted) {
      return res.status(404).json(
        GlobalResponse.notFound('Usuario no encontrado')
      );
    }
    
    res.json(GlobalResponse.ok('Usuario eliminado exitosamente'));
  } catch (error) {
    res.status(500).json(
      GlobalResponse.serverError('Error al eliminar usuario')
    );
  }
});

module.exports = router;

// src/app.js
const express = require('express');
const usersRouter = require('./routes/users');

const app = express();

app.use(express.json());
app.use('/api/users', usersRouter);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

---

### PHP - Laravel

**Versión mínima:** PHP 8.0+, Laravel 8+

**Ubicación del archivo:**
```
your-laravel-project/
├── app/
│   └── Http/
│       └── Responses/
│           └── GlobalResponse.php
```

**Autoload en composer.json:**
```json
{
  "autoload": {
    "psr-4": {
      "App\\": "app/",
      "App\\Http\\Responses\\": "app/Http/Responses/"
    }
  }
}
```

Después ejecutar:
```bash
composer dump-autoload
```

**Uso:**
```php
<?php

namespace App\Http\Controllers;

use App\Http\Responses\GlobalResponse;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function show($id)
    {
        $user = User::find($id);
        
        if (!$user) {
            return response()->json(
                GlobalResponse::notFound("Usuario {$id} no encontrado"),
                404
            );
        }
        
        return response()->json(
            GlobalResponse::okWithData($user, 'Usuario encontrado')
        );
    }

    public function index(Request $request)
    {
        $page = $request->input('page', 1);
        $size = $request->input('size', 20);
        
        $users = User::paginate($size, ['*'], 'page', $page);
        
        return response()->json(
            GlobalResponse::okPaginated(
                $users->items(),
                $users->total(),
                $users->currentPage(),
                $users->perPage()
            )
        );
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8',
        ]);

        if ($validator->fails()) {
            $errors = [];
            foreach ($validator->errors()->toArray() as $field => $messages) {
                $errors[$field] = $messages;
            }
            
            return response()->json(
                GlobalResponse::validationError('Errores de validación', $errors),
                400
            );
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        return response()->json(
            GlobalResponse::okWithData($user, 'Usuario creado exitosamente'),
            201
        );
    }

    public function destroy($id)
    {
        $user = User::find($id);
        
        if (!$user) {
            return response()->json(
                GlobalResponse::notFound('Usuario no encontrado'),
                404
            );
        }
        
        $user->delete();
        
        return response()->json(
            GlobalResponse::ok('Usuario eliminado exitosamente')
        );
    }
}
```

**Rutas (routes/api.php):**
```php
<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::prefix('users')->group(function () {
    Route::get('/', [UserController::class, 'index']);
    Route::get('/{id}', [UserController::class, 'show']);
    Route::post('/', [UserController::class, 'store']);
    Route::delete('/{id}', [UserController::class, 'destroy']);
});
```

---

## 📊 Estructura de Respuesta

Todas las implementaciones siguen esta estructura consistente:
```json
{
  "success": boolean,
  "message": string,
  "data": T | null,
  "errors": any | null,
  "pagination": {
    "totalItems": number,
    "currentPage": number,
    "pageSize": number,
    "totalPages": number,
    "hasPrevious": boolean,
    "hasNext": boolean
  } | null
}
```

---

## 💡 Ejemplos de Uso

### Métodos Disponibles

Todos los frameworks tienen estos métodos disponibles (con nombres ligeramente diferentes según las convenciones del lenguaje):

#### ✅ Respuestas Exitosas

| Método | Descripción | Parámetros |
|--------|-------------|------------|
| `ok()` / `Ok()` / `CreateSuccess()` | Respuesta exitosa simple | `message` |
| `okWithData()` / `OkWithData()` / `CreateSuccess()` | Respuesta exitosa con datos | `data, message` |
| `okPaginated()` / `OkPaginated()` / `CreateSuccessWithPagination()` | Respuesta con paginación | `data, totalItems, currentPage, pageSize, message` |

#### ❌ Respuestas de Error

| Método | Descripción | Parámetros |
|--------|-------------|------------|
| `fail()` / `Fail()` / `CreateError()` | Error simple | `message` |
| `failWithErrors()` / `CreateError()` | Error con detalles | `message, errors` |
| `validationError()` / `ValidationError()` | Error de validación | `message, validationErrors` |
| `notFound()` / `NotFound()` | Recurso no encontrado | `message` |
| `unauthorized()` / `Unauthorized()` | No autorizado | `message` |
| `serverError()` / `ServerError()` | Error del servidor | `message` |

---

## 🎯 Salidas JSON

### 1. Éxito Simple
```json
{
  "success": true,
  "message": "Usuario eliminado correctamente"
}
```

### 2. Éxito con Datos
```json
{
  "success": true,
  "message": "Usuario encontrado",
  "data": {
    "id": 1,
    "name": "Juan Pérez",
    "email": "juan@example.com"
  }
}
```

### 3. Éxito con Paginación
```json
{
  "success": true,
  "message": "Usuarios obtenidos exitosamente",
  "data": [
    { "id": 1, "name": "Juan Pérez", "email": "juan@example.com" },
    { "id": 2, "name": "María García", "email": "maria@example.com" },
    { "id": 3, "name": "Carlos López", "email": "carlos@example.com" }
  ],
  "pagination": {
    "totalItems": 150,
    "currentPage": 2,
    "pageSize": 20,
    "totalPages": 8,
    "hasPrevious": true,
    "hasNext": true
  }
}
```

### 4. Error Simple
```json
{
  "success": false,
  "message": "No se pudo completar la operación"
}
```

### 5. Error de Validación
```json
{
  "success": false,
  "message": "Errores de validación en el formulario",
  "errors": {
    "email": ["El formato del email es inválido"],
    "password": [
      "La contraseña debe tener al menos 8 caracteres",
      "Debe incluir al menos un número"
    ],
    "phone": ["El teléfono es requerido"]
  }
}
```

### 6. Error No Encontrado
```json
{
  "success": false,
  "message": "Usuario con ID 999 no encontrado"
}
```

### 7. Error No Autorizado
```json
{
  "success": false,
  "message": "Token de autenticación inválido o expirado"
}
```

### 8. Error del Servidor
```json
{
  "success": false,
  "message": "Error interno del servidor",
  "errors": {
    "code": "DB_CONNECTION_FAILED",
    "detail": "No se pudo conectar a la base de datos"
  }
}
```

---

## 🔧 Casos de Uso Comunes

### Caso 1: CRUD Básico

**Crear un recurso:**
```javascript
// Express.js
router.post('/products', async (req, res) => {
  const product = await productService.create(req.body);
  res.status(201).json(
    GlobalResponse.okWithData(product, 'Producto creado exitosamente')
  );
});
```

**Leer un recurso:**
```python
# FastAPI
@app.get("/products/{product_id}")
async def get_product(product_id: int):
    product = await product_service.get_by_id(product_id)
    if not product:
        return GlobalResponse.not_found(f"Producto {product_id} no encontrado")
    return GlobalResponse.ok_with_data(product)
```

**Actualizar un recurso:**
```java
// Spring Boot
@PutMapping("/{id}")
public ResponseEntity<GlobalResponse<Product>> updateProduct(
        @PathVariable Long id,
        @Valid @RequestBody Product product) {
    
    Product updated = productService.update(id, product);
    return ResponseEntity.ok(
        GlobalResponse.okWithData(updated, "Producto actualizado")
    );
}
```

**Eliminar un recurso:**
```csharp
// ASP.NET Core
[HttpDelete("{id}")]
public IActionResult DeleteProduct(int id)
{
    var deleted = _service.Delete(id);
    if (!deleted)
        return NotFound(ServiceResponse<object>.CreateError("Producto no encontrado"));
    
    return Ok(ServiceResponse<object>.CreateSuccess("Producto eliminado"));
}
```

### Caso 2: Autenticación
```typescript
// NestJS
@Post('login')
async login(@Body() credentials: LoginDto): Promise<GlobalResponse<AuthResponse>> {
  try {
    const authData = await this.authService.login(credentials);
    return GlobalResponse.okWithData(authData, 'Login exitoso');
  } catch (error) {
    if (error instanceof UnauthorizedException) {
      throw new HttpException(
        GlobalResponse.unauthorized<AuthResponse>('Credenciales inválidas'),
        HttpStatus.UNAUTHORIZED
      );
    }
    throw error;
  }
}
```

### Caso 3: Manejo de Validaciones
```ruby
# Ruby on Rails
def create
  user = User.new(user_params)
  
  if user.save
    render json: Responses::GlobalResponse.ok_with_data(user, 'Usuario creado'),
           status: :created
  else
    errors = user.errors.messages.transform_values { |v| v.map(&:to_s) }
    render json: Responses::GlobalResponse.validation_error('Errores de validación', errors),
           status: :unprocessable_entity
  end
end
```

### Caso 4: Paginación de Resultados
```go
// Go con Gin
func getProducts(c *gin.Context) {
    page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
    size, _ := strconv.Atoi(c.DefaultQuery("size", "20"))
    
    products, total, err := productService.GetPaginated(page, size)
    if err != nil {
        c.JSON(500, responses.ServerError[[]Product]("Error al obtener productos"))
        return
    }
    
    c.JSON(200, responses.OkPaginated(products, total, page, size, ""))
}
```

### Caso 5: Búsqueda y Filtros
```php
// Laravel
public function search(Request $request)
{
    $query = $request->input('q');
    $page = $request->input('page', 1);
    $size = $request->input('size', 20);
    
    if (empty($query)) {
        return response()->json(
            GlobalResponse::validationError('Parámetro de búsqueda requerido', [
                'q' => ['El parámetro de búsqueda es requerido']
            ]),
            400
        );
    }
    
    $results = Product::where('name', 'like', "%{$query}%")
        ->orWhere('description', 'like', "%{$query}%")
        ->paginate($size, ['*'], 'page', $page);
    
    return response()->json(
        GlobalResponse::okPaginated(
            $results->items(),
            $results->total(),
            $results->currentPage(),
            $results->perPage(),
            "Se encontraron {$results->total()} resultados"
        )
    );
}
```

### Caso 6: Manejo de Errores Globales
```rust
// Rust con Actix-web
async fn global_error_handler(err: Error) -> HttpResponse {
    match err {
        Error::NotFound => HttpResponse::NotFound().json(
            GlobalResponse::<()>::not_found("Recurso no encontrado")
        ),
        Error::Unauthorized => HttpResponse::Unauthorized().json(
            GlobalResponse::<()>::unauthorized("No autorizado")
        ),
        Error::ValidationError(errors) => HttpResponse::BadRequest().json(
            GlobalResponse::<()>::validation_error("Errores de validación", errors)
        ),
        _ => HttpResponse::InternalServerError().json(
            GlobalResponse::<()>::server_error("Error interno del servidor")
        ),
    }
}
```

---

## 🎨 Mejores Prácticas

### 1. Consistencia en los Mensajes

✅ **Recomendado:**
```javascript
GlobalResponse.ok("Usuario creado exitosamente")
GlobalResponse.ok("Usuario actualizado exitosamente")
GlobalResponse.ok("Usuario eliminado exitosamente")
```

❌ **Evitar:**
```javascript
GlobalResponse.ok("Se creo el usuario")
GlobalResponse.ok("Updated!")
GlobalResponse.ok("delete ok")
```

### 2. Códigos HTTP Apropiados
```typescript
// Éxitos
200 OK          → Operación exitosa
201 Created     → Recurso creado
204 No Content  → Éxito sin contenido (raro con GlobalResponse)

// Errores del Cliente
400 Bad Request        → Validación fallida
401 Unauthorized       → No autenticado
403 Forbidden          → Sin permisos
404 Not Found          → Recurso no existe
422 Unprocessable      → Validación semántica fallida

// Errores del Servidor
500 Internal Error     → Error no esperado
503 Service Unavailable→ Servicio temporalmente no disponible
```

### 3. Manejo de Errores de Validación

Usa estructuras consistentes para errores de validación:
```json
{
  "campo": ["error1", "error2"],
  "otroCampo": ["error1"]
}
```

### 4. Paginación

Siempre incluye información completa de paginación:
```javascript
// ✅ Bueno
GlobalResponse.okPaginated(data, 150, 2, 20)

// ❌ Malo - información incompleta
{ 
  data: [...],
  total: 150
}
```

### 5. No Exponer Detalles Internos

❌ **Evitar en producción:**
```javascript
GlobalResponse.serverError("SQLException: Connection timeout at db.connection.pool")
```

✅ **Recomendado:**
```javascript
GlobalResponse.serverError("Error al procesar la solicitud")
// Log interno: SQLException: Connection timeout...
```

### 6. Usar Type Safety

En lenguajes tipados, aprovecha los genéricos:
```typescript
// ✅ Type-safe
const response: GlobalResponse<User> = GlobalResponse.okWithData(user);

// ❌ Pierde type safety
const response: any = GlobalResponse.okWithData(user);
```

### 7. Middleware de Respuestas

Centraliza el manejo de respuestas:
```javascript
// Express.js
app.use((req, res, next) => {
  res.success = (data, message) => {
    res.json(GlobalResponse.okWithData(data, message));
  };
  
  res.fail = (message, statusCode = 400) => {
    res.status(statusCode).json(GlobalResponse.fail(message));
  };
  
  next();
});

// Uso
router.get('/users/:id', (req, res) => {
  const user = getUserById(req.params.id);
  res.success(user, 'Usuario encontrado');
});
```

---

## 📝 Testing

### Ejemplo de Test (Jest - JavaScript/TypeScript)
```javascript
describe('GlobalResponse', () => {
  describe('Success responses', () => {
    it('should create ok response', () => {
      const response = GlobalResponse.ok('Success');
      
      expect(response.success).toBe(true);
      expect(response.message).toBe('Success');
      expect(response.data).toBeUndefined();
    });

    it('should create ok response with data', () => {
      const data = { id: 1, name: 'Test' };
      const response = GlobalResponse.okWithData(data);
      
      expect(response.success).toBe(true);
      expect(response.data).toEqual(data);
    });

    it('should create paginated response', () => {
      const data = [1, 2, 3];
      const response = GlobalResponse.okPaginated(data, 50, 2, 10);
      
      expect(response.success).toBe(true);
      expect(response.data).toEqual(data);
      expect(response.pagination).toEqual({
        totalItems: 50,
        currentPage: 2,
        pageSize: 10,
        totalPages: 5,
        hasPrevious: true,
        hasNext: true
      });
    });
  });

  describe('Error responses', () => {
    it('should create fail response', () => {
      const response = GlobalResponse.fail('Error occurred');
      
      expect(response.success).toBe(false);
      expect(response.message).toBe('Error occurred');
    });

    it('should create validation error', () => {
      const errors = { email: ['Invalid format'] };
      const response = GlobalResponse.validationError('Validation failed', errors);
      
      expect(response.success).toBe(false);
      expect(response.errors).toEqual(errors);
    });
  });
});
```

### Ejemplo de Test (Python - pytest)
```python
import pytest
from app.responses.global_response import GlobalResponse

def test_ok_response():
    response = GlobalResponse.ok("Success")
    assert response.success == True
    assert response.message == "Success"
    assert response.data is None

def test_ok_with_data():
    data = {"id": 1, "name": "Test"}
    response = GlobalResponse.ok_with_data(data)
    assert response.success == True
    assert response.data == data

def test_paginated_response():
    data = [1, 2, 3]
    response = GlobalResponse.ok_paginated(data, 50, 2, 10)
    assert response.success == True
    assert response.pagination.total_items == 50
    assert response.pagination.total_pages == 5
    assert response.pagination.has_previous == True
    assert response.pagination.has_next == True

def test_validation_error():
    errors = {"email": ["Invalid format"]}
    response = GlobalResponse.validation_error("Validation failed", errors)
    assert response.success == False
    assert response.errors == errors
```

---

## 🤝 Contribuciones

¿Falta algún framework o lenguaje? Abre un issue o pull request.

---

## 📄 Licencia

MIT License - Siéntete libre de usar este código en tus proyectos.

---

## 📞 Soporte

Para preguntas o problemas:
- Abre un issue en GitHub
- Consulta la documentación de tu framework específico
- Revisa los ejemplos de uso arriba

---

**Última actualización:** Febrero 2026