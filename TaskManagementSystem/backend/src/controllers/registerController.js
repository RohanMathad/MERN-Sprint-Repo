import bcrypt from 'bcrypt';
import { User } from '../models/index.js';

export default async (req, res) => {
    try {
        const { name, email, password, role, project_id } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email already in use' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || 'user', 
            project_id: project_id || null 
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