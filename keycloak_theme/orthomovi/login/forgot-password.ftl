<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Esqueci a Senha - Orthomovi</title>
    <link rel="stylesheet" href="../resources/css/style.css">
</head>
<body>
    <div class="container-forgot-password">
        <form id="kc-reset-password-form" method="post" action="${url.forgotPasswordAction}">
            <h1>Esqueceu sua senha?</h1>
            <p>Informe seu e-mail para receber as instruções de recuperação</p>
            <input type="email" id="email" name="email" placeholder="Seu e-mail" required>
            <button type="submit">Enviar instruções</button>
        </form>
        <a href="${url.loginUrl}">Voltar para o login</a>
    </div>
</body>
</html> 