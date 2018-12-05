const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
const nodemailer=require('nodemailer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var multer = require('multer');
const adminfile = mongoose.model('adminfile');
var fs = require('fs');
const files = mongoose.model('files');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
    //   cb(null, './uploads')
    const dir = './uploads/admin/'+req.params.sid;
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

module.exports.savefile=(req,res)=> {console.log()
    upload(req,res,function(err){
        if(err){console.log(err)
             res.json({error_code:1,err_desc:err});
             return;
        }console.log(req.file.path)
        
       var adminfile=new adminfile({
            userId: req.params.id,
            originalname: req.file.originalname,
            mimetype: req.file.mimetype,
           filename: req.file.filename,
            path: req.file.path,
            sendto:req.params.sid,
            time:Date.now()
        })
        
        adminfile.save((err, doc) => {
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
                    status:false,
                    message:'there are some error with query'
                })
            }
    
        });


       

        //  res.json({error_code:0,err_desc:null});
    });
}

module.exports.files=(req, res, next) => {
console.log(req.params.id)
 


       adminfile.findOne({ sendto: req.params.id },
        (err, user) => {
            if (!user){
                return res.status(404).json({ status: false, message: 'User record not found.' });
            console.log(err)}
                else{console.log('Im in backend');
                return res.json(results);}
        }
    );
   
}

module.exports.file=(req,res,next)=>{
    
    adminfile.findOne({ to:req.params.id },
        (err, user) => {
            if (!user){
                return res.status(404).json({ status: false, message: 'User record not found.' });            console.log(err)}
                else{
                    fs.readFile(results[0].path, function(err, items) {
                        console.log(items);
                   
                    return res.send(items);
                        
                    });
                }
        }
    );
}

module.exports.userfiles=(req, res, next) => {

    connection.query('SELECT * FROM files inner join users on files.userId=users._id',function (error, results, fields) {
        console.log(results)
         if (!results)
         return res.status(404).json({ status: false, message: 'User record not found.' });
     else{
        //   return res.status(200).json({ status: true, results});

        
        return res.json(results);
        }
       });
   
}

module.exports.adminfiles=(req, res, next) => {

    connection.query('SELECT * FROM adminfile inner join users on adminfile.sendto=users._id',function (error, results, fields) {
        console.log(results)
         if (!results)
         return res.status(404).json({ status: false, message: 'User record not found.' });
     else{
        //   return res.status(200).json({ status: true, results});

        
        return res.json(results);
        }
       });
   
}

module.exports.messages=(req, res, next) => {

   



       files.findOne({ isRead:"no" },
        (err, user) => {
            if (!user){
                return res.status(404).json({ status: false, message: 'User record not found.' });         console.log(err)}
                else{
                    return res.json(user);
                }
        }
    );


   
}



