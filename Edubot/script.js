// Initialize variables
let userName = ''; // Variable to store the user's name
let askedName = false; // Flag to track whether the chatbot has asked for the user's name
let selectedSection = ''; // Variable to store the selected section
let selectedSubject = ''; // Variable to store the selected subject
let learningMode = false; // Flag to indicate if the bot is in learning mode
let lastQuestion = ''; // Variable to store the last unknown question

// Hashmap to store user-provided answers for unknown questions
const learnedResponses = {};

// Array of random responses to greetings
const randomGreetings = [
    "Hello! How can I assist you today?",
    "Hi there! What can I help you with?",
    "Hey! Do you have any questions for me?",
];

// Mapping of sections to subjects
const subjects = {
    'english medium': {
        'English Language': { teacher: 'Ms. Johnson', qualification: 'MA in English Literature' },
        'English Literature': { teacher: 'Mr. Smith', qualification: 'PhD in English Literature' },
        'Economics': { teacher: 'Dr. Brown', qualification: 'PhD in Economics' },
        'Maths': { teacher: 'Mrs. Davis', qualification: 'MSc in Mathematics' },
        'Science': { teacher: 'Mr. Wilson', qualification: 'MSc in Physics' },
        'Business Studies': { teacher: 'Mrs. Taylor', qualification: 'MBA in Business Administration' },
        'Accounting': { teacher: 'Mr. Anderson', qualification: 'CPA, MSc in Accounting' }
    },
    'sinhala medium': {
        'Accounting': { teacher: 'Mr. Fernando', qualification: 'CPA, MSc in Accounting' },
        'Economics': { teacher: 'Dr. Perera', qualification: 'PhD in Economics' },
        'History': { teacher: 'Mr. Silva', qualification: 'MA in History' },
        'Sinhala': { teacher: 'Ms. Karunaratne', qualification: 'MA in Sinhala' },
        'Science': { teacher: 'Mr. Weerasinghe', qualification: 'MSc in Biology' },
        'Business Studies': { teacher: 'Mrs. Kumari', qualification: 'MBA in Business Administration' }
    }
};

// Function to start the chat
function startChat() {
    setTimeout(() => {
        displayMessage('Hello! What is your name?', 'bot'); // Display initial message asking for user's name
        askedName = true; // Set the flag to true after asking for the name
    }, 500);
}

