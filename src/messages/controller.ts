import { JsonController, Post, Param, Get, Body, Authorized, CurrentUser } from 'routing-controllers'
//import User from './entity';
import { io } from '../index'
import Message from './entity';
import Project from '../projects/entity';
import User from '../users/entity'

@JsonController()
export default class MessageController {
    //post messages
    @Authorized()
    @Post('/projects/:id/messages')
    async createMessage(
    @Param('id') id: number,
    @Body() message: Message,
    @CurrentUser() user: User

  ) {
    
    const project = await Project.findOne({where:{id}})
    const entity = Message.create({
    ...message,
    project,
    user
    })

    io.emit('action', {
      type: 'ADD_MESSAGE',
      payload: entity
    })

    return entity.save()
  }

//load all messages for a project
  @Authorized()
  @Get('/projects/:id/messages')
  async getMessages (
    @Param('id') id: number,
  ) {
    const project = await Project.findOne({where:{id}})
    const entity = await Message.find({where:{project}})
    // const entity = await Message.find({where:{project},relations:["user","project"]})

    io.emit('action', {
        type: 'FETCH_MESSAGES',
        payload: entity
      })

    return entity
  }

}
