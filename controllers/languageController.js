const models = require('./../models/index');

const createLanguage = async (req, res) => {
    try {
        const language_name = req.body.language_name;

        const newLanguage = await models.Language.create({
            name: language_name,
        });
        return res.status(201).json(newLanguage);
    } catch (err) {
        return res
            .status(500)
            .json({ message: 'Server error', error: err.message });
    }
};

const getLanguages = async (req, res) => {
    const languages = await models.Language.findAll();
    return res.json(languages);
};

module.exports = { createLanguage, getLanguages };
