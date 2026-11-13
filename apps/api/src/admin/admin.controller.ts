import { Controller, Get } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('stats')
  getStats() {
    return this.adminService.getStats();
  }

  @Get('users')
  getUsers() {
    return this.adminService.getUsers();
  }

  @Get('stores')
  getStores() {
    return this.adminService.getStores();
  }

  @Get('orders')
  getOrders() {
    return this.adminService.getOrders();
  }

  @Get('transactions')
  getTransactions() {
    return this.adminService.getTransactions();
  }
}
