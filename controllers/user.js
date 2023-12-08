import { db } from '../connect.js';
import Jwt from 'jsonwebtoken';
export const getUser = (req, res) => {
    const userId = req.params.userId;
    const q = "SELECT * FROM users WHERE id =?";

    db.query(q, [userId], (err, data) => {
        if (err) return res.status(500).json(err)
        const { password, ...info } = data[0]
        return res.json(info);
    })
}
export const updateUser = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json('Not authenticated');
    
    Jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(401).json('Token is not valid');
        const q = "UPDATE users SET `name`=?, `city`=?, `website`=?, `profilePic`=?, `coverPic`=? Where id=?";

        db.query(q, [
            req.body.name,
            req.body.city,
            req.body.website,
            req.body.profilePic,
            req.body.coverPic,
            userInfo.id
        ], (err, data) => {
            if (err) return res.status(500).json(err)
            if (data.affectedRows > 0) return res.json(req.body)
            return res.status(403).json('You can update only your post!')
        })
    })
}

export const getAllUsers = (req, res) =>{
    const token = req.cookies.accessToken;
    Jwt.verify(token, "secretkey", (err, userInfo) =>{
        if(err) return res.status(403).json("Token is not valid!");
        const q = "SELECT users.* FROM users WHERE users.id <> ? AND users.id NOT IN (SELECT followedUserId FROM relationships WHERE followerUserId =?);";

        db.query(q, [req.query.userId, req.query.userId],(err, data) => {
            if (err) return res.status(500).json(err)
            return res.json(data);
        })
    });
    
}
export const GetFriends = (req, res) =>{
    const token = req.cookies.accessToken;
    Jwt.verify(token, "secretkey", (err, userInfo) =>{
        if(err) return res.status(403).json("Token is not valid!");
        const q = "SELECT users.* FROM users WHERE users.id <> ? AND users.id IN (SELECT followedUserId FROM relationships WHERE followerUserId =?);";

        db.query(q, [req.query.userId, req.query.userId],(err, data) => {
            if (err) return res.status(500).json(err)
            return res.json(data);
        })
    });
}