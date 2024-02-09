import { Router } from "express"
import userModel from "../dao/models/user.models.js"
import { createHash } from "../utils.js"
import { validatePassword } from "../utils.js"
import passport from "passport"
const router = Router()

router.post("/register",passport.authenticate("register",{failureRedirect:"/api/sessions/failregister"}),
    async(req,res)=>{
        res.send({
            status: "success",
            message: "Usuario registrado"
        })
    })
router.get("/failregister",async(req,res)=>{
        console.log("Fallo el registro")
        res.send({error: "Error en el registro"})
    })

router.get("/github", passport.authenticate("github",{scope:["user:email"]}), async(req,res)=>{})

router.get("/githubcallback",passport.authenticate("github", {failureRedirect: "/"}),async(req,res)=>{
    req.session.user = req.user
    res.redirect("/")
})

router.post("/",passport.authenticate("login",{failureRedirect:"/api/sessions/faillogin"}),async(req,res)=>{
    if(!req.user){
        return res.status(400).send({status: "error"})
    }
    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email
    }
    res.send({
        status:"success",
        payload: req.user
    })
})

router.get("/faillogin",(req,res)=>{
    res.send({error:"Fallo el login"})
}
)


router.get("/logout", (req,res)=>{
    req.session.destroy(err=>{
        if(err){
            return res.status(500).send({
                status: "error",
                error: "No se pudo deslogear"
            })
        }
        res.redirect("/")
    })
})


router.post("/resetPassword",async(req,res)=>{
    const {email,password} = req.body
    if(!email || !password)  return res.status(400).send({
        status:"error",
        error: "Datos incorrectos"
    })
    const user = await userModel.findOne({email})
    if(!user)   return res.status(400).send({
            status:"error",
            error: "No existe el usuario"
        })
    
    const newHashPassword = createHash(password)
    
    await userModel.updateOne({_id : user._id},{$set:{password: newHashPassword}})
    res.send({
            status:"succes",
            error: "Contraseña restaurada"
        
    })

})






export default router 