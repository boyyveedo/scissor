import { UserInfo } from 'oidc-client';

declare global {
    namespace Express {
        interface Request {
            oidc?: {
                user?: UserInfo;
            };
        }
    }
}
