//Dependencies
const stages = require('express').Router();
const db = require('../models')
const { Stage } = db
const { Op } = require('sequelize')

//Find all stages
stages.get('/', async(req, res)=> {
    try{
        const { name = '', limit=5, offset=0 } = req.query
        const foundStage = await Stage.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            },
            order: [
                ['capacity', 'DESC'],
                ['manager', 'ASC']
            ],
            limit,
            offset
        })
        res.status(200).json(foundStage)
    } catch(error){
        res.status(500).json(error)
    }
})

//Find a specific stage
stages.get('/:id', async (req, res)=> {
    try{
        const foundStage = await Stage.findOne({
            where: { stage_id: req.params.id }
        })
        res.status(200).json(foundStage)
    } catch(error){
        res.status(500).json(error)
    }
})

//Create an stage
stages.post('/', async (req, res)=>{
    try{
        const newStage  = await Stage.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a new Stage',
            data: newStage
        })
    } catch(err){
        res.status(500).json(err)
    }
})

//Update an stage
stages.put('/:id', async (req, res)=>{
    try{
        const updatedStage = await Stage.update(req.body, {
            where: {
                stage_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedStage} stage(s)`
        })
    } catch(err){
        res.status(500).json(err)
    }
})

//Delete an stage
stages.delete('/:id', async (req, res)=>{
    try{
        const deletedStage = await Stage.destroy({
            where: {
                stage_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedStage} stage(s)`
        })
    } catch(err){
        res.status(500).json(err)
    }
})

module.exports = stages