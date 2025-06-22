const {
    UserLanguageModel,
    UserModel,
    LanguageModel,
} = require('./../repositories/models/index');

const { updateLanguages, findPartners } = require('./../services/userService');

const getMe = async (req, res) => {
    try {
        const user = await UserModel.findByPk(req.userId, {
            attributes: ['id', 'email', 'full_name'],
            include: [
                {
                    model: UserLanguageModel,
                    include: [LanguageModel],
                },
            ],
        });

        const languages = user.UserLanguages.map((ul) => ({
            language_id: ul.language_id,
            type: ul.type,
            name: ul.Language.name,
        }));

        return res.json({
            // user,
            id: user.id,
            email: user.email,
            full_name: user.full_name,
            languages,
        });
    } catch (err) {
        return res
            .status(500)
            .json({ message: 'Server error', error: err.message });
    }
};

const putLanguages = async (req, res) => {
    try {
        const { native = [], target = [] } = req.body;

        if (!Array.isArray(native) || !Array.isArray(target)) {
            return res.status(400).json({
                message: 'native and target must be arrays of language IDs',
            });
        }

        const profile = await updateLanguages(req.userId, native, target);
        return res.json(profile);
    } catch (err) {
        console.error(err);
        return res
            .status(500)
            .json({ message: 'Server error', error: err.message });
    }
};

const searchPartners = async (req, res) => {
    try {
        const userId = req.userId;
        const { native, target } = req.query;

        const partners = await findPartners(userId, native, target);
        res.json(partners);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
module.exports = { getMe, putLanguages, searchPartners };
