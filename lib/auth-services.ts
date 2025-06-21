import { cookies } from "next/headers";
import { db } from "./db";
import jwt from "jsonwebtoken";

export const getSelf = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    
    if (!token) return null;
    
    const decoded = jwt.verify(token, process.env.SECRET_KEY!) as { userId: string };
    
    // console.log(decoded, decoded?.userId, "tok")
    if (!decoded?.userId) return null;

    const user = await db.profile.findUnique({
      where: {
        id: decoded.userId,
      },
    });

    return user;
  } catch (error) {
    console.error("getSelf error:", error);
    return null;
  }
};
