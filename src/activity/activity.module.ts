import { Module } from '@nestjs/common';
import { ActivityController } from './activity.controller';
import { ActivityListener } from './activity.listener';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [EmailModule],
  controllers: [ActivityController],
  providers: [ActivityListener]
})
export class ActivityModule {}
