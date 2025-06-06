<?php
require_once 'db.php';

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} else {
    echo "Database connection successful!";
    
    // Test if table exists
    $result = $conn->query("SHOW TABLES LIKE 'chatbot_users'");
    if ($result->num_rows > 0) {
        echo "<br>Table 'chatbot_users' exists!";
    } else {
        echo "<br>Table 'chatbot_users' does not exist!";
    }
}

$conn->close();
?> 