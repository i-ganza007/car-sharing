import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private prisma: any;

  constructor() {
    const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:testing@localhost:5434/postgres';
    
    const pool = new Pool({
      connectionString: connectionString,
    });
    
    const adapter = new PrismaPg(pool);
    
    this.prisma = new PrismaClient({
      adapter: adapter
    });
  }

  get client() {
    return this.prisma;
  }

  async onModuleInit() {
    await this.prisma.$connect();
  }

  async onModuleDestroy() {
    await this.prisma.$disconnect();
  }

  // Direct access to models for convenience
  get user() {
    return this.prisma.user;
  }

}
