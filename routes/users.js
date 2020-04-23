    const router = require('express').Router();
    let User = require('../models/user-form.model');


    router.route('/').get((req,res)=>{
        User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error:' + err));
    })

    // name, dob, email, ph no.

    router.route('/').post((req,res)=> {
        const name = req.body.name;
        const dob = Date.parse(req.body.dob);
        const email = req.body.email;
        const phone = Number(req.body.phone);

        const newUser1 = new User({
            name, dob, email, phone,
        });



        newUser1.save()
        .then(()=> res.json('User form submitted!'))
        .catch(err =>  res.status(400).json('Error: '+ err));

    });



    module.exports = router;