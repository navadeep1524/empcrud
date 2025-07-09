import vine from '@vinejs/vine'

export const createEmployeeValidator = vine.compile(
  vine.object({
    empName: vine.string().trim().minLength(3).maxLength(50),
    empRole: vine.string().trim().minLength(2).maxLength(100),
    empSalary: vine.number().positive().min(1000), 
  })
)
export const updateEmployeeValidator = vine.compile(
  vine.object({
    id: vine.number().positive(), 
    empName: vine.string().trim().minLength(3).maxLength(50),
    empRole: vine.string().trim().minLength(2).maxLength(100),
    empSalary: vine.number().positive().min(1000),
  })
)
export const patchEmployeeValidator = vine.compile(
  vine.object({
    empName: vine.string().trim().minLength(3).maxLength(50).optional(),
    empRole: vine.string().trim().minLength(2).maxLength(100).optional(),
    empSalary: vine.number().positive().min(1000).optional(),
  })
)
export const getEmployeeByFieldsValidator = vine.compile(
  vine.object({
    empName: vine.string().trim().minLength(3).optional(),
    empRole: vine.string().trim().minLength(2).optional(),
    empSalary: vine.number().positive().optional(),
  })
)