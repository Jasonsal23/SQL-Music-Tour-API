//Dependencies
const events = require('express').Router();
const db = require('../models')
const { Event } = db
const { Op } = require('sequelize')

//Find all events
events.get('/', async(req, res)=> {
    try{
        const { name = '', limit=5, offset=0 } = req.query
        const foundEvents = await Event.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            },
            order: [
                ['date', 'ASC'],
                ['name', 'ASC']
            ],
            limit,
            offset
        })
        res.status(200).json(foundEvents)
    } catch(error){
        res.status(500).json(error)
    }
})

//Find a specific event
events.get('/:id', async (req, res)=> {
    try{
        const foundEvent = await Event.findOne({
            where: { event_id: req.params.id }
        })
        res.status(200).json(foundEvent)
    } catch(error){
        res.status(500).json(error)
    }
})

//Create an event
events.post('/', async (req, res)=>{
    try{
        const newEvent  = await Event.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a new Event',
            data: newEvent
        })
    } catch(err){
        res.status(500).json(err)
    }
})

//Update an event
events.put('/:id', async (req, res)=>{
    try{
        const updatedEvent = await Event.update(req.body, {
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedEvent} event(s)`
        })
    } catch(err){
        res.status(500).json(err)
    }
})

//Delete an event
events.delete('/:id', async (req, res)=>{
    try{
        const deletedEvent = await Event.destroy({
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedEvent} event(s)`
        })
    } catch(err){
        res.status(500).json(err)
    }
})

module.exports = events