// Function to handle sending a message
function sendMessage() {
    const userInput = document.getElementById('user-input');
    const message = userInput.value.trim(); // Trim the whitespace from the user's message

    if (message !== '') { // Check if the message is not empty
        displayMessage(message, 'user'); // Display the user's message

        // Check if the bot is in learning mode
        if (learningMode) {
            learnedResponses[lastQuestion] = message; // Store the user's answer to the unknown question
            setTimeout(() => {
                displayMessage(`Thank you! I have learned that the answer to "${lastQuestion}" is "${message}". How else can I assist you, ${userName}?`, 'bot');
            }, 1000);
            learningMode = false; // Reset learning mode
        }
        // Check if the user's name is not set
        else if (!userName) {
            userName = message; // Set the user's name
            setTimeout(() => {
                displayMessage(`Hello, ${userName}! How can I assist you today?`, 'bot'); // Display a welcome message with the user's name
            }, 1000);
        } 
        // Check if the user wants to end the conversation
        else if (message.toLowerCase() === 'bye') {
            setTimeout(() => {
                displayMessage(`Goodbye, ${userName}! Have a great day!`, 'bot'); // Display a goodbye message with the user's name
            }, 1000);
        } 
        // Check for specific questions and provide answers
        else if (message.toLowerCase().includes('college')) {
            setTimeout(() => {
                displayMessage(`Welcome to ASTRO-Edu College, a leading institution offering a wide range of courses for grades 8, 9, 10, O/L, and A/L in both English and Sinhala mediums. Is there anything specific you would like to know about our college, ${userName}?`, 'bot'); // Provide information about the college
            }, 1000);
        } 
        // Check for subject-related questions
        else if (message.toLowerCase().includes('subjects')) {
            setTimeout(() => {
                displayMessage(`We offer the following sections:\n1. Grade 8, 9, 10, O/L, and A/L English Medium\n2. Grade 8, 9, 10, O/L, and A/L Sinhala Medium\nPlease specify which section you are interested in.`, 'bot'); // Ask user to specify the section
            }, 1000);
        } 
        // Handle the section choice for subjects
        else if (!selectedSection) {
            const section = message.toLowerCase();
            const validSections = ['english medium', 'sinhala medium'];
            if (validSections.includes(section)) {
                selectedSection = section; // Set the selected section
                setTimeout(() => {
                    const subjectsList = Object.keys(subjects[section]).join(', ');
                    displayMessage(`You have selected the ${section.replace('medium', 'Medium')} section. Here are the subjects available in this section: ${subjectsList}. Please choose a subject to see the relevant teacher and their qualifications.`, 'bot'); // Provide section-specific subject information
                }, 1000);
            } else {
                setTimeout(() => {
                    displayMessage(`I'm sorry, but we don't have a section called "${section}". Please choose from English Medium or Sinhala Medium.`, 'bot'); // Ask for a valid section
                }, 1000);
            }
        } 
        // Handle the subject choice for teacher information
        else if (selectedSection && !selectedSubject) {
            const subject = message.toLowerCase();
            const subjectsInSection = subjects[selectedSection];
            const subjectKeys = Object.keys(subjectsInSection).map(s => s.toLowerCase());
            if (subjectKeys.includes(subject)) {
                selectedSubject = subject; // Set the selected subject
                const subjectInfo = subjects[selectedSection][Object.keys(subjects[selectedSection]).find(s => s.toLowerCase() === subject)];
                setTimeout(() => {
                    displayMessage(`You have selected ${subject}. The teacher for this subject is ${subjectInfo.teacher} who has a qualification of ${subjectInfo.qualification}. How else can I assist you, ${userName}?`, 'bot'); // Provide subject-specific teacher information
                }, 1000);
            } else {
                setTimeout(() => {
                    displayMessage(`I'm sorry, but we don't offer a subject called "${subject}" in the ${selectedSection.replace('medium', 'Medium')} section. Please choose a valid subject.`, 'bot'); // Ask for a valid subject
                }, 1000);
            }
        }
        // Check for greetings and provide random responses
        else if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
            const randomIndex = Math.floor(Math.random() * randomGreetings.length); // Generate a random index
            setTimeout(() => {
                displayMessage(randomGreetings[randomIndex], 'bot'); // Display a random greeting response
            }, 1000);
        }
        // Check if the user asks the chatbot's name
        else if (message.toLowerCase().includes('your name')) {
            setTimeout(() => {
                displayMessage(`My name is EduBot. How can I assist you, ${userName}?`, 'bot'); // Display the chatbot's name
            }, 1000);
        }
        // Check for small talk related to time of day
        else if (message.toLowerCase().includes('good morning')) {
            setTimeout(() => {
                displayMessage(`Good morning, ${userName}! How can I assist you today?`, 'bot');
            }, 1000);
        } 
        else if (message.toLowerCase().includes('   ')) {
            setTimeout(() => {
                displayMessage(`Good afternoon, ${userName}! How can I assist you today?`, 'bot');
            }, 1000);
        } 
        else if (message.toLowerCase().includes('good evening')) {
            setTimeout(() => {
                displayMessage(`Good evening, ${userName}! How can I assist you today?`, 'bot');
            }, 1000);
        }
        // Check if the question has been learned before
        else if (learnedResponses.hasOwnProperty(message.toLowerCase())) {
            const learnedResponse = learnedResponses[message.toLowerCase()];
            setTimeout(() => {
                displayMessage(learnedResponse, 'bot'); // Provide the learned answer
            }, 1000);
        }
        // If the question is unknown, ask the user to provide the answer
        else {
            lastQuestion = message.toLowerCase();
            learningMode = true; // Set learning mode
            setTimeout(() => {
                displayMessage(`I don't know the answer to that question. Can you please provide the answer?`, 'bot'); // Ask the user for the answer
            }, 1000);
        }

        userInput.value = ''; // Clear the input field after sending the message
    }
}

// Function to display a message in the chat interface
function displayMessage(message, sender) {
    const chatMessages = document.getElementById('chat-messages');
    const messageElement = document.createElement('div');

    messageElement.classList.add('message', sender); // Add classes to style the message based on sender (user or bot)
    messageElement.innerHTML = `
        <img src="${sender === 'bot' ? 'ASTRO.png' : 'userpic.png'}" alt="Profile Picture" class="profile-pic">
        <div class="message-content">${message}</div>
    `; // Create HTML structure for the message

    chatMessages.appendChild(messageElement); // Append the message to the chat messages container
    chatMessages.scrollTop = chatMessages.scrollHeight; // Automatically scroll to the bottom of the chat messages
}

// Function to restart the chat
function restartChat() {
    const chatMessages = document.getElementById('chat-messages');
    chatMessages.innerHTML = ''; // Clear all previous messages from the chat interface
    userName = ''; // Reset the user's name
    askedName = false; // Reset the flag indicating whether the chatbot has asked for the user's name
    selectedSection = ''; // Reset the selected section
    selectedSubject = ''; // Reset the selected subject
    learningMode = false; // Reset learning mode
    lastQuestion = ''; // Reset the last unknown question
    startChat(); // Start the chat again
}

// Event listener to start the chat when the DOM content is loaded
document.addEventListener('DOMContentLoaded', (event) => {
    startChat(); // Start the chat when the page is loaded
});

// Event listener for the send button
document.getElementById('send-button').addEventListener('click', sendMessage);

// Event listener for pressing the Enter key to send a message
document.getElementById('user-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});
