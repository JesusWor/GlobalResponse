# 🌐 GlobalResponse

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Languages](https://img.shields.io/badge/languages-11-orange.svg)
![Frameworks](https://img.shields.io/badge/frameworks-15+-purple.svg)

**Respuestas HTTP estandarizadas para APIs REST en múltiples lenguajes y frameworks**

Una colección completa de implementaciones de respuestas HTTP consistentes que facilitan el desarrollo de APIs profesionales en más de 11 lenguajes de programación.

[🚀 Inicio Rápido](#-inicio-rápido) •
[📖 Documentación](#-documentación) •
[💡 Ejemplos](#-ejemplos) •
[🤝 Contribuir](#-contribuir)

</div>

---

## 📋 Tabla de Contenidos

- [¿Qué es GlobalResponse?](#-qué-es-globalresponse)
- [Características](#-características)
- [Lenguajes y Frameworks Soportados](#-lenguajes-y-frameworks-soportados)
- [Inicio Rápido](#-inicio-rápido)
- [Estructura de Respuesta](#-estructura-de-respuesta)
- [Documentación](#-documentación)
- [Ejemplos de Uso](#-ejemplos-de-uso)
- [Casos de Uso](#-casos-de-uso)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)

---

## 🎯 ¿Qué es GlobalResponse?

**GlobalResponse** es una colección de implementaciones de un patrón de respuesta HTTP estandarizado para APIs REST, disponible en múltiples lenguajes de programación y frameworks. 

Proporciona una estructura consistente y profesional para manejar:
- ✅ Respuestas exitosas con y sin datos
- ❌ Manejo de errores estructurado
- 📄 Paginación integrada
- 🔍 Validaciones con detalles granulares
- 🔒 Type-safety (cuando el lenguaje lo soporta)

### ¿Por qué usar GlobalResponse?

- **Consistencia**: Misma estructura de respuesta en todos tus servicios
- **Multi-lenguaje**: Migra entre tecnologías sin cambiar tu contrato de API
- **Profesional**: Implementa mejores prácticas de la industria
- **Productividad**: Código listo para copiar y usar
- **Mantenible**: Reduce el acoplamiento y facilita el testing

---

## ✨ Características

### 🎨 Respuestas Estandarizadas

```json
{
  "success": true,
  "message": "Usuario obtenido exitosamente",
  "data": { "id": 1, "name": "Juan Pérez" },
  "errors": null,
  "pagination": null
}
```

### 📊 Paginación Integrada

```json
{
  "success": true,
  "data": [...],
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

### 🚨 Manejo de Errores Estructurado

```json
{
  "success": false,
  "message": "Errores de validación",
  "errors": {
    "email": ["El formato del email es inválido"],
    "password": ["La contraseña debe tener al menos 8 caracteres"]
  }
}
```

### 🔐 Type-Safety

Aprovecha los sistemas de tipos de lenguajes modernos:

```typescript
const response: GlobalResponse<User> = GlobalResponse.okWithData(user);
```

```csharp
ServiceResponse<User> response = ServiceResponse<User>.CreateSuccess(user);
```

---

## 🗂️ Lenguajes y Frameworks Soportados

<table>
<tr>
<th>Lenguaje</th>
<th>Framework(s)</th>
<th>Versión</th>
<th>Archivo</th>
</tr>

<tr>
<td><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" width="20"/> C#</td>
<td>ASP.NET Core, Web API, Minimal APIs</td>
<td>.NET 6+</td>
<td><code>ServiceResponse.cs</code></td>
</tr>

<tr>
<td><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg" width="20"/> Go</td>
<td>Gin, Echo, Chi, Fiber, net/http</td>
<td>Go 1.18+</td>
<td><code>global_response.go</code></td>
</tr>

<tr>
<td><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg" width="20"/> Rust</td>
<td>Actix-web, Rocket, Axum, Warp</td>
<td>Rust 1.56+</td>
<td><code>global_response.rs</code></td>
</tr>

<tr>
<td><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg" width="20"/> Ruby</td>
<td>Ruby on Rails</td>
<td>Ruby 2.7+, Rails 6+</td>
<td><code>global_response.rb</code></td>
</tr>

<tr>
<td><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" width="20"/> Python</td>
<td>FastAPI, Flask, Django</td>
<td>Python 3.7+</td>
<td><code>global_response.py</code></td>
</tr>

<tr>
<td><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="20"/> TypeScript</td>
<td>NestJS, Next.js, Express</td>
<td>Node 16+</td>
<td><code>global-response.ts</code></td>
</tr>

<tr>
<td><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="20"/> JavaScript</td>
<td>Express, Koa, Fastify</td>
<td>Node 14+</td>
<td><code>global-response.js</code></td>
</tr>

<tr>
<td><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" width="20"/> Java</td>
<td>Spring Boot, Jakarta EE</td>
<td>Java 11+</td>
<td><code>GlobalResponse.java</code></td>
</tr>

<tr>
<td><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" width="20"/> PHP</td>
<td>Laravel, Symfony</td>
<td>PHP 8.0+</td>
<td><code>GlobalResponse.php</code></td>
</tr>
</table>

---

## 🚀 Inicio Rápido

### 1. Clona el repositorio

```bash
git clone https://github.com/JesusWor/GlobalResponse.git
cd GlobalResponse
```

### 2. Navega a tu lenguaje/framework

```bash
# Para .NET
cd "1ra Forma/C#"

# Para Python FastAPI
cd "1ra Forma/Python - FastAPI"

# Para TypeScript NestJS
cd "1ra Forma/TypeScript - NestJS"
```

### 3. Copia el archivo a tu proyecto

**Ejemplo con .NET:**
```bash
cp ServiceResponse.cs YourProject/Common/Models/
```

**Ejemplo con Python:**
```bash
cp global_response.py your_project/app/responses/
```

### 4. ¡Úsalo en tu código!

**C# / ASP.NET Core:**
```csharp
[HttpGet("{id}")]
public IActionResult GetUser(int id)
{
    var user = _service.GetById(id);
    if (user == null)
        return NotFound(ServiceResponse<User>.CreateError("Usuario no encontrado"));
    
    return Ok(ServiceResponse<User>.CreateSuccess(user));
}
```

**Python / FastAPI:**
```python
@app.get("/users/{user_id}")
async def get_user(user_id: int):
    user = await user_service.get_by_id(user_id)
    if not user:
        return GlobalResponse.not_found(f"Usuario {user_id} no encontrado")
    return GlobalResponse.ok_with_data(user)
```

**TypeScript / NestJS:**
```typescript
@Get(':id')
async getUser(@Param('id') id: string): Promise<GlobalResponse<User>> {
  const user = await this.usersService.findById(+id);
  if (!user) {
    throw new HttpException(
      GlobalResponse.notFound<User>('Usuario no encontrado'),
      HttpStatus.NOT_FOUND
    );
  }
  return GlobalResponse.okWithData(user);
}
```

---

## 📐 Estructura de Respuesta

### Interfaz Base

Todas las implementaciones siguen esta estructura consistente:

```typescript
interface GlobalResponse<T> {
  success: boolean;      // Indica si la operación fue exitosa
  message: string;       // Mensaje descriptivo
  data?: T;             // Datos de respuesta (opcional)
  errors?: any;         // Errores o detalles (opcional)
  pagination?: {        // Información de paginación (opcional)
    totalItems: number;
    currentPage: number;
    pageSize: number;
    totalPages: number;
    hasPrevious: boolean;
    hasNext: boolean;
  };
}
```

### Métodos Disponibles

Cada implementación proporciona los siguientes métodos (nombres adaptados a las convenciones de cada lenguaje):

#### ✅ Respuestas Exitosas

| Método | Descripción | Ejemplo |
|--------|-------------|---------|
| `ok()` | Respuesta exitosa simple | `GlobalResponse.ok("Operación exitosa")` |
| `okWithData()` | Respuesta con datos | `GlobalResponse.okWithData(user, "Usuario encontrado")` |
| `okPaginated()` | Respuesta paginada | `GlobalResponse.okPaginated(users, 150, 2, 20)` |

#### ❌ Respuestas de Error

| Método | Descripción | Ejemplo |
|--------|-------------|---------|
| `fail()` | Error simple | `GlobalResponse.fail("Operación fallida")` |
| `failWithErrors()` | Error con detalles | `GlobalResponse.failWithErrors("Error", errors)` |
| `validationError()` | Error de validación | `GlobalResponse.validationError("Validación", errors)` |
| `notFound()` | Recurso no encontrado | `GlobalResponse.notFound("Usuario no encontrado")` |
| `unauthorized()` | No autorizado | `GlobalResponse.unauthorized("Token inválido")` |
| `serverError()` | Error del servidor | `GlobalResponse.serverError("Error interno")` |

---

## 📖 Documentación

### Ejemplos de Salida

#### 1️⃣ Éxito Simple
```json
{
  "success": true,
  "message": "Usuario eliminado correctamente"
}
```

#### 2️⃣ Éxito con Datos
```json
{
  "success": true,
  "message": "Usuario obtenido exitosamente",
  "data": {
    "id": 1,
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "role": "admin"
  }
}
```

#### 3️⃣ Respuesta Paginada
```json
{
  "success": true,
  "message": "Usuarios obtenidos exitosamente",
  "data": [
    { "id": 1, "name": "Juan Pérez" },
    { "id": 2, "name": "María García" },
    { "id": 3, "name": "Carlos López" }
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

#### 4️⃣ Error de Validación
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

#### 5️⃣ Error No Encontrado
```json
{
  "success": false,
  "message": "Usuario con ID 999 no encontrado"
}
```

---

## 💡 Ejemplos de Uso

### CRUD Completo

<details>
<summary><b>C# / ASP.NET Core</b></summary>

```csharp
[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly IUserService _service;

    [HttpGet("{id}")]
    public IActionResult Get(int id)
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
    public IActionResult GetAll(int page = 1, int size = 20)
    {
        var (users, total) = _service.GetPaginated(page, size);
        return Ok(ServiceResponse<List<User>>.CreateSuccessWithPagination(
            users, 
            total, 
            page,
            size
        ));
    }

    [HttpPost]
    public IActionResult Create([FromBody] CreateUserDto dto)
    {
        if (!ModelState.IsValid)
        {
            var errors = ModelState.ToDictionary(
                kvp => kvp.Key,
                kvp => kvp.Value.Errors.Select(e => e.ErrorMessage).ToArray()
            );
            return BadRequest(ServiceResponse<object>.CreateError(
                "Datos inválidos",
                errors
            ));
        }

        var user = _service.Create(dto);
        return Ok(ServiceResponse<User>.CreateSuccess(user, "Usuario creado"));
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var deleted = _service.Delete(id);
        if (!deleted)
            return NotFound(ServiceResponse<object>.CreateError("No encontrado"));
        
        return Ok(ServiceResponse<object>.CreateSuccess("Usuario eliminado"));
    }
}
```
</details>

<details>
<summary><b>Python / FastAPI</b></summary>

```python
from fastapi import FastAPI, HTTPException, status
from app.responses.global_response import GlobalResponse

app = FastAPI()

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

@app.post("/users", response_model=GlobalResponse[User])
async def create_user(user_data: UserCreate):
    try:
        user = await user_service.create(user_data)
        return GlobalResponse[User].ok_with_data(user, "Usuario creado")
    except ValidationError as e:
        return GlobalResponse[User].validation_error(
            "Errores de validación",
            e.errors()
        )

@app.delete("/users/{user_id}", response_model=GlobalResponse[None])
async def delete_user(user_id: int):
    deleted = await user_service.delete(user_id)
    if not deleted:
        return GlobalResponse[None].not_found("Usuario no encontrado")
    return GlobalResponse[None].ok("Usuario eliminado")
```
</details>

<details>
<summary><b>TypeScript / NestJS</b></summary>

```typescript
import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { GlobalResponse } from '../common/dto/global-response.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<GlobalResponse<User>> {
    const user = await this.usersService.findById(+id);
    if (!user) {
      throw new HttpException(
        GlobalResponse.notFound<User>('Usuario no encontrado'),
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
  async createUser(@Body() dto: CreateUserDto): Promise<GlobalResponse<User>> {
    const user = await this.usersService.create(dto);
    return GlobalResponse.okWithData(user, 'Usuario creado');
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<GlobalResponse<void>> {
    const deleted = await this.usersService.delete(+id);
    if (!deleted) {
      throw new HttpException(
        GlobalResponse.notFound<void>('Usuario no encontrado'),
        HttpStatus.NOT_FOUND
      );
    }
    return GlobalResponse.ok('Usuario eliminado');
  }
}
```
</details>

<details>
<summary><b>Go / Gin</b></summary>

```go
package handlers

import (
    "net/http"
    "strconv"
    
    "github.com/gin-gonic/gin"
    "yourproject/internal/responses"
)

func GetUser(c *gin.Context) {
    id, _ := strconv.Atoi(c.Param("id"))
    
    user, err := userService.GetByID(id)
    if err != nil {
        c.JSON(http.StatusNotFound, 
            responses.NotFound[User]("Usuario no encontrado"))
        return
    }
    
    c.JSON(http.StatusOK, 
        responses.OkWithData(user, "Usuario encontrado"))
}

func GetUsers(c *gin.Context) {
    page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
    size, _ := strconv.Atoi(c.DefaultQuery("size", "20"))
    
    users, total, _ := userService.GetPaginated(page, size)
    
    c.JSON(http.StatusOK, 
        responses.OkPaginated(users, total, page, size, ""))
}

func CreateUser(c *gin.Context) {
    var dto CreateUserDto
    if err := c.ShouldBindJSON(&dto); err != nil {
        c.JSON(http.StatusBadRequest,
            responses.Fail[User]("Datos inválidos"))
        return
    }
    
    user, _ := userService.Create(dto)
    c.JSON(http.StatusCreated,
        responses.OkWithData(user, "Usuario creado"))
}

func DeleteUser(c *gin.Context) {
    id, _ := strconv.Atoi(c.Param("id"))
    
    deleted, _ := userService.Delete(id)
    if !deleted {
        c.JSON(http.StatusNotFound,
            responses.NotFound[any]("Usuario no encontrado"))
        return
    }
    
    c.JSON(http.StatusOK,
        responses.Ok[any]("Usuario eliminado"))
}
```
</details>

---

## 🎯 Casos de Uso

### 1. Autenticación y Autorización

```typescript
@Post('login')
async login(@Body() credentials: LoginDto) {
  try {
    const authData = await this.authService.login(credentials);
    return GlobalResponse.okWithData(authData, 'Login exitoso');
  } catch (error) {
    return GlobalResponse.unauthorized('Credenciales inválidas');
  }
}
```

### 2. Búsqueda y Filtros

```python
@app.get("/products/search")
async def search_products(
    q: str,
    page: int = 1,
    size: int = 20
):
    if not q:
        return GlobalResponse.validation_error(
            "Parámetro requerido",
            {"q": ["El parámetro de búsqueda es requerido"]}
        )
    
    products, total = await product_service.search(q, page, size)
    return GlobalResponse.ok_paginated(products, total, page, size)
```

### 3. Procesamiento por Lotes

```csharp
[HttpPost("batch")]
public IActionResult ProcessBatch([FromBody] List<int> ids)
{
    var result = _service.ProcessBatch(ids);
    
    if (result.FailedCount > 0)
    {
        return Ok(ServiceResponse<BatchResult>.CreateError(
            result,
            0,
            "Proceso completado con errores",
            "PARTIAL_FAILURE"
        ));
    }
    
    return Ok(ServiceResponse<BatchResult>.CreateSuccess(
        result,
        0,
        "Proceso completado exitosamente"
    ));
}
```

### 4. Validaciones Complejas

```java
@PostMapping
public ResponseEntity<GlobalResponse<User>> createUser(@RequestBody User user) {
    Map<String, List<String>> errors = new HashMap<>();
    
    if (user.getEmail() == null || !isValidEmail(user.getEmail())) {
        errors.put("email", List.of("Email inválido"));
    }
    
    if (user.getPassword() == null || user.getPassword().length() < 8) {
        errors.put("password", List.of("Contraseña muy corta"));
    }
    
    if (!errors.isEmpty()) {
        return ResponseEntity
            .badRequest()
            .body(GlobalResponse.validationError("Errores de validación", errors));
    }
    
    User created = userService.save(user);
    return ResponseEntity
        .status(HttpStatus.CREATED)
        .body(GlobalResponse.okWithData(created));
}
```

---

## 🏗️ Arquitectura del Repositorio

```
GlobalResponse/
├── 1ra Forma/                    # Implementaciones estándar
│   ├── C#/
│   │   └── ServiceResponse.cs
│   ├── Go/
│   │   └── global_response.go
│   ├── Rust/
│   │   └── global_response.rs
│   ├── Ruby/
│   │   └── global_response.rb
│   ├── Python - FastAPI/
│   │   └── global_response.py
│   ├── Python - Flask/
│   │   └── global_response.py
│   ├── TypeScript - NestJS/
│   │   └── global-response.dto.ts
│   ├── TypeScript - Next.js/
│   │   └── global-response.ts
│   ├── Java/
│   │   └── GlobalResponse.java
│   ├── JavaScript/
│   │   └── global-response.js
│   └── PHP/
│       └── GlobalResponse.php
│
├── 2da Forma/                    # Variaciones y alternativas
│   └── [Implementaciones alternativas]
│
└── README.md                     # Este archivo
```

---

## 🎨 Mejores Prácticas

### ✅ Hacer

- Usar mensajes descriptivos y consistentes
- Incluir códigos de error cuando sea apropiado
- Aplicar los códigos HTTP correctos (200, 201, 400, 404, 500)
- Validar datos antes de procesarlos
- Usar paginación para listas grandes
- Aprovechar type-safety cuando esté disponible

### ❌ Evitar

- Exponer detalles internos del servidor en producción
- Usar mensajes genéricos sin contexto
- Mezclar estructuras de respuesta
- Ignorar validaciones
- Retornar listas sin paginación

### 📊 Códigos HTTP Recomendados

| Código | Uso | Método GlobalResponse |
|--------|-----|----------------------|
| 200 | Operación exitosa | `ok()`, `okWithData()` |
| 201 | Recurso creado | `okWithData()` |
| 400 | Validación fallida | `validationError()` |
| 401 | No autenticado | `unauthorized()` |
| 403 | Sin permisos | `forbidden()` |
| 404 | No encontrado | `notFound()` |
| 500 | Error interno | `serverError()` |

---

## 🧪 Testing

### Ejemplo de Test (Jest - TypeScript)

```typescript
describe('GlobalResponse', () => {
  it('should create success response', () => {
    const response = GlobalResponse.ok('Success');
    expect(response.success).toBe(true);
    expect(response.message).toBe('Success');
  });

  it('should create paginated response', () => {
    const data = [1, 2, 3];
    const response = GlobalResponse.okPaginated(data, 50, 2, 10);
    
    expect(response.pagination?.totalPages).toBe(5);
    expect(response.pagination?.hasPrevious).toBe(true);
    expect(response.pagination?.hasNext).toBe(true);
  });

  it('should create validation error', () => {
    const errors = { email: ['Invalid format'] };
    const response = GlobalResponse.validationError('Validation failed', errors);
    
    expect(response.success).toBe(false);
    expect(response.errors).toEqual(errors);
  });
});
```

---

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Si deseas agregar:

- Nuevos lenguajes o frameworks
- Mejoras a las implementaciones existentes
- Correcciones de bugs
- Documentación adicional

### Proceso de Contribución

1. **Fork** el repositorio
2. **Crea** una rama para tu feature (`git checkout -b feature/nuevo-lenguaje`)
3. **Commit** tus cambios (`git commit -m 'Agregar soporte para Kotlin'`)
4. **Push** a la rama (`git push origin feature/nuevo-lenguaje`)
5. Abre un **Pull Request**

### Lineamientos

- Mantén la estructura consistente con otras implementaciones
- Incluye ejemplos de uso
- Documenta los métodos públicos
- Sigue las convenciones del lenguaje/framework
- Agrega tests si es posible

---

## 📜 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

```
MIT License

Copyright (c) 2026 JesusWor

Se concede permiso, de forma gratuita, a cualquier persona que obtenga una copia
de este software y archivos de documentación asociados (el "Software"), para 
usar el Software sin restricciones...
```

---

## 🌟 Apoyo al Proyecto

Si este proyecto te ha sido útil, considera:

- ⭐ Darle una estrella en GitHub
- 🐛 Reportar bugs o problemas
- 💡 Sugerir nuevas características
- 📢 Compartirlo con otros desarrolladores
- 🤝 Contribuir con código

---

## 📞 Contacto y Soporte

- **GitHub Issues**: [Reportar un problema](https://github.com/JesusWor/GlobalResponse/issues)
- **Pull Requests**: [Contribuir](https://github.com/JesusWor/GlobalResponse/pulls)
- **Discussions**: [Preguntas y discusiones](https://github.com/JesusWor/GlobalResponse/discussions)

---

## 📚 Recursos Adicionales

- [REST API Best Practices](https://restfulapi.net/)
- [HTTP Status Codes](https://httpstatuses.com/)
- [API Design Patterns](https://cloud.google.com/apis/design)
- [OpenAPI Specification](https://swagger.io/specification/)

---

<div align="center">

**Hecho con ❤️ por desarrolladores, para desarrolladores**

[⬆ Volver arriba](#-globalresponse)

</div>