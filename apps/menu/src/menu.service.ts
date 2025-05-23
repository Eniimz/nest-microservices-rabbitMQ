import { Injectable, Logger } from '@nestjs/common';
import { MenuRepositry } from './menu.repositry.controller';
import { MenuItemSchema } from '../schemas/menu-item.schema';
import { CreateMenuItemDto } from '../dtos/menu.dto';
import { UpdateMenuItemDto } from '../dtos/update-menu.dto';

@Injectable()
export class MenuService {

  constructor(
    private menuRepositry: MenuRepositry
  ) {}

  private readonly logger = new Logger(MenuService.name);

  getHello(): string {
    return 'Hello World!';
  }

  async addMenuItem(menuItem: CreateMenuItemDto) {

    this.logger.log('Adding menu item: ', menuItem);
    return await this.menuRepositry.create(
      menuItem
    )
  }

  async getMenuItems() {    
    return 'Menu items fetched';
  }
  
  async getMenuItemById() {
    return 'Menu item fetched by ID';
  }

  async updateMenuItem(id: string, updateDto: UpdateMenuItemDto) {
    this.logger.log('Updating menu item: ', id, updateDto);
    
    this.menuRepositry.findOneAndUpdate(
      {_id: id} ,
      updateDto ,
    )

  }

  async deleteMenuItem() {
    return 'Menu item deleted';
  }

}
