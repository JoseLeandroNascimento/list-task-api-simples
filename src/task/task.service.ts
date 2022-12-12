import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {

  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>
  ){}

  async create(createTaskDto: CreateTaskDto) : Promise<Task>{

    const task:Task = await this.taskRepository.create(createTaskDto);

    return this.taskRepository.save(task);
  }

  async findAll() :Promise<Task[]>{

    const tasks: Task[] = await this.taskRepository.find();

    return tasks;
  }

  async findOne(id: number) : Promise<Task>{
    
    const task:Task = await this.taskRepository.findOne({where:{id}});

    if(!task){

      throw new NotFoundException(`Task with ID = ${id} not found`)
    }

    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) :Promise<Task>{

    const task: Task = await this.taskRepository.preload({id:id,...updateTaskDto});

    if(!task){

      throw new NotFoundException(`Task with ID = ${id} not found`)
    }

    return this.taskRepository.save(task);
  }

  async remove(id: number) {

    const task:Task = await this.findOne(id)

    this.taskRepository.delete(task);
  }
}
