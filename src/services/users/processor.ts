import type { User } from "@/services/users/entity"
import type { UserPresenter } from "@/services/users/presenter"

export class UsersProcessor {
  private static tags = ["users"]

  static getTags() {
    return UsersProcessor.tags
  }

  static getTag() {
    return UsersProcessor.tags[0]
  }

  static async toPresenterList(users: User[]) {
    return users.map<UserPresenter>((user) => ({
      id: user.id,
      username: user.username,
      fullName: `${user.surname} ${user.name} ${user.patronymic}`,
      roles: user.roles.map(({ role }) => role),
      phoneNumber: user.phoneNumber,
      raw: {
        ...user,
        rolesId: user.roles.map(({ id }) => id),
        phoneNumber: user.phoneNumber ? UsersProcessor.removePhoneAreaCode(user.phoneNumber) : "",
      },
    }))
  }

  static formatPhoneNumberToBodyType(phoneNumber: string) {
    const sanitizedPhoneNumber = phoneNumber.replace(/\D/g, "")

    return sanitizedPhoneNumber ? `996${sanitizedPhoneNumber}` : null
  }

  static removePhoneAreaCode(phoneNumber: string) {
    return phoneNumber ? phoneNumber.replace(/^\d{3}/g, "") : ""
  }

  static formatPhoneNumber(phoneNumber: string) {
    return phoneNumber ? phoneNumber.replace(/^(\d{3})(\d{3})(\d{2})(\d{2})(\d{2})$/g, "+$1 ($2) $3-$4-$5") : ""
  }
}
