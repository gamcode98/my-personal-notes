## Instalación

### Angular CLI

```console
npm i -g @angular/cli
```

### Comandos de Angular para correr un proyecto

- Siguiente comando a ejecutar es : `ng version`
- Comando para crear un proyecto: `ng new my-app`
- Correr servidor en Angular: `ng serve`, con la opción `-o` abre el navegador por defecto.
- Cambiar de puerto: `ng serve -o --port=3500`
- Con `ng version` dentro de un proyecto podemos ver las dependencias que trae el proyecto.

### Estructura de un proyecto en Angular

- La carpeta **src** es donde se desarrolla.
- El archivo **.browserslistrc** figuran los navegadores a los cuales se les puede dar soporte.
- El archivo **.editorconfig** se establecen las normativas para trabajar en equipo (identación, etc), hay que tener instalado la extesión en **vscode**.
- Una extensión para **vscode** que ayuda en el desarrollo es [**Angular Language Service**](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template)
- Una recomendación es agregar un archivo **.nvmrc** en el proyecto e indicar la versión que se está utilizando de **node**.

### Ejemplos básicos de TypeScript para usar en Angular

- Asignar tipo de dato:

```typescript
const username: string | number = "gamcode";
//Se está diciendo que username puede ser de tipo string o number
```

- Ejemplo de una función suma:

```typescript
const suma = (a: number, b: number) => {
  return a + b;
};
suma(2, "asdad"); //Marca error de sintaxis en vscode algo que no sucede con vanilla JS
```

> Angular usa el concepto de POO

- Ejemplo:

```typescript
class Person {
  age: number;
  lastName: string;

  constructor(age: number, lastName: string) {
    this.age = age;
    this.lastName = lastName;
  }
}
```

- Otra forma de hacer lo mismo:

```typescript
class Person {
  constructor(public age: number, public lastName: string) {}
}
```

- Se lo puede usar:

```typescript
const gabriel = new Person(23, "Mamani");
gabriel.age;
```

### Data binding con ngModel

```html
<!--Archivo app.component.html-->
<h1>ngModel</h1>
<p>Nombre: {{thing.name}}</p>
<input type="text" required #nameInput="ngModel" [(ngModel)]="thing.name" />
<p>Valid: {{nameInput.valid}}</p>
<br />
<p>Number: {{thing.number}}</p>
<input
  type="number"
  max="100"
  min="1"
  required
  #numberInput="ngModel"
  [(ngModel)]="thing.number"
/>
<p>Valid: {{numberInput.valid}}</p>
```

Para que funcione **ngModel** hay que importarlo

```typescript
// Archivo app.module.ts
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms"; // Esto se importa

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule], // Aqui tambien se lo coloca
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

### Estructuras de control

### Uso de \*ngIf

```html
<h1>*ngIf</h1>
<input type="text" required [(ngModel)]="thing.name" />
<p *ngIf="thing.name === 'gabriel'">Soy Gabriel</p>
<p *ngIf="thing.name === 'alejandro'">Soy Alejandro</p>
<!--Si se cumple, se muestra -->
<!--Tambien se puede hacer condicionales &&-->
<p *ngIf="thing.name === 'alejandro' && thing.number === 22; else  elseBlock">
  Soy Alejandro
</p>
<!-- Bloque de tipo else -->
<ng-template #elseBlock>
  <!-- El nombre que acompaña al #, es cualquiera -->
  <p>Bloque de else</p>
</ng-template>
```

### Uso de \*ngFor

```typescript
// Archivo app.component.ts
names : string[] | number[]= ["Gabriel", "Alejandro", "Simón"]
//any[] -> Indica que queremos cualquier valor, no es buena practica
```

```html
<h1>*ngFor</h1>
<ul>
  <!-- name es el nombre del item (variable temporal) a iterar, names es el array -->
  <!-- Para obtener el indice se usa index y lo renombramos con i egg-->
  <li *ngFor="let name of names; index as i">{{i}} - {{name}}</li>
</ul>
```

- Crear una lista dinamicamente y eliminar un item.

```typescript
// Archivo app.component.ts
  newName = "";
  addName(){
    this.names.push(this.newName);
    this.newName = "";
  }
  deleteName(index: number){
    this.names.splice(index,1);
  }
```

```html
<h1>*ngFor</h1>
<input type="text" required [(ngModel)]="newName" />
<button (click)="addName()">Add name</button>
<ul>
  <!-- name es el nombre del item (variable temporal) a iterar, names es el array -->
  <!-- Para obtener el indice se usa index y lo renombramos con i egg-->
  <li *ngFor="let name of names; index as i">
    {{i}} - {{name}}
    <button (click)="deleteName(i)">Delete</button>
  </li>
  <li *ngIf="names.length === 0">No hay nombres</li>
</ul>
```

### \*ngFor para arrays

```typescript
// Archivo app.component.ts
  products = [
    {
      name : "coso",
      price : 231,
      image : "./assets/images/toy1.jpg"
    }{
      name : "coso 2",
      price : 291,
      image : "./assets/images/toy2.jpg"
    }{
      name : "coso 3",
      price : 211,
      image : "./assets/images/toy3.jpg"
    }{
      name : "coso 4",
      price : 221,
      image : "./assets/images/toy4.jpg"
    }
  ]

