const Note = require("../models/model.notes");

require("dotenv").config();

exports.list = async(req, res) => {
    try {
        console.log("Received ID" + req.body.userId);
        const notes = await Note.find({ userId: req.query.userId });

        res.status(200).json({
            success: true,
            count: notes.length,
            message: "",
            data: notes,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message,
        });
    }
};

exports.store = async(req, res) => {
    try {
        const { title, content, userId } = req.body;
        console.log(req.body);
        const note = new Note({
            title,
            content,
            userId,
        });
        const savedNote = await note.save();
        console.log(savedNote); // add this line to see the saved note object
        res.json({
            success: true,
            message: "Note created successfully",
            note: savedNote,
        });
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ success: false, message: "Server error", error: error.message });
    }
};

exports.destroy = async(req, res) => {
    const { id } = req.params;
    const { userId } = req.query;
    try {
        const note = await Note.findOne({ _id: id, userId: userId });
        if (!note) {
            console.log(`Note with ID ${id} and user ID ${userId} not found`);
            return res.status(404).json({
                success: false,
                message: "Note not found",
            });
        }
        await Note.deleteOne({ _id: id });
        res.status(200).json({
            success: true,
            message: "Note deleted successfully",
        });
    } catch (err) {
        console.error("Error deleting note:", err);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message,
        });
    }
};

exports.update = async(req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    try {
        const updatedNote = await Note.findByIdAndUpdate(
            id, {
                $set: {
                    title,
                    content,
                },
            }, { new: true }
        );
        res.status(200).json(updatedNote);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Could not update note." });
    }
};