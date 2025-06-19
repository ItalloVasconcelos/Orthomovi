<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Login - Orthomovi</title>
    <link rel="stylesheet" href="../resources/css/style.css">
</head>
<body>
    <div class="container-login">
        <#-- Aqui vai o conteúdo do formulário de login customizado -->
        <form id="kc-form-login" onsubmit="return true;" method="post" action="${url.loginAction}">
            <h1>Acesso ao Sistema</h1>
            <p>Clique abaixo para entrar ou criar sua conta em nosso portal seguro.</p>
            <input type="text" id="username" name="username" placeholder="Usuário ou E-mail" autofocus required>
            <input type="password" id="password" name="password" placeholder="Senha" required>
            <button type="submit">Entrar</button>
        </form>
        <a href="${url.registrationUrl}">Cadastrar-se</a>
        <a href="${url.forgotPasswordUrl}">Esqueci a senha</a>
    </div>
</body>
</html> 