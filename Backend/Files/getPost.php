<?php
include("../Config/conexion.php");
$conn = conectar();

if (isset($_GET['id'])) {
    $postId = $_GET['id'];
    $querySelect = "SELECT * FROM posts WHERE id = $postId";
    $post = mysqli_query($conn, $querySelect);

    if ($post) {
        $postArray = mysqli_fetch_array($post);
        echo json_encode(['STATUS' => 'SUCCESS', 'MESSAGE' => $postArray]);
    } else {
        echo json_encode(['STATUS' => 'ERROR', 'MESSAGE' => 'No se pudo obtener el post']);
    }
} else {
    echo json_encode(['STATUS' => 'ERROR', 'MESSAGE' => 'ID de post no proporcionado']);
}
?>