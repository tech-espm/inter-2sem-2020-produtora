CREATE DATABASE IF NOT EXISTS produtora;
USE produtora;

-- ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root'

CREATE TABLE tipo_local (
  id int NOT NULL AUTO_INCREMENT,
  nome varchar(50) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY nome_UN (nome)
);
