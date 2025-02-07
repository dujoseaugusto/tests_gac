import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.sentTransactions, { eager: true })
  sender: User;

  @ManyToOne(() => User, (user) => user.receivedTransactions, { eager: true })
  receiver: User;

  @Column({ type: 'decimal' })
  amount: number;

  @Column()
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
