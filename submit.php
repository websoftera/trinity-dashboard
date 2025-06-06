<?php
require 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $form_name = $_POST['form_name'];
    $location = $_POST['location'];
    $user_name = $_POST['user_name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];

    $query = "INSERT INTO form_responsesone (form_name, location, user_name, email, phone) VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("sssss", $form_name, $location, $user_name, $email, $phone);

    if ($stmt->execute()) {
        echo "<div style='text-align:center;margin-top:100px;font-size:30px;color:green;'>Thank you! Form submitted successfully.</div>";
    } else {
        echo "<div style='color:red;text-align:center;'>Error: " . $conn->error . "</div>";
    }
}
?>