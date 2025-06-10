import { NextApiResponseServerIo } from "@/types";
import {Server as NetServer} from "http";
import { NextApiRequest } from "next";
import {Server as ServerIo} from "socket.io";

export const config = {
    api: {
        bodyParser: false,
    },
};

const ioHandler = (req:NextApiRequest, res: NextApiResponseServerIo) => {
    if(!res.socket.server.io){
        const path = "/api/socket/io";
        const httpServer: NetServer = res.socket.server as any;
        const io = new ServerIo(httpServer, {
            path: path,
            addTrailingSlash: false,
        });

        res.socket.server.io = io;

        io.on("connection", (socket) => {
      console.log("⚡ Socket connected:", socket.id);

      socket.onAny((eventName, payload) => {
    // If eventName matches pattern quiz:<quizId>:question-update, broadcast it
    if(eventName.startsWith("quiz:") && eventName.endsWith(":question-update")) {
      socket.broadcast.emit(eventName, payload);
    }
  });

      socket.on("disconnect", () => {
        console.log("Socket disconnected:", socket.id);
      });
    });
      
        console.log("✅ Socket.IO server initialized");
    }

    res.end();
}

export default ioHandler;
