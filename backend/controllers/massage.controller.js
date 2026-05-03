import Conversation from "../models/conversation.model.js"
import Massage from "../models/massage.model.js";
import User from "../models/user.model.js"

export const sendMassage = async (req,res) => {
    try {
        // console.log("Request body:", req.body); //  chal gaya
        // console.log("Request params:", req.params); // chal gaya 
        const {massage} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id; 
        // console.log("Sender ID:", senderId, "Receiver ID:", receiverId); // chal gaya
        let conversation = await Conversation.findOne({
            participants:{$all: [senderId, receiverId]},
        })
        // console.log("Found conversation:", conversation); // chal gaya
        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId,receiverId]
            })
            // console.log("Created new conversation:", conversation); // chal gaya 
        }

        const newMassage = new Massage({
            senderId,
            receiverId,
            massage
        })
        console.log("New massage object:", newMassage);
        if(newMassage){
            conversation.massages.push(newMassage._id);
            // console.log("Updated conversation massages:", conversation.massage); // yaha phata tha conversation.massages.push(newMassage._id); yeh line me mai massages be bajaye massage likh diya tha pure code me message ki spelling already galat likha hu 
        }
        //SOCKET IO FUNCTIONLITY HERE

        // await newMassage.save(); 1 sec
        // await conversation.save(); 1 sec

        await Promise.all([conversation.save(),newMassage.save()]) // both in 1sec
        res.status(201).json(newMassage);


    } catch (error) {
        console.error("Error in sending massage",error.massage, error.stack);
        res.status(500).json({error:"Internal server Error" })
    }
} 

export const getMassages = async (req,res) => {
    try {
        const {id : userToChatId} = req.params
        const senderId = req.user._id

        const conversation = await Conversation.findOne({
            participants: {$all: [senderId, userToChatId]},
        }).populate("massages")

        if(!conversation) return res.status(200).json([]);
        const massages = conversation.massages

        res.status(200).json(massages)
    } catch (error) {
        console.error("Error in getting massage",error.massage, error.stack);
        res.status(500).json({error:"Internal server Error" })
    }
}