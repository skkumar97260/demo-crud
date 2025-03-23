const User = require("../model/user");

const createUser = async (req, res) => {
    try {
        const { name, email, mobileNumber, image } = req.body;
        const user = await User.create({ name, email, mobileNumber, image });
        res.status(201).json({ result: user, message: "User created successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error creating user" });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ result: users }); // ✅ Fixed 'user' -> 'users'
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching users" });
    }
};

const getSingleUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json({ result: user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching user" });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ result: user, message: "User updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error updating user" });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error deleting user" });
    }
};

module.exports = { createUser, getAllUsers, getSingleUser, updateUser, deleteUser };