```

- Hay que asignarle un tipado al array de productos, entonces se usa las interfaces.

```typescript
//Archivo product.model.ts
//La interface es una forma que nos dice que tipo de atributos debería tener cada objeto
export interface Product {
  name: string;
  price: number;
  image: string;
}
```

- Ahora se lo importa

```typescript
// Archivo app.component.ts

  import {Product} from "./product.model"
  //Los : (dos puntos) significa asignar un tipado
  products: Product[] = [
    {
      name : "coso 1",
      price : 231,
      image : "./assets/images/toy1.jpg"
      category: "all",
    }{
      name : "coso 2",
      price : 291,
      image : "./assets/images/toy2.jpg"
    }{
      name : "coso 3",
      price : 211,
      image : "./assets/images/toy3.jpg"
    }{
      name : "coso 4",
      price : 221,
      image : "./assets/images/toy4.jpg"
    }
  ]

```

- Como **category** no existe, vscode avisa que algo anda mal, para solucionarlo se puede hacer que sea opcional agregando a la interfaz dicho atributo con un signo de pregunta **?**

```typescript
export interface Product {
  name: string;
  price: numb   er;
  image: string;
  category?:string;
}
```

- \*ngFor solo funciona en objetos que puedan iterarse

### Uso de ngSwitch

```html
<h2>ngSwitch</h2>
<input type="text" required [(ngModel)]="thing.name" />
<div [ngSwitch]="thing.name">
  <p *ngSwitchCase="'gabriel'">La persona es gabriel</p>
  <p *ngSwitchCase="'alejandro'">La persona es alejandro</p>
  <p *ngSwitchCase="'simon'">La persona es simon</p>
  <p *ngSwitchDefault>No hace match</p>
</div>
<!--
  Esto se haria si solo se usara *ngIf
  <p *ngIf=" thing.name==='gabriel'">La persona es gabriel</p>
  <p *ngIf=" thing.name==='alejandro'">La persona es alejandro</p>
  <p *ngIf=" thing.name==='simon'">La persona es simon</p> 
  -->
```

### Extensión para navegadores para desarrollar en Angular

> Angular Dev Tools

### Estilos en Angular

- La primera forma es la normal

- La otra es: Dynamic Class & Style

```typescript
// Archivo app.component.ts
widthImg = 10;
```

```html
<h1>Class & Style</h1>
<input type="text" required #nameInput2="ngModel" [(ngModel)]="thing.name" />
<!--                     invalid es el nombre de la clase -->
<p class="message-error" [class.invalid]="nameInput2.invalid">
  El campo es requerido
</p>
<br />
<label>Nombre</label>
<!-- Como estilo en linea-->
<input type="text" required #nameInput3="ngModel" [(ngModel)]="thing.name" />
<p [style.font-style]="nameInput3.invalid  ? 'italic' : 'normal'">
  Texto texto texto
</p>
<br />
<div class="styles">
  <div>
    <input type="text" [(ngModel)]="widthImg" />
  </div>
  <div>
    <img [style.width.px]="widthImg" [src]="thing.avatar" />
  </div>
</div>
<hr />
```

- CSS del código HTML anterior

```css
.message-error {
  background-color: red;
  color: white;
  opacity: 0;
  transition: all linear 0.5s;
  &.invalid {
    opacity: 1;
  }
}

.styles {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
```

### NgClass & NgStyle

```html
<h2>NgClass</h2>
<input type="text" required #nameInput4="ngModel" [(ngModel)]="thing.name" />
<!-- Si se sigue con esto puede llegar a ser poco legible -->
<!-- <hr class="line-error" 
  [class.valid]="nameInput4.valid"
  [class.invalid]="nameInput4.invalid"> -->

<!-- Es mejor usar ...-->
<hr
  class="line-error"
  [ngClass]="{
    'valid':nameInput4.valid,
    'invalid':nameInput4.invalid
  }"
/>
<p class="message-error" [class.invalid]="nameInput4.invalid">
  El campo es requerido
</p>
<h2>Ng Style</h2>
<div class="styles">
  <div>
    <input type="number" [(ngModel)]="box.width" />
    <input type="number" [(ngModel)]="box.height" />
    <input type="color" [(ngModel)]="box.background" />
  </div>
  <div>
    <div
      [ngStyle]="{
        'width.px':box.width,
        'height.px':box.height,
        'background-color':box.background,
        'display': 'block'
      }"
    ></div>
  </div>
</div>
```

```typescript
box = {
  width: 100,
  height: 100,
  background: "red",
};
```

### Creando un formulario

```html
<h2>Formulario</h2>
<form (ngSubmit)="onRegister()" #myForm="ngForm">
  <div class="input.group">
    <label for="name">Nombre</label>
    <input
      required
      name="name"
      type="text"
      id="name"
      [(ngModel)]="register.name"
    />
    <p>Mensajes de error</p>
  </div>
  <div class="input.group">
    <label for="email">Email</label>
    <input
      required
      name="email"
      type="text"
      id="email"
      [(ngModel)]="register.email"
    />
    <p>Mensajes de error</p>
  </div>
  <div class="input.group">
    <label for="password">Password</label>
    <input
      name="password"
      required
      type="text"
      id="password"
      [(ngModel)]="register.password"
    />
    <p>Mensajes de error</p>
  </div>
  <button [disabled]="myForm.invalid" type="submit">Registrar</button>
  <!-- Si hay otro boton que hace otra cosa que no sea enviar el formulario hay que ponerle un type="button", sino angular lo toma como si fuera un type="submit" -->
  <button type="button">Action</button>
</form>
```

```typescript
  register = {
    name: '',
    email: '',
    password: '',
  };
  onRegister() {
    console.log(this.register);
  }
}
```
