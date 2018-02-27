export const CLICKED_ACCOUNT = "CLICKED_ACCOUNT";

export const clickAccount = (account_id) => {
    return {
        type: CLICKED_ACCOUNT,
        account_id,
    };
};
