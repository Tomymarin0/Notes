# Como ejecutar la app Notes

1. Clonar el repo: [https://github.com/Tomymarin0/Notes.git](https://github.com/Tomymarin0/Notes.git)
2. Si no tenes instalado Java JDK 23, descárgalo desde el sitio web de Oracle.
3. Instala Java JDK 23. (Si ya está instalado, salta al paso 7)
4. Ir a las Variables de Entorno en tu sistema Windows.
5. Crea una variable llamada `JAVA_HOME` con la ruta al directorio donde instalaste JDK 23.
6. Edita la variable `Path` y agrega `%JAVA_HOME%\bin`.
7. Abrí la carpeta `Notes` en Visual Studio Code (VS Code).
8. Abrí un terminal en VS Code.
9. Navega a la carpeta `notesback` escribiendo:  
   ```bash
   cd notesback
   ```
10. Ejecuta el backend con:  
    ```bash
    ./mvnw spring-boot:run
    ```
11. Abrí otro terminal en VS Code sin cerrar el terminal del backend.
12. Navega a la carpeta `notesfront`:  
    - Si estás en la carpeta `Notes`, escribe:  
      ```bash
      cd notesfront
      ```
    - Si estás en `notesback`, escribe:  
      ```bash
      cd ..
      cd notesfront
      ```
13. Instala las dependencias con:  
    ```bash
    npm install
    ```
14. Ejecuta el frontend con:  
    ```bash
    npm start
    ```
15. Abrí la aplicación en tu navegador y comenzá a usarla.

