import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { MenuService } from './menu.service';
import { request } from 'http';
import { CreateMenuItemDto } from '../dtos/menu.dto';
import { UpdateMenuItemDto } from '../dtos/update-menu.dto';

@Controller('menus')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  getHello(): string {
    return this.menuService.getHello();
  }

  @Post()
  async addMenuItem(@Body() request: CreateMenuItemDto ){
    return this.menuService.addMenuItem(request);
  }

  @Get('items')
  async getMenuItems() {
    return this.menuService.getMenuItems();
  }

  @Get('items/:id')
  async getMenuItemById() {
    return this.menuService.getMenuItemById();
  }

  @Patch(':id/update')
  async updateMenuItem(
    @Param('id') id: string,
    @Body() updateDto: UpdateMenuItemDto
  ) {
    return this.menuService.updateMenuItem(id, updateDto);
  }

  @Get('items/:id/delete')
  async deleteMenuItem() {
    return this.menuService.deleteMenuItem();
  }


}
