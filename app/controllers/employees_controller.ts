import type { HttpContext } from '@adonisjs/core/http'
import { createEmployeeValidator } from '#validators/employee_man'
import { updateEmployeeValidator } from '#validators/employee_man'
import { patchEmployeeValidator } from '#validators/employee_man'
import { getEmployeeByFieldsValidator } from '#validators/employee_man'
import EmployeeRepository from '../repository/employee_repo.js'

export default class EmployeesController {
  private repo = new EmployeeRepository()

  async createEmployee({ request, response }: HttpContext): Promise<any> {
    try {
      const payload = await request.validateUsing(createEmployeeValidator)

      const employee = await this.repo.createEmployee(payload)

      return response.created({
        status: true,
        message: 'Employee created successfully',
        data: employee,
      })
    } catch (error) {
      if (error.code === '23505') {
        return response.status(400).json({
          status: false,
          message: 'ID already exists. Please use a different ID.',
          error: error.message,
        })
      }

      return response.status(500).json({
        status: false,
        message: 'Failed to create employee',
        error: error.message,
      })
    }
  }

  async getEmployeeById({ request, response }: HttpContext): Promise<any> {
    try {
      const { id } = request.params()

      if (!id) {
        return response.badRequest({
          status: false,
          message: 'Employee Id is required',
        })
      }
      const employee = await this.repo.getEmployeeById(id)

      if (!employee) {
        return response.notFound({
          status: false,
          message: 'Employee not found',
        })
      }

      return response.ok({
        status: true,
        message: 'Employee retrieved successfully',
        data: employee,
      })
    } catch (error) {
      return response.status(500).json({
        status: false,
        message: 'Failed to retrieve employee',
        error: error.message,
      })
    }
  }
  async getEmployee({ response }: HttpContext): Promise<any> {
    try {
      const employees = await this.repo.getEmployee()
      return response.ok({
        status: true,
        message: 'Employees fetched successfully',
        data: employees,
      })
    } catch (error) {
      return response.status(500).json({
        status: false,
        message: 'Failed to fetch employees',
        error: error.message,
      })
    }
  }
  async deleteEmployee({ request, response }: HttpContext): Promise<any> {
    try {
      const { id } = request.params()

      if (!id) {
        return response.badRequest({
          status: false,
          message: 'Employee Id is required',
        })
      }

      const employee = await this.repo.deleteEmployee(Number(id))

      return response.ok({
        status: true,
        message: 'Employee deleted successfully',
        data: employee,
      })
    } catch (error) {
      return response.status(500).json({
        status: false,
        message: 'Failed to delete employee',
        error: error.message,
      })
    }
  }

  async putEmployee({ request, response }: HttpContext): Promise<any> {
    try {
      const payload = await request.validateUsing(updateEmployeeValidator)
      const employee = await this.repo.updateEmployee(payload)

      return response.ok({
        status: true,
        message: 'Employee updated successfully',
        data: employee,
      })
    } catch (error) {
      return response.status(500).json({
        status: false,
        message: 'Failed to update employee',
        error: error.message,
      })
    }
  }
  async patchEmployee({ request, response }: HttpContext): Promise<any> {
    try {
      const { id } = request.params()

      if (!id) {
        return response.badRequest({
          status: false,
          message: 'Employee Id is required',
        })
      }

      const payload = await request.validateUsing(patchEmployeeValidator)
      const employee = await this.repo.patchEmployee(id, payload)

      return response.ok({
        status: true,
        message: 'Employee partially updated successfully',
        data: employee,
      })
    } catch (error) {
      return response.status(500).json({
        status: false,
        message: 'Failed to patch employee',
        error: error.message,
      })
    }
  }
  async getEmployeesByFields({ request, response }: HttpContext): Promise<any> {
    try {
      const filters = await request.validateUsing(getEmployeeByFieldsValidator)

      if (!filters.empName && !filters.empRole && !filters.empSalary) {
        return response.badRequest({
          status: false,
          message: 'At least one filter (empName, empRole, empSalary) is required',
        })
      }

      const employees = await this.repo.getEmployeesByFields(filters)

      if (employees.length === 0) {
        return response.notFound({
          status: false,
          message: 'No employees found matching the filters',
        })
      }

      return response.ok({
        status: true,
        message: 'Employees fetched successfully',
        data: employees,
      })
    } catch (error) {
      return response.status(500).json({
        status: false,
        message: 'Failed to fetch employee(s)',
        error: error.message,
      })
    }
  }
}
