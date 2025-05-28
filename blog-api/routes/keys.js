import { Router } from 'express';
import { getRandomKey } from '../services/keys.js';

const router = Router();

// GET key
router.get('/', async (req, res, next) => {
    const key = await getRandomKey();
    if(key) {
        res.json({
            success : true,
            key : key.key
        });
    } else {
        next({
            status : 404,
            message : 'No key found'
        });
    }
});

export default router;