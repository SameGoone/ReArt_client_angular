import { ImageDto } from "./image.model"
import { LikesInfo } from "./likesInfo.model"
import { UserDetails } from "./user.model"

export interface PostDetailsDto {
  id: string
  body: string
  createdAt: Date
  user: UserDetails
  image: ImageDto
  likesInfo: LikesInfo
}

export interface PostCreateDto {
  id?: String
  body: String
  image: ImageDto | null
}
