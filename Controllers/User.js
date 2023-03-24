const User = require("../models/User");

exports.getAppointments = (req, res, next) => {
    User.findAll().then((user) => {
        res.json(user);
    });
};

exports.updateAppointments = (req, res, next) => {
    let userId = req.params.id;
    const name = req.body.userDetail.name;
    const mobile = req.body.userDetail.mobile;
    const email = req.body.userDetail.email;
    User.update({ name: name, mobile: mobile, email: email },{ where: {id: userId } })
        .then((user) => {res.redirect("api/users");})
        .catch((err) => console.log(err));

};

exports.postAppointments = (req, res, next) => {
    console.log(req.body);
    const name = req.body.userDetail.name;
    const mobile = req.body.userDetail.mobile;
    const email = req.body.userDetail.email;
    User.create({ name: name, mobile: mobile, email: email })
        .then(() => {
            console.log("Data successfully inserted :-)");
            res.redirect("api/users");
        })
        .catch((err) => console.log(err));
};

exports.deleteAppointments = (req, res, next) => {
    let userId = req.params.id;
    User.destroy({ where: { id: userId } })
        .then(() => {
            res.redirect("api/users");
        })
        .catch((err) => console.log(err));
};
