const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/votingpage', verify,(req,res)=>{
    // res.json({posts: 
    //     {
    //         title: 'my first post',
    //         description: 'random data you shouldnt access'
    //     }
    // });
    window.location = '/votingpage';

});

module.exports = router;
