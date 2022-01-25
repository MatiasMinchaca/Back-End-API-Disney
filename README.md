# Challenge BackEnd NodeJs

## Tabla de Contenido

- [Acerca de](#about)
- [Empezar](#getting_started)
- [Uso](#uso)
- [Testeo del lado del cliente](#testing)

## Acerca de <a name = "about"></a>

Este es un pequeño challenge de NodeJs en el cual utilize como servidor a express y una base de datos relacional MySQL.

## Empezar <a name = "getting_started"></a>

Estas instrucciones le proporcionarán una copia del proyecto en funcionamiento en su máquina local para fines de desarrollo y prueba.

### requisitos previos

```

Tener Instalado Nodejs.
Tener un editor de codigo de preferencia Visual Studio Code, ya que cuenta con una extencion para realizar los testeos de la app.
Tener instalada la extención Rest Client en Visual Studio Code.
Tener instalada una herramienta para la base de datos, este caso yo utilize DBeaver y XAMPP.

```

### Instalando


```
Abrir el Visual Studio Code y ejecutamos en la consola el siguiente comando:
git clone https://github.com/MatiasMinchaca/Back-End-API-Disney.git

Abrimos el DBeaver y ejecutamos el archivo Disney.sql que se encuentra en la carpera MySQL.
Ejecutar XAMMP y iniciar el servicio MySQL para tener una conexión a la base de datos desde nuestra app.
Volvemos al Visual Studio Code y abrimos la consola para ejecutar 'npm i', asi instalar todas las dependencias.

Una vez instaladas, ejecutar 'nodemon', para correr el servidor en este caso se encontrara en el puerto 3001.

Ya casi tendremos acceso a todos los endpoints:
Primero tendremos que crearnos una cuenta en el siguiente endpoint: http://localhost:3001/register
Luego nos vamos a loguear utilizando el email y la contraseña que anteriormente registramos.
Al loguearnos nos devolvera un token el cual lo utlizaremos para acceder a los endpoints, mandando el token desde los headers como 'authorization'.

```

## Uso <a name = "uso"></a>

Todos los endpoints estan documentados en la carpeta requests, si tienes la extención REST CLIENT puedes ir probando uno por uno en cada archivo o bien utlizar servicios como Postman o Insomnia.
Podras acceder a cada uno de los endpoints desde el cliente con los metodos de HTTP.
A continuación dejare una lista con todos los endpoints con sus respectivos metodos:
```
Metodo GET
http://localhost:3001/movies                Muestra todos las peliculas o series que exiten en la base de datos.
http://localhost:3001/movies?title=title    Filtra de todas las peliculas las que coincidan por el valor pasado desde la query title.
http://localhost:3001/movies?order=ASC|DESC Filtra de todas las peliculas en order ascendente o descendente segun el valor que le pasemos a la query order.
http://localhost:3001/movies/:id            Muestra una pelicula o serie en particular desde la ruta parametrizada mediante el id de esta.

http://localhost:3001/characters            Muestra todos los personajes que exiten en la base de datos.
http://localhost:3001/characters?name=name  Filtra de todos los personajes las que coincidan por el valor pasado desde la query name.
http://localhost:3001/characters?age=age    Filtra de todos los personajes las que coincidan por el valor pasado desde la query age.
http://localhost:3001/characters/:id        Muestra un personaje en particular desde la ruta parametrizada mediante el id de esta.

```

```
Metodo POST
http://localhost:3001/register              Este endpoint se usa para resgistrar un usuario en la base de datos, que al hacerlo le llagara un correo de bienvenida a su correo previamente registrado.
http://localhost:3001/login                 Este endpoint se usa para loguear a un usuario registrado para obtener un token asi poder seguir con la navegacion del sitio.
http://localhost:3001/movies                Este endpoint se usa para crear una nueva pelicula o serie, se requiere un token de logueo.
http://localhost:3001/characters            Este endpoint se usa para crear un nuevo personaje, se requiere un token de logueo.

```

```
Metodo PUT
http://localhost:3001/movies/:id            Este endpoint se usa para editar una pelicula o serie segun el valor de la ruta parametrizada, se requiere un token de logueo.
http://localhost:3001/characters/:id        Este endpoint se usa para editar un personaje segun el valor de la ruta parametrizada, se requiere un token de logueo.

```

```
Metodo DELETE
http://localhost:3001/movies/:id            Este endpoint se usa para eliminar una pelicula o serie segun el valor de la ruta parametrizada, se requiere un token de logueo.
http://localhost:3001/characters/:id        Este endpoint se usa para eliminar un personaje segun el valor de la ruta parametrizada, se requiere un token de logueo.

```


## Testeo del lado del cliente <a name = "testing"></a>

```
He credo una ruta http://localhost:3001/test para poder testear del lado del cliente, la misma te propociona una vista donde veras todas las peliculas y personajes que existen en la base de datos y abajo hay 2 formularios los cuales te daran la posibilidad de crear nuevos personajes o peliculas.
Al precionar alguna tarjeta de personaje/pelicula te llevara a una vista la cual te permitira editar o eliminar dicha tarjeta.
```
### Por el token de autenticación dejaron de funcionar los metodos de la ruta /test ya que se necesita enviar el header de autorización que por falta de tiempo no lo implemente.