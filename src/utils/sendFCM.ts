import firebase from "firebase-admin";

export const sendFCM = (title: string, body: string, data: { [key: string]: string; }, token: string) => {
    return firebase.messaging().send({
        notification: {
            title,
            body
        },
        data,
        token
    })
}