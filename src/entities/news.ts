import { Basic_User } from "./user"

export interface News {
    Id          :number
    Title       :string
    Image       :string
    Content     :string
    CreatedAt   :string
    UpdatedAt   :string
    CreatedBy   :Basic_User
}