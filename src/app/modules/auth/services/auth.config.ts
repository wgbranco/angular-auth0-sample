
interface AuthConfig {
    CLIENT_ID: string;
    CLIENT_DOMAIN: string;
    CONNECTION: string;
    SCOPE: string;
}

export const AUTH_CONFIG: AuthConfig = {
    CLIENT_ID: 'PAn11swGbMAVXVDbSCpnITx5Utsxz1co',
    CLIENT_DOMAIN: 'mimo-test.auth0.com',
    CONNECTION: 'Username-Password-Authentication',
    SCOPE: 'openid profile email'
};

// TODO: guards & interceptors