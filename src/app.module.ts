import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DiscordModule } from './discord/discord.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DiscordModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
