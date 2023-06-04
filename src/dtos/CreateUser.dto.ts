import { CreateProfileDto } from "src/profile/dto/create-profile.dto";
import { Type } from "class-transformer";

export class CreateUserDto {
    username:string;
    password:string;
    
    @Type(() => CreateProfileDto)
	profile: CreateProfileDto;
}

