CREATE DATABASE super_smash_bros;

\c super_smash_bros;

CREATE TABLE fighter (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    power VARCHAR(100) NOT NULL,
    level INT NOT NULL,
    hp INT NOT NULL
);

CREATE TABLE battles (
    id SERIAL PRIMARY KEY,
    fighter1_id INT NOT NULL,
    fighter2_id INT NOT NULL,
    winner_id INT NOT NULL,
    FOREIGN KEY (fighter1_id) REFERENCES fighter (id),
    FOREIGN KEY (fighter2_id) REFERENCES fighter (id),
    FOREIGN KEY (winner_id) REFERENCES fighter (id)
);