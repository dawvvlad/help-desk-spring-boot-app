# HelpDesk
- [Серверная часть](https://github.com/dawvvlad/help-desk-spring-boot-app/tree/master/help-desk-server)
- [Клиентская часть](https://github.com/dawvvlad/help-desk-spring-boot-app/tree/master/client)

## Сборка серверной части:
1. Клонируйте репозиторий, используя средства GitHub или следующей командой:
```
git clone https://github.com/dawvvlad/help-desk-spring-boot-app.git
```
2. Перейдите в папку [/help-desk-server](https://github.com/dawvvlad/help-desk-spring-boot-app/tree/master/help-desk-server).
3. Откройте терминал и введите `mvn package` для сборки и `mvn clean package` для чистой сборки (предыдущие сборки очистятся и заменятся новым .jar-архивом)

> [!WARNING]
> Для сборки необходимо установить [JDK](https://www.oracle.com/cis/java/technologies/downloads/) и [Maven](https://maven.apache.org/)

4. Сборка сохраняется в `/help-desk-server/target/help-desk-server-0.0.1-SNAPSHOT.jar`
5. Полученный файл разместить на сервере и запустить командой:
```
java -jar help-desk-server-0.0.1-SNAPSHOT.jar
```

## Настройка серверной части
> [!NOTE]
> настройка сервера и базы данных осуществляется в файле [application.properties](https://github.com/dawvvlad/help-desk-spring-boot-app/tree/master/help-desk-server/src/main/resources)

Основные настройки сервера представлены ниже:

```
spring.jpa.hibernate.ddl-auto=update
spring.datasource.url=jdbc:mysql://localhost:3306/название_базы_данных 
spring.datasource.username=имя_пользователя
spring.datasource.password=пароль

spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect

server.address=0.0.0.0
server.port=80

active.directory.domain=domain.domain
active.directory.ldap=ldap://ip-address/

spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=10MB

server.tomcat.threads.min-spare=10
server.tomcat.threads.max=100
server.tomcat.max-connections=1000

spring.task.execution.pool.core-size=10
spring.task.execution.pool.max-size=50

spring.task.execution.pool.queue-capacity=100
spring.task.execution.pool.keep-alive=60s

spring.datasource.hikari.maximum-pool-size=20
spring.datasource.hikari.minimum-idle=10
spring.datasource.hikari.idle-timeout=30000
spring.datasource.hikari.max-lifetime=1800000
spring.datasource.hikari.connection-timeout=30000
```
### Внедрение настроек в приложение:
> [!NOTE]
> Это первый способ, использующий создание нового внешнего конфигурационного файла *application.properties* и доступ к нему из приложения в .jar

1. Создайте файл *application.properties* в удобной для Вас директории
2. Вставьте в начало файла строку `spring.application.name=help-desk-server`
3. Вставьте в файл остальную информацию, представленную выше
4. Замените отстутствующие значения на Ваши корректные
5. Запустите сервер слудющей командой:
   ```
   java -jar help-desk-server-0.0.1-SNAPSHOT.jar --spring.config.location=file:/полный/путь/к вашему/файлу
   ```

> [!NOTE]
> Это второй способ, использующий пересборку приложения и переразмещения его на сервере

1. Перейдите в /help-desk-server/src/main/resources/ и найдите файл *application.properties*
2. Скопируйте текст в файл application.properties
3. Замените необходимые данные после знака "=", например:
```
active.directory.domain=mydomain.local
active.directory.ldap=ldap://192.111.11.11/
```
4. Соберите приложение, как указано ранее
