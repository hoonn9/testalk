import firebase from "firebase-admin";

export const createCustomToken = (id: string) => {
    return firebase.auth().createCustomToken(id)
}