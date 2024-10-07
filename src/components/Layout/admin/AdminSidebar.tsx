"use client"

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/utils/cn"
import {
  IconAbc,
  IconBrandDatabricks,
  IconBriefcase,
  IconCategory,
  IconCategoryFilled,
  IconCertificate,
  IconColorPicker,
  IconHome,
  IconNews,
  IconUserCog,
  IconUsers,
} from "@tabler/icons-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const menuRoutes = [
  {
    label: "Категории",
    path: "/manage/categories",
    icon: IconCategory,
  },
  {
    label: "Подкатегории",
    path: "/manage/categories/subcategories",
    icon: IconCategoryFilled,
  },
  {
    label: "Продукты",
    path: "/manage/products",
    icon: IconBrandDatabricks,
  },
  {
    label: "Характеристики продуктов",
    path: "/manage/products/characteristics",
    icon: IconAbc,
  },
  {
    label: "Цвета продуктов",
    path: "/manage/products/colors",
    icon: IconColorPicker,
  },
  {
    label: "Новости",
    path: "/manage/news",
    icon: IconNews,
  },
  {
    label: "Сертификаты",
    path: "/manage/certificates",
    icon: IconCertificate,
  },
  {
    label: "Вакансии",
    path: "/manage/vacancies",
    icon: IconBriefcase,
  },
  {
    label: "Пользователи",
    path: "/manage/users",
    icon: IconUsers,
  },
  {
    label: "Роли",
    path: "/manage/users/roles",
    icon: IconUserCog,
  },
]

const AdminSidebar = () => {
  const pathname = usePathname()

  return (
    <aside className='fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex'>
      <nav className='flex flex-col items-center gap-4 px-2 sm:py-5'>
        <Link
          href='#'
          className='group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base'
        >
          <IconHome className='h-4 w-4 transition-all group-hover:scale-110' />
          <span className='sr-only'>Acme Inc</span>
        </Link>

        {menuRoutes.map((menuRoute) => {
          const Icon = menuRoute.icon

          return (
            <Tooltip key={menuRoute.path}>
              <TooltipTrigger asChild>
                <Link
                  href={`${menuRoute.path}`}
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-primary md:h-8 md:w-8",
                    menuRoute.path === pathname && "bg-primary text-primary-foreground",
                  )}
                >
                  <Icon className='h-5 w-5' />
                  <span className='sr-only'>{menuRoute.label}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side='right'>{menuRoute.label}</TooltipContent>
            </Tooltip>
          )
        })}
      </nav>
    </aside>
  )
}

export default AdminSidebar
