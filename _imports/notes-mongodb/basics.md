## Básicos

### ¿Qué es MongoDB?

MongoDB es un gestor de base de datos No relacionales (NoSQL) de código abierto.

### Intalación

Para instalar mongodb se lo puede hacer siguiendo los pasos de la documentación oficial: [mongodb.com](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/)

### Iniciar, parar el servidor

- Para ver el estado del servidor:

```console
sudo systemctl status mongo
```

- Para iniciar el servidor:

```console
sudo systemctl start mongo
```

- Para parar el servidor:

```console
sudo systemctl stop mongo
```

### Otra forma es usar docker

- Descargar la imagen:

```console
docker pull mongo
```

- Para ver las imagenes descargadas

```console
docker images
```

- Ver los procesos de docker:

```console
docker ps
```

- Ver los procesos de docker ejecutados anteriormente:

```console
docker ps -a
```

- Correr el contenedor:

```console
docker run mongo
```

- Configurar el puerto y darle nombre al contenedor:

El **-p** indica el puerto, donde el primero es el puerto de la maquina y el segundo es el puerto del contenedor.
La opción **--name** es para darle un nombre.

```console
docker run -p 27017:27017 --name mydb mongo
```

- Para conectarse a la base de datos:

```console
mongo localhost:27017
```

- Para mantener una sesión de mongo ejecutandose en background:
  Agregar la opción **-d**. Devuelve solo el id del proceso

```console
docker run -d -p 27017:27017 --name mydb mongo
```

- Para parar el proceso de la base de datos de docker:

```console
docker ps
```

Entrega los procesos con sus id, nombre. Con los cuales se los puede detener.

```console
docker stop idNumber
# Otra forma
docker stop name
```

- Para eliminar un contenedor:
  Donde id es el id del proceso a eliminar. Los id se los puede ver con `docker ps`

```console
docker rm id
```

### Otra forma de conectarse a una db con Docker

Donde **mongodb** es el nombre de la base de datos.

```console
docker exec -it mongodb bash
```

- Persistir datos con docker en el host
  Donde la opción **-v** indica en donde se van a copiar los datos de la bd de mongo en el host

```console
docker run -d -p 27017:27017 -v /home/ada/Desktop/docker/mongo:/data/db --name mydb mongo

```

Ahora, si se elimina el proceso de mongodb y se crea uno nuevamente se puede volver a ver los datos, usando el mismo comando anterior

## Comandos básicos del cliente mongo

### Mostrar las bases de datos

```console
show databases;
```

### Para saber en cual base de datos estamos

```console
db;
```

### Para crear un base de datos y empezar a usarla

```console
use namedb
```

### Documentos

- Los documentos son objetos de tipo JSON

```console
user1 = {
  "username": "user1",
  "age": 23,
  "email": "user1@mail.com"
};
```

- Insertar un documento en una colección

```console
db.users.insert(user1);
```

- Mostrar las colecciones:

```console
show collections;
```

### El objetId

Está conformado por:
1 - Timestamp
2 - Identificador para el servidor
3 - PID
4 - AutoIncrement

### Maneras de insertar documentos en una colección

Con `insert`, no tan recomendado por la documentación oficial.

```console
db.users.insert(user1);
```

Con `insertOne()`

```console
db.users.insertOne(user1);
```

Con `insertMany([])`

```console
db.users.insertMany([
  {
  "username": "user1",
  "age": 23,
  "email": "user1@mail.com"
},
{
  "username": "user2",
  "age": 32,
  "email": "user2@mail.com"
};
]);
```

Con `save()`

Si el objeto **no** existe, se crea.
Si el objeto **si**, se actualiza.
Esto lo hace por medio del \_id
No tan recomendado por la documentación oficial.

```console
db.users.save(user8);
```
