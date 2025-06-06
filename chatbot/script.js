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

let userData = {
    user_type: '',
    name: '',
    email: '',
    phone: '',
    child_grade: ''
};

let stage = 1;

function showPopupMessage(message) {
    let popup = document.createElement("div");
    popup.className = "chat-popup";
    popup.innerHTML = message;
    document.body.appendChild(popup);
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

    if (stage === 1) {
        if (option.toLowerCase().includes("yes")) {
            userData.user_type = "Existing Parent";
        } else if (option.toLowerCase().includes("admission")) {
            userData.user_type = "New Admission";
        }
    }

    displayMessage(option, "user");
    processChatFlow(option.toLowerCase());
}

function processChatFlow(input) {
    let response = "";
    switch (stage) {
        case 1:
            if (input.includes("yes")) {
                userData.user_type = "Existing Parent";
                response = "Kindly mention child's name?";
                stage = 2;
            } else if (input.includes("admission")) {
                userData.user_type = "New Admission";
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
            if (!input.trim()) {
                response = "Please enter child's name. This field is required.";
                displayMessage(response, "bot");
                return;
            }
            userData.child_name = input.trim();
            response = "Kindly mention child's grade?";
            stage = 4;
            break;
        case 3:
            if (input.includes("yes")) {
                response = "Which Grade?\n a) Nursery-Grade 2\n b) Grade 3-5\n c) Grade 6-10\n d) Grade 11-12";
                stage = 5;
            } else if (input.includes("no")) {
                response = "Thank You! Please provide your name:";
                stage = 7;
            } else {
                response = "Please select Yes or No";
                displayMessage(response, "bot");
                return;
            }
            break;
        case 4:
            if (!input.trim()) {
                response = "Please enter child's grade. This field is required.";
                displayMessage(response, "bot");
                return;
            }
            userData.child_grade = input.trim();
            response = "Would you like to know more about our unique programmes?\na)Leadership programmes\nb)Financial literacy \nc)Entrepreneurship\nd)Toast Master";
            stage = 6;
            break;
        case 5:
            let gradeDescription = 'Not provided';
            switch (input.toLowerCase()) {
                case 'a':
                    gradeDescription = 'Nursery-Grade 2';
                    break;
                case 'b':
                    gradeDescription = 'Grade 3-5';
                    break;
                case 'c':
                    gradeDescription = 'Grade 6-10';
                    break;
                case 'd':
                    gradeDescription = 'Grade 11-12';
                    break;
                default:
                    response = "Please select a valid option (a, b, c, or d).";
                    displayMessage(response, "bot");
                    return;
            }
            userData.child_grade = gradeDescription;
            response = "Thank You! Please provide your name:";
            stage = 7;
            break;
        case 6:
            let programInterest = 'Not provided';
            switch (input.toLowerCase()) {
                case 'a':
                    programInterest = 'Leadership programmes';
                    break;
                case 'b':
                    programInterest = 'Financial literacy';
                    break;
                case 'c':
                    programInterest = 'Entrepreneurship';
                    break;
                case 'd':
                    programInterest = 'Toast Master';
                    break;
                default:
                    response = "Please select a valid option (a, b, c, or d).";
                    displayMessage(response, "bot");
                    return;
            }
            userData.program_interest = programInterest;
            saveUserData();
            response = "Thank you! We will reach out soon.";
            stage = 10;
            break;
        case 7:
            if (!input.trim()) {
                response = "Please enter your name. This field is required.";
                displayMessage(response, "bot");
                return;
            }
            userData.name = input.trim();
            response = "Please provide your email address:";
            stage = 8;
            break;
        case 8:
            if (!input.trim()) {
                response = "Please enter your email address. This field is required.";
                displayMessage(response, "bot");
                return;
            }
            if (!isValidEmail(input)) {
                response = "Please enter a valid email address.";
                displayMessage(response, "bot");
                return;
            }
            userData.email = input.trim();
            response = "Please provide your 10-digit phone number:";
            stage = 9;
            break;
        case 9:
            if (!input.trim()) {
                response = "Please enter your phone number. This field is required.";
                displayMessage(response, "bot");
                return;
            }
            if (!isValidPhone(input)) {
                response = "Please enter a valid 10-digit phone number.";
                displayMessage(response, "bot");
                return;
            }
            userData.phone = input.trim();

            saveUserData();
            response = "Thank you! We will reach out soon.";
            stage = 10;
            break;
        case 10:
            response = "Thank you for your time.";
            break;
        default:
            response = "An unexpected error occurred. Please restart the chat.";
            stage = 1;
            break;
    }
    displayMessage(response, "bot");
}

function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
}

function saveUserData() {
    console.log("Saving user data:", userData);
    const formData = new FormData();
    formData.append('user_type', userData.user_type ?? 'Not provided');
    if (userData.hasOwnProperty('name')) formData.append('name', userData.name ?? 'Not provided');
    if (userData.hasOwnProperty('child_name')) formData.append('child_name', userData.child_name ?? 'Not provided');
    if (userData.hasOwnProperty('parent_name')) formData.append('parent_name', userData.parent_name ?? 'Not provided');
    formData.append('email', userData.email ?? 'Not provided');
    formData.append('phone', userData.phone ?? 'Not provided');
    formData.append('child_grade', userData.child_grade ?? 'Not provided');
    if (userData.hasOwnProperty('program_interest')) formData.append('program_interest', userData.program_interest);

    // Using fetch API to send data
    fetch('/tdashboard/save_chatbot_user.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Save Success:', data);
        // You can add feedback to the user here based on the response
    })
    .catch(error => {
        console.error('Save Error:', error);
        // You can add error feedback to the user here
    });
}

function sendMessage() {
    const userInput = document.getElementById("user-input");
    let message = userInput.value.trim();

    if (!message) return;

    displayMessage(message, "user");
    userInput.value = "";

    if (stage < 10) {
        processChatFlow(message.toLowerCase());
    }
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

function displayMessage(text, sender) {
    const chatBody = document.getElementById("chat-body");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add(sender === "user" ? "user-message" : "bot-message");

    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const timestamp = `${hours}:${minutes}`;

    messageDiv.innerHTML = `<span>${text.replace(/\n/g, "<br>")}</span> 
                            <span class="timestamp">${timestamp}</span>`;
    
    chatBody.appendChild(messageDiv);
    scrollToBottom();
}

function scrollToBottom() {
    const chatBody = document.getElementById("chat-body");
    chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
}