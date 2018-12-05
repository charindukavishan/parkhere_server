const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
const nodemailer=require('nodemailer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var fs = require('fs');
const files = mongoose.model('files');

var multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
    //   cb(null, './uploads')
    const dir = './uploads/user/'+req.params.id;
    if (!fs.existsSync(dir))
    fs.mkdir(dir, err => cb(err, dir))
    else
    cb(null,dir)
    },
    filename: (req, file, cb) => {console.log(file.fieldname);
      cb(null, file.fieldname + '-' + Date.now())
    }
});
var upload = multer({ storage:storage}).single('photo');

/** API path that will upload the files */

module.exports.savefile=(req,res)=> {var count=0; console.log('file')
    upload(req,res,function(err){
        if(err){console.log(err)
             res.json({error_code:1,err_desc:err});
             return;
        }
       
        

        var files=new files({
            userId: req.params.id,
            originalname: req.file.originalname,
            mimetype: req.file.mimetype,
           filename: req.file.filename,
            path: req.file.path,
            time:Date.now()
        })
        
        files.save((err, doc) => {console.log(doc)
            if (!err)
                {
                    res.json({
                        status:true,
                        data:results,
                        message:'user registered sucessfully'
                    })
                }
            else {
                res.json({
                    status:true,
                    data:doc,
                    message:'user registered sucessfully'
                })
            }
    
        });

 //  res.json({error_code:0,err_desc:null});
          
    });


}

module.exports.files=(req, res, next) => {
    files.findOne({ userId :req.params.id },
        (err, user) => {
            if (!user){
                return res.status(404).json({ status: false, message: 'User record not found.' });
            console.log(err)}
                else{console.log('Im in backend');
                return res.json(user);}
        }
    );
}

module.exports.file=(req,res,next)=>{

    files.findOne({filename:req.params.filename },
        (err, user) => {
            if (!user){
                return res.status(404).json({ status: false, message: 'User record not found.' });
            console.log(err)}
                else{
                    fs.readFile(results[0].path, function(err, items) {
                        console.log(items);
                   
                    return res.send(user);
                        
                    });
                }
        }
    );
}

module.exports.adminfile=(req,res,next)=>{
    files.findOne({filename:req.params.filename },
        (err, user) => {
            if (!user){
                return res.status(404).json({ status: false, message: 'User record not found.' });
            console.log(err)}
                else{
                    fs.readFile(results[0].path, function(err, items) {
                        console.log(items);
                   
                    return res.send(user);
                        
                    });
                }
        }
    );
}





