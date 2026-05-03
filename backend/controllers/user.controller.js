import User from "../models/user.model.js"

export const getUsersForSidebar = async (req,res) => {
    try {
        const loggedInUser = req.user._id;
        const filteredUsers=await User.find({_id:{$ne:loggedInUser} }).select("-password");

        res.status(200).json(filteredUsers)
    } catch (error) {
        console.error("error in the user getting which i get in the sidebar",error.message);
        res.status(500).json({message:"internal server error"})
    }
}