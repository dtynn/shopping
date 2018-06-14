CREATE DATABASE IF NOT EXISTS shopping;


CREATE TABLE IF NOT EXISTS shopping.users (
    id BIGINT AUTO_INCREMENT NOT NULL,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    create_at BIGINT NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uk_users_username (username)
)
ENGINE = InnoDB
DEFAULT CHARSET utf8mb4
;

CREATE TABLE IF NOT EXISTS shopping.products (
    id BIGINT AUTO_INCREMENT NOT NULL,
    name VARCHAR(100) NOT NULL,
    price BIGINT NOT NULL,
    create_at BIGINT NOT NULL,
    PRIMARY KEY (id)
)
ENGINE = InnoDB
DEFAULT CHARSET utf8mb4
;


CREATE TABLE IF NOT EXISTS shopping.cart_items (
    id BIGINT AUTO_INCREMENT NOT NULL,
    user_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    create_at BIGINT NOT NULL,
    INDEX idx_cart_items_user_id_created_at (user_id, create_at ASC),
    PRIMARY KEY (id)
)
ENGINE = InnoDB
DEFAULT CHARSET utf8mb4
;
