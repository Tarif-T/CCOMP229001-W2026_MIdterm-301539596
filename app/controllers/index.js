module.exports.home = function(req, res, next){

    let messageObj = {
        message: "Welcome to Tarif Abdalla Midterm Application Backend"
    }

    res.json(messageObj);
}