const User = require('../models/user');
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function(req, file , cb){
    cb(null, "./public/uploads/");
  },
  filename: function(req, file, cb){
    cb(null, file.originalname)
  }
})
const upload = multer({storage: storage});

module.exports = function(app,passport){

  const title = "TestBackend";
  app.get('/', function(req, res){
      res.redirect("/login")
      // res.json('Welcome to Node.js Authentication App. Please login/register .');
  });

  app.get('/login', function(req, res){
    // res.json({message: req.flash('loginMessage')});
      res.render("pages/auth.ejs",{
        siteTitle: title,
        pageTitle: "auth"
      });
  });

  app.post('/login', passport.authenticate('login',{
      successRedirect : '/profile',
      failureRedirect : '/register',
      failureFlash : true
  }));

  app.get('/register', function(req, res){
      // res.json({message: req.flash('registerMessage')});
      res.render("pages/register.ejs",{
        siteTitle: title,
        pageTitle: "register"
      });
    });
  
  app.post("/addImage", upload.single("avatar") , function(req, res){
    console.log(req.file);
    const truePath = req.file.path.substr(7);
    User.findOne({email: req.user.email}, function(err, user){
      console.log(user);
       req.user.avatar = truePath;
       req.user.save();
       res.redirect("/profile");
    });
  });

  app.post('/register', passport.authenticate('register',{
      successRedirect : '/profile',
      failureRedirect : '/register',
      failureFlash : true
  }));

  app.get('/profile', isLoggedIn, function(req,res){
      // res.json({user : req.user});
      console.log(req.user)
      res.render("pages/profile",{
        siteTitle: title,
        pageTitle: "profile",
        img: req.user.avatar,
        name: req.user.name,
        lastName: req.user.lastName,
        email: req.user.email,
      })
  });

  app.get('/logout', function(req,res){
      req.logout();
      res.redirect('/');
  });
};

function isLoggedIn(req, res, next){
  if(req.isAuthenticated())
  return next();
  res.redirect('/');
};