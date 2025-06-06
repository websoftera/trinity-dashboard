<?php
// db.php - common DB connection
$host = "localhost";
$user = "root";
$password = "";
$dbname = "chatbot_db"; // Use the chatbot database

$conn = new mysqli($host, $user, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// SQL to create table
// Reverting to the original structure before adding program_interest and separating names
$sql = "CREATE TABLE chatbot_users (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_type VARCHAR(50),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    child_grade VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)";

// Note: Running CREATE TABLE on an existing table will typically fail.
// You might need to manually drop the table in phpMyAdmin first if you want to recreate it with this structure.
// Or, if the table exists, this script is just for reference of the intended structure.

if ($conn->query($sql) === TRUE) {
    echo "Table chatbot_users created successfully";
} else {
    // echo "Error creating table: " . $conn->error; // Comment out or handle errors if table exists
    echo "Table chatbot_users creation attempted. It might already exist or there was an error.";
}

$conn->close();
?> 