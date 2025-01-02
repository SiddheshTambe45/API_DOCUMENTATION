"use server";

import { ID, Query } from "node-appwrite";
import { appwriteConfig } from "../appwrite";
import { createAdminClient, createSessionClient } from "../appwrite/config";
import { parseStringify } from "../utils";
import { cookies } from "next/headers";

export const getUserByEmail = async (email: string) => {
  const { databases } = await createAdminClient();

  const result = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.usersCollectionId,
    [Query.equal("email", [email])]
  );

  return result.total > 0 ? result.documents[0] : null;
};

export const sendEmailOtp = async ({ email }: { email: string }) => {
  try {
    const { account } = await createAdminClient();

    const session = await account.createEmailToken(ID.unique(), email);

    return session.userId;
  } catch (error) {
    console.log(error);
  }
};

export const signUp = async ({
  userName,
  email,
}: {
  userName: string;
  email: string;
}) => {
  try {
    const existingUser = await getUserByEmail(email);

    const accountID = await sendEmailOtp({
      email,
    });

    if (!accountID) throw new Error("Failed to send OTP");

    if (!existingUser) {
      const { databases } = await createAdminClient();

      await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.usersCollectionId,
        ID.unique(),
        {
          email,
          userName,
          accountID,
        }
      );
    }

    return parseStringify({ accountID });
  } catch (error) {
    console.log(error);
  }
};

export const verifyOtp = async ({
  accountID,
  password,
}: {
  accountID: string;
  password: string;
}) => {
  try {
    const { account } = await createAdminClient();

    const session = await account.createSession(accountID, password);

    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expires: new Date(Date.now() + 60 * 60 * 24 * 7 * 1000),
    });

    return parseStringify({ sessionID: session.$id });
  } catch (error) {
    console.log(error);
  }
};

export const signIn = async ({ email }: { email: string }) => {
  try {
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      await sendEmailOtp({
        email,
      });

      console.log("all good so far");

      return parseStringify({ accountID: existingUser.accountID });
    }

    return parseStringify({ accountID: null, error: "User not found" });
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const sessionClient = await createSessionClient();

    if (!sessionClient) return null;

    const { databases, account } = sessionClient;

    const result = await account.get();

    const user = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal("accountID", result.$id)]
    );

    if (user.total <= 0) return null;

    return parseStringify(user.documents[0]);
  } catch (error) {
    console.log(error);
    return null;
  }
};
