export const language = (req, res) => {
    const { lang } = req.body;
    if (!lang) {
        return res.status(404).json({ message: 'Language is not entered.' });
    }
    res.status(200).json({ message: 'Language received successfully.' });
};

export const scenario = (req, res) => {
    const { scenario } = req.body;
    if (!scenario) {
        return res.status(404).json({ message: 'Scenario has not been specified.' });
    }
    res.status(200).json({ message: 'Scenario received successfully.' });
};

export const conversation=(req,res)=>{
    
}