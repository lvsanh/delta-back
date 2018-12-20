import { 
    BaseEntity,
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    OneToMany,
    ManyToOne} from 'typeorm'
  import Message from '../messages/entity'
  import User from '../users/entity'
  
  @Entity()
  export default class Project extends BaseEntity {
  
    @PrimaryGeneratedColumn()
    id?: number
  
    @Column('text', {nullable:true})
    name: string

    @Column('text', {default: 'step1'})
    status: string
    
    @OneToMany(_ => Message, message => message.project, {eager:true})
    messages: Message[]

    @ManyToOne(_ => User, user => user.projects)
    user: User
  
  }