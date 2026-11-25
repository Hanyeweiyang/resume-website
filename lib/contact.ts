import { z } from "zod"

export const contactEmail = "2205425481@qq.com"

export const contactMaxLength = {
  name: 80,
  email: 254,
  subject: 120,
  message: 2000,
}

export const contactMessageSchema = z.object({
  name: z.string().trim().min(2, "姓名至少需要 2 个字").max(contactMaxLength.name, "姓名过长"),
  email: z.string().trim().email("请输入有效的邮箱地址").max(contactMaxLength.email, "邮箱地址过长"),
  subject: z.string().trim().min(5, "主题至少需要 5 个字").max(contactMaxLength.subject, "主题过长")
    .refine((subject) => !/[\u0000-\u001f\u007f]/.test(subject), "主题只能填写一行"),
  message: z.string().trim().min(10, "留言至少需要 10 个字").max(contactMaxLength.message, "留言最多可填写 2000 个字"),
}).strict()

export type ContactMessage = z.infer<typeof contactMessageSchema>
