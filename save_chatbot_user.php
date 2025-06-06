<?php
require_once 'db.php';

// Function to log errors
function log_chatbot_error($message) {
    $timestamp = date('Y-m-d H:i:s');
    $log_message = "[$timestamp] $message\n";
    file_put_contents(__DIR__ . '/chatbot_errors.log', $log_message, FILE_APPEND);
}

// Check if the request is POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get and sanitize input data
    $user_type = $conn->real_escape_string($_POST['user_type'] ?? 'Not provided');
    $email = $conn->real_escape_string($_POST['email'] ?? 'Not provided');
    $phone = $conn->real_escape_string($_POST['phone'] ?? 'Not provided');
    $child_grade = $conn->real_escape_string($_POST['child_grade'] ?? 'Not provided');
    $program_interest = $conn->real_escape_string($_POST['program_interest'] ?? NULL); // Allow NULL for program interest

    // Determine which name to save in the 'name' column
    // Prioritize child_name if sent (from Existing Parent flow)
    // Otherwise, use the 'name' field if sent (from Admission flows, which contains parent name)
    $name_to_save = 'Not provided';
    if (isset($_POST['child_name']) && trim($_POST['child_name']) !== '') {
        $name_to_save = $conn->real_escape_string(trim($_POST['child_name']));
    } elseif (isset($_POST['name']) && trim($_POST['name']) !== '') {
        // This case handles the parent name from Admission flows
        $name_to_save = $conn->real_escape_string(trim($_POST['name']));
    }

    // Insert data into database
    $sql = "INSERT INTO chatbot_users (user_type, name, email, phone, child_grade, program_interest) 
            VALUES ('$user_type', '$name_to_save', '$email', '$phone', '$child_grade', '$program_interest')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(['status' => 'success', 'message' => 'User information saved successfully']);
    } else {
        log_chatbot_error("Database INSERT error: " . $conn->error . " SQL: " . $sql); // Log database errors
        echo json_encode(['status' => 'error', 'message' => 'Error saving data.']); // Generic error message for user
    }
} else {
    log_chatbot_error("Invalid request method: " . $_SERVER["REQUEST_METHOD"]); // Log invalid requests
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}

$conn->close();
?> 