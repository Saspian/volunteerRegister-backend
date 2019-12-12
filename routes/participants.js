const router = require('express').Router();

//importing model
const Content = require('../Model/Content');

//REGISTRATION OF PARTICIPANTS
router.post('/registerparticipants', async (req, res) => {

    const content = new Content({
        pName: req.body.pName,
        pDesc: req.body.pDesc,
        vDemo: req.body.vDemo,
        cName: req.body.cName,
        submittedBy: req.body.submittedBy,
        pemail: req.body.pemail
    });
    try{
        const savedContent = await content.save();
        res.send({content : content._id});
        console.log('project added sucessfully');
    }catch(err){
        res.status(400).send(err);
    }
});

//DISPLAYING OR GETTING PARTICPANTS INFO
router.get('/registeredparticipants', async (req, res)=>{
    try{
        const contents = await Content.find();
        res.json(contents);
    }catch(err){
        res.json({message : err});
    }
});

//GETTING ITEMS WITH SPECIFIC ID
router.get('/registeredparticipants/:participantsId', async (req, res)=>{
    try{
        const contents = await Content.findById(req.params.participantsId);
        res.json(contents);
    }catch(err){
        res.json({message : err});
    }
});

//UPDATING VOTE COUNTER
router.post('/registeredparticipants/:participantsId', async (req, res) =>{
    try{
        console.log("inside patch");
        console.log(req.body.vCounter);
        
        //PREVENTING DUPLICATE VOTING
        const requestedContent = await Content.find({_id: req.params.participantsId});
        if(requestedContent[0].vCounter.includes(req.body.vCounter)){
            const errMsg = {
                message1: 'You have already voted to this project'
            }
            res.json(errMsg);
        }
        else{
            const voteUpdatedContent = await Content.findOneAndUpdate({_id: req.params.participantsId},{$push:{vCounter: req.body.vCounter}});
            const msg = {
                message2: 'Thank you for voting',
                result: voteUpdatedContent
            }
            res.json(msg);
        }
    }catch(err){
        res.json({message : err});
    }
});

module.exports = router;