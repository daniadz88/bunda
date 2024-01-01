<?php
// Allow requests from any origin
header('Access-Control-Allow-Origin: *');
// Allow the following methods
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
// Allow the following headers
header('Access-Control-Allow-Headers: Content-Type');
// Allow cookies to be sent with the request
header('Access-Control-Allow-Credentials: true');
// Specify the type of content being sent
header('Content-Type: application/json');

$servername = 'localhost';
$username = 'root';
$password = '';
$dbname = 'todo_app';

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = 'SELECT * FROM tasks';
    $result = $conn->query($sql);

    $tasks = array();

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $tasks[] = $row;
        }
    }

    echo json_encode($tasks);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $name = $data['name'];
    $date = $data['date'];
    $time = $data['time'];

    $sql = "INSERT INTO tasks (name, date, time, status) VALUES ('$name', '$date', '$time', 'unfinished')";
    $conn->query($sql);
}

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $id = $_GET['id'];
    $data = json_decode(file_get_contents('php://input'), true);

    $status = $data['status'];

    $sql = "UPDATE tasks SET status='$status' WHERE id=$id";
    $conn->query($sql);
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $id = $_GET['id'];

    $sql = "DELETE FROM tasks WHERE id=$id";
    $conn->query($sql);
}

$conn->close();
?>
