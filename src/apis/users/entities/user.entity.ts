import { Field, ObjectType } from '@nestjs/graphql';
import { Dog } from 'src/apis/dogs/entities/dog.entity';
import { Reservation } from 'src/apis/reservations/entities/reservation.entity';
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
	@PrimaryGeneratedColumn('uuid')
	@Field(() => String)
	id: string;

	@Column({ length: 5 })
	@Field(() => String)
	name: string;

	@Column({ length: 30 })
	@Field(() => String)
	email: string;

	@Column({ length: 100 })
	// @Field(() => String)
	password: string;

	@Column({ length: 16 })
	@Field(() => String)
	phone?: string;

	@Column({
		length: 100,
		nullable: true,
	})
	@Field(() => String, { nullable: true })
	image: string;

	@CreateDateColumn({ nullable: true })
	createAt: Date;

	@DeleteDateColumn({ nullable: true })
	deleteAt: Date;

	@UpdateDateColumn({ nullable: true })
	updateAt: Date;

	// Dog
	@OneToMany(() => Dog, (dogs) => dogs.user)
	@Field(() => [Dog])
	dogs: Dog[];

	// reservation
	@OneToMany(() => Reservation, (reservation) => reservation.user, {
		nullable: true,
	})
	@Field(() => [Reservation])
	reservation: Reservation[];
}
