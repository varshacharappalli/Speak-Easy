import { language } from "../controllers/routes.controllers";


const start_conversation=(language)=>{
    const prompts={
        German: {
            role: "Lex, ein Kellner in einem deutschen Restaurant.",
            greeting: "Guten Tag! Willkommen. Sind Sie bereit zu bestellen?"
        },
        French: {
            role: "Lex, un serveur dans un restaurant français.",
            greeting: "Bonjour ! Bienvenue. Êtes-vous prêt à commander ?"
        },
        Spanish: {
            role: "Lex, un camarero en un restaurante español.",
            greeting: "¡Hola! Bienvenido. ¿Está listo para pedir?"
        },
        Italian: {
            role: "Lex, un cameriere in un ristorante italiano.",
            greeting: "Ciao! Benvenuto. Sei pronto per ordinare?"
        },
        English: {
            role: "Lex, a waiter in an English restaurant.",
            greeting: "Hello! Welcome. Are you ready to order?"
        }
    }

    return prompts[language]||prompts[English]
}

const continue_conversation=()=>{

}


