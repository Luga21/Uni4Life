import { db } from "../connect.js"
import jwt from "jsonwebtoken"
import moment from "moment"

export const getPosts = (req, res) => {
  const userId = req.query.userId
  const token = req.cookies.accessToken
  if (!token) return res.status(401).json("Precisa estar logado!")

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token não é vaálido !")

    const q =
      userId !== "undefined"
        ? `SELECT p.*, u.id AS userid, name, profilePic from posts as p JOIN users AS u ON (u.id = p.userid) WHERE p.userid = ? ORDER BY p.createdAt DESC`
        : `SELECT p.*, u.id AS userid, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userid) LEFT JOIN relationships AS r ON (p.userid = r.followedUserId) WHERE r.followerUserId = ? OR p.userid = ?
        ORDER BY p.createdAt DESC`

    //   `SELECT p.*, u.id AS userid, name, profilePic from posts as p
    // JOIN users AS u ON (u.id = p.userid)
    // JOIN relationships as r ON(p.userid = r.followedUserId
    // 			AND r.followerUserId = ?)
    //       OR (p.userid = ?)
    // GROUP BY p.id
    // ORDER BY createdAt desc`

    const values =
      userId !== "undefined" ? [userId] : [userInfo.id, userInfo.id]

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err)
      return res.status(200).json(data)
    })
  })
}

export const addPost = (req, res) => {
  const token = req.cookies.accessToken
  if (!token) return res.status(401).json("Not logged in!")

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token não é válido!")

    const q =
      "INSERT INTO posts(`desc`, `img`, `createdAt`, `userid`) VALUES (?)"
    const values = [
      req.body.desc,
      req.body.img,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id
    ]

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err)
      return res.status(200).json("Publicação criada com sucesso.")
    })
  })
}
export const deletePost = (req, res) => {
  const token = req.cookies.accessToken
  if (!token) return res.status(401).json("Not logged in!")

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token não é válido!")

    const q = "DELETE FROM posts WHERE `id`=? AND `userid` = ?"

    db.query(q, [req.params.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err)
      if (data.affectedRows > 0)
        return res.status(200).json("Publicação deletada com sucesso.")
      return res.status(403).json("Só é possível deleter a sua publicação")
    })
  })
}
