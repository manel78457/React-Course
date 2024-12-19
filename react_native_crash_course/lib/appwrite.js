import { Account, Client, ID, Avatars, Databases } from 'react-native-appwrite';

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.personal.aora',
    projectId: '67375c2d000c2a25cd42',
    databaseId: '67375d9100370b9aa6cf',
    userCollectionId: '67375db7002b5405a4fe',
    videoCollectionId: '67375de80016b5ea2a8f',
    storageId: '67376be1003b72bbb58f'
}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.

    const account = new Account(client);
    const avatars = new Avatars(client);
    const databases = new Databases(client);

    export const createUser = async (email, password, username) => {
        try {
            const newAccount = await account.create(
                ID.unique(),
                email,
                password,
                username
            )

            if(!newAccount) throw Error;

            const avatarUrl = avatars.getInitials(username);

            await signIn(email, password);

            const newUser = await databases.createDocument(
                config.databaseId,
                config.userCollectionId,
                ID.unique(),
                {
                    accountId: newAccount.$id,
                    email,
                    username,
                    avatar: avatarUrl
                }
            )

            return newUser;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

    export async function signIn(email, password) {
        try {
            const session = account.createEmailPasswordSession(email, password);
            return session;
        } catch (error) {
            throw new Error(error);
        }
    }