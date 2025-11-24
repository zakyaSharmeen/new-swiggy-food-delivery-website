import jwt from 'jsonwebtoken';
const getToken = (userId) => {
    try{
        const token =   jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
        return token;

    }
    catch(err){
        console.error("Error generating token:", err);
        throw err;
    }

}
export default getToken;