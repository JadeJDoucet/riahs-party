const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.post('/assign', async (req, res) => {
  const { username } = req.body;
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');

    const checkUsername = await client.query(
        'SELECT * FROM characters WHERE assignee = $1',
        [username]
    );
    
    // Check if the username is already assigned
    if (checkUsername.rows.length > 0) {
        await client.query('COMMIT');
        return res.json({ 
          character: checkUsername.rows[0],
          isExisting: true
        });
      }

    // Find a random unassigned character
    const availableCharacters = await client.query(
      'SELECT id FROM characters WHERE assignee IS NULL ORDER BY RANDOM() LIMIT 1'
    );

    if (availableCharacters.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(400).json({ error: 'No available characters' });
    }

    // Update the character with username
    const result = await client.query(
      'UPDATE characters SET assignee = $1 WHERE id = $2 AND assignee IS NULL RETURNING *',
      [username, availableCharacters.rows[0].id]
    );

    if (result.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(400).json({ error: 'Character already assigned' });
    }

    await client.query('COMMIT');
    res.json({ 
      character: {
        ...result.rows[0],
        clues: null  // Hide clues initially
      },
      isExisting: false
    });
    
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    client.release();
  }
});

router.post('/verify', async (req, res) => {
  const { username, passcode } = req.body;
  const client = await pool.connect();
  
  try {
    // Get character by username and verify passcode
    const result = await client.query(
      'SELECT clues FROM characters WHERE assignee = $1 AND clue_passcode = $2',
      [username, passcode]
    );
    
    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid passcode' });
    }
    
    res.json({ clue: result.rows[0].clues });
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    client.release();
  }
});

module.exports = router; 