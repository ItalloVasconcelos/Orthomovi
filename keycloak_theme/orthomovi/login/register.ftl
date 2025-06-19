<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Cadastro - Orthomovi</title>
    <link rel="stylesheet" href="../resources/css/style.css">
</head>
<body>
    <div class="container-register">
        <form id="kc-register-form" method="post" action="${url.registrationAction}">
            <h1>Cadastro</h1>
            <input type="text" id="firstName" name="firstName" placeholder="Nome" required>
            <input type="text" id="lastName" name="lastName" placeholder="Sobrenome" required>
            <input type="email" id="email" name="email" placeholder="E-mail" required>
            <input type="password" id="password" name="password" placeholder="Senha" required>
            <input type="password" id="password-confirm" name="password-confirm" placeholder="Confirme a senha" required>
            <button type="submit">Cadastrar</button>
        </form>
        <a href="${url.loginUrl}">Voltar para o login</a>
    </div>
</body>
</html> 