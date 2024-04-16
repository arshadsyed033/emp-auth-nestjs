import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type EmployeeDocument = Employee & Document;
@Schema({
    timestamps: true
})
export class Employee{
    @Prop()
    name :  string;

    @Prop()
    username : string;

    @Prop()
    password : string;

}

export const EmployeeSchema = SchemaFactory.createForClass(Employee)