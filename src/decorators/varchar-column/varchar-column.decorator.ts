import { Column, ColumnOptions } from 'typeorm';

export const VarcharColumn = (name: string, nullable: boolean = true, options?: ColumnOptions) => {
	return Column({
		type: 'varchar',
		name,
		nullable,
		...options
	});
}
