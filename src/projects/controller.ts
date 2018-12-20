import {
    JsonController,
    Get,
    Post,
    // Put,
    Body,
    Param,
    Authorized,
    CurrentUser,
    HttpCode,
    // NotFoundError
  } from 'routing-controllers'
  import Project from './entity'
  import User from '../users/entity'
  import {io} from '../index'
  
  @JsonController()
  export default class ProjectController {
    
    @Authorized()
    @Get('/projects')
    async getAllProjects(
      //@CurrentUser() user: User
    ) {
      return await Project.find({})
      //return await Project.find({where:{user}})

    }
  
    @Authorized()
    @Get('/projects/:id')
    async getProject(
      @Param('id') id: number,
      // @CurrentUser() user:User
      ) {
      // return await Project.findOne({where:{id,user},relations:["messages"]})
      // const isUser = await Project.findOne({where:{id,user}})
      // const isAdmin = isUser.findOne
      return await Project.findOne({id})
    }
  
    @Authorized()
    @Post('/projects')
    @HttpCode(201)
    async createProject(
      @CurrentUser() user: User,
      @Body() project: Project
    ) {
      const entity = await Project.create({
      ...project,
      user
      })
      

      io.emit('action', {
        type: 'ADD_PROJECT',
        payload: entity
      })
  
      return entity.save()
    }
  }
