import bcrypt from 'bcrypt';
import { User } from '../models/index.js';

export default async (req, res) => {
    try {
        const { name, email, password, role, project_id } = req.body;

        // 1. Check if email already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email already in use' });
        }

        // 2. Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Create the user in the database
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || 'user', // Defaults to 'user' if not provided
            project_id: project_id || null // Super Admins might not need a project
        });

        res.status(201).json({ 
            success: true, 
            message: 'User registered successfully',
            data: { id: newUser.id, name: newUser.name, role: newUser.role }
        });
        
    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ success: false, message: 'Server error during registration' });
    }
};