const Champ = require('../schema/championship');
const User = require('../schema/user');

exports.createChamp = async (req, res) => {

    const champ = new Champ({
        name: req.body.name,
        about: req.body.about,
        type: req.body.type,
        game: req.body.game,
        user: req.body.userId
    });
    
    try {
        await champ.save();

        const userById = await User.findById(req.body.userId);
        userById.championships.push(champ);

        await userById.save();

        return res.status(201).send({ message: 'Championship successfully created!' });
    } catch (err) {
        return res.status(500).send({ message: err });
    }
    
}

exports.getChamp = async (req, res) => {

    try {

        const champ = await Champ.findById(req.params.champId);
        const user = await User.findById(req.params.userId);

        if (!champ) {
            return res.status(404).send({ message: "Championship doesn't exist!" });
        }
        if (!user) {
            return res.status(404).send({ message:  "User doesn't exist!" });
        }


        //check if championship fetched is owned by user
        const isOk = user.championships.find(elem => elem == req.params.champId);

        if (!isOk) {
            return res.status(401).send({ message: 'Unauthorized', status: 401 });
        }

        return res.status(200).send(champ);

    } catch (err) {
        return res.status(500).send({ message: err });
    }

}