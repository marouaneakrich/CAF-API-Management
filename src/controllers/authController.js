const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) =>{
    try{
        const {username, email, password, role} = req.body;
        if (!username || !email || !password ){
            return res.status(400).json({ error: 'All fields required' });
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        
        const newUser = await User.create({username, email, password, role: role || 'user' });

        const token = jwt.sign({ id: newUser.id, email: newUser.email, role: newUser.role },
                    process.env.JWT_SECRET,
                    { expiresIn: '7d' });
        res.status(201).json({ message: 'User registered successfully', token,
            user: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role
            }
    });

    }catch (error) {

    console.error('Register error:', error);
    
    // Handle Sequelize validation errors
    if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({ 
            error: 'Validation error',
            details: error.errors.map(e => e.message)
        });
    }
    
    // Handle unique constraint errors
    if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ 
            error: 'Username or email already exists'
        });
    }
    
    res.status(500).json({ 
        error: 'Registration failed',
        details: error.message 
    });
}
};
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
    
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
        
        res.status(200).json({ 
            message: 'Login successful', 
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            error: 'Login failed',
            details: error.message 
        });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findByPk(userId, {attributes: { exclude: ['password'] }});
        
        if (!user) {
            return res.status(404).json({ error: 'User not found'});
            }
        res.status(200).json({ 
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        });
        
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ 
            error: 'Failed to get profile',
            details: error.message 
        });
    }
};