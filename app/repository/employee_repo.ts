import Employee from '#models/employee'

export default class EmployeeRepository {
  
  public async createEmployee(data: { empName: string; empRole: string; empSalary: number }) {
    return await Employee.create(data)
  }
  
  public async getEmployee() {
    console.log(await Employee.all())
    return await Employee.all()
  }

  public async getEmployeeById(id: number) {
    return await Employee.find(id)
  }
public async deleteEmployee(id: number) {
  const employee = await Employee.findOrFail(id)
  await employee.delete()
  return employee
}
public async updateEmployee(data: { id: number; empName: string; empRole: string; empSalary: number }) {
  const employee = await Employee.findOrFail(data.id)

  employee.empName = data.empName
  employee.empRole = data.empRole
  employee.empSalary = data.empSalary

  await employee.save()
  return employee
}
public async patchEmployee(id: number, data: { empName?: string; empRole?: string; empSalary?: number }) {
  const employee = await Employee.findOrFail(id)

  if (data.empName !== undefined) employee.empName = data.empName
  if (data.empRole !== undefined) employee.empRole = data.empRole
  if (data.empSalary !== undefined) employee.empSalary = data.empSalary

  await employee.save()
  return employee
}
public async getEmployeesByFields(filters: {
    empName?: string
    empRole?: string
    empSalary?: number
  }) {
    const query = Employee.query()

    if (filters.empName) {
      query.where('empName', filters.empName)
    }
    if (filters.empRole) {
      query.where('empRole', filters.empRole)
    }
    if (filters.empSalary) {
      query.where('empSalary', filters.empSalary)
    }

    return await query
  }

}



