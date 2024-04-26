import { Controller, Get, Post, Body, Param, Delete, Put, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./user.entity";

@Controller("users")
export class UsersController {

  constructor(
    private readonly usersService: UsersService
  ) {
  }

  //get all users
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findall();
  }

  //get one user
  @Get(":id")
  async findOne(@Param("id") id: number): Promise<User> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException("User not found");
    } else {
      return user;
    }
  }

  //create user
  @Post()
  async create(@Body() user: User): Promise<User> {
    return this.usersService.create(user);
  }

  //update user
  @Put(":id")
  async update(@Param("id") id: number, @Body() user: User): Promise<User> {
    //handle the error if user not found
    const foundUser = await this.usersService.findOne(id);
    if (!foundUser) {
      throw new NotFoundException("User not found");
    }
    return this.usersService.update(id, user);
  }

  //delete user
  @Delete(":id")
  async delete(@Param("id") id: number): Promise<void> {
    //handle the error if user not found
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return this.usersService.delete(id);
  }
}