var express = require('express');
var router = express.Router();
var person = require('../models/person');

/* GET users listing. */
router.get('/', function (req, res, next) {
    person.find({})
        .then(data => {
            res.json({ result: true, data: data });
        })
        .catch(err=>{
            res.json({result:false,data:err.message});
        });
});

router.post('/setPerson', function (req, res, next) {
    if (req.body.FullName.length > 1) {
        person.find({ FullName: req.body.FullName })
            .then(data => {
                if (data.length > 0) {
                    if (req.body.DOBY) {
                        person.find({ $and: [{ FullName: req.body.FullName }, { DOBY: req.body.DOBY }] })
                            .then(data => {
                                if (data.length > 0) {
                                    if (req.body.Profession) {
                                        person.find({ $and: [{ FullName: req.body.FullName }, { DOBY: req.body.DOBY }, { Profession: req.body.Profession }] })
                                            .then(data => {
                                                if (data.length > 0) {
                                                    if (req.body.DOBM) {
                                                        person.find({ $and: [{ FullName: req.body.FullName }, { DOBY: req.body.DOBY }, { Profession: req.body.Profession }, { DOBM: req.body.DOBM }] })
                                                            .then(data => {
                                                                if (data.length > 0) {
                                                                    if (req.body.DOBD) {
                                                                        person.find({ $and: [{ FullName: req.body.FullName }, { DOBY: req.body.DOBY }, { Profession: req.body.Profession }, { DOBM: req.body.DOBM }, { DOBD: req.body.DOBD }] })
                                                                            .then(data => {
                                                                                if (data.length > 0) {
                                                                                    res.json({ result: false, message: 'user with same details already exists!' });
                                                                                } else {
                                                                                    person.create(req.body).then(result => {
                                                                                        res.json({ result: true, message: 'data inserted' });
                                                                                    });
                                                                                }
                                                                            });
                                                                    } else {
                                                                        res.json({ result: false, message: 'user with same details exists! include DOBD' });
                                                                    }

                                                                } else {
                                                                    person.create(req.body).then(result => {
                                                                        res.json({ result: true, message: 'data inserted' });
                                                                    });
                                                                }
                                                            })
                                                    } else {
                                                        res.json({ result: false, message: 'user with same details exists! include DOBM' });
                                                    }
                                                } else {
                                                    person.create(req.body).then(result => {
                                                        res.json({ result: true, message: 'data inserted' });
                                                    });
                                                }
                                            });
                                    } else {
                                        res.json({ result: false, message: 'user with same details exists! include profession' });
                                    }

                                } else {
                                    person.create(req.body).then(result => {
                                        res.json({ result: true, message: 'data inserted' });
                                    });

                                }
                            });
                    } else {
                        res.json({ result: false, message: 'user with same name exists! include DOBY' });
                    }


                } else {
                    person.create(req.body).then(result => {
                        res.json({ result: true, message: 'data inserted' });
                    });
                }
            });
    } else {
        res.json({ result: false, message: 'data is not valid!' });
    }

});

router.post('/getPerson', function (req, res, next) {
    if (req.body.FullName && req.body.DOBY && req.body.FullName.length > 1) {
        person.aggregate([
            { $match: { FullName: req.body.FullName, DOBY: req.body.DOBY } },
            { $project: { _id: 0 } }
        ]).then(data => {
            if (data) {
                res.json({ result: true, data: data });
            } else {
                res.json({ result: false, message: 'no user found!' });
            }
        }).catch(err => {
            res.json({ result: false, data: err.message });
        });
    } else {
        res.json({ result: false, message: 'input not valid!' });

    }
});

router.post('/updatePerson', (req, res) => {
    person.updateOne({ FullName: req.body.FullName },
        { $set: req.body }
    ).then(result => {
        res.json({ result: true, message: 'data updated' })
    }).catch(err => {
        res.json({ result: false, data: err.message });
    });
});

module.exports = router;
