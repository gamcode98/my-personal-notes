- **Notas:**

  Los símbolos **< >** deben ser ignorados al escribir los comandos.

  Cuando se coloca un **pipe** en medio de los símbolos **<>** significa que se puede usar una u otras opciones si es que las hubiese.

## Comandos de docker

### Para usuarios de linux, para poder usar sus comandos sin usar sudo

Después de ejecutar este comando hay que reiniciar la pc.

```console
sudo usermod -aG docker $USER
```

### Ver los contenedores corriendo:

```console
docker ps
```

### Ver todos los contenedores :

```console
docker ps -a
```

### Inspeccionar un contenedor:

```console
docker inspect <ID>
```

También funciona con el **name** que es un forma mas amigable de escribir el comando

```console
docker inspect <name>
```

### Descargar una imagen de docker-hub:

```console
docker run <nombre-imagen>
```

### Renombrar un contenedor cuando se descarga:

```console
docker run --name <cualquier-nombre-aqui> <imagen-de-docker>
```

### Renombrar el nombre de un contenedor:

```console
docker rename <nombre-anterior> <nombre-nuevo>
```

### Eliminar un contenedor:

```console
docker rm <nombre-contenedor | ID>
```

### Eliminar todos los contenedores que están parados:

```console
docker container prune
```

### Para detener un contenedor que está corriendo:

```console
docker stop <nombre-contendor | ID>
```

### Eliminar un contenedor aunque esté corriendo:

```console
docker rm -f <nombre-contenedor>
```

### Ingresar con el modo interactivo en un contenedor:

```console
docker run -it <nombre-image>
```

### Correr una imagen en segundo plano:

- La opción **-d** ó **--detach** es lo que lo hace correr en **background**

```console
docker run --name <nuevo-nombre> -d <imagen> tail -f /dev/null
```

### Ingresar al contenedor que está en segundo plano:

```console
docker exec -it <nombre-contenedor> bash
```

### Matar un contenedor con kill:

```console
docker inspect --format '{{.State.Pid}}' <nombre-contenedor>
#Devuelve el process id, entonces ...
kill -9 <id-process>
```

### Configurar un puerto de un contenedor:

- Donde el primer puerto es el de la maquina anfitriona y el segundo es el del contenedor.

```console
docker run --name <nombre-contenedor> -d -p 8080:80 <imagen>
```

### Para ver los **logs** de un contenedor que está corriendo en segundo plano:

```console
docker logs <nombre-contenedor>
docker logs -f <nombre-contenedor> # -f para ver los logs en tiempo real
docker logs -f --tail 10 <nombre-contenedor> # para ver solo los últimos logs
```

## Redes

### Listar redes

```console
docker network ls
```

### Crear una red en docker

```console
docker network create <nombre-de-red>
```

### Inspeccionar una red

```console
sudo docker inspect <nombre-de-red>
```

### Borrar una red

```console
docker network rm <nombre-red>
```

### Conectarse a una red con una imagen

Primero descargar las imagenes:
`docker pull mongo` y `docker pull mongo-express`

```console
sudo docker run --name some-mongo -p 27017:27017 --network=<nombre-red> -d mongo
```

```console
docker run -d --name clientewebmongo --network=mi-red -e ME_CONFIG_MONGODB_SERVER=some-mongo -p 8081:8081 mongo-express
```

## Commits

Permite crear una imagen a partir de un container

```console
docker commit -m "message of commit" <nombre-imagen>
```

## Bid mounts

Se comparte un directorio o ruta con un contenedor

Persistir datos de los contenedores en la maquina anfitriona (ejemplo usando mongo)
La opción `-v` indica se que va a hacer un bid mount
Se indica en donde se van a guardar los datos del contenedor en la maquina anfitriona (izq) y el lado (der) indica en donde se guarda los datos dentro del contenedor.

Pros:
Se puede guardar y extraer datos de un contenedor.

Contras:
Inseguro por acceso a los datos mediante un contenedor. Ejemplo: Si se usa un contenedor en el cual no se conoce bien todo lo que puede hacer.

```console
docker run -d --name db -v /home/gabriel/docker-data/mongodata:/data/db mongo
```

## Volumenes

### Crear un volumen

Pros:
Solo el superusuario puede acceder a los datos.
No se comparte un directorio como lo hace bid mount. Los volumenes los maneja docker.

Contras:
Modificar, leer esos archivos desde la maquina anfitriona es un poco complicado a menos de que se entre al contenedor para ver su contenido.

```console
docker volume create dbdata
```

### Listar volumenes

```console
docker volume ls
```

### Montar un volumen

En **src** se coloca el nombre del volumen que se quiere montar y en **dst** se coloca el path en donde se quiere montar

```console
docker run -d --name db --mount src=dbdata,dst=/data/db mongo
```

### Verificar que se realizó el montaje correctamente

En **"Mounts"** debe aparecer su correspondiente información.

```console
docker inspect db
```

## Insertar y extrar archivos de un contenedor

### Copiar un archivo a un contenedor

No hace falta que el contenedor esté corriendo para poder copiar o extraer archivos del mismo.

Ejemplo:

```console
touch prueba.txt  #se crea un archivo de prueba
docker run -d name copytest ubuntu tail -f /dev/null #se corre el contenedor
docker exec -it copytest bash #se ingresa en el contenedor
mkdir testing #se crea una carpeta dentro del contenedor
docker cp prueba.txt copytest:/testing/test.txt #se copia el archivo prueba.txt en el contenedor copytest en la carpeta testing con el nombre test.txt
```

### Extraer una carpeta de un contenedor

```console
docker cp copytest:/testing localtesting #se copia la carpeta testing del contenedor copytest en la carpeta actual con el nombre localtesting
```

## Imagenes

### Listar imagenes

```console
docker image ls
```

### Crear una imagen con dockerfile

```dockerfile
FROM ubuntu:latest //imagen que se quiere construir

RUN touch /usr/src/hola-mundo.txt // cuando se está construyendo la imagen se ejecuta este comando
```

`-t` es para agregar un tag.
`.` es para indicar en donde se va a construir la imagen (mismo directorio en el cual se encuentra el Dockerfile)

```console
docker build -t ubuntu:hola .
```

### Crear una imagen con la terminal

Breve descripción de las opciones

`-m` permite escribir un mensaje.
`-a` sirve para dejar el nombre del autor.
`3141fa004aa0` es el ID del container.

```console
docker commit -m "tp01" -a "Gabriel Alejandro Mamani" 3141fa004aa0 tp1-completo:v1
```

### Subir una imagen a docker hub

Loguearse en usando la terminal

```console
docker login
```

Retaggear la imagen con nuestro username de dockerhub para poder subirla a nuestro repositorio.

```console
docker tag postgres:13 gamcode98/postgres:13
```

Hora de pushear

```console
docker push gamcode98/postgres:13
```
