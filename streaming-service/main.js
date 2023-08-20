const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
// import HMS from "@100mslive/server-sdk";
const HMS = require("@100mslive/server-sdk");
const http = require('http');
const requestify = require('requestify')
const AccessKey = '64c77b9b91c023b4e2d76f1f';
const SecretKey = '5cQxRKeGsgPam_Z1edYWePTks8ksTVFjXQfobg-5ncVy9Q7-fTgIzWJ_glLmSB-pNphtTNuJlVrnFKAwIkwIgIZ3Qtu85Y-blTc7B8zalG8qrqui0Du2uTvQbjvY4Mt6DSauDlMcO7fYnZXuK_FsBPrlKJWQ7qkkPbK-tJr3Q34=';
const ManagementToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTIxMzg2MzcsImV4cCI6MTY5MjIyNTAzNywianRpIjoiand0X25vbmNlIiwidHlwZSI6Im1hbmFnZW1lbnQiLCJ2ZXJzaW9uIjoyLCJuYmYiOjE2OTIxMzg2MzcsImFjY2Vzc19rZXkiOiI2NGM3N2I5YjkxYzAyM2I0ZTJkNzZmMWYifQ.4rDt8cfYw1-17Fza-lasYJa1KeckZf5PtBseQ_s6Dus'

const hms = new HMS.SDK(AccessKey, SecretKey);

async function createRoomAsHost(){
    var template_id = "64c8b61bb91f7e0f7b84ecf3";
    // var recording_info = {
    //     enabled: false,
    //     upload_info: {},
    // }
    
    try {
        const roomCreateOptions = {
            // name,
            // description,
            template_id,
            // recording_info,
            // region,
        }; 
        var goods = await hms.rooms.create(roomCreateOptions)
        // console.log(goods)
        return goods
    } catch (e) {
        return e
    }
};

async function disableRoomAsHost(roomId){
    try {
        return await hms.rooms.enableOrDisable(roomId, false)
    } catch (e) {
        return e
    }
};

// async function createAuthToken(roomId, role, userId){
//     try {
//         const tokenConfig = { roomId, role, userId };
//         var response = await hms.auth.getAuthToken()
//         return response
//     } catch (e) {
//         return e
//     }
// }

app.use(cors());
const PORT = process.env.PORT || 8080;

app.get('/broadcast/createroom', async (req, res) => {
    var roomData = await createRoomAsHost();
    var roomId = roomData.id;
    var url = `https://api.100ms.live/v2/room-codes/room/${roomId}`;
    try {
        var roomCodeResponse = await requestify.request(url, {
            method: 'POST',
            dataType: 'json',
            headers :{
                Authorization: `Bearer ${ManagementToken}`
            }
        })
    } catch (error) {
        return error
    }

    var tempJson = JSON.parse(roomCodeResponse.body)
    var obj = {
        'RoomData': roomData,
        'RoomCodes': tempJson['data']
    }
    res.send(obj);
});

app.get('/broadcast/disableroom', async (req, res) => {
    var disableResponse = await disableRoomAsHost('64c8be967fb895bed6f7534b')
    res.send(disableResponse);
});

// io.on("connection", (socket) => {
//     socket.emit("me", socket.id);
//     socket.on("disconnect", () => {
//         socket.broadcast.emit("callEnded")
//     });
//     socket.on("callUser", ({ userToCall, signalData, from, name }) => {
//         io.to(userToCall).emit("callUser", { signal: signalData, from, name });
//     });
//     socket.on("answerCall", (data) => {
//         io.to(data.to).emit("callAccepted", data.signal)
//     });
// });
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
