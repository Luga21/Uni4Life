import { db } from "../connect.js"
import jwt from "jsonwebtoken"
import moment from "moment"

export const getPosts = (req, res) => {
  const token = req.cookies.accessToken
  if (!token) return res.status(401).json("Precisa estar logado!")

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token não é vaálido !")

    const q = `SELECT p.*, u.id, name, profilePic from posts as p
              JOIN users as u On (u.id = p.userid)
              JOIN relationships as r ON(p.userid = r.followedUserId 
										AND r.followerUserId = ?) 
                    OR (p.userid = ?)
              GROUP BY p.id
              ORDER BY createdAt desc`

    db.query(q, [userInfo.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err)
      return res.status(200).json(data)
    })
  })
}

export const addPost = (req, res) => {
  const token = req.cookies.accessToken
  if (!token) return res.status(401).json("Not logged in!")

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!")

    const q =
      "INSERT INTO posts(`desc`, `img`, `createdAt`, `userId`) VALUES (?)"
    const values = [
      req.body.desc,
      req.body.img,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id
    ]

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err)
      return res.status(200).json("Post has been created.")
    })
  })
}
export const deletePost = (req, res) => {
  const token = req.cookies.accessToken
  if (!token) return res.status(401).json("Not logged in!")

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!")

    const q = "DELETE FROM posts WHERE `id`=? AND `userId` = ?"

    db.query(q, [req.params.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err)
      if (data.affectedRows > 0)
        return res.status(200).json("Post has been deleted.")
      return res.status(403).json("You can delete only your post")
    })
  })
}
