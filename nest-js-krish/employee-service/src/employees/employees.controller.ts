import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    NotFoundException,
    Param,
    Post,
    Put,
    Query,
    UsePipes, ValidationPipe
} from '@nestjs/common';
import {EmployeesService} from "./service/employees.service";
import {EmployeeUpdateDto} from "./dto/EmployeeUpdate.dto";
import {EmployeeSearchDto} from "./dto/EmployeeSerach.dto";
import {EmployeeCreateDto} from "./dto/EmployeeCreate.dto";
import {Employee} from "./schemas/employee.schema";

@Controller('employees')
export class EmployeesController {

    constructor(private employeeService: EmployeesService) {
    }

    @Get()
    async getAllEmployees(@Query() param: EmployeeSearchDto): Promise<Employee[]> {
        /** Even user don't send query params we will recieve empty {}, so it's why we check in such way */
        if (Object.keys(param).length) {
            return this.employeeService.employeeSearch(param);
        }
        return this.employeeService.getAllEmployees();
    }


    @Post()
    @UsePipes(ValidationPipe)
    // @UsePipes(new EmployeeTierValidationPipe())
    createEmployee(@Body() employeeCreateDto: EmployeeCreateDto): Promise<Employee> {
        return this.employeeService.createEmployee(employeeCreateDto)
    }

    @Get('/:id')
    getEmployeeById(@Param('id') id: string): Promise <Employee> {
        return this.employeeService.getEmployeeById(id)
    }


@Put('/:id/city')
updateEmployee(@Param('id') id: string, @Body() employeeUpdateDto: EmployeeUpdateDto): Promise <Employee> {
    employeeUpdateDto.id = id
    return this.employeeService.updateEmployee(employeeUpdateDto)
}

@Delete('/:id')
@HttpCode(204)
deleteEmployee(@Param('id') id: string) {
    if (!this.employeeService.deleteEmployee(id)) {
        throw new NotFoundException('Not found')
    }
}


    /** Another way get data from request body*/
// @Post()
// createEmployee(@Body() request) {
//     return this.employeeService.createEmployee(request.firstName, request.lastName, request.designation, request.nearestCity, request.tier);
// }


}

