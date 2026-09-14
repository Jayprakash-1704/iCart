

const admin=(req,res,next)=>{
    if(req.user && req.user.role==='admin'){
     next();
    }
    else{
        res.status(403).json({message:"Role denied only admin can access"})
    }

}

export default admin;