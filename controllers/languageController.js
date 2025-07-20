const models = require('./../models/index');

const createLanguage = async (req, res) => {
    try {
        const language_name = req.body.language_name;

        // getting all existing languages
        const existing = await models.Language.findAll();

        // checking for dublicates
        const dublicate = existing.find(
            (lang) => lang.name.toUpperCase() === language_name.toUpperCase()
        );

        if (dublicate) {
            return res.status(401).json({
                message: 'This language already exist',
            });
        }

        //creating new language
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
    try {
        const languages = await models.Language.findAll();

        return res.json(languages);
    } catch (err) {
        return res
            .status(500)
            .json({ message: 'Server error', error: err.message });
    }
};

module.exports = { createLanguage, getLanguages };
