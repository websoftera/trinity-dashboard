<?php
// db.php - common DB connection
$host = "localhost";
$user = "root";
$password = "";
$dbname = "chatbot_db";

$conn = new mysqli($host, $user, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
