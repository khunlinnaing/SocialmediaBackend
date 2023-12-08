import express from 'express';
import { getRelationships, addRelationship, deleteRelationship } from '../controllers/relationship.js';
const router = express.Router()

router.get("/", getRelationships)
router.post("/", addRelationship)
router.delete("/", deleteRelationship)
// router.get('/:followerUserId', getRelationshipsByUserId)
export default router