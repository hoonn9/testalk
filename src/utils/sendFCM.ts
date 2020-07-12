import firebase from "firebase-admin";

export const sendFCM = (data: { [key: string]: string; }, token: string) => {
    return firebase.messaging().sendToDevice(token, {
        data
    }, {
        priority: "high",
    })
}