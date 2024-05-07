import { Op } from 'sequelize';
import User from '../../models/user.js'
import bcrypt from "bcrypt";


// router.get("/", (req, res) => {
//     const { body: { name, email, phoneNumber, password, userName }} = req; 
    
// })

export const checkUserNameAvailability = async(req, res) => {
    const { params : { username }} = req;
    const user = await User.findOne({where : {userName: username}})
    if(user) res.status(401).send({error: {"msg": "Username not available"}});
    return res.status(200).send({success: true});
}

export const signup = async(req, res) => {

    const { body: { name, email, phoneNumber, password, userName }} = req; 
    if(!userName) return res.status(400).send({error: { "msg": "Username cannot be blank"}});
    if(!email) return res.status(400).send({error: { "msg": "Email cannot be blank"}});

    const existingUser = await User.findOne({ where : { email:email } });
    if(existingUser) return res.status(500).send({error: { "msg": "Email already exists"}});
    try {
        const user = await User.create(req.body)
        return res.status(200).send({success:true, user: {
            authToken: user.authToken
        }})
    } catch(err) {
        return res.status(500)
    }
    

}

export const login = async(req, res) => {
    const { body : { userName, email,password } } = req; 
    const user = await User.findOne({where: {
        [Op.or] : {
            userName,
            email
        }
    }})

    if(!user) return res.status(401).send({success:false, error: {"msg": "Bad credentials"}})
    const validPassword = await bcrypt.compare(password, user.password);
    if(validPassword) return res.status(200).send({
        success:true, user: {
                authToken: user.authToken
        }
    })

    res.status(401).send({
        success:false,
        error: {"msg": "Bad Credentials"}
    })

 }

export const getUserDetails= async(req, res) => {
    const { params: { username } } = req;
    const user = await User.findOne({where: {
        userName: username
    }})

    if(!user) return res.status(500).send({success:false, error:{
        msg:"No User found"
    }})
    return res.status(200).send({
        success: true, 
        user: {
            name:user.name, 
            username: user.userName
        }
    })
}
