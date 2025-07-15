# Tema Keycloak - Orthomovi

Este projeto inclui um tema customizado para o Keycloak usando **Keycloakify**, que permite criar temas usando React, TypeScript e Tailwind CSS.

## 📁 Estrutura do Tema

```
src/keycloak-theme/
├── login/
│   ├── pages/
│   │   ├── Login.tsx           # Página de login customizada
│   │   ├── Register.tsx        # Página de registro customizada
│   │   ├── ForgotPassword.tsx  # Página de recuperação de senha
│   │   └── *.stories.tsx       # Stories do Storybook para cada página
│   ├── KcPage.tsx              # Roteador principal das páginas
│   ├── KcContext.ts            # Tipagem do contexto Keycloak
│   ├── i18n.ts                 # Configuração de internacionalização
│   ├── KcPageStory.tsx         # Configuração das stories
│   └── KcPage.css              # Estilos customizados
└── kc.gen.ts                   # Tipos gerados para o tema
```

## 🚀 Como usar

### 1. Desenvolvimento e Testes

Para testar o tema durante o desenvolvimento:

```bash
# Inicia o Storybook para ver as páginas do tema
npm run storybook
```

O Storybook será aberto em `http://localhost:6006` onde você pode visualizar:
- Página de Login (`login/login.ftl`)
- Página de Registro (`login/register.ftl`) 
- Página de Recuperação de Senha (`login/login-reset-password.ftl`)

### 2. Build do Tema

Para gerar o arquivo JAR do tema para usar no Keycloak:

```bash
# Builda o projeto e gera o tema do Keycloak
npm run build-keycloak-theme
```

Isso irá gerar um arquivo `.jar` na pasta `dist_keycloak/` que pode ser usado no Keycloak.

### 3. Implantação no Keycloak

#### Opção A: Docker (Desenvolvimento)

```bash
# 1. Faça o build do tema
npm run build-keycloak-theme

# 2. Execute o Keycloak com seu tema customizado
docker run \
  -v "./dist_keycloak/keycloak-theme-for-kc-all-other-versions.jar:/opt/keycloak/providers/keycloak-theme.jar" \
  -p 8080:8080 \
  -e KC_BOOTSTRAP_ADMIN_USERNAME=admin \
  -e KC_BOOTSTRAP_ADMIN_PASSWORD=admin \
  quay.io/keycloak/keycloak:25.0.7 start-dev
```

#### Opção B: Keycloak em Produção

1. **Copie o arquivo JAR**: Copie o arquivo `keycloak-theme-for-kc-all-other-versions.jar` da pasta `dist_keycloak/` para o diretório `providers/` do seu Keycloak.

2. **Reinicie o Keycloak**: Reinicie sua instância do Keycloak.

3. **Configure o tema**: No admin console do Keycloak:
   - Vá para **Realm Settings**
   - Clique na aba **Themes**
   - Em **Login theme**, selecione **orthomovi**
   - Clique em **Save**

## 🎨 Customização

### Modificando as Páginas

As páginas estão localizadas em `src/keycloak-theme/login/pages/`. Cada página é um componente React que você pode modificar livremente:

- **Login.tsx**: Página de login com campos de usuário/email e senha
- **Register.tsx**: Página de registro com campos nome, sobrenome, email e senha
- **ForgotPassword.tsx**: Página de recuperação de senha

### Modificando Estilos

Os estilos estão em `src/keycloak-theme/login/KcPage.css` e usam:
- **Tailwind CSS**: Para classes utilitárias
- **CSS customizado**: Para variáveis de marca e animações
- **shadcn/ui**: Para componentes de UI consistentes

### Adicionando Novas Páginas

Para adicionar uma nova página personalizada:

1. Crie o componente da página em `src/keycloak-theme/login/pages/`
2. Adicione o caso no switch em `src/keycloak-theme/login/KcPage.tsx`
3. Crie uma story no Storybook para testes
4. Faça o build e teste

## 🔧 Comandos Disponíveis

```bash
# Desenvolvimento
npm run dev              # Inicia a aplicação principal
npm run storybook        # Inicia o Storybook para o tema

# Build
npm run build            # Builda a aplicação principal
npm run build-keycloak-theme  # Builda o tema do Keycloak
npm run build-storybook  # Builda o Storybook

# Keycloakify
npx keycloakify          # Executa comandos do Keycloakify
```

## 📝 Notas Importantes

1. **Compatibilidade**: O tema é compatível com Keycloak v11 até as versões mais recentes.

2. **Responsividade**: Todas as páginas são responsivas e funcionam bem em dispositivos móveis e desktop.

3. **Acessibilidade**: As páginas incluem recursos de acessibilidade como labels apropriados e navegação por teclado.

4. **Validação**: A validação de formulários é feita pelo próprio Keycloak, garantindo segurança.

5. **Internacionalização**: O tema suporta múltiplos idiomas através do sistema de i18n do Keycloak.

## 🐛 Troubleshooting

### Problema: Tema não aparece no Keycloak
- Verifique se o arquivo JAR foi copiado corretamente para `/opt/keycloak/providers/`
- Reinicie completamente o Keycloak
- Verifique os logs do Keycloak para erros

### Problema: Estilos não funcionam
- Verifique se o Tailwind CSS está sendo incluído corretamente
- Certifique-se de que o `KcPage.css` está sendo importado
- Limpe o cache do navegador

### Problema: Erros no desenvolvimento
- Execute `npm install` para garantir que todas as dependências estão instaladas
- Verifique se as versões do Node.js são compatíveis (recomendado: Node 18+) 