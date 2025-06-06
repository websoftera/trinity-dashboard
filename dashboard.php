<?php
// Database connection for chatbot data
$host_chatbot = "localhost";
$user_chatbot = "root";
$password_chatbot = "";
$dbname_chatbot = "chatbot_db";

$conn_chatbot = new mysqli($host_chatbot, $user_chatbot, $password_chatbot, $dbname_chatbot);

// Check connection for chatbot database
if ($conn_chatbot->connect_error) {
    die("Chatbot Database Connection failed: " . $conn_chatbot->connect_error);
}

// Fetch chatbot data using the chatbot database connection - include user_type and program_interest
$chatbotQuery = "SELECT id, user_type, name, email, phone, child_grade, program_interest, created_at FROM chatbot_users ORDER BY created_at DESC";
$chatbotResult = $conn_chatbot->query($chatbotQuery);

// Close connection at the end of the file
// $conn_chatbot->close(); // Will be closed at the end

?>
<!DOCTYPE html>
<html>
<head>
    <title>Chatbot Dashboard</title>
    <link rel="stylesheet" href="styles.css">
    <style>
        .dashboard-section {
            margin: 20px auto;
            padding: 20px;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            max-width: 1200px;
        }
        .section-title {
            color: #e74c3c;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid #e74c3c;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        table th, table td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        table th {
            background-color: #f5f5f5;
            font-weight: bold;
        }
        table tr:hover {
            background-color: #f9f9f9;
        }
    </style>
</head>
<body>

<!-- Header Section -->
<div class="header-area">
    <div class="header-area-left">
        <img src="Trinity_Logo.webp" alt="Admin Logo" class="admin-logo">
    </div>
    <div class="header-area-right">
        <h1>Chatbot Dashboard Panel</h1>
        <p class="subtitle">Track and Manage Chatbot Interactions</p>
    </div>
</div>

<!-- Chatbot Data Section -->
<div class="dashboard-section">
    <h2 class="section-title">Chatbot Interactions</h2>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>User Type</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Child's Grade</th>
                <th>Program Interest</th>
                <th>Date Added</th>
            </tr>
        </thead>
        <tbody>
            <?php 
            if ($chatbotResult === FALSE) {
                echo "<tr><td colspan='8' style='text-align: center; color: red;'>Error fetching chatbot data: " . $conn_chatbot->error . "</td></tr>";
            } elseif ($chatbotResult->num_rows > 0) {
                while($row = $chatbotResult->fetch_assoc()) { 
            ?>
            <tr>
                <td><?php echo htmlspecialchars($row['id']); ?></td>
                <td><?php echo htmlspecialchars($row['user_type']); ?></td>
                <td><?php echo htmlspecialchars($row['name']); ?></td>
                <td><?php echo htmlspecialchars($row['email']); ?></td>
                <td><?php echo htmlspecialchars($row['phone']); ?></td>
                <td><?php echo htmlspecialchars($row['child_grade']); ?></td>
                <td><?php echo htmlspecialchars($row['program_interest']); ?></td>
                <td><?php echo htmlspecialchars($row['created_at']); ?></td>
            </tr>
            <?php 
                }
            } else {
                echo "<tr><td colspan='8' style='text-align: center;'>No chatbot interactions yet</td></tr>";
            }
            ?>
        </tbody>
    </table>
</div>

</body>
</html>
<?php
// Close connection
$conn_chatbot->close();
?>
