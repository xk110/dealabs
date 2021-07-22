DROP TABLE IF EXISTS DEAL;

CREATE TABLE DEAL
(
    ID INT NOT NULL AUTO_INCREMENT, PRIMARY KEY (ID),
    title VARCHAR(100),
    description VARCHAR(5000),
    degree INT,
    price decimal(18,2),
    shipping_Fees decimal(18,2),
    link VARCHAR(1000),
    author VARCHAR(100),
    creation_Date DATE,
    starting_Date DATE,
    ending_Date DATE
);