import Message from '../models/Message.js';

// 1. Submit a contact message (POST)
export const createMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Basic Validation: make sure no fields are empty
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'Please fill in all fields (Name, Email, Subject, Message)' });
    }

    // Email validation using a basic check (must have @ and .)
    if (!email.includes('@') || !email.includes('.')) {
      return res.status(400).json({ message: 'Please enter a valid email address' });
    }

    // Create a new Message document
    const newMessage = new Message({
      name,
      email,
      subject,
      message
    });

    // Save it to the database
    const savedMessage = await newMessage.save();

    res.status(201).json({ 
      message: 'Thank you! Your message has been sent successfully.', 
      data: savedMessage 
    });
  } catch (error) {
    res.status(400).json({ message: 'Failed to send message', error: error.message });
  }
};

// 2. Retrieve all submitted messages (GET)
// (Note: As per instructions, this is kept for admin review and not displayed publicly)
export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 }); // Get newest messages first
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load messages', error: error.message });
  }
};

// 3. Delete a contact message (DELETE)
export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMessage = await Message.findByIdAndDelete(id);
    if (!deletedMessage) {
      return res.status(404).json({ message: 'Message not found to delete' });
    }
    res.status(200).json({ message: 'Message successfully deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Delete failed', error: error.message });
  }
};
