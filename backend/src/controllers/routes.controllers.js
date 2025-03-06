

export const language = (req, res) => {
    const { lang } = req.body;
    if (!lang) {
        return res.status(404).json({ message: 'Language is not entered.' });
    }
    req.session.language = lang;
    console.log("Language set:", req.session.language);

    res.status(200).json({ message: 'Language received successfully.' });
};

export const scenario = (req, res) => {
    const { scenario } = req.body;
    if (!scenario) {
        return res.status(404).json({ message: 'Scenario has not been specified.' });
    }
    const language = req.session.language;
    if (!language) {
        return res.status(400).json({ message: 'Language not set.' });
    }

    req.session.scenario=scenario;

    res.status(200).json({
        message: `Scenario received successfully.`,
        language: language,
        scenario: scenario,
    });
};

export const conversation = (req, res) => {
    console.log("Session Data:", req.session); 

    const language = req.session.language;
    const scenario = req.session.scenario;

    if (!language) {
        return res.status(400).json({ message: "Language not set." });
    }

    if (!scenario) {
        return res.status(400).json({ message: "Scenario not set." });
    }

    res.status(200).json({
        message: "Conversation initiated successfully.",
        language: language,
        scenario: scenario,
    });
};
