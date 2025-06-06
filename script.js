document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
       
        showPopupMessage(' ✋Hi! How can we Help?');
        
        setTimeout(() => {
            document.getElementById("chatbot").style.display = "block";
            setTimeout(() => {
                displayMessage("Are you an existing parent? Or looking for new Admission?🤔", "bot");
                displayOptions();
            }, 500);
        }, 3000);
    }, 2000);
});

function showPopupMessage(message) {
    let popup = document.createElement("div");
    popup.className = "chat-popup";
    popup.innerHTML = message;
    document.body.appendChild(popup);
}

// Function to show a popup message before chatbot starts
function showPopupMessage(text) {
    const popup = document.createElement("div");
    popup.innerText = text;
    popup.id = "popup-message";
    document.body.appendChild(popup);

    setTimeout(() => {
        popup.style.opacity = "0";
        setTimeout(() => {
            popup.remove();
        },500 );
    }, 2500); // Message disappears after 2.5 seconds


    
}

function toggleChat() {
    const chatbot = document.getElementById("chatbot");
    chatbot.style.display = chatbot.style.display === "block" ? "none" : "block";
}

function displayOptions() {
    if (document.querySelector(".options")) return;

    const chatBody = document.getElementById("chat-body");
    const optionsDiv = document.createElement("div");
    optionsDiv.classList.add("options");

    ["Yes", "Admission"].forEach(text => {
        const button = document.createElement("button");
        button.innerText = text;
        button.classList.add("option-btn");
        button.onclick = () => handleOptionClick(text);
        optionsDiv.appendChild(button);
    });

    chatBody.appendChild(optionsDiv);
}

function displayYesNoOptions() {
    if (document.querySelector(".yes-no-options")) return;

    const chatBody = document.getElementById("chat-body");
    const optionsDiv = document.createElement("div");
    optionsDiv.classList.add("yes-no-options");

    ["Yes", "No"].forEach(text => {
        const button = document.createElement("button");
        button.innerText = text;
        button.classList.add("option-btn");
        button.onclick = () => handleOptionClick(text);
        optionsDiv.appendChild(button);
    });

    chatBody.appendChild(optionsDiv);
}

function handleOptionClick(option) {
    const optionsContainer = document.querySelector(".options") || document.querySelector(".yes-no-options");
    if (optionsContainer) optionsContainer.remove();

    displayMessage(option, "user");
    processChatFlow(option.toLowerCase());
}

let stage = 1;

function processChatFlow(input) {
    let response = "";
    switch (stage) {
        case 1:
            if (input.includes("yes")) {
                response = "Kindly mention child’s name & grade?";
                stage = 2;
            } else if (input.includes("admission")) {
                response = "Would you like to have a sneak peek of our live classroom?";
                displayMessage(response, "bot");
                displayYesNoOptions();
                stage = 3;
                return;
            } else {
                response = "Please select a valid option: Yes or Admission";
            }
            break;
            case 2:
                
                const words = input.trim().split(/\s+/); 
                const containsNumber = words.some(word => /\d/.test(word)); 
                const containsText = words.some(word => /[A-Za-z]/.test(word)); 
            
                if (!containsNumber || !containsText) {
                    response = "Please provide both the child's name and grade.";
                    displayMessage(response, "bot");
                    return;
                }
            
                displayMessage(`Thank You !!\n\nChild’s Name and Grade: ${input}`, "bot");
                response = "Would you like to know more about our unique programs?\n a) Leadership programs\n b) Financial literacy\n c) Entrepreneurship\n d) Toast Master";
                stage = 6;
                break;
            
        case 3:
            if (input.includes("yes")) {
                response = "Which Grade?\n a) Nursery-Grade 2\n b) Grade 3-5\n c) Grade 6-10\n d) Grade 11-12";
                stage = 5;
            } else {
                response = "Let us share your number & email so we can get in touch with you.";
                stage = 6;
            }
            break;
        case 5:
            response = "Help us with your contact number and email id, so we can share the desired link with you..........";
            stage = 6;
            break;
        case 6:
            response = "Thank you! We will reach out soon.";
            break;
    }
    displayMessage(response, "bot");
}

function sendMessage() {
    const userInput = document.getElementById("user-input");
    let message = userInput.value.trim();

    if (!message) return;

    displayMessage(message, "user");
    userInput.value = "";

    processChatFlow(message.toLowerCase());
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

// function displayMessage(text, sender) {
//     const chatBody = document.getElementById("chat-body");
//     const messageDiv = document.createElement("div");
//     messageDiv.classList.add(sender === "user" ? "user-message" : "bot-message");
//     messageDiv.innerHTML = `<span>${text.replace(/\n/g, "<br>")}</span>`;
//     chatBody.appendChild(messageDiv);
//     scrollToBottom();
// }


function displayMessage(text, sender) {
    const chatBody = document.getElementById("chat-body");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add(sender === "user" ? "user-message" : "bot-message");

    // Get current time
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const timestamp = `${hours}:${minutes}`;

    // Add timestamp to the message
    messageDiv.innerHTML = `<span>${text.replace(/\n/g, "<br>")}</span> 
                            <span class="timestamp">${timestamp}</span>`;
    
    chatBody.appendChild(messageDiv);
    scrollToBottom();
}


function scrollToBottom() {
    const chatBody = document.getElementById("chat-body");
    chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
}