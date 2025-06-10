
import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url: 'https://orthomovi-keycloak.t2wird.easypanel.host/',
    realm: 'orthomovi',
    clientId: 'orthomovi',
});

export default keycloak;
