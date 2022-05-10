import {Injectable, NotFoundException} from '@nestjs/common';
import {EmployeeSearchDto} from "../dto/EmployeeSerach.dto";
import {EmployeeUpdateDto} from "../dto/EmployeeUpdate.dto";
import {EmployeeCreateDto} from "../dto/EmployeeCreate.dto";
import {Employee} from "../schemas/employee.schema";
import {EmployeeRepository} from "../repository/employee.repository";

@Injectable()
export class EmployeesService {

    constructor(private employeeRepository: EmployeeRepository) {
    }

    async getAllEmployees(): Promise<Employee[]> {
        return await this.employeeRepository.findAll();
    }

    async createEmployee(employeeCreateDto: EmployeeCreateDto): Promise<Employee> {
        return await this.employeeRepository.create(employeeCreateDto);

    }

    async employeeSearch(employeeSearchDto: EmployeeSearchDto): Promise<Employee[]> {
        return await this.employeeRepository.findWithFilters(employeeSearchDto);
    }

    async getEmployeeById(id: string): Promise<Employee> {
        let employee =  await this.employeeRepository.findOne(id);
        if (!employee) {
            throw new NotFoundException(`${id} does not exist`)
        }
        return employee
    }

    async updateEmployee(employeeUpdateDto: EmployeeUpdateDto): Promise <Employee> {
        return  await this.employeeRepository.update(employeeUpdateDto);
    }

    async deleteEmployee(id: string): Promise<boolean> {
        return await this.employeeRepository.delete(id);
    }

}
