# Chat App

A simple chat application built with HTML, CSS, and JavaScript. This app allows users to chat in real-time, with user authentication and message storage powered by PocketBase.

## Features

- User login and registration
- Real-time chat interface
- Backend powered by PocketBase for user data and messages

## Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AmirMohammedi/chat-app.git
   cd chat-app
## Opening the App
To start the app, open the `index.html` file in your browser.

## Configuration

### Setting up PocketBase
1. Create a PocketBase instance by following the instructions in the official [PocketBase documentation](https://pocketbase.io/docs/).
2. Once your PocketBase instance is set up, configure it for handling user authentication and data storage. 
3. Import the necessary schema from the repository to properly configure your PocketBase instance to handle user authentication and chat data.

### Schema Setup
Ensure that the following collections are set up in PocketBase:
- **Users**: For user authentication and registration.
- **Chats**: For storing messages and related chat data.

You can import the schema files by navigating to your PocketBase admin dashboard and importing the relevant JSON files.

## Contributing
We welcome contributions! Feel free to fork the repository and submit pull requests for bug fixes, enhancements, or new features.

