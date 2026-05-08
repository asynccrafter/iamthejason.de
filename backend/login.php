<?php
header('Content-Type: application/json');
session_start();

// Einfache Demo-Benutzer für Tests
// In der Produktion würde das aus einer Datenbank kommen
$valid_users = [
    'jason@example.com' => password_hash('password123', PASSWORD_BCRYPT),
    'admin@iamthejason.de' => password_hash('admin2026', PASSWORD_BCRYPT),
    'test@test.de' => password_hash('test123', PASSWORD_BCRYPT),
];

// Nur POST-Anfragen akzeptieren
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Nur POST-Anfragen erlaubt']);
    exit;
}

// Eingabe validieren
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$password = isset($_POST['password']) ? $_POST['password'] : '';
$remember = isset($_POST['remember']) ? true : false;

// Validierung
if (empty($email) || empty($password)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Email und Passwort sind erforderlich']);
    exit;
}

// Email validieren
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Ungültige E-Mail-Adresse']);
    exit;
}

// Authentifizierung
if (isset($valid_users[$email]) && password_verify($password, $valid_users[$email])) {
    // Login erfolgreich
    $_SESSION['user_id'] = md5($email);
    $_SESSION['user_email'] = $email;
    $_SESSION['login_time'] = time();
    
    // "Merken" Funktionalität
    if ($remember) {
        setcookie('user_token', md5($email . time()), time() + (30 * 24 * 60 * 60), '/');
    }
    
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Erfolgreich angemeldet',
        'user' => $email
    ]);
} else {
    // Login fehlgeschlagen
    http_response_code(401);
    echo json_encode([
        'success' => false,
        'message' => 'E-Mail oder Passwort ist falsch'
    ]);
}
?>
