Como ejecutar la app Notes

1- Clonar el repo https://github.com/Tomymarin0/Notes.git
2- Si no tenes instalado Java JDK 23, descárgalo desde el sitio web de Oracle.
3- Instala Java JDK 23. (Si ya esta instalado saltar hasta el paso 7)
4- Ir a las Variables de Entorno en tu sistema Windows.
5- Crea una variable llamada JAVA_HOME con la ruta al directorio donde instalaste JDK 23.
6- Edita la variable Path y agrega %JAVA_HOME%\bin.
7- Abri la carpeta Notes en Visual Studio Code (VS Code).
8- Abri un terminal en VS Code.
9- Navega a la carpeta notesback escribiendo: cd notesback.
10- Ejecuta el backend con: ./mvnw spring-boot:run.
11- Abri otro terminal en VS Code sin cerrar el terminal del backend.
12- Navega a la carpeta notesfront: si estás en la carpeta Notes, escribe cd notesfront; si estás en notesback, escribe cd .. y luego cd notesfront.
13- Instalar las dependencias con npm install.
14- Ejecuta el frontend con: npm start.
15- Abri la aplicación en tu navegador y comenza a usarla.
