import {Injectable} from "@nestjs/common";
import {Employee, EmployeeDocument} from "../schemas/employee.schema";
import {Model} from "mongoose";
import * as mongoose from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {EmployeeCreateDto} from "../dto/EmployeeCreate.dto";
import {EmployeeSearchDto} from "../dto/EmployeeSerach.dto";
import {EmployeeUpdateDto} from "../dto/EmployeeUpdate.dto";

@Injectable()
export class EmployeeRepository {

    constructor(@InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>) {
    }

    async create(employeeCreateDto: EmployeeCreateDto): Promise<Employee> {
        let newEmployee = new this.employeeModel(employeeCreateDto);
        return await newEmployee.save();
    }

    async findAll(): Promise<Employee[]> {
        return await this.employeeModel.find();
    }

    async findOne(id: string): Promise<Employee> {
        return await this.employeeModel.findOne({_id: id});
    }

    async findWithFilters(filter: EmployeeSearchDto) {
        let name = Object.is(filter.firstName, undefined) ? '' : filter.firstName
        let designation = Object.is(filter.designation, undefined) ? '' : filter.designation
        return await this.employeeModel.find({$and: [{designation: {$regex: designation}}, {firstName: {$regex: name}}]})

    }

    async update(employee: EmployeeUpdateDto): Promise<Employee> {
        return await this.employeeModel.findOneAndUpdate({_id: employee.id},
            {nearestCity: employee.city}, {
                new: true
            });
    }

    async delete(id: string): Promise<boolean> {
        let objId = new mongoose.Types.ObjectId(id);
        let response = await this.employeeModel.deleteOne({_id: objId});
        console.log(response);
        return
    }
}
