const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = 4000;

app.use(express.json());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'super_smash_bros',
    password: 'bitinhoDB',
    port: 5432,
})

//Fighters Route
app.get('/fighter', async (req, res) => {
    try {
        const { name } = req.query;
        if (name) {
            const response = await pool.query('SELECT * FROM fighters WHERE name = $1', [name]);
            res.status(200).send({
                message: `Fighter ${name} encontrado com sucesso!`,
                fighter: response.rows
            })
        } else {
            const response = await pool.query('SELECT * FROM fighter');
            res.status(200).send({
                totalFighters: response.rowCount,
                fighters: response.rows
            })
        }
    } catch (error) {
        console.error('Erro ao capturar fighters!', error);
        res.status(500).send('Error on catching fighters!');
    }
});

app.get('/fighter/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await pool.query('SELECT * FROM fighter WHERE id = $1', [id]);
        res.status(200).send({
            message: 'Fighter found successfully!',
            fighter: response.rows
        })
    } catch (error) {
        console.error('Erro ao capturar fighter!', error);
        res.status(500).send('Error on catching fighter!');
    }
});

app.post('/fighter', async (req, res) => {
    try {
        const { name, power, level, hp } = req.body;
        if (name == "" || power == "" || level == "" || hp == "") {
            res.status(400).send({
                message: 'Fill all the properties needed!'
            })
        } else {
            const response = await pool.query('INSERT INTO fighter (name, power, level, hp) VALUES ($1, $2, $3, $4)', [name, power, level, hp]);
            res.status(201).send({
                message: 'Fighter created successfully!',
                fighter: response.rows
            })
        }
    } catch (error) {
        console.error('Erro ao criar fighter!', error);
        res.status(500).send('Error on making fighter!');
    }
});

app.put('/fighter/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, power, level, hp } = req.body;
        if (name == "" || power == "" || level == "" || hp == "") {
            res.status(400).send({
                message: 'Fill all the properties needed!'
            })
        } else {
            const response = await pool.query('UPDATE fighter SET name = $1, power = $2, level = $3, hp = $4 WHERE id = $5', [name, power, level, hp, id]);
            res.status(200).send({
                message: 'Fighter updated successfully!',
                fighter: response.rows
            })
        }
    } catch (error) {
        console.error('Erro ao criar fighter!', error);
        res.status(500).send('Error on updating fighter!');
    }
});

app.delete('/fighter/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM fighter WHERE id = $1', [id]);
        res.status(200).send({
            message: 'Fighter deleted successfully!'
        })
    } catch (error) {
        console.error('Erro ao criar fighter!', error);
        res.status(500).send('Error on deleting fighter!');
    }
})

//Batlles Route
app.get('/battles', async (req, res) => {
    try {
        const { winner } = req.query;
        if (winner) {
            const response = await pool.query('SELECT * FROM battles WHERE winner_id = $1', [winner]);
            if (response.rowCount === 0) {
                res.status(400).send({
                    message: `Nenhuma batalha encontrada com o winner_id ${winner}.`
                });
            } else {
                res.status(200).send({
                    message: `Winner com id ${winner} encontrado com sucesso!`,
                    battle: response.rows
                })
            }
        } else {
            const response = await pool.query('SELECT * FROM battles');
            res.status(200).send({
                totalBattles: response.rowCount,
                battles: response.rows
            })
        }
    } catch (error) {
        console.error('Erro ao pegar battles!', error);
        res.status(500).send('Error on catching battles!');
    }
})

app.get('/battles/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await pool.query('SELECT * FROM battles WHERE id = $1', [id]);
        res.status(200).send({
            message: `Batlha com id ${id} encontrada com sucesso!`,
            battle: response.rows
        })
    } catch (error) {
        console.error('Erro ao pegar battle por id!', error);
        res.status(500).send('Error on catching battle by ID!');
    }
})

app.post('/battles/:fighter1_id/:fighter2_id', async (req, res) => {
    try {
        const { fighter1_id, fighter2_id } = req.params;

        const fighter1Response = await pool.query('SELECT * FROM fighter WHERE id = $1', [fighter1_id]);
        const fighter2Response = await pool.query('SELECT * FROM fighter WHERE id = $1', [fighter2_id]);

        if (fighter1Response.rows.length === 0 || fighter2Response.rows.length === 0) {
            return res.status(404).send('Lutador não encontrado');
        }

        const fighter1 = fighter1Response.rows;
        const fighter2 = fighter2Response.rows;

        let winnerId;
        if (fighter1.level > fighter2.level) {
            winnerId = fighter1_id;
        } else if (fighter1.level < fighter2.level) {
            winnerId = fighter2_id;
        } else {
            winnerId = Math.random() < 0.5 ? fighter1_id : fighter2_id;
        }

        const battleResult = await pool.query('INSERT INTO battles (fighter1_id, fighter2_id, winner_id) VALUES ($1, $2, $3)', [fighter1_id, fighter2_id, winnerId]);

        res.status(200).send({
            winner: winnerId,
            fighter1: fighter1,
            fighter2: fighter2,
        });
    } catch (error) {
        console.error('Erro ao realizar a batalha!', error);
        res.status(500).send('Erro ao realizar a batalha!');
    }
})


// Servidor rodando
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}!!!`);
});