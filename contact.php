<?php
header('Content-Type: application/json');

// Show errors for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Database config
$host = "localhost";
$username = "root";   // default for XAMPP
$password = "";       // default for XAMPP
$dbname = "portfolio";  // must exist

// Connect to database
$conn = new mysqli($host, $username, $password, $dbname);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Database connection failed: " . $conn->connect_error]);
    exit;
}

// Get POST data
$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$message = $_POST['message'] ?? '';

if (!$name || !$email || !$message) {
    echo json_encode(["status" => "error", "message" => "All fields are required."]);
    exit;
}

// Insert into DB
$stmt = $conn->prepare("INSERT INTO messages (name, email, message) VALUES (?, ?, ?)");
if (!$stmt) {
    echo json_encode(["status" => "error", "message" => "Statement error: " . $conn->error]);
    exit;
}
$stmt->bind_param("sss", $name, $email, $message);
if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Message saved successfully."]);
} else {
    echo json_encode(["status" => "error", "message" => "Execution error: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
