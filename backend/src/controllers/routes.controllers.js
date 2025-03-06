import { setLanguage, setScenario } from "../scenarios/Choose.js";


export const language = (req, res) => {
    const { lang } = req.body;
    if (!lang) {
        return res.status(400).json({ message: 'Language is not entered.' });
    }
    
    setLanguage(lang);
    
    res.status(200).json({ message: 'Language received successfully.' });
};

export const scenario = (req, res) => {
    const { scen } = req.body;
    if (!scen) {
        return res.status(400).json({ message: 'Scenario has not been specified.' });
    }
    
    setScenario(scen);
    
    res.status(200).json({
        message: 'Scenario received successfully.',
        scenario: scen
    });
};
/*export const conversation = (req, res) => {
    if (!state.selected_language) {
        return res.status(400).json({ message: "Language not set." });
    }
    
    if (!state.selected_scenario) {
        return res.status(400).json({ message: "Scenario not set." });
    }
    
    res.status(200).json({
        message: "Conversation initiated successfully.",
        language: state.selected_language,
        scenario: state.selected_scenario,
    });
    
};*/