<?php
require 'db.php';
$form_name = $_GET['form'] ?? '';
$location = $_GET['location'] ?? '';

$query = "SELECT user_name, email, phone, submitted_at FROM form_responsesone WHERE form_name=? AND location=?";
$stmt = $conn->prepare($query);
$stmt->bind_param("ss", $form_name, $location);
$stmt->execute();
$result = $stmt->get_result();
?>
<!DOCTYPE html>
<html>
<head>
    <title>Details - <?php echo htmlspecialchars($form_name); ?></title>
     <link rel="stylesheet" href="styles.css">

</head>
<body>

<!-- Header Section -->
<div class="header-area">
    <div class="header-area-left">
        <img src="Trinity_Logo.webp" alt="Admin Logo" class="admin-logo">
    </div>
    <div class="header-area-right">
        <h1>Admin Dashboard Panel</h1>
        <p class="subtitle">Track and Manage Form Submissions</p>
    </div>
</div>

<!-- Location Links -->
<div class="locations">
    <div class="location-boxes">
        <a href="dashboard.php?location=Pune" class="location-box">Pune</a>
        <a href="dashboard.php?location=Vaduj" class="location-box">Vaduj</a>
    </div>
</div>
<!-- Table Title -->
<h2><?php echo htmlspecialchars($location); ?> - <?php echo htmlspecialchars($form_name); ?> Submissions</h2>

<!-- Table -->
<table>
    <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Date</th>
    </tr>
    <?php while($row = $result->fetch_assoc()) {
        $datetime = new DateTime($row['submitted_at']);
    ?>
    <tr>
        <td><?php echo htmlspecialchars($row['user_name']); ?></td>
        <td><?php echo htmlspecialchars($row['email']); ?></td>
        <td><?php echo htmlspecialchars($row['phone']); ?></td>
        <td><?php echo $datetime->format('Y-m-d H:i:s'); ?></td>
    </tr>
    <?php } ?>
</table>

</body>
</html>
