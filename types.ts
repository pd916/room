import { Class, ClassEnrollment, Profile,  } from "@prisma/client"
import {Server as NetServer, Socket} from "net";
import { NextApiResponse } from "next";
import {Server as SocketIOServer} from "socket.io"

export type ServerWidthMembersWithProfiles = Class & {
    member: (ClassEnrollment & {profile: Profile})[]
};

export type NextApiResponseServerIo = NextApiResponse &  {
    socket: Socket & {
        server: NetServer & {
            io: SocketIOServer;
        };
    };
};
