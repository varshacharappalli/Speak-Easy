import session from 'express-session';
export const setLanguage = (req, res, next) => {
    const { lang } = req.body;
    if (!lang) {
        return res.status(400).json({ message: "Language is not entered." });
    }

    req.session.language = lang; 
    console.log("Language set:", req.session.language); 

    next(); 
};
