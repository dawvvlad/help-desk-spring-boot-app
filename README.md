# HelpDesk
- [Серверная часть](https://github.com/dawvvlad/help-desk-spring-boot-app/tree/master/help-desk-server)
- [Клиентская часть](https://github.com/dawvvlad/help-desk-spring-boot-app/tree/master/client)

## Сборка серверной части:
1. Клонируйте репозиторий, используя средства GitHub или следующей командой:
>`git clone https://github.com/dawvvlad/help-desk-spring-boot-app.git`
2. Перейдите в папку [/help-desk-server](https://github.com/dawvvlad/help-desk-spring-boot-app/tree/master/help-desk-server).
3. Откройте терминал и введите `mvn package` для сборки и `mvn clean package` для чистой сборки (предыдущие сборки очистятся и заменятся новым .jar-архивом)

> [!WARNING]
> Для сборки необходимо установить [JDK](https://www.oracle.com/cis/java/technologies/downloads/) и [Maven](https://maven.apache.org/)

4. Сборка сохраняется в `/help-desk-server/target/help-desk-server-0.0.1-SNAPSHOT.jar`
5. Полученный файл разместить на сервере и запустить командой:
> `java -jar help-desk-server-0.0.1-SNAPSHOT.jar`

## Настройка серверной части
> [!NOTE]
> настройка сервера и базы данных осуществляется в файле [application.properties](https://github.com/dawvvlad/help-desk-spring-boot-app/tree/master/help-desk-server/src/main/resources)

<spring.application.name=help-desk-server

spring.jpa.hibernate.ddl-auto=update
spring.datasource.url=jdbc:mysql://localhost:3306/*название_базы_данных*
spring.datasource.username=*имя_пользователя*
spring.datasource.password=*пароль*

spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect

server.address=0.0.0.0
server.port=80

active.directory.domain=domain.domain
active.directory.ldap=ldap://*ip-address*/>
