import { getUsersCT } from "./getUsersCT";

const usersDQ = [];
export function getUsersDQ(): Promise<any[]> {
    return new Promise((resolve) => {
        getUsersCT().then((CTs:Array<any>) => {
            CTs.forEach(ct => {
                if (ct.users)
                    Object.keys(ct.users).forEach(dq => usersDQ.push(ct.users[dq]));
            });
            resolve(usersDQ);
        });              
    });
};