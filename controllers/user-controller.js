const bcrypt = require('bcrypt')
const pool = require('../config/database')
const jwt = require('jsonwebtoken')

// Register new user
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate input
        if (!username || !email || !password) {
            return res.status(400).json({message: 'Username, Email, adn Password are required'})
        }

        // Check if users already exists
        const [existingUser] = await pool.query(
            'SELECT * FROM users WHERE email = ? OR password = ?', [email, password]
        )

        if (existingUser.length > 0) {
            return res.status(400).json({message: 'Email has been registered, try use another email'})
        }

        // Hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert user into database
        const [result] = await pool.query(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]
        )
        // Generate JWT token
        const token = jwt.sign(
            { user_id: result.insertId, email }, process.env.JWT_SECRET, { expiresIn: '24h' }
        )
        res.status(201).json({
            message: 'User registered successfully',
            data: {
                user_id: result.insertId,
                username,
                email,
                token
            }
        })
    } catch (error) {
        console.error('Error in register:', error);
        res.status(500).json({message: 'Internal server error'})
    }
}

// Login user
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate user input
        if (!email || !password) {
            return res.status(400).json({message: 'Email and password are required'})
        }

        // Check if user exist or not
        const [users] = await pool.query(
            'SELECT * FROM users WHERE email = ?', [email]
        )

        if (users.length === 0) {
            return res.status(401).json({message: 'Invalid credentials'})
        }

        const user = users[0]

        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({message: 'Invalid credentials'})
        }

        // Generate JWT token
        const token = jwt.sign(
            { user_id: user.user_id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '24h' }
        )
        res.status(200).json({
            message: 'Login successful',
            data: {
                token,
                user: {
                    user_id: user.user_id,
                    username: user.username,
                    email: user.email
                }
            }
        })
    } catch (error) {
        console.error('Error in login:', error);
        res.status(500).json({message: 'Internal server error'})
    }
}

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const [users] = await pool.query(
            'SELECT user_id, username, email, created_at FROM users'
        )
        res.status(200).json({data: users})
    } catch (error) {
        console.error('Error in getting all users:', error);
        res.status(500).json({message: 'Internal server error'})
    }
}

// Get user by ID
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        
        const [users] = await pool.query(
            'SELECT user_id, username, email, created_at FROM users WHERE user_id = ?', [id]
        )

        if (users.length === 0) {
            return res.status(404).json({message: 'User not found'})
        }
        res.status(200).json({status: 'success', data: users[0]})

    } catch (error) {
        console.error('Error in getting user by id:', error);
        res.status(500).json({message: 'Internal server error'})
    }
}

// Updating user
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email } = req.body;

        // Check if user exists
        const [existingUser] = await pool.query(
            'SELECT * FROM users WHERE user_id = ?', [id]
        )

        if (existingUser.length === 0) {
            return res.status(404).json({message: 'User not found'})
        }

        // Update user
        await pool.query(
            'UPDATE users SET username = ?, email = ? WHERE user_id = ?', [username, email, id]
        )

        res.status(200).json({
            message: 'User updated successfully',
            data: {
                user_id: parseInt(id),
                username,
                email
            }
        })
    } catch (error) {
        console.error('Error in updating user:', error);
        res.status(500).json({message: 'Internal server error'})
    }
}

// Deleting user
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if user exists
        const [existingUser] = await pool.query(
            'SELECT * FROM users WHERE user_id = ?', [id]
        )

        if (existingUser.length === 0) {
            return res.status(404).json({message: 'User not found'})
        }

        // Delete user
        await pool.query('DELETE FROM users WHERE user_id = ?', [id])
        res.status(200).json({message: 'User deleted successfully'})

    } catch (error) {
        console.error('Error in deleting user:', error);
        res.status(500).json({message: 'Internal server error'})
    }
}

module.exports = {register, login, getAllUsers, getUserById, updateUser, deleteUser}