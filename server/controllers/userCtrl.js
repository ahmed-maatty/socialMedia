import User from "../models/User.js";


export const getUser = async (req , res) => {
    try {
        const {id} = req.params ;
        const user = await User.findById(id).select("-password -viewedProfile");
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json("Server Error!");
    }
}

export const getUserFriends = async (req , res) => {
    try {
        const {id} = req.params ;
        const user = await User.findById(id);
        const friends = await Promise.all(
            user.friends.map( id => User.findById(id) )
        );
        const formatted = friends.map(
            ({ _id , firstName , lastName , occupation , location , profilePhoto}) => {
                return { _id , firstName , lastName , occupation , location , profilePhoto} ;
            }
        );
        res.status(200).json(formatted);
    } catch (error) {
        res.status(500).json("Server Error!");
    }
}

export const addRemoveFriend = async (req , res) => {
    try {
        const {id , friedId} = req.params ;
        const user = await User.findById(id);
        const friend = await User.findById(friedId);
        if(user.friends.includes(friedId)){
            user.friends = user.friends.filter(id => id !== friedId) ;
            friend.friends = friend.friends.filter( userId => userId !== id);
            await user.save() ;
            await friend.save() ;
            res.status(200).json({message : `You Removed ${friend.firstName} From Friends` });
        }else{
            user.friends.push(friedId);
            friend.friends.push(id);
            await user.save() ;
            await friend.save() ;
            res.status(200).json( {message : `${friend.firstName} Become Your Friend` });
        }
    } catch (error) {
        res.status(500).json("Server Error!");
    }
}